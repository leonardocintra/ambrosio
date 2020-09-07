package com.leaolabs.ambrosio.v1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leaolabs.ambrosio.v1.dtos.TipoTemplateExameDto;
import lombok.SneakyThrows;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TipoTemplateExameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    static final String URI = "/v1/ambrosio/tipo-templates-exame";
    static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Test
    @SneakyThrows
    public void deveRetornar404QuandoNaoExisteNenhumTemplateCadastrado() {
        this.mockMvc.perform(get(URI)
                .contentType(JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("TipoTemplateExame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a TipoTemplateExame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarTemplateExameSemDescricao() {
        var templateExameDto = TipoTemplateExameDto.builder()
                .ativo(true)
                .clienteQueCriou(1L)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(templateExameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter descricao")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field descricao is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarTemplateExameDescricaoVazia() {
        var templateExameDto = TipoTemplateExameDto.builder()
                .ativo(true)
                .clienteQueCriou(1L)
                .descricao("")
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(templateExameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter descricao")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field descricao is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarTemplateExameDescricaoMuitoGrande() {
        var templateExameDto = TipoTemplateExameDto.builder()
                .ativo(true)
                .clienteQueCriou(1L)
                .descricao("leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique - leonardo juliana luisa henrique")
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(templateExameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter descricao - it must be filled with a value lesser or equals than 100")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field descricao - it must be filled with a value lesser or equals than 100")))
                .andReturn()
                .getResponse();
    }
}
