package com.ssafy.gallery.image.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ImageInfoDTO {
    private int imageInfoId;
    private int optionId;
    private String optionName;
    private LocalDateTime createdTime;

    public ImageInfoDTO(ImageInfo imageInfo) {
        this.imageInfoId = imageInfo.getImageInfoId();
        this.createdTime = imageInfo.getCreatedTime();
        if (imageInfo.getOptionStore() != null) {
            optionId = imageInfo.getOptionStore().getOptionId();
            optionName = imageInfo.getOptionStore().getOptionName();
        } else {
            optionId = 0;
            optionName = "";
        }
    }
}