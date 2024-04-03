package com.ssafy.gallery.image.repository;

import com.ssafy.gallery.image.model.ImageInfoRedisDTO;
import org.springframework.data.repository.CrudRepository;

public interface ImageRedisRepository extends CrudRepository<ImageInfoRedisDTO,String> {
}
