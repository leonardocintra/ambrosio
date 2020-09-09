package com.leaolabs.ambrosio.v1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leaolabs.ambrosio.model.TipoTemplateExame;
import com.leaolabs.ambrosio.repository.TipoTemplateExameRepository;
import com.leaolabs.ambrosio.v1.dtos.ExameDto;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ExameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TipoTemplateExameRepository tipoTemplateExameRepository;

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

    @Test
    public void deveRetornar404QuandoNaoExisteNenhumExameCadastradoById() throws Exception {
        this.mockMvc.perform(get(URI + "/83928")
                .contentType(JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Exame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a Exame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NaBuscaPorIdPassandoStringComoParametro() throws Exception {
        this.mockMvc.perform(get(URI + "/aaaaa")
                .contentType(JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid query parameter id=aaaaa - it is not allowed")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field id - it is not allowed")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroAoNaoPassarADescricao() throws Exception {
        TipoTemplateExame tipoTemplateExame = getTipoTemplateExameFake();

        var exameDto = ExameDto.builder()
                .tipoTemplateExame(tipoTemplateExame)
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter descricao")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field descricao is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroAoPassarADescricaoVazia() throws Exception {
        TipoTemplateExame tipoTemplateExame = getTipoTemplateExameFake();

        var exameDto = ExameDto.builder()
                .tipoTemplateExame(tipoTemplateExame)
                .descricao("")
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter descricao")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field descricao is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroAoPassarADescricaoMuitoGrande() throws Exception {
        TipoTemplateExame tipoTemplateExame = getTipoTemplateExameFake();

        var exameDto = ExameDto.builder()
                .tipoTemplateExame(tipoTemplateExame)
                .descricao("aaaaaaaaaaaaa bbbbbbbbbbbbbbb cccccccccccccccc ddddddddddddddddd eeeeeeeeeeeeeeee fffffffffffffffff ggggggggggggggg hhhhhhhhhhhh")
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter descricao - it must be filled with a value lesser or equals than 100")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field descricao - it must be filled with a value lesser or equals than 100")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroAoNaoPassarOCampoAtivo() throws Exception {
        TipoTemplateExame tipoTemplateExame = getTipoTemplateExameFake();

        var exameDto = ExameDto.builder()
                .tipoTemplateExame(tipoTemplateExame)
                .descricao("Qualquer descricao")
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter ativo")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field ativo is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroAoNaoPassarOTipoDeTemplate() throws Exception {
        var exameDto = ExameDto.builder()
                .descricao("Qualquer descricao")
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter tipoTemplateExame")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field tipoTemplateExame is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroComTipoDeTemplateExameSemId() throws Exception {
        var exameDto = ExameDto.builder()
                .descricao("Qualquer descricao")
                .tipoTemplateExame(TipoTemplateExame.builder()
                        .descricao("sem id")
                        .build())
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("TipoTemplateExame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a TipoTemplateExame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    public void deveRetornar400NoCadastroComTipoDeTemplateExameInexistente() throws Exception {
        var exameDto = ExameDto.builder()
                .descricao("Qualquer descricao")
                .tipoTemplateExame(TipoTemplateExame.builder()
                        .id(88932L)
                        .descricao("sem id")
                        .build())
                .ativo(true)
                .build();

        this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("TipoTemplateExame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a TipoTemplateExame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    private TipoTemplateExame getTipoTemplateExameFake() {
        return this.tipoTemplateExameRepository.save(TipoTemplateExame.builder()
                .descricao("Template Basico de Teste")
                .clienteQueCriou(1L)
                .ativo(true)
                .build());
    }
}
