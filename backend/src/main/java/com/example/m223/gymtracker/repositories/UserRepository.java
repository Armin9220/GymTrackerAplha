package com.example.m223.gymtracker.repositories;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.m223.gymtracker.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional <User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
    
}
