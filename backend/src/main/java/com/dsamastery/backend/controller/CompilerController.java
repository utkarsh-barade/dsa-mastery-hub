package com.dsamastery.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/compiler")
public class CompilerController {

    @PostMapping("/execute")
    public ResponseEntity<Map<String, String>> executeCode(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        String input = request.get("input");
        
        try {
            Path tempDir = Files.createTempDirectory("dsa-compiler");
            File sourceFile = new File(tempDir.toFile(), "Main.java");
            Files.writeString(sourceFile.toPath(), code);

            ProcessBuilder compileProcess = new ProcessBuilder("javac", "Main.java");
            compileProcess.directory(tempDir.toFile());
            Process compiled = compileProcess.start();
            compiled.waitFor();

            if (compiled.exitValue() != 0) {
                String error = new String(compiled.getErrorStream().readAllBytes());
                return ResponseEntity.ok(Map.of("output", "Compilation Error:\n" + error));
            }

            ProcessBuilder runProcess = new ProcessBuilder("java", "Main");
            runProcess.directory(tempDir.toFile());
            Process run = runProcess.start();
            
            if (input != null && !input.isEmpty()) {
                run.getOutputStream().write(input.getBytes());
                run.getOutputStream().flush();
                run.getOutputStream().close();
            }
            
            run.waitFor();
            String output = new String(run.getInputStream().readAllBytes());
            String error = new String(run.getErrorStream().readAllBytes());
            
            return ResponseEntity.ok(Map.of("output", output + error));

        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("output", "Execution Error: " + e.getMessage()));
        }
    }
}
