package com.example.m223.gymtracker.controller;

import com.example.m223.gymtracker.model.Plan;
import com.example.m223.gymtracker.model.Exercise;
import com.example.m223.gymtracker.repositories.PlanRepository;
import com.example.m223.gymtracker.model.User;
import com.example.m223.gymtracker.repositories.UserRepository;
import com.example.m223.gymtracker.repositories.PlanRepository;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired private PlanRepository planRepo;
    @Autowired private UserRepository userRepo;

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getPlan(@PathVariable Long userId) {
        Plan plan = planRepo.findByUserId(userId);
        if (plan == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(plan.getExercises());
    }

    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPlan(@PathVariable Long userId, @RequestBody Plan newPlan) {
        User user = userRepo.findById(userId).orElseThrow();
        newPlan.setUser(user);
        planRepo.save(newPlan);
        return ResponseEntity.ok("Plan gespeichert");
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateProgress(@PathVariable Long userId, @RequestBody List<Exercise> updatedExercises) {
        Plan plan = planRepo.findByUserId(userId);
        if (plan == null) return ResponseEntity.notFound().build();
        plan.setExercises(updatedExercises);
        planRepo.save(plan);
        return ResponseEntity.ok("Fortschritt aktualisiert");
    }
}
