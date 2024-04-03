package com.ssafy.gallery.image.exception;

import com.ssafy.gallery.common.exception.ExceptionEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ImageExceptionEnum implements ExceptionEnum {
    NO_FACE(HttpStatus.BAD_REQUEST, 400, "얼굴이 없습니다."),
    MANY_FACE(HttpStatus.BAD_REQUEST, 400, "탐지된 얼굴이 2개 이상입니다."),
    GRPC_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "GRPC ERROR"),
    NO_INFO(HttpStatus.BAD_REQUEST, 400, "어떤 에러.");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
