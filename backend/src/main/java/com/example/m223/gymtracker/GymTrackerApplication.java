package com.example.m223.gymtracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import com.example.m223.gymtracker.model.ERole;
import com.example.m223.gymtracker.model.Role;
import com.example.m223.gymtracker.repositories.RoleRepository;

@SpringBootApplication
@EnableMethodSecurity  // <--- WICHTIG für @PreAuthorize
public class GymTrackerApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(GymTrackerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
    }
}
