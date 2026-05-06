package com.dsamastery.backend.repository;

import com.dsamastery.backend.model.VideoProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VideoProgressRepository extends JpaRepository<VideoProgress, Long> {
    List<VideoProgress> findByUserId(Long userId);
    Optional<VideoProgress> findByUserIdAndVideoId(Long userId, Long videoId);
}
