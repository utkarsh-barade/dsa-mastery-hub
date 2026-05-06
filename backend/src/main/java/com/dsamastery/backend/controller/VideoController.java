package com.dsamastery.backend.controller;

import com.dsamastery.backend.model.Video;
import com.dsamastery.backend.model.VideoProgress;
import com.dsamastery.backend.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/videos")
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }

    @GetMapping("/progress")
    public ResponseEntity<List<VideoProgress>> getUserProgress(Authentication authentication) {
        return ResponseEntity.ok(videoService.getUserProgress(authentication.getName()));
    }

    @PostMapping("/{videoId}/complete")
    public ResponseEntity<VideoProgress> markCompleted(
            @PathVariable Long videoId,
            @RequestBody Map<String, Boolean> body,
            Authentication authentication
    ) {
        return ResponseEntity.ok(videoService.markCompleted(
                authentication.getName(),
                videoId,
                body.get("completed")
        ));
    }

    @PostMapping("/{videoId}/notes")
    public ResponseEntity<VideoProgress> updateNotes(
            @PathVariable Long videoId,
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        return ResponseEntity.ok(videoService.updateNotes(
                authentication.getName(),
                videoId,
                body.get("notes")
        ));
    }
}
