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
@Table(name = "exame")
public class Exame {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Type(type = "uuid-char")
	@Column(nullable = false)
	private UUID uuid;

	@Column(nullable = false)
	private String descricao;

	private Boolean ativo;

	@Column(name = "data_criacao")
	private ZonedDateTime dataCriacao;

	@Column(name = "data_atualizacao")
	private ZonedDateTime dataAtualizacao;

	@OneToOne(optional = false)
	@JoinColumn(name = "tipo_template_exame_id")
	@OnDelete(action = OnDeleteAction.CASCADE) // validar essa config (o que quero é o PROTECTED)
	private TipoTemplateExame tipoTemplateExame;

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
