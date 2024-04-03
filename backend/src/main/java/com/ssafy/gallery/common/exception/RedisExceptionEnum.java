package com.ssafy.gallery.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum RedisExceptionEnum implements ExceptionEnum {
    NO_REDIS_DATA(HttpStatus.INTERNAL_SERVER_ERROR, 500,"Redis no data");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
