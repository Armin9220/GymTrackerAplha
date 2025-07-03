package com.example.m223.gymtracker.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Exercise {
    private String name;
    private int reps;
    private boolean done;
}
