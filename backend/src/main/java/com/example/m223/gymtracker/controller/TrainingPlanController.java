package com.example.m223.gymtracker.controller;

import com.example.m223.gymtracker.model.TrainingPlan;
import com.example.m223.gymtracker.repositories.TrainingPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class TrainingPlanController {

    @Autowired
    private TrainingPlanRepository repository;

    // ✅ Alle Pläne anzeigen
    @GetMapping
    public List<TrainingPlan> findAll() {
        return repository.findAll();
    }

    // ✅ Plan speichern
    @PostMapping
    public TrainingPlan create(@RequestBody TrainingPlan plan) {
        return repository.save(plan);
    }

    // ✅ Pläne für einen User anzeigen
    @GetMapping("/user/{userId}")
    public List<TrainingPlan> getPlansByUser(@PathVariable Long userId) {
        return repository.findByUserId(userId);
    }

    // ✅ Plan löschen
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok("Plan gelöscht");
    }
}
