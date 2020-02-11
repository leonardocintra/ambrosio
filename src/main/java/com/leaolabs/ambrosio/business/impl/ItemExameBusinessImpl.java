package com.leaolabs.ambrosio.business.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leaolabs.ambrosio.business.ItemExameBusiness;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.model.ItemExame;
import com.leaolabs.ambrosio.repository.ExameRepository;
import com.leaolabs.ambrosio.repository.ItemExameRepository;

@Service
public class ItemExameBusinessImpl implements ItemExameBusiness {

	private final ItemExameRepository itemExameRepository;
	private final ExameRepository exameRepository;

	@Autowired
	public ItemExameBusinessImpl(final ItemExameRepository itemExameRepository, final ExameRepository exameRepository) {
		this.itemExameRepository = itemExameRepository;
		this.exameRepository = exameRepository;
	}

	@Override
	public Optional<ItemExame> create(final ItemExame itemExame, final Long exameId) {

		final var exame = this.exameRepository.findById(exameId)
				.orElseThrow(() -> new EntityNotFoundException("Exame"));
		itemExame.setExame(exame);

		return Optional.of(this.itemExameRepository.save(itemExame));
	}
}
