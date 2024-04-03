package com.ssafy.gallery.redis.repository;

import com.ssafy.gallery.redis.dto.KakaoPayReadyDto;
import org.springframework.data.repository.CrudRepository;

public interface KakaoPayReadyRepository extends CrudRepository<KakaoPayReadyDto, String> {
}