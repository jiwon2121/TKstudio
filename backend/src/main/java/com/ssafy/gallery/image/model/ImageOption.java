package com.ssafy.gallery.image.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import com.ssafy.pjt.grpc.Image;
@Getter
@Setter
@AllArgsConstructor
public class ImageOption {
    String background;
    String suit;
    String hair;

    @Override
    public String toString() {
        return "ImageOption{" +
                "background='" + background + '\'' +
                ", suit='" + suit + '\'' +
                ", hair='" + hair + '\'' +
                '}';
    }
}
