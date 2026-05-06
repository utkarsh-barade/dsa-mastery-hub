package com.dsamastery.backend.controller;

import com.dsamastery.backend.model.Problem;
import com.dsamastery.backend.model.ProblemProgress;
import com.dsamastery.backend.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/problems")
@RequiredArgsConstructor
public class ProblemController {
    private final ProblemService problemService;

    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok(problemService.getAllProblems());
    }

    @GetMapping("/progress")
    public ResponseEntity<List<ProblemProgress>> getUserProgress(Authentication authentication) {
        return ResponseEntity.ok(problemService.getUserProgress(authentication.getName()));
    }

    @PostMapping("/{problemId}/progress")
    public ResponseEntity<ProblemProgress> updateProgress(
            @PathVariable Long problemId,
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        return ResponseEntity.ok(problemService.updateProgress(
                authentication.getName(), 
                problemId, 
                body.get("status")
        ));
    }
}
