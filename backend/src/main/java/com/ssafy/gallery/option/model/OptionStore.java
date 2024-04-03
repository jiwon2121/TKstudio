package com.ssafy.gallery.option.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
@Getter
public class OptionStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int optionId;

    @Column(nullable = false, columnDefinition = "VARCHAR(30) CHARACTER SET UTF8")
    private String optionName;
    private int cost;
    private String optionS3Url;
    private String gender;
    @Setter
    @ColumnDefault("false")
    private boolean purchased;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdTime;

    @PrePersist
    protected void onCreate() {
        createdTime = LocalDateTime.now();
    }
}
