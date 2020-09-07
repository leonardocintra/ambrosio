package com.leaolabs.ambrosio.v1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leaolabs.ambrosio.repository.TipoTemplateExameRepository;
import com.leaolabs.ambrosio.v1.dtos.TipoTemplateExameDto;
import lombok.SneakyThrows;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TipoTemplateExameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TipoTemplateExameRepository tipoTemplateExameRepository;

    static final String URI = "/v1/ambrosio/tipo-templates-exame";
    static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Test
    @SneakyThrows
    public void deveRetornar404QuandoNaoExisteNenhumTemplateCadastrado() {

        this.tipoTemplateExameRepository.deleteAll();

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

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarTemplateExameSemClienteQueCriou() {
        var templateExameDto = TipoTemplateExameDto.builder()
                .ativo(true)
                .descricao("leonardo juliana luisa henrique")
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(templateExameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter clienteQueCriou")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field clienteQueCriou is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarTemplateSemPassarValorNoCampoAtivo() {
        var templateExameDto = TipoTemplateExameDto.builder()
                .clienteQueCriou(1L)
                .descricao("Exame Teste")
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(templateExameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter ativo")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field ativo is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar201QuandoAoCadastrarTemplateExame() {
        var templateExameDto = TipoTemplateExameDto.builder()
                .clienteQueCriou(1L)
                .descricao("Exame Teste")
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(templateExameDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.records", hasSize(1)))
                .andReturn()
                .getResponse();

        var result = this.tipoTemplateExameRepository.findById(1L);

        Assert.assertTrue(result.isPresent());
        Assert.assertNotNull(result.get().getUuid());
        Assert.assertEquals(templateExameDto.getDescricao(), result.get().getDescricao());
        Assert.assertNotNull(result.get().getDataCriacao());
        Assert.assertNotNull(result.get().getDataAtualizacao());
    }
}
