package com.ssafy.gallery.oauth.client;

import com.ssafy.gallery.oauth.config.GoogleOauthConfig;
import com.ssafy.gallery.oauth.dto.GoogleMemberResponse;
import com.ssafy.gallery.oauth.dto.GoogleToken;
import com.ssafy.gallery.oauth.type.OauthServerType;
import com.ssafy.gallery.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class GoogleMemberClient implements OauthMemberClient {

    private final GoogleApiClient googleApiClient;
    private final GoogleOauthConfig googleOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.google;
    }

    @Override
    public User fetch(String authCode) {
        GoogleToken tokenInfo = googleApiClient.fetchToken(tokenRequestParams(authCode));
        GoogleMemberResponse googleMemberResponse = googleApiClient.fetchMember("Bearer " + tokenInfo.accessToken());
        return googleMemberResponse.toDomain();
    }

    private MultiValueMap<String, String> tokenRequestParams(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", googleOauthConfig.clientId());
        params.add("client_secret", googleOauthConfig.clientSecret());
        params.add("redirect_uri", googleOauthConfig.redirectUri());
        params.add("code", URLDecoder.decode(authCode, StandardCharsets.UTF_8));
        return params;
    }
}
