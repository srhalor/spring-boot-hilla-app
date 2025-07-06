package com.fmd.app.dto.mapper;

import com.fmd.app.dto.PageResponse;
import com.fmd.app.dto.PageSortRequest;
import com.fmd.app.dto.Pagination;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

/**
 * Mapper interface for converting between Page and PageResponse.
 * <p>
 * This interface provides methods to convert a Page of any type to a
 * PageResponse
 * and to convert a PageSortRequest to a PageRequest.
 * </p>
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Mapper(componentModel = SPRING)
public interface PageMapper {

    /**
     * Converts a Page of any type to a PageResponse.
     *
     * @param <T>  the type of content in the page
     * @param page the Page to convert
     * @return a PageResponse containing the content and pagination information
     */
    default <T> PageResponse<T> toPageResponse(Page<T> page) {

        Pagination pagination = Pagination.builder()
                .empty(page.isEmpty())
                .first(page.isFirst())
                .last(page.isLast())
                .numberOfElements(page.getNumberOfElements())
                .totalElements(page.getTotalElements())
                .offset(page.getNumber())
                .pageNumber(page.getNumber() + 1)
                .totalPages(page.getTotalPages())
                .pageSize(page.getSize())
                .build();

        return PageResponse.<T>builder()
                .content(page.getContent())
                .pagination(pagination)
                .build();
    }

    /**
     * Converts a PageSortRequest to a PageRequest.
     *
     * @param pageSortRequest the PageSortRequest to convert
     * @return a PageRequest based on the provided PageSortRequest
     */
    default PageRequest toPageRequest(PageSortRequest pageSortRequest) {
        // Build Sort with multiple orders
        Sort sort = Sort.by(
                pageSortRequest.sortBy().stream()
                        .map(PageMapper::getOrder)
                        .toList());
        return PageRequest.of(
                pageSortRequest.offset(),
                pageSortRequest.pageSize(),
                sort);
    }

    private static Sort.Order getOrder(PageSortRequest.SortRequest s) {
        return new Sort.Order(s.direction(), s.sortBy());
    }
}
