package com.ssafy.gallery.image.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ByteArrayResource;

@Getter
@NoArgsConstructor
public class CreateImageDto {
    private int imageInfoId;

    private String thumbnailImageUrl;

    private String originalImageUrl;

    private String processedImageUrl;
    private ByteArrayResource resource = null;

    public CreateImageDto(int imageInfoId, String thumbnailImageUrl, String originalImageUrl, String processedImageUrl,ByteArrayResource resource) {
        this.imageInfoId = imageInfoId;
        this.thumbnailImageUrl = thumbnailImageUrl.substring(thumbnailImageUrl.indexOf("thumbnailImages/"));
        this.originalImageUrl = originalImageUrl.substring(originalImageUrl.indexOf("originalImages/"));
        this.processedImageUrl = processedImageUrl.substring(processedImageUrl.indexOf("processedImages/"));
        this.resource = resource;
    }
}
