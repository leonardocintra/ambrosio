package com.leaolabs.ambrosio.business.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leaolabs.ambrosio.business.ExameBusiness;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.model.Exame;
import com.leaolabs.ambrosio.repository.ExameRepository;

@Service
public class ExameBusinessImpl implements ExameBusiness {

	private ExameRepository exameRepository;

	@Autowired
	public ExameBusinessImpl(final ExameRepository exameRepository) {
		this.exameRepository = exameRepository;
	}

	@Override
	public List<Exame> findAll() {
		List<Exame> tipos = this.exameRepository.findAll();
		if (tipos.isEmpty()) {
			throw new EntityNotFoundException("Exame");
		}
		return this.exameRepository.findAll();
	}

	@Override
	public Optional<Exame> create(Exame exame) {
		return Optional.of(this.exameRepository.save(exame));
	}

	@Override
	public Optional<Exame> findById(Long id) {
		return this.exameRepository.findById(id);
	}
}
