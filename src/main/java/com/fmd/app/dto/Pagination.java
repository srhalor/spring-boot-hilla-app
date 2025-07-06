package com.fmd.app.dto;

import lombok.Builder;

/**
 * Represents pagination metadata for paginated responses.
 * <p>
 * This record encapsulates all pagination-related information including
 * page number, page size, total elements, total pages, and sorting information.
 * </p>
 */
@Builder
public record Pagination(
    boolean empty,
    boolean first,
    boolean last,
    int numberOfElements,
    long totalElements,
    int offset,
    int pageNumber,
    int totalPages,
    int pageSize
) {}
