package com.ssafy.gallery.oauth.client;

import com.ssafy.gallery.oauth.type.OauthServerType;
import com.ssafy.gallery.user.model.User;

public interface OauthMemberClient {

    OauthServerType supportServer();

    User fetch(String code);
}