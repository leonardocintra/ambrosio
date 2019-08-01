package com.leaolabs.ambrosio.commons.exception;

public class BaseControllerException extends RuntimeException {

	private static final long serialVersionUID = 6011730611178683208L;

	private final Object[] parameters;

	public BaseControllerException(final Object... parameters) {
		this.parameters = parameters;
	}

	public Object[] getParameters() {
		return this.parameters.clone();
	}

}
