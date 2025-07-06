package com.fmd.app.dto;

public record FilterRow(
    String column,
    String operator,
    String value
) {}