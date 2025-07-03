package com.example.m223.gymtracker.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GymTrackerController {

    List<String> list = new ArrayList<>();

    @GetMapping("/public")
    public ResponseEntity<List<String>> publicEndpoint() {
        return ResponseEntity.ok(list);
    }

    @PostMapping("/public")
    public ResponseEntity<List<String>> postPublicEndpoint(@RequestBody String message){
        list.add(message);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/private")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<String> privateEndpoint() {
        return ResponseEntity.ok("✅ Zugriff auf private Daten mit gültigem Token!");
    }
}
