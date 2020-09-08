package com.leaolabs.ambrosio.business;

import com.leaolabs.ambrosio.model.Exame;

import java.util.List;
import java.util.Optional;

public interface ExameBusiness {

	List<Exame> findAll();

	Optional<Exame> create(Exame exame);

	Optional<Exame> findById(Long id);
}
