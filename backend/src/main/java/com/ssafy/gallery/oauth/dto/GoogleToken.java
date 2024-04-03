package com.ssafy.gallery.oauth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(value = SnakeCaseStrategy.class)
public record GoogleToken(
        String accessToken,
        String refreshToken,
        Integer expiresIn,
        String scope,
        String tokenType
) {
}
