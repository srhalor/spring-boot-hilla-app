package com.fmd.app.services;

import com.fmd.app.data.Person;
import com.fmd.app.data.PersonRepository;
import com.fmd.app.dto.PageResponse;
import com.fmd.app.dto.PageSortRequest;
import com.fmd.app.dto.PersonDTO;
import com.fmd.app.dto.mapper.PageMapper;
import com.fmd.app.dto.mapper.PersonMapper;
import com.fmd.app.utils.JsonUtils;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
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

    public PageResponse<PersonDTO> getPersons(PageSortRequest pageSortRequest, PersonDTO filter) {
        log.debug("Fetching paginated metadata with request: {} and filter: {}", pageSortRequest, filter);
        PageRequest pageRequest = pageMapper.toPageRequest(pageSortRequest);
        Specification<Person> spec = getPersonSpecification(filter);
        log.info("PageRequest: {}, Specification: {}", pageRequest, spec);
        Page<Person> personPage = repository.findAll(spec, pageRequest);
        //log.info("Retrieved Person Page : {}", JsonUtils.toJson(personPage));
        // Map to DTOs
        Page<PersonDTO> dtoPage = personPage.map(personMapper::toDto);
        return pageMapper.toPageResponse(dtoPage);
    }

    @NotNull
    private static Specification<Person> getPersonSpecification(PersonDTO filter) {
        return (root, query, cb) -> {
            var predicate = cb.conjunction();
            if (filter.firstName() != null && !filter.firstName().isBlank()) {
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("firstName")), "%" + filter.firstName().toLowerCase() + "%"));
            }
            if (filter.lastName() != null && !filter.lastName().isBlank()) {
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("lastName")), "%" + filter.lastName().toLowerCase() + "%"));
            }
            if (filter.email() != null && !filter.email().isBlank()) {
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("email")), "%" + filter.email().toLowerCase() + "%"));
            }
            if (filter.phone() != null && !filter.phone().isBlank()) {
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("phone")), "%" + filter.phone().toLowerCase() + "%"));
            }
            if (filter.address() != null && !filter.address().isBlank()) {
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("address")), "%" + filter.address().toLowerCase() + "%"));
            }
            return predicate;
        };
    }

}
