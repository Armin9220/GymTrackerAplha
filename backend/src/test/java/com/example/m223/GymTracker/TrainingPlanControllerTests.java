package com.example.m223.GymTracker;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class TrainingPlanControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void publicEndpointAccessible() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/public"))
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void unauthorizedPrivateEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/private"))
            .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }
}
