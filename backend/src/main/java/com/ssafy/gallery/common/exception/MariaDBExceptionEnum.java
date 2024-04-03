package com.ssafy.gallery.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MariaDBExceptionEnum implements ExceptionEnum {
    NO_DB_DATA(HttpStatus.INTERNAL_SERVER_ERROR, 500,"No DB");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
