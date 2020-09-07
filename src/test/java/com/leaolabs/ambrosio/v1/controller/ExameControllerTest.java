package com.leaolabs.ambrosio.v1.controller;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ExameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    static final String URI = "/v1/ambrosio/exames";
    static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Test
    public void deveRetornar404QuandoNaoExisteNenhumExameCadastrado() throws Exception {
        this.mockMvc.perform(get(URI)
                .contentType(JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Exame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a Exame, but did not find any")))
                .andReturn()
                .getResponse();
    }
}
