package com.ssafy.gallery.oauth.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.gallery.user.model.User;

import static com.ssafy.gallery.oauth.type.OauthServerType.google;

@JsonNaming(value = SnakeCaseStrategy.class)
public record GoogleMemberResponse(
        String id,
        String email,
        boolean verifiedEmail,
        String name,
        String givenName,
        String familyName,
        String picture,
        String locale
) {

    public User toDomain() {
        return User.builder()
                .domain(new Domain(String.valueOf(id), google))
                .nickname(name)
                .email(email)
                .build();
    }
}
