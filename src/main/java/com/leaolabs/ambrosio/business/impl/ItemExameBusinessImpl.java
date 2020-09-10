package com.leaolabs.ambrosio.business.impl;

import java.util.Optional;

import com.leaolabs.ambrosio.model.TipoCampo;
import com.leaolabs.ambrosio.repository.TipoCampoRepository;
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
    private final TipoCampoRepository tipoCampoRepository;

    @Autowired
    public ItemExameBusinessImpl(final ItemExameRepository itemExameRepository, final ExameRepository exameRepository, final TipoCampoRepository tipoCampoRepository) {
        this.itemExameRepository = itemExameRepository;
        this.exameRepository = exameRepository;
        this.tipoCampoRepository = tipoCampoRepository;
    }

    @Override
    public Optional<ItemExame> create(final ItemExame itemExame, final Long exameId) {

        final var tipoCampo = verificarTipoCampoExiste(itemExame.getTipoCampo().getId());
        final var exame = this.exameRepository.findById(exameId)
                .orElseThrow(() -> new EntityNotFoundException("Exame"));

        itemExame.setExame(exame);
        itemExame.setTipoCampo(tipoCampo);

        return Optional.of(this.itemExameRepository.save(itemExame));
    }

    private TipoCampo verificarTipoCampoExiste(Long id) {
        return this.tipoCampoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TipoCampo"));
    }
}
