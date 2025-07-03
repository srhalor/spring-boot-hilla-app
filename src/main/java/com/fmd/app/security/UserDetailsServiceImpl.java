package com.fmd.app.security;

import com.fmd.app.data.User;
import com.fmd.app.data.UserRepository;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of UserDetailsService to load user-specific data.
 * This service retrieves user details from the UserRepository and converts them into UserDetails.
 * It also provides the user's roles as GrantedAuthority.
 *
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Loads user details by username.
     * This method retrieves the user from the UserRepository and converts it into UserDetails.
     * If the user is not found, it throws a UsernameNotFoundException.
     *
     * @param username the username of the user to load
     * @return UserDetails containing user information and authorities
     * @throws UsernameNotFoundException if no user is found with the given username
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user by username: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user present with username: " + username));
        log.info("User found: {}", user.getUsername());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getHashedPassword(),
                getAuthorities(user));
    }

    /**
     * Converts a User object into a list of GrantedAuthority.
     * This method maps the user's roles to SimpleGrantedAuthority objects.
     *
     * @param user the User object containing user roles
     * @return a list of GrantedAuthority representing the user's roles
     */
    private static List<GrantedAuthority> getAuthorities(User user) {
        log.debug("Getting authorities for user: {}", user.getUsername());
        return user.getRoles().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());

    }

}
