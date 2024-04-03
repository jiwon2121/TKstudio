package com.ssafy.gallery.redis.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "kakao_pay_ready")
@AllArgsConstructor
@Builder
@ToString
public class KakaoPayReadyDto {

    @Id
    private int id;

    private String tid;
}