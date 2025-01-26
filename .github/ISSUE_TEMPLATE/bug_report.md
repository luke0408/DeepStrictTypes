---
name: Bug report
about: Create a report to help us improve
title: '[BUG]'
labels: ''
assignees: kakasoo
---

# Bug Report

**Description**

<!-- Provide a clear and concise description of the bug, including the type-related issue or unexpected behavior. -->

**Type Issue Example**

<!-- Describe the type you wrote and the inference you expected versus the actual inference. -->

**Type Input**

```typescript
// Example Input Type
type Input = {
  user: {
    name: string;
    age: number;
  };
};

// Expected:
type Type<T> = any; // define your type.

// For example, { user: { age: number; }; }
type Expected = Type<Input>; // what you expect

// Actual:
type Actual = { user: {} };
```

**Environment**

<!-- Provide details about your development environment: -->

- OS: [e.g., Windows, macOS, Linux]
- Node.js version: [e.g., 22.3.0]
- TypeScript version: [e.g., 5.7.2]
- Version of the library/package: [e.g., x.x.x]

**Additional Context**

<!-- Add any other context or references about the problem, including links to related TypeScript issues or documentation. -->
