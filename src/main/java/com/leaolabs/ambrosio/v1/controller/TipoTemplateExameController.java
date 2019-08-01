package com.leaolabs.ambrosio.v1.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.leaolabs.ambrosio.business.TipoTemplateExameBusiness;
import com.leaolabs.ambrosio.commons.controller.BaseController;
import com.leaolabs.ambrosio.commons.controller.ResponseMeta;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.model.TipoTemplateExame;
import com.leaolabs.ambrosio.v1.dtos.TipoTemplateExameDto;
import com.leaolabs.ambrosio.v1.mapper.TipoTemplateExameMapper;

@RestController
@RequestMapping("/v1/ambrosio/tipo-templates-exame")
public class TipoTemplateExameController extends BaseController {

	private final TipoTemplateExameBusiness tipoTemplateExameBusinness;
	private final TipoTemplateExameMapper tipoTemplateExameMapper;

	@Autowired
	public TipoTemplateExameController(final TipoTemplateExameBusiness tipoTemplateExameBusinness,
			final TipoTemplateExameMapper tipoTemplateExameMapper) {
		super(TipoTemplateExame.class);
		this.tipoTemplateExameBusinness = tipoTemplateExameBusinness;
		this.tipoTemplateExameMapper = tipoTemplateExameMapper;
	}

	@GetMapping(value = "")
	@ResponseBody
	public ResponseEntity<ResponseMeta> getAll() {
		final List<TipoTemplateExame> medicos = this.tipoTemplateExameBusinness.findAll();
		return super.buildResponse(HttpStatus.OK, Optional.of(this.tipoTemplateExameMapper.serialize(medicos)));
	}

	@GetMapping(value = "/{id}")
	@ResponseBody
	public ResponseEntity<ResponseMeta> getById(@PathVariable final Long id) {
		final var optionalMedico = this.tipoTemplateExameBusinness.findById(id);

		return super.buildResponse(HttpStatus.OK, Optional.of(this.tipoTemplateExameMapper
				.serialize(optionalMedico.orElseThrow(() -> new EntityNotFoundException("Tipo Template Exame")))));
	}

	@ResponseBody
	@PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseMeta> post(@RequestBody final TipoTemplateExameDto tipoTemplateExameDto) {
		final var optionalTipo = this.tipoTemplateExameBusinness
				.create(this.tipoTemplateExameMapper.deserialize(tipoTemplateExameDto));

		return super.buildResponse(HttpStatus.CREATED, Optional.of(this.tipoTemplateExameMapper
				.serialize(optionalTipo.orElseThrow(() -> new EntityNotFoundException("Tipo Template Exame")))));
	}

}
