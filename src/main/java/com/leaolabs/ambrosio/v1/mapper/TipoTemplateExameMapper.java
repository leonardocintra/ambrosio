package com.leaolabs.ambrosio.v1.mapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.leaolabs.ambrosio.model.TipoTemplateExame;
import com.leaolabs.ambrosio.v1.dtos.TipoTemplateExameDto;

import org.springframework.stereotype.Component;


@Component
public class TipoTemplateExameMapper {
	
	public TipoTemplateExameDto serialize(final TipoTemplateExame tipoTemplateExame) {
		if (Optional.ofNullable(tipoTemplateExame).isEmpty()) {
			return new TipoTemplateExameDto();
		}

		return TipoTemplateExameDto.builder()
				.id(tipoTemplateExame.getId())
				.uuid(tipoTemplateExame.getUuid())
				.ativo(tipoTemplateExame.getAtivo())
				.clienteQueCriou(tipoTemplateExame.getClienteQueCriou())
				.descricao(tipoTemplateExame.getDescricao())
				.dataCriacao(tipoTemplateExame.getDataCriacao())
				.dataAtualizacao(tipoTemplateExame.getDataAtualizacao()).build();
	}

	public List<TipoTemplateExameDto> serialize(final List<TipoTemplateExame> tipoTemplateExames) {
		return Optional.ofNullable(tipoTemplateExames)
				.map(conveniosList -> tipoTemplateExames.stream().map(this::serialize).collect(Collectors.toList())).orElse(null);
	}

	public TipoTemplateExame deserialize(final TipoTemplateExameDto dto) {
		if (Optional.ofNullable(dto).isEmpty()) {
			return new TipoTemplateExame();
		}

		return TipoTemplateExame.builder()
				.id(dto.getId())
				.uuid(dto.getUuid())
				.descricao(dto.getDescricao())
				.ativo(dto.getAtivo())
				.clienteQueCriou(dto.getClienteQueCriou())
				.dataCriacao(dto.getDataCriacao())
				.dataAtualizacao(dto.getDataAtualizacao()).build();
	}

	public List<TipoTemplateExame> deserialize(final List<TipoTemplateExameDto> tipoTemplateExameDtos) {
		return Optional.ofNullable(tipoTemplateExameDtos)
				.map(tipoTemplateExame -> tipoTemplateExame.stream().map(this::deserialize).collect(Collectors.toList())).orElse(null);
	}
}
