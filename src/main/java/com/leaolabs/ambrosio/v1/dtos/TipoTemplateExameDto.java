package com.leaolabs.ambrosio.v1.dtos;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

import javax.validation.constraints.NotBlank;

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

	@NotBlank
	private UUID uuid;
	
	private Boolean ativo;
	
	@NotBlank
	private Long clienteQueCriou;

	@NotBlank
	private String descricao;

	@NotBlank
	private ZonedDateTime dataCriacao;

	@NotBlank
	private ZonedDateTime dataAtualizacao;

}
