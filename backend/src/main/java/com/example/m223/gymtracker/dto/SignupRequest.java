package com.example.m223.gymtracker.dto;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class SignupRequest {
 @NotBlank
 @Size(min = 3, max = 20)
 private String username;
 @NotBlank
 @Size(max = 50)
 @Email
 private String email;
 
 private Set<String> roles;
 
 @NotBlank
 @Size(min = 6, max = 40)
 private String password;
 
}
