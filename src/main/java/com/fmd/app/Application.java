package com.fmd.app;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot application.
 * <p>
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@SpringBootApplication
@Theme(value = "spring-boot-vaadin-hilla", variant = Lumo.DARK)
public class Application implements AppShellConfigurator {

    /**
     * The main method to run the Spring Boot application.
     * This method starts the application by invoking SpringApplication.run.
     *
     * @param args command line arguments passed to the application
     */
    public static void main(String[] args) {
        log.info("Starting the Spring Boot application...");
        SpringApplication.run(Application.class, args);
        log.info("Application started successfully.");
    }
}
