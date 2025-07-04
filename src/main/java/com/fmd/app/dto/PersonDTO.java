package com.fmd.app.dto;

public record PersonDTO(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phone,
    String address
) {}
