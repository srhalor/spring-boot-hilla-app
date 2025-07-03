package com.fmd.app.services;

import com.fmd.app.data.User;
import com.fmd.app.data.UserRepository;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/**
 * Service for managing users.
 * Provides methods to get, save, delete, and list users with pagination and filtering.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    /**
     * Retrieves a user by its ID.
     *
     * @param id the ID of the user
     * @return an Optional containing the user if found, or empty if not found
     */
    public Optional<User> get(Long id) {
        return repository.findById(id);
    }

    /**
     * Saves a user entity.
     *
     * @param entity the user entity to save
     * @return the saved user entity
     */
    public User save(User entity) {
        return repository.save(entity);
    }

    /**
     * Deletes a user by its ID.
     *
     * @param id the ID of the user to delete
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }

    /**
     * Lists all users with pagination.
     *
     * @param pageable the pagination information
     * @return a page of users
     */
    public Page<User> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    /**
     * Lists users with pagination and filtering.
     *
     * @param pageable the pagination information
     * @param filter   the specification for filtering users
     * @return a page of users matching the filter
     */
    public Page<User> list(Pageable pageable, Specification<User> filter) {
        return repository.findAll(filter, pageable);
    }

    /**
     * Counts the total number of users.
     *
     * @return the total count of users
     */
    public int count() {
        return (int) repository.count();
    }

}
