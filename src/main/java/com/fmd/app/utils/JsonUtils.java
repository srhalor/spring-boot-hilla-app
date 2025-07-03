package com.fmd.app.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Shailesh Halor
 * @version 1.0
 * @since 1.0
 */
@Slf4j
@UtilityClass
public class JsonUtils {

    /**
     * Converts an object to its JSON string representation.
     *
     * @param object the object to convert
     * @return the JSON string representation of the object
     */
    public String toJson(Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            // format the JSON output
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            log.error("Error converting object to JSON", e);
            return "{}"; // Return empty JSON in case of error
        }
    }
}