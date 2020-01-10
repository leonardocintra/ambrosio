package com.leaolabs.ambrosio.business;

import java.util.List;
import java.util.Optional;

import com.leaolabs.ambrosio.model.Exame;

public interface ExameBusiness {

	List<Exame> findAll();

	Optional<Exame> create(Exame exame);

	Optional<Exame> findById(Long id);
}
