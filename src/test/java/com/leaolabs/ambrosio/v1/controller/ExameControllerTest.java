package com.leaolabs.ambrosio.v1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leaolabs.ambrosio.model.TipoTemplateExame;
import com.leaolabs.ambrosio.repository.ExameRepository;
import com.leaolabs.ambrosio.repository.TipoTemplateExameRepository;
import com.leaolabs.ambrosio.v1.dtos.ExameDto;
import lombok.SneakyThrows;
import org.hamcrest.Matchers;
import org.json.JSONArray;
import org.json.JSONObject;
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
public class ExameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TipoTemplateExameRepository tipoTemplateExameRepository;

    @Autowired
    private ExameRepository exameRepository;

    static final String URI = "/v1/ambrosio/exames";
    static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Test
    @SneakyThrows
    public void deveRetornar404QuandoNaoExisteNenhumExameCadastrado() {
        this.exameRepository.deleteAll();

        this.mockMvc.perform(get(URI)
                .contentType(JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Exame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a Exame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar404QuandoNaoExisteNenhumExameCadastradoById() {
        this.mockMvc.perform(get(URI + "/83928")
                .contentType(JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Exame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a Exame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400NaBuscaPorIdPassandoStringComoParametro() {
        this.mockMvc.perform(get(URI + "/aaaaa")
                .contentType(JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid query parameter id=aaaaa - it is not allowed")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field id - it is not allowed")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400NoCadastroAoNaoPassarADescricao() {
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
    @SneakyThrows
    public void deveRetornar400NoCadastroAoPassarADescricaoVazia() {
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
    @SneakyThrows
    public void deveRetornar400NoCadastroAoPassarADescricaoMuitoGrande() {
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
    @SneakyThrows
    public void deveRetornar400NoCadastroAoNaoPassarOCampoAtivo() {
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
    @SneakyThrows
    public void deveRetornar400NoCadastroAoNaoPassarOTipoDeTemplate() {
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
    @SneakyThrows
    public void deveRetornar400NoCadastroComTipoDeTemplateExameSemId() {
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
    @SneakyThrows
    public void deveRetornar400NoCadastroComTipoDeTemplateExameInexistente() {
        var exameDto = ExameDto.builder()
                .descricao("Qualquer descricao")
                .tipoTemplateExame(TipoTemplateExame.builder()
                        .id(88932L)
                        .descricao("Inexistente")
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
    @SneakyThrows
    public void deveRetornar201NoCadastrodeExame() {
        getTipoTemplateExameFake();

        var exameDto = ExameDto.builder()
                .descricao("Qualquer descricao")
                .tipoTemplateExame(TipoTemplateExame.builder()
                        .id(1L)
                        .build())
                .ativo(true)
                .build();

        var postExame = this.mockMvc.perform(post(URI)
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(exameDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.records", hasSize(1)))
                .andReturn()
                .getResponse();

        JSONObject obj = new JSONObject(postExame.getContentAsString());
        JSONArray records = obj.getJSONArray("records");
        Long idExame = 0L;

        for (int i = 0; i < records.length(); i++) {
            JSONObject rec = records.getJSONObject(i);
            idExame = rec.getLong("id");
        }

        var result = this.exameRepository.findById(idExame);

        Assert.assertTrue(result.isPresent());
        Assert.assertNotNull(result.get().getUuid());
        Assert.assertEquals(exameDto.getDescricao(), result.get().getDescricao());
        Assert.assertTrue(result.get().getAtivo());
        Assert.assertNotNull(result.get().getDataCriacao());
        Assert.assertNotNull(result.get().getDataAtualizacao());
    }

    @Test
    @SneakyThrows
    public void deveRetornar200AoBuscarTudosOsExames() {
        getTipoTemplateExameFake();

        var postExame = this.mockMvc.perform(get(URI)
                .contentType(JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.records", hasSize(1)))
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
