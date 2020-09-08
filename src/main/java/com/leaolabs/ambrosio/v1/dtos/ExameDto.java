package com.leaolabs.ambrosio.v1.dtos;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.leaolabs.ambrosio.model.TipoTemplateExame;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
public class ExameDto implements Serializable {
	
	private static final long serialVersionUID = 330981960071258215L;

	private Long id;

	private UUID uuid;

	@NotNull
	private Boolean ativo;

	@NotBlank
	@Size(max = 100)
	private String descricao;

	@NotNull
	private TipoTemplateExame tipoTemplateExame;

	private ZonedDateTime dataCriacao;

	private ZonedDateTime dataAtualizacao;

}
