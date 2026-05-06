package com.dsamastery.backend.config;

import com.dsamastery.backend.model.Problem;
import com.dsamastery.backend.model.Video;
import com.dsamastery.backend.repository.ProblemRepository;
import com.dsamastery.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

import java.nio.file.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ProblemRepository problemRepository;
    private final VideoRepository videoRepository;

    @Override
    public void run(String... args) throws Exception {
        if (problemRepository.count() == 0) {
            problemRepository.saveAll(List.of(
                    // Step 3: Arrays
                    Problem.builder().name("Largest Element in Array").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/largest-element-in-an-array/").build(),
                    Problem.builder().name("Second Largest Element").difficulty("Easy").topic("Arrays")
                            .url("https://practice.geeksforgeeks.org/problems/second-largest3735/1").build(),
                    Problem.builder().name("Check if Array is Sorted").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/").build(),
                    Problem.builder().name("Remove Duplicates from Sorted Array").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/remove-duplicates-from-sorted-array/").build(),
                    Problem.builder().name("Rotate Array").difficulty("Medium").topic("Arrays")
                            .url("https://leetcode.com/problems/rotate-array/").build(),
                    Problem.builder().name("Move Zeroes").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/move-zeroes/").build(),
                    Problem.builder().name("Two Sum").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/two-sum/").build(),
                    Problem.builder().name("Sort Colors (0, 1, 2)").difficulty("Medium").topic("Arrays")
                            .url("https://leetcode.com/problems/sort-colors/").build(),
                    Problem.builder().name("Majority Element").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/majority-element/").build(),
                    Problem.builder().name("Kadane's Algorithm (Maximum Subarray)").difficulty("Medium").topic("Arrays")
                            .url("https://leetcode.com/problems/maximum-subarray/").build(),
                    Problem.builder().name("Best Time to Buy and Sell Stock").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/best-time-to-buy-and-sell-stock/").build(),
                    Problem.builder().name("Next Permutation").difficulty("Medium").topic("Arrays")
                            .url("https://leetcode.com/problems/next-permutation/").build(),
                    Problem.builder().name("Pascal's Triangle").difficulty("Easy").topic("Arrays")
                            .url("https://leetcode.com/problems/pascals-triangle/").build(),
                    Problem.builder().name("Merge Intervals").difficulty("Medium").topic("Arrays")
                            .url("https://leetcode.com/problems/merge-intervals/").build(),

                    // Step 4: Binary Search
                    Problem.builder().name("Binary Search").difficulty("Easy").topic("Binary Search")
                            .url("https://leetcode.com/problems/binary-search/").build(),
                    Problem.builder().name("Find First and Last Position").difficulty("Medium").topic("Binary Search")
                            .url("https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/")
                            .build(),
                    Problem.builder().name("Search in Rotated Sorted Array").difficulty("Medium").topic("Binary Search")
                            .url("https://leetcode.com/problems/search-in-rotated-sorted-array/").build(),
                    Problem.builder().name("Find Minimum in Rotated Sorted Array").difficulty("Medium")
                            .topic("Binary Search")
                            .url("https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/").build(),
                    Problem.builder().name("Search a 2D Matrix").difficulty("Medium").topic("Binary Search")
                            .url("https://leetcode.com/problems/search-a-2d-matrix/").build(),

                    // Step 5: Strings
                    Problem.builder().name("Remove Outermost Parentheses").difficulty("Easy").topic("Strings")
                            .url("https://leetcode.com/problems/remove-outermost-parentheses/").build(),
                    Problem.builder().name("Reverse Words in a String").difficulty("Medium").topic("Strings")
                            .url("https://leetcode.com/problems/reverse-words-in-a-string/").build(),
                    Problem.builder().name("Longest Common Prefix").difficulty("Easy").topic("Strings")
                            .url("https://leetcode.com/problems/longest-common-prefix/").build(),
                    Problem.builder().name("Valid Anagram").difficulty("Easy").topic("Strings")
                            .url("https://leetcode.com/problems/valid-anagram/").build(),

                    // Step 6: Linked List
                    Problem.builder().name("Reverse Linked List").difficulty("Easy").topic("Linked List")
                            .url("https://leetcode.com/problems/reverse-linked-list/").build(),
                    Problem.builder().name("Middle of the Linked List").difficulty("Easy").topic("Linked List")
                            .url("https://leetcode.com/problems/middle-of-the-linked-list/").build(),
                    Problem.builder().name("Merge Two Sorted Lists").difficulty("Easy").topic("Linked List")
                            .url("https://leetcode.com/problems/merge-two-sorted-lists/").build(),
                    Problem.builder().name("Linked List Cycle").difficulty("Easy").topic("Linked List")
                            .url("https://leetcode.com/problems/linked-list-cycle/").build(),
                    Problem.builder().name("Palindrome Linked List").difficulty("Easy").topic("Linked List")
                            .url("https://leetcode.com/problems/palindrome-linked-list/").build(),

                    // Step 7: Recursion
                    Problem.builder().name("Subset Sums").difficulty("Medium").topic("Recursion")
                            .url("https://practice.geeksforgeeks.org/problems/subset-sums2234/1").build(),
                    Problem.builder().name("Combination Sum").difficulty("Medium").topic("Recursion")
                            .url("https://leetcode.com/problems/combination-sum/").build()));
        }

        if (videoRepository.count() == 0) {
            Path courseDir = Paths.get("../frontend/public/course");
            List<Video> videosToSave = new ArrayList<>();
            
            if (Files.exists(courseDir)) {
                try (Stream<Path> paths = Files.walk(courseDir)) {
                    paths.filter(Files::isRegularFile)
                         .filter(p -> p.toString().endsWith(".mp4"))
                         .forEach(p -> {
                             String filename = p.getFileName().toString();
                             String title = filename.substring(0, filename.length() - 4);
                             String topic = p.getParent().getFileName().toString();
                             
                             String topicEncoded = URLEncoder.encode(topic, StandardCharsets.UTF_8).replace("+", "%20");
                             String fileEncoded = URLEncoder.encode(filename, StandardCharsets.UTF_8).replace("+", "%20");
                             String url = "/course/" + topicEncoded + "/" + fileEncoded;
                             
                             videosToSave.add(Video.builder()
                                     .title(title)
                                     .duration("10:00") // Default
                                     .topic(topic)
                                     .videoUrl(url)
                                     .build());
                         });
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            
            if (!videosToSave.isEmpty()) {
                videoRepository.saveAll(videosToSave);
            }
        }
    }
}
