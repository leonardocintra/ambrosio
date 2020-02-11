package com.leaolabs.ambrosio.v1.mapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.leaolabs.ambrosio.model.ItemExame;
import com.leaolabs.ambrosio.model.TipoCampo;
import com.leaolabs.ambrosio.v1.dtos.ItemExameDto;
import com.leaolabs.ambrosio.v1.dtos.TipoCampoDto;

import org.springframework.stereotype.Component;


@Component
public class ItemExameMapper {
	
	public ItemExameDto serialize(final ItemExame itemExame) {
		if (Optional.ofNullable(itemExame).isEmpty()) {
			return new ItemExameDto();
		}

		return ItemExameDto.builder()
				.id(itemExame.getId())
				.uuid(itemExame.getUuid())
				.ativo(itemExame.getAtivo())
				.material(itemExame.getMaterial())
				.valorReferencia(itemExame.getValorReferencia())
				.metodo(itemExame.getMetodo())
				.nome(itemExame.getNome())
				.observacao(itemExame.getObservacao())
				.ordemExibicao(itemExame.getOrdemExibicao())
				.tipoCampo(TipoCampoDto.builder()
					.id(itemExame.getTipoCampo().getId())
					.descricao(itemExame.getTipoCampo().getDescricao())
					.build())
				.unidadeMedida(itemExame.getUnidadeMedida())
				.valorPadrao(itemExame.getValorPadrao())
				.dataCriacao(itemExame.getDataCriacao())
				.dataAtualizacao(itemExame.getDataAtualizacao()).build();
	}

	public List<ItemExameDto> serialize(final List<ItemExame> exames) {
		return Optional.ofNullable(exames)
				.map(conveniosList -> exames.stream().map(this::serialize).collect(Collectors.toList())).orElse(null);
	}

	public ItemExame deserialize(final ItemExameDto dto) {
		if (Optional.ofNullable(dto).isEmpty()) {
			return new ItemExame();
		}

		return ItemExame.builder()
				.id(dto.getId())
				.uuid(dto.getUuid())
				.nome(dto.getNome())
				.ativo(dto.getAtivo())
				.tipoCampo(TipoCampo.builder()
					.id(dto.getTipoCampo().getId()).build())
				.material(dto.getMaterial())
				.metodo(dto.getMetodo())
				.observacao(dto.getObservacao())
				.ordemExibicao(dto.getOrdemExibicao())
				.unidadeMedida(dto.getUnidadeMedida())
				.valorPadrao(dto.getValorPadrao())
				.valorReferencia(dto.getValorReferencia())
				.dataCriacao(dto.getDataCriacao())
				.dataAtualizacao(dto.getDataAtualizacao()).build();
	}

	public List<ItemExame> deserialize(final List<ItemExameDto> itemExameDtos) {
		return Optional.ofNullable(itemExameDtos)
				.map(itemExame -> itemExame.stream().map(this::deserialize).collect(Collectors.toList())).orElse(null);
	}
}
