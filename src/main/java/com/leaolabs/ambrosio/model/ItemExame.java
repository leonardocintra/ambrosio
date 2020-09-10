package com.leaolabs.ambrosio.model;

import java.time.ZonedDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
@Table(name = "item_exame")
public class ItemExame {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Type(type = "uuid-char")
	@Column(nullable = false)
	private UUID uuid;

	@Column(nullable = false)
	private String nome;

	private Boolean ativo;

	@OneToOne(optional = false)
	@JoinColumn(name = "exame_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Exame exame;

	@OneToOne(optional = false)
	@JoinColumn(name = "tipo_campo_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private TipoCampo tipoCampo;

	@Column(name = "valor_padrao")
	private String valorPadrao;

	@Column(name = "ordem_exibicao")
	private Integer ordemExibicao;

	private String metodo;

	private String material;

	private String observacao;

	@Column(name = "valor_referencia")
	private String valorReferencia;

	@Column(name = "unidade_medida")
	private String unidadeMedida;

	@Column(name = "data_criacao")
	private ZonedDateTime dataCriacao;

	@Column(name = "data_atualizacao")
	private ZonedDateTime dataAtualizacao;

	@PrePersist
	protected void prePersist() {
		dataCriacao = dataAtualizacao = ZonedDateTime.now();
		uuid = UUID.randomUUID();
		ativo = true;
		ordemExibicao = 0;
	}

	@PreUpdate
	protected void preUpdate() {
		dataAtualizacao = ZonedDateTime.now();
	}
}
