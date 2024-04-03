package com.ssafy.gallery.user.repository;

import com.ssafy.gallery.oauth.dto.Domain;
import com.ssafy.gallery.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByDomain(Domain domain);
}