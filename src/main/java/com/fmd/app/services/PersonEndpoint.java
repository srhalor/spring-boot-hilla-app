package com.fmd.app.services;

import com.fmd.app.data.Person;
import com.fmd.app.data.PersonRepository;
import com.fmd.app.dto.FilterRow;
import com.fmd.app.dto.PageResponse;
import com.fmd.app.dto.PageSortRequest;
import com.fmd.app.dto.PersonDTO;
import com.fmd.app.dto.mapper.PageMapper;
import com.fmd.app.dto.mapper.PersonMapper;
import com.fmd.app.utils.FilterSpecificationUtil;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

/**
 * Endpoint for managing persons.
 * Provides REST-like operations for the frontend to interact with person data.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@BrowserCallable
@AnonymousAllowed
@RequiredArgsConstructor
public class PersonEndpoint {

    private final PersonRepository repository;
    private final PageMapper pageMapper;
    private final PersonMapper personMapper;

    public PageResponse<PersonDTO> getPersons(PageSortRequest pageSortRequest, List<FilterRow> filter) {
        log.debug("Fetching paginated metadata with request: {} and filter: {}", pageSortRequest, filter);
        PageRequest pageRequest = pageMapper.toPageRequest(pageSortRequest);
        Specification<Person> spec = FilterSpecificationUtil.buildSpecification(filter);
        log.info("PageRequest: {}, Specification: {}", pageRequest, spec);
        Page<Person> personPage = repository.findAll(spec, pageRequest);
        // Map to DTOs
        Page<PersonDTO> dtoPage = personPage.map(personMapper::toDto);
        return pageMapper.toPageResponse(dtoPage);
    }

}
