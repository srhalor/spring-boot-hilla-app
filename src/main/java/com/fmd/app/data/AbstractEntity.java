package com.fmd.app.data;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Abstract base class for all entities in the application.
 * Provides a common identifier and versioning mechanism.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idgenerator")
    // The initial value is to account for data.sql demo data ids
    @SequenceGenerator(name = "idgenerator", initialValue = 1000)
    private Long id;

    @Version
    private int version;

}
