package com.ssafy.gallery.image.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.gallery.option.model.OptionStore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ImageInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageInfoId;

    @Column(nullable = false)
    private int userId;

    @Column(nullable = false)
    private String originalImageUrl;

    @Column(nullable = false)
    private String thumbnailImageUrl;

    @Column(nullable = false)
    private String processedImageUrl;

    @Column(nullable = false)
    private boolean isDeleted = false;

    @Column
    private String optionName;

    @ManyToOne
    @JoinColumn(name = "optionId")
    private OptionStore optionStore;

    public ImageInfo(int userId, String originalImageUrl, String thumbnailImageUrl, String processedImageUrl,OptionStore optionStore) {
        this.userId = userId;
        try {
            this.thumbnailImageUrl = thumbnailImageUrl.substring(thumbnailImageUrl.indexOf("thumbnailImages/"));
            this.originalImageUrl = originalImageUrl.substring(originalImageUrl.indexOf("originalImages/"));
            this.processedImageUrl = processedImageUrl.substring(processedImageUrl.indexOf("processedImages/"));
            this.optionStore = optionStore;
            this.optionName = optionStore.getOptionName();
        } catch (IndexOutOfBoundsException e) {
            throw new IllegalArgumentException("Invalid image URL format", e);
        }
    }

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime;

    public void markAsDeleted() {
        isDeleted = true;
    }

}