package com.leaolabs.ambrosio.commons.exception;

public class MissingParameterException extends BaseControllerException {

    public MissingParameterException(Object... parameters) {
        super(parameters);
    }
}
