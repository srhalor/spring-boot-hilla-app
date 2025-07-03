package com.fmd.app.services;

import com.fmd.app.data.Person;
import com.fmd.app.data.PersonRepository;
import com.fmd.app.dto.PageResponse;
import com.fmd.app.dto.PageSortRequest;
import com.fmd.app.dto.mapper.PageMapper;
import com.fmd.app.utils.JsonUtils;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

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

    public PageResponse<Person> getPersons(PageSortRequest pageSortRequest) {
        log.debug("Fetching paginated metadata with request: {}", pageSortRequest);
        // Prepare the PageRequest from the PageSortRequest
        PageRequest pageRequest = pageMapper.toPageRequest(pageSortRequest);
        Page<Person> personPage = repository.findAll(pageRequest);
        log.info("Retrieved Person Page : {}", JsonUtils.toJson(personPage));
        return pageMapper.toPageResponse(personPage);
    }

}
