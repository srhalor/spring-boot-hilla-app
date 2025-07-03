package com.fmd.app.data;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a person in the application.
 * Contains person details such as first name, last name, email, and phone.
 * Extends AbstractEntity to inherit common entity properties.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Entity
@Table(name = "person")
public class Person extends AbstractEntity {

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be less than 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be less than 50 characters")
    private String lastName;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;

    @Size(max = 15, message = "Phone number must be less than 15 characters")
    private String phone;

    @Size(max = 200, message = "Address must be less than 200 characters")
    private String address;
}
