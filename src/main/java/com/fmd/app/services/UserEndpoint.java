package com.fmd.app.services;

import com.fmd.app.data.User;
import com.fmd.app.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

@BrowserCallable
@AnonymousAllowed
public class UserEndpoint {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
