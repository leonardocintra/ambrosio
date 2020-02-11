package com.leaolabs.ambrosio.v1.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TipoCampoDto implements Serializable {

    private static final long serialVersionUID = 8869656264196486800L;

    @NotNull
    private Long id;

    private String descricao;
}