package com.leaolabs.ambrosio.commons.exception;

import static java.text.MessageFormat.format;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.leaolabs.ambrosio.commons.controller.ResponseMeta;

@ControllerAdvice
public class BaseControllerAdvice {
	
	  @ExceptionHandler(EntityNotFoundException.class)
	  @ResponseStatus(HttpStatus.NOT_FOUND)
	  @ResponseBody
	  public List<ResponseMeta.ErrorMessage> exception(final EntityNotFoundException ex) {
	    return Collections.singletonList(ResponseMeta.ErrorMessage.builder()
	        .developerMessage(
	            format("{0} not found", ex.getParameters()))
	        .userMessage(
	            format("You attempted to get a {0}, but did not find any", ex.getParameters()))
	        .build());
	  }
}
