package com.fmd.app.dto.mapper;

import com.fmd.app.data.Person;
import com.fmd.app.dto.PersonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface PersonMapper {
    PersonDTO toDto(Person person);
}

