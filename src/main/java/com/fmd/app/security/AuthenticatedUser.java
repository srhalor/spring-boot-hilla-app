package com.fmd.app.security;

import com.fmd.app.data.User;
import com.fmd.app.data.UserRepository;
import com.vaadin.flow.spring.security.AuthenticationContext;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Provides methods to retrieve the currently authenticated user and to log out.
 * This class uses the {@link AuthenticationContext} to access the current user's details.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticatedUser {

    private final UserRepository userRepository;
    private final AuthenticationContext authenticationContext;

    /**
     * Retrieves the currently authenticated user.
     *
     * @return an {@link Optional} containing the {@link User} if authenticated, or empty if not.
     */
    @Transactional
    public Optional<User> get() {
        log.debug("Retrieving authenticated user details.");
        return authenticationContext.getAuthenticatedUser(UserDetails.class)
                .flatMap(userDetails -> userRepository.findByUsername(userDetails.getUsername()));
    }

    /**
     * Logs out the currently authenticated user.
     * This method uses the {@link AuthenticationContext} to perform the logout operation.
     */
    public void logout() {
        log.info("Logging out user. {}", get().map(User::getUsername).orElse("Unknown user"));
        authenticationContext.logout();
    }

}
