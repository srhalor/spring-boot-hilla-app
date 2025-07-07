# Spring Boot Vaadin Hilla App

This project is a modern, full-stack web application template using Spring Boot, Vaadin Hilla, and React.
It demonstrates a robust, real-world approach to building enterprise-grade CRUD applications with advanced filtering, pagination, and sorting features.

## Features

- **Spring Boot Backend**: REST endpoints, JPA, and H2 database for rapid development.
- **Vaadin Hilla + React Frontend**: Type-safe, reactive UI with modern Vaadin components.
- **Generic Filtering**: Add, view, edit, and remove multiple column-based filters with a reusable, accessible filter dialog.
  Filters are managed as a list of objects and sent to the backend for dynamic querying.
- **Pagination & Sorting**: Custom, reusable pagination controls and multi-column sorting.
- **Accessibility**: All interactive elements are accessible and keyboard/touch friendly.
- **Docker Support**: Easily build and run the app in a container.

## Quick Start

1. **Run the app locally**

   ```sh
   ./mvnw # or mvnw.cmd on Windows
   # Open http://localhost:8080
   ```

2. **Production build**

   ```sh
   ./mvnw clean package -Pproduction
   java -jar target/spring-boot-vaadin-hilla-1.0-SNAPSHOT.jar
   ```

3. **Run with Docker**

   ```sh
   mvn clean package -Pproduction
   docker build . -t spring-boot-vaadin-hilla:latest
   docker run -p 8080:8080 spring-boot-vaadin-hilla:latest
   ```

## Project Structure

- `src/main/frontend/` — React + Vaadin Hilla client app
  - `components/pagination/` — Reusable pagination and filter UI components
  - `views/` — Main UI views (e.g., Person Form)
- `src/main/java/` — Spring Boot backend
  - `com.fmd.app.dto` — DTOs for pagination, filtering, etc.
  - `com.fmd.app.services` — Endpoints and business logic
  - `com.fmd.app.util` — Utilities (e.g., filter-to-specification)
- `Dockerfile` — For containerized deployment

## Key UI Components

- **AddFilterDialog**: Generic, accessible dialog for adding, editing, and removing filters.
  Filters are displayed as chips and can be edited by clicking.
- **GridPaginationControls**: Custom pagination controls with page size select and navigation arrows.
- **PageSizeSelect**: Standalone page size dropdown, styled for consistency.

## How Filtering Works

- Users can add multiple filters (column, operator, value) via a dialog.
- Filters are shown as chips; click a chip to edit, or click the "x" to remove.
- All filters are sent as a list to the backend, which converts them to JPA Specifications for dynamic queries.
- The UI and backend are fully decoupled and reusable for any entity.

## Accessibility & Best Practices

- All interactive elements use native HTML or proper ARIA roles and keyboard/touch support.
- Styles are managed in a shared CSS file for all pagination/filter components.

## Useful Links

- [Hilla Documentation](https://hilla.dev/docs/)
- [Vaadin Forum](https://vaadin.com/forum)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)

---

This project is released into the public domain under the Unlicense. See LICENSE.md for details.
