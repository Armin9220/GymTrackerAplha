package com.example.m223.gymtracker.repositories;

import com.example.m223.gymtracker.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Plan findByUserId(Long userId);
}
