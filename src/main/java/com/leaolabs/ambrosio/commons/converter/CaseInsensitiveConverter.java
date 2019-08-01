package com.leaolabs.ambrosio.commons.converter;

import java.beans.PropertyEditorSupport;

import lombok.NonNull;

public class CaseInsensitiveConverter<T extends Enum<T>> extends PropertyEditorSupport {

    private final Class<T> typeParameterClass;

    public CaseInsensitiveConverter(@NonNull final Class<T> typeParameterClass) {
        super();
        this.typeParameterClass = typeParameterClass;
    }

    @Override
    public void setAsText(final String text) throws IllegalArgumentException {
        setValue(T.valueOf(typeParameterClass, text.toUpperCase()));
    }
}
