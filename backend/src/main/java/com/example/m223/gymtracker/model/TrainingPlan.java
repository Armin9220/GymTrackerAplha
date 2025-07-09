package com.example.m223.gymtracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TrainingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String exercises; // simple comma separated list

    @ManyToOne
    @JoinColumn(name = "user_id") // das erzeugt die FK-Spalte in der DB
    private User user;

    public TrainingPlan(String name, String exercises, User user) {
        this.name = name;
        this.exercises = exercises;
        this.user = user;
    }
}
