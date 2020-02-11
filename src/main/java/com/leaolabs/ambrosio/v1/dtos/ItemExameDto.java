package com.leaolabs.ambrosio.v1.dtos;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

import javax.validation.Valid;
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
public class ItemExameDto implements Serializable {
	
	private static final long serialVersionUID = -2909272439123528207L;

	private Long id;

	@NotBlank
	private UUID uuid;
	
	private Boolean ativo;

	@NotBlank
	private String nome;

	private String valorPadrao;

	private Integer ordemExibicao;

	private String metodo;

	private String material;

	private String valorReferencia;

	private String observacao;

	private String unidadeMedida;

	@Valid
	private TipoCampoDto tipoCampo;

	@NotBlank
	private ZonedDateTime dataCriacao;

	@NotBlank
	private ZonedDateTime dataAtualizacao;

}
