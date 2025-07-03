package com.fmd.app.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * Represents a user in the application.
 * Contains user details such as username, name, hashed password, roles, and profile picture.
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
@Table(name = "application_user")
public class User extends AbstractEntity {

    private String username;
    private String name;
    @JsonIgnore
    private String hashedPassword;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
    @Lob
    @Column(length = 1000000)
    private byte[] profilePicture;

}
