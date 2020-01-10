package com.leaolabs.ambrosio.v1.mapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.leaolabs.ambrosio.model.Exame;
import com.leaolabs.ambrosio.v1.dtos.ExameDto;

import org.springframework.stereotype.Component;


@Component
public class ExameMapper {
	
	public ExameDto serialize(final Exame exame) {
		if (Optional.ofNullable(exame).isEmpty()) {
			return new ExameDto();
		}

		return ExameDto.builder()
				.id(exame.getId())
				.uuid(exame.getUuid())
				.ativo(exame.getAtivo())
				.tipoTemplateExame(exame.getTipoTemplateExame())
				.descricao(exame.getDescricao())
				.dataCriacao(exame.getDataCriacao())
				.dataAtualizacao(exame.getDataAtualizacao()).build();
	}

	public List<ExameDto> serialize(final List<Exame> exames) {
		return Optional.ofNullable(exames)
				.map(conveniosList -> exames.stream().map(this::serialize).collect(Collectors.toList())).orElse(null);
	}

	public Exame deserialize(final ExameDto dto) {
		if (Optional.ofNullable(dto).isEmpty()) {
			return new Exame();
		}

		return Exame.builder()
				.id(dto.getId())
				.uuid(dto.getUuid())
				.descricao(dto.getDescricao())
				.ativo(dto.getAtivo())
				.tipoTemplateExame(dto.getTipoTemplateExame())
				.dataCriacao(dto.getDataCriacao())
				.dataAtualizacao(dto.getDataAtualizacao()).build();
	}

	public List<Exame> deserialize(final List<ExameDto> exameDtos) {
		return Optional.ofNullable(exameDtos)
				.map(exame -> exame.stream().map(this::deserialize).collect(Collectors.toList())).orElse(null);
	}
}
