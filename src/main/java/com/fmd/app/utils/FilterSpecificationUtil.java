package com.fmd.app.utils;

import com.fmd.app.dto.FilterRow;
import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@UtilityClass
public class FilterSpecificationUtil {

    public static <T> Specification<T> buildSpecification(List<FilterRow> filterRows) {
        log.debug("Building specification with filter rows: {}", filterRows);
        return (root, query, cb) -> {
            if (filterRows == null || filterRows.isEmpty()) {
                return cb.conjunction();
            }
            List<Predicate> predicates = new ArrayList<>();
            for (FilterRow row : filterRows) {
                if (row.value() != null && !row.value().isEmpty() && row.column() != null) {
                    String col = row.column();
                    String val = row.value();
                    String op = row.operator();
                    switch (op) {
                        case "contains" -> predicates.add(cb.like(cb.lower(root.get(col)), "%" + val.toLowerCase() + "%"));
                        case "equals" -> predicates.add(cb.equal(root.get(col), val));
                        case "startsWith" -> predicates.add(cb.like(cb.lower(root.get(col)), val.toLowerCase() + "%"));
                        case "endsWith" -> predicates.add(cb.like(cb.lower(root.get(col)), "%" + val.toLowerCase()));
                        // Add more operators as needed
                        default -> {}
                    }
                }
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
