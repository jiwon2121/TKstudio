package com.ssafy.gallery.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.google.protobuf.ByteString;
import com.ssafy.gallery.common.exception.ApiExceptionFactory;
import com.ssafy.gallery.common.exception.GrpcExceptionEnum;
import com.ssafy.gallery.common.exception.RedisExceptionEnum;
import com.ssafy.gallery.common.stub.GrpcStubPool;
import com.ssafy.gallery.image.exception.ImageExceptionEnum;
import com.ssafy.gallery.image.model.CreateImageDto;
import com.ssafy.gallery.image.model.ImageInfo;
import com.ssafy.gallery.image.model.ImageInfoDTO;
import com.ssafy.gallery.image.model.ImageInfoRedisDTO;
import com.ssafy.gallery.image.repository.ImageRedisRepository;
import com.ssafy.gallery.image.repository.ImageRepository;
import com.ssafy.gallery.option.model.OptionStore;
import com.ssafy.gallery.option.repository.OptionStoreRepository;
import com.ssafy.pjt.grpc.CreateImageGrpc;
import com.ssafy.pjt.grpc.Image;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final ImageRedisRepository imageRedisRepository;
    private final OptionStoreRepository optionStoreRepository;
    private final GrpcStubPool grpcStubPool;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public CreateImageDto createImage(MultipartFile image, String optionId, int userId) throws IOException {
        ByteString imageData = ByteString.copyFrom(image.getBytes());
        CreateImageGrpc.CreateImageBlockingStub imageStub = null;
        Image.ProcessedImageInfo receiveData = null;
        int sex = 0;

        Optional<OptionStore> optionStore = Optional.of(optionStoreRepository.findById(Integer.valueOf(optionId))
                .orElseThrow(() -> ApiExceptionFactory.fromExceptionEnum(RedisExceptionEnum.NO_REDIS_DATA)));

        if (optionStore.get().getGender().equals("FEMALE")) {
            sex = 1;
        }
        Image.Options options = Image.Options.newBuilder()
                .setOptionName(optionStore.get().getOptionName())
                .setSex(sex)
                .build();

        try {
            imageStub = grpcStubPool.getStub();
            Image.OriginalImageInfo buildImageInfo = Image.OriginalImageInfo.newBuilder()
                    .setOriginalImage(imageData)
                    .setOptions(options)
                    .build();
            log.info("이미지 생성 성별: {}", buildImageInfo.getOptions().getSex());
            receiveData = imageStub.sendImage(buildImageInfo);

        } catch (IllegalStateException | InterruptedException e) {
            throw ApiExceptionFactory.fromExceptionEnum(ImageExceptionEnum.GRPC_ERROR);
        }

        try {
            if (Image.ImageProcessingResult.SUCCESS.equals(receiveData.getResult())) {
                byte[] processedImageData = receiveData.getProcessedImage().toByteArray();
                ByteArrayResource byteArrayResource = getBufferedImage(processedImageData, 768, 1024);
                Image.ResponseUrl responseUrl = receiveData.getResponseUrl();
                log.info("{}", responseUrl);

                ImageInfo imageInfo = new ImageInfo(
                        userId,
                        responseUrl.getOriginalImageUrl(),
                        responseUrl.getThumbnailImageUrl(),
                        responseUrl.getProcessedImageUrl(),
                        optionStore.get()
                );

                ImageInfo insertResult = imageRepository.insertImageUrls(imageInfo, optionStore.get());
                log.info("DB insert Image info : " + insertResult.getImageInfoId());

                CreateImageDto imageInfoDto = new CreateImageDto(
                        imageInfo.getImageInfoId(),
                        imageInfo.getThumbnailImageUrl(),
                        imageInfo.getOriginalImageUrl(),
                        imageInfo.getProcessedImageUrl(),
                        byteArrayResource
                );

                return imageInfoDto;
            } else if (Image.ImageProcessingResult.NO_FACE.equals(receiveData.getResult())) {
                throw ApiExceptionFactory.fromExceptionEnum(ImageExceptionEnum.NO_FACE);
            } else if (Image.ImageProcessingResult.MANY_FACE.equals(receiveData.getResult())) {
                throw ApiExceptionFactory.fromExceptionEnum(ImageExceptionEnum.MANY_FACE);
            } else {
                throw ApiExceptionFactory.fromExceptionEnum(ImageExceptionEnum.NO_INFO);
            }
        } finally {
            try {
                grpcStubPool.returnStub(imageStub);
            } catch (InterruptedException e) {
                throw ApiExceptionFactory.fromExceptionEnum(GrpcExceptionEnum.NO_STUB);
            }
        }
    }


    public List<ImageInfoDTO> getImageInfos(int userId) {
        List<ImageInfo> imageInfoList = imageRepository.getImageInfoListByUserId(userId);
        List<ImageInfoRedisDTO> redisImageInfoList = imageInfoList.stream()
                .map(ImageInfoRedisDTO::new)
                .toList();

        imageRedisRepository.saveAll(redisImageInfoList);
        List<ImageInfoDTO> listDto = imageInfoList.stream()
                .map(ImageInfoDTO::new)
                .toList();

        return listDto;
    }

    public Resource getOriginalImage(String imageInfoId) throws Exception {
        ImageInfoRedisDTO imageInfo = null;
        try {
            imageInfo = imageRedisRepository.findById(imageInfoId).orElse(null);
        } catch (Exception e) {
            // Redis 오류 처리
            throw new Exception("Redis error", e);
        }

        if (imageInfo == null) {
            // Redis에서 찾을 수 없는 경우 ImageRepository를 사용하여 이미지 정보 조회
            try {
                ImageInfo imageInfoFromDB = imageRepository.getImage(Integer.parseInt(imageInfoId));
                imageInfo = new ImageInfoRedisDTO(imageInfoFromDB);
                imageRedisRepository.save(imageInfo);
            } catch (NullPointerException e) {
                ApiExceptionFactory.fromExceptionEnum(RedisExceptionEnum.NO_REDIS_DATA);
            }
            // Redis에 이미지 정보 저장
        }

        String originalImageURL = imageInfo.getOriginalImageUrl();

        return getS3Image(originalImageURL);
    }

    public Resource getProcessedImage(String imageInfoId) throws Exception {
        ImageInfoRedisDTO imageInfo = null;
        try {
            imageInfo = imageRedisRepository.findById(imageInfoId).orElse(null);
        } catch (Exception e) {
            // Redis 오류 처리
            throw new Exception("Redis error", e);
        }

        if (imageInfo == null) {
            // Redis에서 찾을 수 없는 경우 ImageRepository를 사용하여 이미지 정보 조회
            ImageInfo imageInfoFromDB = imageRepository.getImage(Integer.parseInt(imageInfoId));
            if (imageInfoFromDB == null) { // 예외처리 필요함
                log.info("이미지 가져올 때 에러 남. " + imageInfoId + LocalDateTime.now());
            }
            // Redis에 이미지 정보 저장
            imageInfo = new ImageInfoRedisDTO(imageInfoFromDB);
            imageRedisRepository.save(imageInfo);
        }

        String processedImageURL = imageInfo.getProcessedImageUrl();

        return getS3Image(processedImageURL);
    }

    public Resource getThumbnailImage(String imageInfoId) throws Exception {
        ImageInfoRedisDTO imageInfo = null;
        try {
            imageInfo = imageRedisRepository.findById(imageInfoId).orElse(null);
        } catch (Exception e) {
            // Redis 오류 처리
            throw new Exception("Redis error", e);
        }

        if (imageInfo == null) {
            // Redis에서 찾을 수 없는 경우 ImageRepository를 사용하여 이미지 정보 조회
            ImageInfo imageInfoFromDB = imageRepository.getImage(Integer.parseInt(imageInfoId));
            if (imageInfoFromDB == null) { // 예외처리 필요함
                log.info("이미지 가져올 때 에러 남. " + imageInfoId + LocalDateTime.now());
            }
            // Redis에 이미지 정보 저장
            imageInfo = new ImageInfoRedisDTO(imageInfoFromDB);
            imageRedisRepository.save(imageInfo);
        }

        String thumbnailImageURL = imageInfo.getThumbnailImageUrl();

        return getS3Image(thumbnailImageURL);
    }

    public void deleteImage(int imageId) {
        imageRedisRepository.deleteById(String.valueOf(imageId));
        imageRepository.deleteImageInfo(imageId);
    }

    private ByteArrayResource getBufferedImage(byte[] processedImageData, int width, int height) throws IOException {
        BufferedImage bufferedImage = new BufferedImage(768, 1024, BufferedImage.TYPE_3BYTE_BGR);

        // BufferedImage에 byte 배열 데이터 채우기
        int index = 0;
        for (int y = 0; y < bufferedImage.getHeight(); y++) {
            for (int x = 0; x < bufferedImage.getWidth(); x++) {
                int red = processedImageData[index++] & 0xFF;
                int green = processedImageData[index++] & 0xFF;
                int blue = processedImageData[index++] & 0xFF;

                // RGB 값으로 Pixel 생성 및 설정
                bufferedImage.setRGB(x, y, new Color(blue, green, red).getRGB());
            }
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "jpg", baos);

        ByteArrayResource resource = new ByteArrayResource(baos.toByteArray());

        return resource;
    }

    public Resource getS3Image(String imageURL) throws IOException {
        S3Object object = amazonS3.getObject(new GetObjectRequest(bucket, imageURL));
        S3ObjectInputStream objectInputStream = object.getObjectContent();
        byte[] data = IOUtils.toByteArray(objectInputStream);
        ByteArrayResource resource = new ByteArrayResource(data);

        return resource;
    }
}
