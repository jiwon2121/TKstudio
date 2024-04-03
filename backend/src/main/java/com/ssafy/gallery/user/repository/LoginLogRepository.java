package com.ssafy.gallery.user.repository;

import com.ssafy.gallery.user.model.LoginLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoginLogRepository extends JpaRepository<LoginLog, Integer> {
    List<LoginLog> findAllByUserId(int userId);
}
