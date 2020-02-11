package com.leaolabs.ambrosio.model;

import java.time.ZonedDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tipo_campo")
public class TipoCampo {

	// TipoCampo = tipo do campo do item do exame (Ex: texto, numerico, decimal,
	// data, etc.)

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Type(type = "uuid-char")
	@Column(nullable = false)
	private UUID uuid;

	@Column(nullable = false)
	private String descricao;

	private String observacao;

	private Boolean ativo;

	@Column(name = "data_criacao")
	private ZonedDateTime dataCriacao;

	@Column(name = "data_atualizacao")
	private ZonedDateTime dataAtualizacao;

	@PrePersist
	protected void prePersist() {
		dataCriacao = dataAtualizacao = ZonedDateTime.now();
		uuid = UUID.randomUUID();
	}

	@PreUpdate
	protected void preUpdate() {
		dataAtualizacao = ZonedDateTime.now();
	}
}
