---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: 'kakasoo'
---

# Feature Request

- [ ] Extensions of existing features
- [ ] Propose a type that didn't exist before

**Type Expectation**

<!-- Provide a clear and concise description of the feature you would like to request by describing the type-related problem or enhancement. Include examples to clarify your needs. -->

**Example Type**

```typescript
// Example Input Type
type Input = {
  user: {
    name: string;
    age: number;
  };
};

// Current inferred type or behavior:
// "user" | "user.name" | ...

// Expected behavior or type:
// "user.age" should be inferred or handled differently.
```

**Proposed Solution**

<!-- Describe how the feature could address the issue or enhance the library. Optionally, propose a type or utility if you have an idea. -->

**Use Case**

<!-- Explain how this feature would be used in practice. Include real-world examples where applicable. -->

**Additional Context**

<!-- Add any other context, screenshots, or references to related issues or libraries that support your request. -->
