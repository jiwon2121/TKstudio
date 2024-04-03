package com.ssafy.gallery.redis.repository;


import com.ssafy.gallery.redis.dto.LoginTokenDto;
import org.springframework.data.repository.CrudRepository;

public interface LoginTokenRepository extends CrudRepository<LoginTokenDto, String> {
}