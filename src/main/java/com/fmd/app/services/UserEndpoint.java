package com.fmd.app.services;

import com.fmd.app.data.User;
import com.fmd.app.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

/**
 * Endpoint for accessing the authenticated user.
 * Provides a method to retrieve the currently authenticated user.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@BrowserCallable
@AnonymousAllowed
@RequiredArgsConstructor
public class UserEndpoint {

    private final AuthenticatedUser authenticatedUser;

    /**
     * Retrieves the currently authenticated user.
     *
     * @return an Optional containing the authenticated user if present, or empty if not authenticated
     */
    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
