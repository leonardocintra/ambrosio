package com.leaolabs.ambrosio.v1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leaolabs.ambrosio.model.Exame;
import com.leaolabs.ambrosio.model.TipoCampo;
import com.leaolabs.ambrosio.model.TipoTemplateExame;
import com.leaolabs.ambrosio.repository.ExameRepository;
import com.leaolabs.ambrosio.repository.TipoCampoRepository;
import com.leaolabs.ambrosio.repository.TipoTemplateExameRepository;
import com.leaolabs.ambrosio.v1.dtos.ItemExameDto;
import com.leaolabs.ambrosio.v1.dtos.TipoCampoDto;
import lombok.SneakyThrows;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ItemExameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TipoCampoRepository tipoCampoRepository;

    @Autowired
    private ExameRepository exameRepository;

    @Autowired
    private TipoTemplateExameRepository tipoTemplateExameRepository;

    static final String URI = "/v1/ambrosio/exames";
    static final String BIG_STRING = "aaaaaaaaaaaaa bbbbbbbbbbbbbb cccccccccccccc ddddddddddddddd eeeeeeeeeeeeeeee ffffffffffffff gggggggggggg hhhhhhhhhh iiiiiiiiiiiii jjjjjjjjjjjjjjjj kkkkkkkkkkkkkkkkkkkkk lllllllllllllllllllll mmmmmmmmmmmmmmmmmm nnnnnnnnnnnnnnnnnnnnn oooooooooooooooooooo";
    static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Test
    @SneakyThrows
    public void deveRetornar201QuandoAoCadastrarItemExame() {
        generateFakeTipoCampo();

        var tipoTemplateExame = this.tipoTemplateExameRepository.save(TipoTemplateExame.builder()
                .descricao("Template 1")
                .clienteQueCriou(1L)
                .ativo(true)
                .build());

        this.exameRepository.save(Exame.builder()
                .ativo(true)
                .descricao("Exame Urina Rotina I")
                .tipoTemplateExame(tipoTemplateExame)
                .build());


        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Alguma coisa qualquer")
                .material("Qualquer coisa")
                .unidadeMedida("cm")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.records", hasSize(1)))
                .andExpect(jsonPath("$.records[0].material", Matchers.is("Qualquer coisa")))
                .andExpect(jsonPath("$.records[0].unidadeMedida", Matchers.is("cm")))
                .andExpect(jsonPath("$.records[0].ordemExibicao", Matchers.is(0)))
                .andReturn()
                .getResponse();
    }

    private void generateFakeTipoCampo() {
        this.tipoCampoRepository.save(TipoCampo.builder()
                .ativo(true)
                .uuid(UUID.randomUUID())
                .descricao("String")
                .observacao("Nenhuma")
                .build());
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameSemCampoAtivo() {
        var itemDto = ItemExameDto.builder()
                .nome("Teste")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter ativo")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field ativo is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameSemCampoNome() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter nome")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field nome is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameNomeVazio() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter nome")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field nome is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameCampoNomeMuitoGrande() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome(BIG_STRING)
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter nome - it must be filled with a value lesser or equals than 150")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field nome - it must be filled with a value lesser or equals than 150")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameSemInformarTipoCampo() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Alguma coisa qualquer")
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter tipoCampo")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field tipoCampo is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameSemInformarTipoCampoId() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Alguma coisa qualquer")
                .tipoCampo(TipoCampoDto.builder().descricao("Ronaldo").build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Missing body parameter tipoCampo.id")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Field tipoCampo.id is required and can not be empty")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar404QuandoAoCadastrarItemExameComTipoCampoIdInexistente() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Alguma coisa qualquer")
                .tipoCampo(TipoCampoDto.builder().id(8923L).descricao("Ronaldo").build())
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("TipoCampo not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a TipoCampo, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar404QuandoAoCadastrarItemExameComExameInexistente() {
        generateFakeTipoCampo();

        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Alguma coisa qualquer")
                .tipoCampo(TipoCampoDto.builder().id(1L).descricao("Ronaldo").build())
                .build();

        this.mockMvc.perform(post(URI + "/9898/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Exame not found")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("You attempted to get a Exame, but did not find any")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameCampoValorPadraoMuitoGrande() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Teste")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .valorPadrao(BIG_STRING)
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter valorPadrao - it must be filled with a value lesser or equals than 150")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field valorPadrao - it must be filled with a value lesser or equals than 150")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameCampoMetodoMuitoGrande() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Teste")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .metodo(BIG_STRING)
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter metodo - it must be filled with a value lesser or equals than 200")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field metodo - it must be filled with a value lesser or equals than 200")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameCampoMaterialMuitoGrande() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Teste")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .material(BIG_STRING)
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter material - it must be filled with a value lesser or equals than 200")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field material - it must be filled with a value lesser or equals than 200")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameCampoValorReferenciaMuitoGrande() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Teste")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .valorReferencia(BIG_STRING)
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter valorReferencia - it must be filled with a value lesser or equals than 200")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field valorReferencia - it must be filled with a value lesser or equals than 200")))
                .andReturn()
                .getResponse();
    }

    @Test
    @SneakyThrows
    public void deveRetornar400QuandoAoCadastrarItemExameCampoUnidadeDeMedidaMuitoGrande() {
        var itemDto = ItemExameDto.builder()
                .ativo(true)
                .nome("Teste")
                .tipoCampo(TipoCampoDto.builder().id(1L).build())
                .unidadeMedida(BIG_STRING)
                .build();

        this.mockMvc.perform(post(URI + "/1/item-exame")
                .contentType(JSON)
                .content(objectMapper.writeValueAsBytes(itemDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.[0].developerMessage", Matchers.is("Invalid body parameter unidadeMedida - it must be filled with a value lesser or equals than 50")))
                .andExpect(jsonPath("$.[0].userMessage", Matchers.is("Invalid field unidadeMedida - it must be filled with a value lesser or equals than 50")))
                .andReturn()
                .getResponse();
    }
}
