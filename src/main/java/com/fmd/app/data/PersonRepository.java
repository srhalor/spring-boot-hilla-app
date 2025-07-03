package com.fmd.app.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Person entity.
 * Extends JpaRepository for basic CRUD operations and JpaSpecificationExecutor for advanced queries.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Repository
public interface PersonRepository extends JpaRepository<Person, Long>, JpaSpecificationExecutor<Person> {

}
