package com.leaolabs.ambrosio.v1.dtos;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
public class TipoTemplateExameDto implements Serializable {

	private static final long serialVersionUID = 801103270972666837L;
	
	private Long id;

	private UUID uuid;
	
	private Boolean ativo;
	
	@NotNull
	private Long clienteQueCriou;

	@NotBlank
	@Size(max = 100)
	private String descricao;

	private ZonedDateTime dataCriacao;

	private ZonedDateTime dataAtualizacao;

}
