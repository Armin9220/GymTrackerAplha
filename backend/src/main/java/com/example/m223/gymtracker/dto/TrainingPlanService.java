package com.example.m223.gymtracker.dto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.m223.gymtracker.model.TrainingPlan;
import com.example.m223.gymtracker.repositories.TrainingPlanRepository;

@Service
public class TrainingPlanService {

    @Autowired
    private TrainingPlanRepository trainingPlanRepository;

    public List<TrainingPlan> getPlansByUserId(Long userId) {
        return trainingPlanRepository.findByUserId(userId);
    }
}
