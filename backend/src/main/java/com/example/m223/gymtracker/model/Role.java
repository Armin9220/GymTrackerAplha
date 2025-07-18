package com.example.m223.gymtracker.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
public class Role {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;

@Enumerated(EnumType.STRING)
@Column(length = 20)
private ERole name;

public Role(ERole name) {
 this.name = name;
}
public String toString(){
 return name.toString();
}

}


