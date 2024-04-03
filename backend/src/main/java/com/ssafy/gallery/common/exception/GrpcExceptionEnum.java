package com.ssafy.gallery.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GrpcExceptionEnum implements ExceptionEnum{
    NO_STUB(HttpStatus.INTERNAL_SERVER_ERROR, 500,"grpc stub queue is full");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
