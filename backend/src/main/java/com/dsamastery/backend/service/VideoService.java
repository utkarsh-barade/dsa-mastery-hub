package com.dsamastery.backend.service;

import com.dsamastery.backend.model.User;
import com.dsamastery.backend.model.Video;
import com.dsamastery.backend.model.VideoProgress;
import com.dsamastery.backend.repository.UserRepository;
import com.dsamastery.backend.repository.VideoProgressRepository;
import com.dsamastery.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository videoRepository;
    private final VideoProgressRepository videoProgressRepository;
    private final UserRepository userRepository;

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public List<VideoProgress> getUserProgress(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return videoProgressRepository.findByUserId(user.getId());
    }

    public VideoProgress markCompleted(String userEmail, Long videoId, boolean completed) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        Video video = videoRepository.findById(videoId).orElseThrow();

        VideoProgress progress = videoProgressRepository.findByUserIdAndVideoId(user.getId(), videoId)
                .orElse(VideoProgress.builder().user(user).video(video).build());

        progress.setCompleted(completed);
        return videoProgressRepository.save(progress);
    }

    public VideoProgress updateNotes(String userEmail, Long videoId, String notes) {
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        Video video = videoRepository.findById(videoId).orElseThrow();

        VideoProgress progress = videoProgressRepository.findByUserIdAndVideoId(user.getId(), videoId)
                .orElse(VideoProgress.builder().user(user).video(video).build());

        progress.setNotes(notes);
        return videoProgressRepository.save(progress);
    }
}
