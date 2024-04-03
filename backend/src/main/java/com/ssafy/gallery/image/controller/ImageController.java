
package com.ssafy.gallery.image.controller;

import com.ssafy.gallery.image.model.CreateImageDto;
import com.ssafy.gallery.image.model.ImageInfoDTO;
import com.ssafy.gallery.image.service.ImageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Tag(name = "이미지", description = "Image API")
@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/image")
public class ImageController {
    private final ImageService imageService;

    // Login한 사용자의 UserId값이 있어야 JPA로 DB에 데이터 넘길 수 있음.
    @PostMapping("/create")
    public ResponseEntity<Resource> createImage(
            HttpServletRequest request,
            @RequestParam(value = "originalImage") MultipartFile originalImage,
            @RequestParam(value = "optionId") String optionId
    ) throws IOException {
        int id = (int) request.getAttribute("userId");
        log.info("create Image request userId : " + id);
        CreateImageDto response = imageService.createImage(originalImage, optionId, id);

        return ResponseEntity.ok()
                .header("imageInfoId", String.valueOf(response.getImageInfoId()))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(response.getResource());

    }

    @GetMapping("delete/{imageInfoId}")
    public ResponseEntity deleteImage(HttpServletRequest request, @PathVariable int imageInfoId) {
        int id = (int) request.getAttribute("userId");

        imageService.deleteImage(imageInfoId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("getImageInfos")
    public ResponseEntity<Map<Integer, ImageInfoDTO>> getImageInfos(HttpServletRequest request) {
        int id = (int) request.getAttribute("userId");

        log.info("getImageInfos request userId: " + id);
        List<ImageInfoDTO> imageInfoList = new ArrayList<>(imageService.getImageInfos(id));

        // imageInfoList를 생성 시간에 맞춰 내림차순으로 정렬
        imageInfoList.sort(Comparator.comparing(ImageInfoDTO::getCreatedTime).reversed());

        // 정렬된 순서를 유지하기 위해 LinkedHashMap을 사용하여 responseDTO 생성
        Map<Integer, ImageInfoDTO> responseDTO = imageInfoList.stream()
                .collect(Collectors.toMap(
                        ImageInfoDTO::getImageInfoId,
                        Function.identity(),
                        (e1, e2) -> e1,
                        LinkedHashMap::new));

        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("getImage/originalImage/{imageInfoId}")
    public ResponseEntity<Resource> getOriginalImage(HttpServletRequest request, @PathVariable String imageInfoId) throws Exception {
        int id = (int) request.getAttribute("userId");

        log.info("getOriginalImage request userId: " + id + LocalDateTime.now());
        Resource image = imageService.getOriginalImage(imageInfoId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(image);
    }

    @GetMapping("getImage/processedImage/{imageInfoId}")
    public ResponseEntity<Resource> getProcessedImage(HttpServletRequest request, @PathVariable String imageInfoId) throws Exception {
        int id = (int) request.getAttribute("userId");
        log.info("getProcessedImage request userId: " + id + LocalDateTime.now());

        Resource image = imageService.getProcessedImage(imageInfoId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(image);

    }

    @GetMapping("getImage/thumbnailImage/{imageInfoId}")
    public ResponseEntity<Resource> getThumbnailImage(HttpServletRequest request, @PathVariable String imageInfoId) throws Exception {
        int id = (int) request.getAttribute("userId");
        log.info("getThumbnailImage request userId: " + id + LocalDateTime.now());

        log.info("getOriginalImage id : " + imageInfoId);
        Resource image = imageService.getThumbnailImage(imageInfoId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_PNG_VALUE)
                .body(image);
    }
}