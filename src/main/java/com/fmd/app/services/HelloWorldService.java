package com.fmd.app.services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Service for providing a simple "Hello World" functionality.
 * This service can be called from the browser to return a greeting message.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@BrowserCallable
@AnonymousAllowed
@Service
public class HelloWorldService {

    /**
     * Returns a greeting message.
     * If the provided name is empty, it returns "Hello stranger".
     * Otherwise, it returns "Hello <name>".
     *
     * @param name the name to include in the greeting
     * @return a greeting message
     */
    public String sayHello(String name) {
        if (name.isEmpty()) {
            return "Hello stranger";
        } else {
            return "Hello " + name;
        }
    }
}
