package com.ssafy.gallery.config;

import com.ssafy.gallery.auth.handler.CustomAccessDeniedHandler;
import com.ssafy.gallery.auth.handler.CustomAuthenticationEntryPoint;
import com.ssafy.gallery.auth.jwt.filter.JwtAuthenticationFilter;
import com.ssafy.gallery.auth.jwt.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;

    private static final String[] AUTH_BLACKLIST = {
            "/api/v1/user/logout", "/api/v1/option/list", "/api/v1/option/category", "/api/v1/option/payment/ready",
            "api/v1/option/image/**", "/api/v1/image/create", "/api/v1/image/delete", "/api/v1/image/getImageInfos",
            "/api/v1/image/getImage/originalImage","/api/v1/image/getImage/thumbnailImage","/api/v1/image/getImage/processedImage"
    };

    // 특정 HTTP 요청에 대한 웹 기반 보안 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(AUTH_BLACKLIST).authenticated()
                        .anyRequest().permitAll())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((exceptionHandling) -> exceptionHandling
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler));
        return http.build();
    }

    // ⭐️ CORS 설정
    CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedHeaders(Collections.singletonList("*"));
            config.setAllowedMethods(Collections.singletonList("*"));
            config.setAllowedOriginPatterns(Arrays.asList("https://j10a101.p.ssafy.io", "http://localhost:3000", "https://online-pay.kakao.com"));
            config.setAllowCredentials(true);
            config.addExposedHeader("accessToken");
            config.addExposedHeader("refreshToken");
            config.addExposedHeader("imageInfoId");
            return config;
        };
    }
}