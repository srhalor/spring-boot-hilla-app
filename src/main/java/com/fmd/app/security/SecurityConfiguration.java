package com.fmd.app.security;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Security configuration for the application.
 * This class extends VaadinWebSecurity to configure security settings for the web application.
 * It allows access to static resources and configures CSRF protection and frame options.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends VaadinWebSecurity {

    /**
     * Bean for password encoding.
     * This method provides a BCryptPasswordEncoder bean for encoding passwords.
     *
     * @return a PasswordEncoder instance using BCrypt hashing algorithm.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configures HTTP security for the application.
     * This method sets up authorization rules, frame options, and CSRF protection.
     * It allows access to specific paths and configures the login view.
     *
     * @param http the HttpSecurity object to configure security settings.
     * @throws Exception if an error occurs during configuration.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        log.info("Configuring security for the application...");
        // Allow access to static resources and H2 console
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/images/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
        );
        // Allow access to static resources
        http.headers(headers -> headers.frameOptions(FrameOptionsConfig::sameOrigin));
        // Enable CSRF protection, but ignore H2 console requests
        http.csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**"));
        super.configure(http);
        // Set the login view for the application
        setLoginView(http, "/login");
        log.info("Security configuration completed.");
    }

}
