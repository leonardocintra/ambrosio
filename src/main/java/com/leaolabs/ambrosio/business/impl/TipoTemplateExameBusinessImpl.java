package com.leaolabs.ambrosio.business.impl;

import com.leaolabs.ambrosio.business.TipoTemplateExameBusiness;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.model.TipoTemplateExame;
import com.leaolabs.ambrosio.repository.TipoTemplateExameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoTemplateExameBusinessImpl implements TipoTemplateExameBusiness {

    private TipoTemplateExameRepository tipoTemplateExameRepository;

    @Autowired
    public TipoTemplateExameBusinessImpl(final TipoTemplateExameRepository tipoTemplateExameRepository) {
        this.tipoTemplateExameRepository = tipoTemplateExameRepository;
    }

    @Override
    public List<TipoTemplateExame> findAll() {
        List<TipoTemplateExame> tipos = this.tipoTemplateExameRepository.findAll();
        if (tipos.isEmpty()) {
            throw new EntityNotFoundException("TipoTemplateExame");
        }
        return this.tipoTemplateExameRepository.findAll();
    }

    @Override
    public Optional<TipoTemplateExame> create(TipoTemplateExame tipoTemplateExame) {
        return Optional.of(this.tipoTemplateExameRepository.save(tipoTemplateExame));
    }

    @Override
    public Optional<TipoTemplateExame> findById(Long id) {
        return this.tipoTemplateExameRepository.findById(id);
    }

}
