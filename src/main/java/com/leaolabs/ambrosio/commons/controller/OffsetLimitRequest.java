package com.leaolabs.ambrosio.commons.controller;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;

public class OffsetLimitRequest implements Pageable {

	private Integer offset;
	private Integer limit;

	public OffsetLimitRequest(final Integer offset, final Integer limit) {
		this.offset = Optional.ofNullable(offset).orElse(0);
		this.limit = Optional.ofNullable(limit).orElse(50);
	}

	@Override
	public int getPageNumber() {
		return 0;
	}

	@Override
	public int getPageSize() {
		return this.limit;
	}

	@Override
	public long getOffset() {
		return this.offset;
	}

	@Override
	public Sort getSort() {
		return Sort.unsorted();
	}

	@Override
	@Nullable
	public Pageable next() {
		return null;
	}

	@Override
	@Nullable
	public Pageable previousOrFirst() {
		return null;
	}

	@Override
	@Nullable
	public Pageable first() {
		return null;
	}

	@Override
	public boolean hasPrevious() {
		return false;
	}

}
