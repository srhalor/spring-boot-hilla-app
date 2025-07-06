package com.fmd.app.dto;


import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort.Direction;

import java.util.List;
import java.util.Objects;

import static org.springframework.data.domain.Sort.Direction.ASC;

/**
 * Represents a request for paginated and sorted data.
 * <p>
 * This record encapsulates the parameters required for pagination and sorting,
 * including offset, page size, sort field, and sort direction.
 * </p>
 *
 * @param offset   the offset for pagination (default is 0)
 * @param pageSize the size of the page (default is 10)
 * @param sortBy   the field to sort by (default is "id")
 */
@Slf4j
@Builder
public record PageSortRequest(
        Integer offset,
        Integer pageSize,
        List<SortRequest> sortBy
) {
    public record SortRequest(
            String sortBy,
            Direction direction
    ) {
        public SortRequest(String sortBy, Direction direction) {
            this.sortBy = Objects.requireNonNullElse(sortBy, "id");
            this.direction = Objects.requireNonNullElse(direction, ASC);
        }
    }

    /**
     * Constructs a PageSortRequest with default values if null.
     *
     * @param offset   the offset for pagination, defaults to 0 if null
     * @param pageSize the size of the page, defaults to 10 if null
     * @param sortBy   the field to sort by, defaults to "id" if null
     */
    public PageSortRequest(Integer offset, Integer pageSize, List<SortRequest> sortBy) {
        log.debug("Creating PageSortRequest with offset: {}, pageSize: {}, sortBy: {}", offset, pageSize, sortBy);
        this.offset = Objects.requireNonNullElse(offset, 0);
        this.pageSize = Objects.requireNonNullElse(pageSize, 10);
        if (sortBy == null || sortBy.isEmpty()) {
            this.sortBy = List.of(new SortRequest("id", ASC));
        } else {
            this.sortBy = sortBy;
        }
    }
}
