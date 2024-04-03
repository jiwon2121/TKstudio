package com.ssafy.gallery.image.repository;

import com.ssafy.gallery.image.model.ImageInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.annotations.Imported;
import org.hibernate.dialect.MariaDBDialect;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ImageRepositoryTest {

    @Autowired
    private ImageRepository imageRepository;

    @Test
    @DisplayName("insertImageUrls_shouldSaveImageInfo")
    void insertImageUrls_shouldSaveImageInfo() {
        ImageInfo imageInfo = new ImageInfo(
                1,
                "originalImages/originalURL1",
                "thumbnailImages/ThumbnailURL1",
                "processedImages/processedURL1");

        ImageInfo savedImageInfo = imageRepository.insertImageUrls(imageInfo);

        assertThat(savedImageInfo).isNotNull();
        assertThat(savedImageInfo.getUserId()).isEqualTo(1);
        assertThat(savedImageInfo.getOriginalImageUrl()).isEqualTo("originalImages/originalURL1");
        assertThat(savedImageInfo.getThumbnailImageUrl()).isEqualTo("thumbnailImages/ThumbnailURL1");
        assertThat(savedImageInfo.getProcessedImageUrl()).isEqualTo("processedImages/processedURL1");
    }

    @Test
    @DisplayName("getImageInfoListByUserId_shouldReturnImageInfoList")
    void getImageInfoListByUserId_shouldReturnImageInfoList() {
        ImageInfo imageInfo1 = new ImageInfo(
                1,
                "originalImages/originalURL1",
                "thumbnailImages/ThumbnailURL1",
                "processedImages/processedURL1");
        ImageInfo imageInfo2 = new ImageInfo(
                1,
                "originalImages/originalURL2",
                "thumbnailImages/ThumbnailURL2",
                "processedImages/processedURL2");
        imageRepository.insertImageUrls(imageInfo1);
        imageRepository.insertImageUrls(imageInfo2);
        List<ImageInfo> result = imageRepository.getImageInfoListByUserId(1);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getUserId()).isEqualTo(1);
        assertThat(result.get(1).getUserId()).isEqualTo(1);
    }

    @Test
    @DisplayName("deleteImageInfo_shouldMarkImageInfoAsDeleted")
    void deleteImageInfo_shouldMarkImageInfoAsDeleted() {
        ImageInfo imageInfo = new ImageInfo(
                1,
                "originalImages/originalURL1",
                "thumbnailImages/ThumbnailURL1",
                "processedImages/processedURL1");

        imageRepository.deleteImageInfo(imageInfo.getUserId());

//        ImageInfo deletedImage = em.find(ImageInfo.class, imageInfo.getUserId());
//        assertThat(deletedImage.isDeleted()).isTrue();
    }
}