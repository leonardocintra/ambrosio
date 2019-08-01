package com.leaolabs.ambrosio.business;

import java.util.List;
import java.util.Optional;

import com.leaolabs.ambrosio.model.TipoTemplateExame;

public interface TipoTemplateExameBusiness {

	List<TipoTemplateExame> findAll();
	
	Optional<TipoTemplateExame> create(TipoTemplateExame tipoTemplateExame);

	Optional<TipoTemplateExame> findById(Long id);

}
