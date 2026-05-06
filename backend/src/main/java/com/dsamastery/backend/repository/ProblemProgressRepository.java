package com.dsamastery.backend.repository;

import com.dsamastery.backend.model.ProblemProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProblemProgressRepository extends JpaRepository<ProblemProgress, Long> {
    List<ProblemProgress> findByUserId(Long userId);
    Optional<ProblemProgress> findByUserIdAndProblemId(Long userId, Long problemId);
}
