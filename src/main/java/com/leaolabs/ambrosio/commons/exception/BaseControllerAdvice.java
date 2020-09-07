package com.leaolabs.ambrosio.commons.exception;

import static java.text.MessageFormat.format;

import java.text.MessageFormat;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.leaolabs.ambrosio.commons.controller.ResponseMeta;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

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

        fields.forEach(field -> {

            if ("NotNull".equalsIgnoreCase(field.getCode())
                    || "NotBlank".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format("Missing body parameter {0}", field.getField()))
                                .userMessage(
                                        format("Field {0} is required and can not be empty", field.getField()))
                                .build());

            } else if ("Min".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format(
                                                "Invalid body parameter {0}"
                                                        + " - it must be filled with a value greater than {1}",
                                                field.getField(),
                                                this.getValue(field)))
                                .userMessage(
                                        format(
                                                "Invalid field {0} - it must be filled with a value greater than {1}",
                                                field.getField(),
                                                this.getValue(field)))
                                .build());

            } else if ("Max".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format(
                                                "Invalid body parameter {0}"
                                                        + " - it must be filled with a value lesser than {1}",
                                                field.getField(),
                                                this.getValue(field)))
                                .userMessage(
                                        format(
                                                "Invalid field {0} - it must be filled with a value lesser than {1}",
                                                field.getField(),
                                                this.getValue(field)))
                                .build());

            } else if ("Email".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format(
                                                "Invalid body parameter {0} - it must be filled with a valid email",
                                                field.getField()))
                                .userMessage(
                                        format(
                                                "Invalid field {0} - it must be filled with a valid email",
                                                field.getField()))
                                .build());

            } else if ("cpf".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format(
                                                "Invalid body parameter {0} - it must be filled with a valid CPF",
                                                field.getField()))
                                .userMessage(
                                        format(
                                                "Invalid field {0} - it must be filled with a valid CPF",
                                                field.getField()))
                                .build());

            } else if ("cnpj".equalsIgnoreCase(field.getCode())) {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage(
                                        format(
                                                "Invalid body parameter {0} - it must be filled with a valid CNPJ",
                                                field.getField()))
                                .userMessage(
                                        format(
                                                "Invalid field {0} - it must be filled with a valid CNPJ",
                                                field.getField()))
                                .build());
            } else if ("size".equalsIgnoreCase(field.getCode())) {

                Integer param01 = Integer.valueOf(field.getArguments()[1].toString());
                Integer param02 = Integer.valueOf(field.getArguments()[2].toString());

                if (field.getRejectedValue().toString().length() > param01
                        && field.getRejectedValue().toString().length() > param02) {
                    errorMessages.add(ResponseMeta.ErrorMessage.builder()
                            .developerMessage(
                                    format(
                                            "Invalid body parameter {0} - "
                                                    + "it must be filled with a value lesser or equals than {1}",
                                            field.getField(),
                                            param01 > param02 ? param01 : param02))
                            .userMessage(
                                    format(
                                            "Invalid field {0} - "
                                                    + "it must be filled with a value lesser or equals than {1}",
                                            field.getField(),
                                            param01 > param02 ? param01 : param02))
                            .build());
                } else {
                    errorMessages.add(
                            ResponseMeta.ErrorMessage.builder()
                                    .developerMessage(
                                            format(
                                                    "Invalid body parameter {0} - "
                                                            + "it must be filled with a value greater or equals than {1}",
                                                    field.getField(),
                                                    param01 > param02 ? param02 : param01))
                                    .userMessage(
                                            format(
                                                    "Invalid field {0} - "
                                                            + "it must be filled with a value greater or equals than {1}",
                                                    field.getField(),
                                                    param01 > param02 ? param02 : param01))
                                    .build());
                }
            } else {

                errorMessages.add(
                        ResponseMeta.ErrorMessage.builder()
                                .developerMessage("Malformed request body")
                                .userMessage("Malformed request body")
                                .build());
            }
        });

        return errorMessages;
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<ResponseMeta.ErrorMessage> exception(final MethodArgumentTypeMismatchException ex) {
        if (ex.getRequiredType() == UUID.class) {
            return Collections.singletonList(ResponseMeta.ErrorMessage.builder()
                    .developerMessage(
                            MessageFormat.format(
                                    "Invalid parameter {0} - it must be filled with a valid UUID",
                                    ex.getName()))
                    .userMessage(MessageFormat.format(
                            "Invalid field {0} - it must be filled with a valid UUID", ex.getName()))
                    .build());
        } else {
            return Collections.singletonList(ResponseMeta.ErrorMessage.builder()
                    .developerMessage(
                            MessageFormat.format("Invalid query parameter {0} - it is not allowed",
                                    ex.getName() + "=" + ex.getValue()))
                    .userMessage(MessageFormat.format(
                            "Invalid field {0} - it is not allowed", ex.getName()))
                    .build());
        }
    }

    private Long getValue(final FieldError fieldError) {
        return (Long) Optional.ofNullable(fieldError.getArguments())
                .filter(t -> t.length > 1)
                .map(t -> t[1])
                .orElse(null);
    }
}
