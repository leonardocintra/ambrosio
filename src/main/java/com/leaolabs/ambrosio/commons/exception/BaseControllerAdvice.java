package com.leaolabs.ambrosio.commons.exception;

import static java.text.MessageFormat.format;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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

    @ResponseBody
    @ExceptionHandler(MissingParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public List<ResponseMeta.ErrorMessage> exceptionHandler(final MissingParameterException ex) {
        return Collections.singletonList(ResponseMeta.ErrorMessage.builder()
                .developerMessage(
                        format("Missing {0} parameter {1}", ex.getParameters()))
                .userMessage(
                        format("Field {1} is required and can not be empty", ex.getParameters()))
                .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<ResponseMeta.ErrorMessage> exception(final MethodArgumentNotValidException ex) {

        final List<FieldError> fields = ex.getBindingResult().getFieldErrors();
        final List<ResponseMeta.ErrorMessage> errorMessages = new ArrayList<>();

        for (FieldError field : fields) {
            if ("NotNull".equalsIgnoreCase(field.getCode())
                    || "NotBlank".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format("Missing body parameter {0}", field.getField()))
                                .userMessage(
                                        format("Field {0} is required and can not be empty", field.getField()))
                                .build());

            }
        }
        return errorMessages;

    }
}
