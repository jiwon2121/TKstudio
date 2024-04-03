package com.ssafy.gallery.option.repository;

import com.ssafy.gallery.option.model.OptionBuyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionBuyLogRepository extends JpaRepository<OptionBuyLog, Integer> {
    List<OptionBuyLog> findAllByUserId(int userId);
}
