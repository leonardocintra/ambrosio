package com.leaolabs.ambrosio.v1.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.leaolabs.ambrosio.business.ItemExameBusiness;
import com.leaolabs.ambrosio.commons.controller.BaseController;
import com.leaolabs.ambrosio.commons.controller.ResponseMeta;
import com.leaolabs.ambrosio.commons.exception.EntityNotFoundException;
import com.leaolabs.ambrosio.v1.dtos.ItemExameDto;
import com.leaolabs.ambrosio.v1.mapper.ItemExameMapper;

@RestController
@RequestMapping("/v1/ambrosio/exames")
public class ItemExameController extends BaseController {

	private final ItemExameBusiness itemExameBusinness;
	private final ItemExameMapper itemExameMapper;

	@Autowired
	public ItemExameController(final ItemExameBusiness itemExameBusinness, final ItemExameMapper itemExameMapper) {
		this.itemExameBusinness = itemExameBusinness;
		this.itemExameMapper = itemExameMapper;
	}

	@ResponseBody
	@PostMapping(value = "/{id}/item-exame", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseMeta> post(@PathVariable final Long id,
			@RequestBody final ItemExameDto itemExameDto) {
		final var optionalExame = this.itemExameBusinness.create(this.itemExameMapper.deserialize(itemExameDto), id);

		return super.buildResponse(HttpStatus.CREATED, Optional.of(this.itemExameMapper
				.serialize(optionalExame.orElseThrow(() -> new EntityNotFoundException("ItemExame")))));
	}

}
