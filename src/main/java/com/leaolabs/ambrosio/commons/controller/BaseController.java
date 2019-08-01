package com.leaolabs.ambrosio.commons.controller;

import java.net.InetAddress;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import com.leaolabs.ambrosio.commons.converter.CaseInsensitiveConverter;

import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.SneakyThrows;

@NoArgsConstructor
public abstract class BaseController {

	protected String resourceName;

	private List<?> enums;

	@Value("${application.version}")
	private String applicationVersion;

	public BaseController(final Class<?> clazz) {
		this.resourceName = clazz.getSimpleName();
	}

	public BaseController(final String resourceName) {
		this.resourceName = resourceName;
	}

	public <E extends Enum> BaseController(@NonNull final Class<?> clazz, @NonNull final List<Class<E>> enums) {
		this.resourceName = clazz.getSimpleName();
		this.enums = enums;
	}

	@InitBinder
	protected void initBinder(@NonNull final WebDataBinder binder) {
		registerRequestParamEnumsCaseInsensitive(binder);
	}

	protected void registerRequestParamEnumsCaseInsensitive(@NonNull final WebDataBinder binder) {
		Optional.ofNullable(enums).ifPresent(enums -> enums.forEach(e -> {
			binder.registerCustomEditor((Class<?>) e, new CaseInsensitiveConverter((Class) e));
		}));
	}

	@SneakyThrows
	public ResponseEntity<ResponseMeta> buildResponse(final HttpStatus status, final Optional<?> entity) {

		return this.buildResponse(status, entity, new OffsetLimitRequest(null, null));
	}

	@SneakyThrows
	public ResponseEntity<ResponseMeta> buildResponse(final HttpStatus status, final Optional<?> entity,
			final Pageable pageable) {

		if (HttpStatus.NO_CONTENT.equals(status)) {
			return ResponseEntity.noContent().build();
		}

		final Object o = entity.orElseThrow(() -> new EntityNotFoundException(resourceName));

		final List<?> result = o instanceof Collection ? (List<?>) o : Collections.singletonList(o);

		if (result.isEmpty()) {
			throw new EntityNotFoundException(resourceName);
		}

		final Integer offset = Optional.ofNullable(pageable).map(Pageable::getOffset).map(Long::intValue).orElse(null);

		final Integer limit = Optional.ofNullable(pageable).map(Pageable::getPageSize).orElse(null);

		return new ResponseEntity<>(ResponseMeta.builder()
				.meta(ResponseMeta.Meta.builder().version(this.getApplicationVersion())
						.server(InetAddress.getLocalHost().getHostName()).recordCount(result.size()).offset(offset)
						.limit(limit).build())
				.records(result).build(), status);
	}

	private String getApplicationVersion() {
		return Optional.ofNullable(this.applicationVersion).map(t -> t.replace("-SNAPSHOT", ""))
				.orElse(this.applicationVersion);
	}

}
