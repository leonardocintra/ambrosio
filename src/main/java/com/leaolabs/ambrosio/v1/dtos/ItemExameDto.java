package com.leaolabs.ambrosio.v1.dtos;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

import javax.validation.Valid;
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
public class ItemExameDto implements Serializable {
	
	private static final long serialVersionUID = -2909272439123528207L;

	private Long id;

	private UUID uuid;

	@NotNull
	private Boolean ativo;

	@NotBlank
	@Size(max = 150)
	private String nome;

	@Size(max = 150)
	private String valorPadrao;

	private Integer ordemExibicao;

	@Size(max = 200)
	private String metodo;

	@Size(max = 200)
	private String material;

	@Size(max = 200)
	private String valorReferencia;

	private String observacao;

	@Size(max = 50)
	private String unidadeMedida;

	@Valid
	@NotNull
	private TipoCampoDto tipoCampo;

	private ZonedDateTime dataCriacao;

	private ZonedDateTime dataAtualizacao;

}
