package com.dsamastery.backend.service;

import com.dsamastery.backend.model.Problem;
import com.dsamastery.backend.model.ProblemProgress;
import com.dsamastery.backend.model.User;
import com.dsamastery.backend.repository.ProblemProgressRepository;
import com.dsamastery.backend.repository.ProblemRepository;
import com.dsamastery.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemService {
    private final ProblemRepository problemRepository;
    private final ProblemProgressRepository problemProgressRepository;
    private final UserRepository userRepository;

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public List<ProblemProgress> getUserProgress(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return problemProgressRepository.findByUserId(user.getId());
    }

    public ProblemProgress updateProgress(String userEmail, Long problemId, String status) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        Problem problem = problemRepository.findById(problemId).orElseThrow();

        ProblemProgress progress = problemProgressRepository.findByUserIdAndProblemId(user.getId(), problemId)
                .orElse(ProblemProgress.builder().user(user).problem(problem).build());

        progress.setStatus(status);
        return problemProgressRepository.save(progress);
    }
}
