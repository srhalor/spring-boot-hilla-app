package com.fmd.app.dto;

import lombok.Builder;
import org.springframework.data.domain.Sort;

import java.util.List;

/**
 * Represents a paginated response containing a list of content and pagination metadata.
 * <p>
 * This record encapsulates the content and pagination information in a structured way.
 * </p>
 *
 * @param <T> the type of content in the page
 */
@Builder
public record PageResponse<T>(
    List<T> content,
    Pagination pagination,
    List<Sort.Order> sort
) {}
