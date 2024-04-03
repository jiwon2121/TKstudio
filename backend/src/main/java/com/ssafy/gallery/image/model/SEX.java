package com.ssafy.gallery.image.model;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum SEX {
    MALE(0),
    FEMALE(1);

    private final int value;

    SEX(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static SEX forNumber(int value) {
        switch (value) {
            case 0:
                return MALE;
            case 1:
                return FEMALE;
            default:
                throw new IllegalArgumentException("Invalid SEX value: " + value);
        }
    }
}