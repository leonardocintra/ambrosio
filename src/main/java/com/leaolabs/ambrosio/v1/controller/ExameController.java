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

import com.leaolabs.ambrosio.business.ExameBusiness;
import com.leaolabs.ambrosio.commons.controller.BaseController;
import com.leaolabs.ambrosio.commons.controller.ResponseMeta;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.model.Exame;
import com.leaolabs.ambrosio.v1.dtos.ExameDto;
import com.leaolabs.ambrosio.v1.mapper.ExameMapper;

@RestController
@RequestMapping("/v1/ambrosio/exame")
public class ExameController extends BaseController {

	private final ExameBusiness exameBusinness;
	private final ExameMapper exameMapper;

	@Autowired
	public ExameController(final ExameBusiness exameBusinness, final ExameMapper exameMapper) {
		super(Exame.class);
		this.exameBusinness = exameBusinness;
		this.exameMapper = exameMapper;
	}

	@GetMapping(value = "")
	@ResponseBody
	public ResponseEntity<ResponseMeta> getAll() {
		final List<Exame> exames = this.exameBusinness.findAll();
		return super.buildResponse(HttpStatus.OK, Optional.of(this.exameMapper.serialize(exames)));
	}

	@GetMapping(value = "/{id}")
	@ResponseBody
	public ResponseEntity<ResponseMeta> getById(@PathVariable final Long id) {
		final var optionalExame = this.exameBusinness.findById(id);

		return super.buildResponse(HttpStatus.OK, Optional.of(
				this.exameMapper.serialize(optionalExame.orElseThrow(() -> new EntityNotFoundException("Exame")))));
	}

	@ResponseBody
	@PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseMeta> post(@RequestBody final ExameDto exameDto) {
		final var optionalExame = this.exameBusinness.create(this.exameMapper.deserialize(exameDto));

		return super.buildResponse(HttpStatus.CREATED, Optional
				.of(this.exameMapper.serialize(optionalExame.orElseThrow(() -> new EntityNotFoundException("Exame")))));
	}

}
