// ImageJpaRepository.java
package com.ssafy.gallery.image.repository;

import com.ssafy.gallery.image.model.ImageInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageJpaRepository extends JpaRepository<ImageInfo, Integer> {

}