package com.leaolabs.ambrosio.business.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leaolabs.ambrosio.business.ExameBusiness;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.model.Exame;
import com.leaolabs.ambrosio.repository.ExameRepository;
import com.leaolabs.ambrosio.repository.TipoTemplateExameRepository;

@Service
public class ExameBusinessImpl implements ExameBusiness {

	private ExameRepository exameRepository;
	private TipoTemplateExameRepository tipoTemplateExameRepository;

	@Autowired
	public ExameBusinessImpl(final ExameRepository exameRepository,
			final TipoTemplateExameRepository tipoTemplateExameRepository) {
		this.exameRepository = exameRepository;
		this.tipoTemplateExameRepository = tipoTemplateExameRepository;
	}

	@Override
	public List<Exame> findAll() {
		final List<Exame> tipos = this.exameRepository.findAll();
		if (tipos.isEmpty()) {
			throw new EntityNotFoundException("Exame");
		}
		return this.exameRepository.findAll();
	}

	@Override
	public Optional<Exame> create(final Exame exame, final Long tipoTemplateExameId) {

		final var tipoTemplateExame = this.tipoTemplateExameRepository.findById(tipoTemplateExameId)
				.orElseThrow(() -> new EntityNotFoundException("TipoTemplateExame"));

		exame.setTipoTemplateExame(tipoTemplateExame);

		return Optional.of(this.exameRepository.save(exame));
	}

	@Override
	public Optional<Exame> findById(final Long id) {
		return this.exameRepository.findById(id);
	}
}
