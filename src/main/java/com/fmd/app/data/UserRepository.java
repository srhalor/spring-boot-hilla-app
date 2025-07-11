package com.fmd.app.data;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Repository interface for managing User entities.
 * Provides methods to perform CRUD operations and custom queries on User data.
 * Extends JpaRepository for basic CRUD operations and JpaSpecificationExecutor for advanced queries.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByUsername(String username);
}
