package com.ssafy.gallery.user.controller;

import com.ssafy.gallery.common.response.ApiResponse;
import com.ssafy.gallery.oauth.type.OauthServerType;
import com.ssafy.gallery.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/login/{oauthServerType}")
    ResponseEntity<ApiResponse<?>> login(
            HttpServletRequest request,
            HttpServletResponse response,
            @PathVariable OauthServerType oauthServerType,
            @RequestBody Map<String, Object> params
    ) {
        userService.login(request, response, oauthServerType, (String) params.get("authCode"));
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(null));
    }

    @GetMapping("/logout")
    ResponseEntity<ApiResponse<?>> logout(HttpServletRequest request) {
        userService.logout(request);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(null));
    }
}