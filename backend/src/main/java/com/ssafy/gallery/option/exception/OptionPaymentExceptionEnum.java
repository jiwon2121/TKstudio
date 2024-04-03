package com.ssafy.gallery.option.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OptionPaymentExceptionEnum {
    CANCEL_ERROR_MESSAGE("<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta http-equiv=\"refresh\" content=\"1; url=/store\">" +
            "    <title>결제 취소 안내</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "    <script>\n" +
            "        alert(\"결제가 취소되었습니다.\");\n" +
            "    </script>\n" +
            "    <h1>잠시 후에 쇼핑 스토어로 이동합니다...</h1>\n" +
            "</body>\n" +
            "</html>"),

    FAIL_ERROR_MESSAGE("<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta http-equiv=\"refresh\" content=\"1; url=/store\">" +
            "    <title>결제 실패 안내</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "    <script>\n" +
            "        alert(\"결제가 실패되었습니다.\");\n" +
            "    </script>\n" +
            "    <h1>잠시 후에 쇼핑 스토어로 이동합니다...</h1>\n" +
            "</body>\n" +
            "</html>");

    private final String errorMessage;
}
