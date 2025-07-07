---
mode: agent
---
Expected output and any relevant constraints for this task.

# Repository Prompt: Spring Boot Hilla App (Java 21, React 18+)

## Output Expectations
- Provide expert, context-aware answers for a repository using:
  - **Backend:** Java 21, Spring Boot 3.x, Spring Security 6.x, Maven, Lombok (@Slf4j), JUnit 5 (AssertJ), Mockito, Testcontainers, YAML config, Dockerfile, Helm 3.x (Kubernetes), OpenAPI, Nginx Ingress.
  - **Frontend:** React 18+ (function components & hooks), TypeScript (strict), Vaadin Hilla (type-safe APIs), CSS Modules/CSS-in-JS, Jest, React Testing Library, Mock Service Worker (MSW), enforced by ESLint & Prettier.
- All answers must:
  - Reference and apply best practices for maintainability, security, type safety, accessibility, and code quality.
  - Be actionable, concise, and tailored to the codebase and stack above.
  - Include code samples, configuration, or commands as appropriate.
  - Explain reasoning for architectural or design choices when relevant.
  - Suggest tests and code quality enforcement (JUnit 5, AssertJ, Mockito, Testcontainers, Jest, React Testing Library, MSW, ESLint, Prettier, TypeScript strict).
  - Highlight modularity, immutability, and accessibility in both backend and frontend.
  - For backend: Use Java records, Lombok, modern Spring idioms, secure endpoints, YAML config, Dockerfile, Helm, OpenAPI, Nginx Ingress.
  - For frontend: Use React function components/hooks, strict TypeScript, Hilla-generated clients, modular and accessible UI, custom hooks for logic, CSS Modules/CSS-in-JS.

## Constraints
- Do not use deprecated APIs or patterns.
- Do not use TypeScript `any` type or unsafe casts.
- Do not use class-based React components.
- Do not use Java versions < 21 or Spring Boot < 3.x.
- Do not suggest code that bypasses security, type safety, or accessibility.
- Do not suggest code without tests or documentation for public APIs/components.
- All configuration must use YAML (not properties) for Spring Boot.
- All Docker/K8s/Helm/Nginx Ingress examples must follow modern best practices.

## Example Prompts & Outputs

**Prompt:** How do I add a new secure REST endpoint and a frontend view?
**Output:**
- Backend: Show a Java 21 record-based DTO, a @RestController with @Slf4j, endpoint secured with Spring Security, YAML config, OpenAPI doc, and a JUnit 5/Mockito test.
- Frontend: Show a React function component using a Hilla-generated client, strict TypeScript, accessibility features, Jest/React Testing Library/MSW test, and ESLint/Prettier config.

**Prompt:** How do I enforce code quality?
**Output:**
- Backend: Show Maven plugins/config for code quality, test coverage, and static analysis.
- Frontend: Show ESLint, Prettier, and TypeScript strict config, and sample test setup.

**Prompt:** How do I deploy to Kubernetes with Helm and Nginx Ingress?
**Output:**
- Show Helm chart structure, YAML values, secure Nginx Ingress config, and Dockerfile best practices.

**General:** Always apply and reference these best practices and constraints. Prioritize maintainability, security, type safety, accessibility, and code quality in all suggestions.