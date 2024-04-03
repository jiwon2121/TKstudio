package com.ssafy.gallery.option.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(SnakeCaseStrategy.class)
public record KakaoPayReadyResponse(
        String tid,
        String nextRedirectAppUrl,
        String nextRedirectMobileUrl,
        String nextRedirectPcUrl,
        String androidAppScheme,
        String iosAppScheme,
        String createdAt
) {
}



