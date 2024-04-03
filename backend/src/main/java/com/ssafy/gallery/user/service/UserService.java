package com.ssafy.gallery.user.service;

import com.ssafy.gallery.auth.jwt.util.JwtUtil;
import com.ssafy.gallery.common.exception.ApiExceptionFactory;
import com.ssafy.gallery.oauth.client.OauthMemberClientComposite;
import com.ssafy.gallery.oauth.type.OauthServerType;
import com.ssafy.gallery.option.service.OptionService;
import com.ssafy.gallery.redis.dto.LoginTokenDto;
import com.ssafy.gallery.redis.repository.LoginTokenRepository;
import com.ssafy.gallery.user.exception.UserExceptionEnum;
import com.ssafy.gallery.user.model.LoginLog;
import com.ssafy.gallery.user.model.User;
import com.ssafy.gallery.user.repository.LoginLogRepository;
import com.ssafy.gallery.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClientException;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final LoginTokenRepository loginTokenRepository;
    private final UserRepository userRepository;
    private final LoginLogRepository loginLogRepository;
    private final JwtUtil jwtUtil;
    private final OptionService optionService;

    public void login(HttpServletRequest request, HttpServletResponse response, OauthServerType oauthServerType, String authCode) {
        try {
            User user = oauthMemberClientComposite.fetch(oauthServerType, authCode);
            User saved;
            Optional<User> optionalUser = userRepository.findByDomain(user.getDomain());
            if (optionalUser.isEmpty()) {
                saved = userRepository.save(user);
                optionService.buyOption(saved.getUserId(), 1);
                optionService.buyOption(saved.getUserId(), 21);
            } else {
                saved = userRepository.findByDomain(user.getDomain()).get();
            }

            String accessToken = jwtUtil.createToken("access");
            String refreshToken = jwtUtil.createToken("refresh");
            jwtUtil.saveTokens(accessToken, refreshToken, saved.getUserId());

            LoginLog loginLog = LoginLog.builder().userId(saved.getUserId()).loginIp(getClientIP(request)).build();
            loginLogRepository.save(loginLog);

            response.setHeader("accessToken", accessToken);
            response.setHeader("refreshToken", refreshToken);
            log.info("{} 유저 로그인", saved.getUserId());
        } catch (WebClientException wce) {
            log.error(wce.getMessage());
            throw ApiExceptionFactory.fromExceptionEnum(UserExceptionEnum.WRONG_CODE);
        }
    }

    public void logout(HttpServletRequest request) {
        String refreshToken = (String) request.getAttribute("refreshToken");
        if (refreshToken == null) {
            throw ApiExceptionFactory.fromExceptionEnum(UserExceptionEnum.NEED_REFRESH_TOKEN);
        }

        if (loginTokenRepository.findById(refreshToken).isPresent()) {
            LoginTokenDto loginTokenDto = loginTokenRepository.findById(refreshToken).get();

            String accessToken = loginTokenDto.getAccessToken();
            if (accessToken == null) {
                throw ApiExceptionFactory.fromExceptionEnum(UserExceptionEnum.NEED_REFRESH_TOKEN);
            }

            loginTokenRepository.deleteById(accessToken);
            loginTokenRepository.deleteById(refreshToken);
            log.info("{} 유저 로그아웃", loginTokenDto.getUserId());
        }
    }

    private static String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        log.info("> X-FORWARDED-FOR : " + ip);

        if (ip == null) {
            ip = request.getHeader("Proxy-Client-IP");
            log.info("> Proxy-Client-IP : " + ip);
        }
        if (ip == null) {
            ip = request.getHeader("WL-Proxy-Client-IP");
            log.info(">  WL-Proxy-Client-IP : " + ip);
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_CLIENT_IP");
            log.info("> HTTP_CLIENT_IP : " + ip);
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            log.info("> HTTP_X_FORWARDED_FOR : " + ip);
        }
        if (ip == null) {
            ip = request.getRemoteAddr();
            log.info("> getRemoteAddr : " + ip);
        }
        log.info("> Result : IP Address : " + ip);

        return ip;
    }
}