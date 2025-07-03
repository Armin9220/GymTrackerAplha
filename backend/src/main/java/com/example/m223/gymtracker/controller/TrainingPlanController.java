package com.example.m223.gymtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.m223.gymtracker.model.TrainingPlan;
import com.example.m223.gymtracker.repositories.TrainingPlanRepository;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin
public class TrainingPlanController {
    @Autowired
    private TrainingPlanRepository repository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<TrainingPlan> findAll() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public TrainingPlan create(@RequestBody TrainingPlan plan) {
        return repository.save(plan);
    }
}
