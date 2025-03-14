# DeepStrictTypes Library Documentation

- [한국어 설명](./docs/README_KO.md)

## Table of Contents

1. [Introduction](#introduction)
2. [DeepStrictObjectKeys](#deepstrictobjectkeys)
3. [DeepStrictOmit](#deepstrictomit)
4. [DeepStrictPick](#deepstrictpick)
5. [StringToDeepObject](#stringtodeepobject)
6. [DeepStrictMerge](#deepstrictmerge)
7. [DeepDateToString](#deepdatetostring)

## Introduction

DeepStrictTypes is a tool that takes TypeScript’s type manipulation to the next level.  
It helps you safely perform tasks like `Omit` and `Pick` even with complex nested objects or arrays.  
By addressing the limitations of TypeScript’s built-in utility types, it allows you to easily handle internal keys with strict and precise type inference.

Key features include:

- **Safe Nested Key Extraction:** It extracts all keys from within an object, boosting type safety.
- **Precise Type Manipulation:** You can pick or omit only the keys you need even in deeply nested structures, making it easier to work with complex data.
- **Unbranding and Merging:** It removes unnecessary constraints from branded types and safely merges multiple types.
- **Utility Function Support (Experimental):** It even provides runtime functions to further ensure type safety during development.

Below is a GIF showing an example of how to use the library.

![example](https://github.com/user-attachments/assets/28316425-8302-453e-b238-0c732606e6a7)

## DeepStrictObjectKeys

`DeepStrictObjectKeys` extracts all keys from a nested object, preserving its hierarchical structure as a union of string paths.  
That means you can access not only top-level keys but also nested keys using dot notation or, for arrays, using `[*]`.

### Key Features

- **Preserves Hierarchy:** It retrieves every key from within an object so you can express paths like "user.address.city".
- **Accurate Type Inference:** Instead of just using `keyof`, it thoroughly infers every nested key for enhanced type safety.
- **Array Support:** For objects within arrays, it uses `[*]` instead of an index, so you cover all elements at once.

### Example

The following example shows how to extract keys from a nested object using `DeepStrictObjectKeys`.

```typescript
type Example = {
  user: {
    name: string;
    address: {
      city: string;
      zip: number;
    };
  };
};

// Result: "user" | "user.name" | "user.address" | "user.address.city" | "user.address.zip"
type Keys = DeepStrictObjectKeys<Example>;
```

The library also offers a utility function `deepStrictObjectKeys` based on this type, which works like `Object.keys` but correctly extracts nested paths.

```typescript
type Target = { a: 1 }[][];
const keys = deepStrictObjectKeys({} as Target); // Result: ["[*].[*].a"]
```

## DeepStrictOmit

`DeepStrictOmit` creates a new type by removing specified keys from a nested object type.
Similar to the built-in `Omit`, it lets you precisely specify key paths—even in nested structures and arrays—to remove unwanted properties.

### Key Features

- **Omit Nested Keys:** You can specify a nested key path like `"user.profile.name"` to remove just that property.
- **Handles Arrays:** It applies the same logic to objects within arrays, so you can remove a key from every element.
- **Accurate Type Inference:** It preserves the rest of the object’s structure and types after omission.
- **Supports Branded Types:** It works safely with branded types, removing unnecessary constraints.

### Example

Below is an example of how to apply `DeepStrictOmit` to both nested objects and objects within arrays.

```typescript
// Define an example object type
type Example = {
  user: {
    id: string;
    profile: {
      name: string;
      age: number;
      email: string;
    };
    posts: {
      title: string;
      content: string;
      meta: {
        likes: number;
        shares: number;
      };
    }[];
  };
};

// Remove the keys 'user.profile.email' and 'user.posts[*].meta.shares'
type Omitted = DeepStrictOmit<Example, 'user.profile.email' | 'user.posts[*].meta.shares'>;

/*
  Resulting type Omitted:
  {
    user: {
      id: string;
      profile: {
        name: string;
        age: number;
      };
      posts: {
        title: string;
        content: string;
        meta: {
          likes: number;
        };
      }[];
    };
  }
*/
```

In short, with `DeepStrictOmit` you can neatly remove only the keys you want from even the most complex nested objects or arrays.

## DeepStrictPick

`DeepStrictPick` creates a new type by selecting only the specified keys from a nested object type.
It works like the built-in `Pick` but lets you precisely choose key paths—even in nested structures and arrays—so you only get the properties you need.

### Key Features

- **Pick Nested Keys:** Specify a nested key path like `"user.profile.name"` to pick only that property.
- **Handles Arrays:** It also works on objects within arrays, allowing you to extract just the desired data.
- **Accurate Type Inference:** It builds a type that only includes the selected properties, enhancing both type safety and readability.
- **Flexible:** You can specify multiple nested keys at once.

### Example

Below is an example of using `DeepStrictPick` on nested objects and arrays.

```typescript
// Define an example object type
type Example = {
  user: {
    id: string;
    profile: {
      name: string;
      age: number;
      email: string;
    };
    posts: {
      title: string;
      content: string;
      meta: {
        likes: number;
        shares: number;
      };
    }[];
  };
};

// Pick only the keys 'user.profile.name' and 'user.posts[*].meta.likes'
type Picked = DeepStrictPick<Example, 'user.profile.name' | 'user.posts[*].meta.likes'>;

/*
  Resulting type Picked:
  {
    user: {
      profile: {
        name: string;
      };
      posts: {
        meta: {
          likes: number;
        };
      }[];
    };
  }
*/
```

So, `DeepStrictPick` lets you extract only the properties you want from even the most deeply nested structures.

## StringToDeepObject

`StringToDeepObject` takes a string path in dot notation and generates a nested object type corresponding to that path.
It parses the path string step by step, building a nested object and assigning the desired type to the final property.

### Key Features

- **Parses Path Strings:** Converts a string like "user.profile.name" into an object where each segment becomes a key.
- **Dynamically Creates Objects:** Automatically builds a nested object based on the path, assigning the specified type at the end.
- **Merges Union Types:** If you pass a union of path strings, it merges the resulting objects into one combined type.
- **Type Safe:** Handles string paths safely within the type system to accurately represent nested structures.

### Example

```typescript
// Example: Assigning a string type to the path 'user.profile.name'
type DeepObj = StringToDeepObject<'user.profile.name', string>;

/*
  Resulting type DeepObj:
  {
    user: {
      profile: {
        name: string;
      };
    };
  }
*/

// Another example: Assigning a number type at the end of a path
type DeepNumberObj = StringToDeepObject<'settings.display.brightness', number>;

/*
  Resulting type DeepNumberObj:
  {
    settings: {
      display: {
        brightness: number;
      };
    };
  }
*/

// Union type example: Two paths merge into one combined object type
type MergedObj = StringToDeepObject<'user.profile.name' | 'user.profile.age', string | number>;

/*
  Resulting type MergedObj:
  {
    user: {
      profile: {
        name: string;
        age: number;
      };
    };
  }
*/
```

In short, `StringToDeepObject` lets you quickly create nested object types from a dot-delimited string, and even merge multiple paths if needed.

## DeepStrictMerge

`DeepStrictMerge` deeply merges two or more object types into a single unified type.
It recursively combines every property in nested structures, and when the same key exists in multiple objects, it follows a set of rules to merge them.

### Key Features

- **Deep Merge:** Recursively merges not only top-level properties but also all nested objects.
- **Accurate Type Inference:** Each object’s type information is retained in the merged result, ensuring type safety.
- **Conflict Resolution:** When the same key exists in multiple objects, it resolves the conflict according to defined rules.
- **Flexible:** You can merge several object types at once, making it easy to manage complex data structures.

### Example

```typescript
// Define two object types to merge
type ObjA = {
  user: {
    id: string;
    profile: {
      name: string;
      age: number;
    };
  };
};

type ObjB = {
  user: {
    profile: {
      email: string;
      // If both objects have the key 'age', the merge rule applies.
      age: number;
    };
    settings: {
      theme: string;
    };
  };
};

// Deep merge the two objects into one type
type Merged = DeepStrictMerge<ObjA, ObjB>;

/*
  Resulting type Merged:
  {
    user: {
      id: string;
      profile: {
        name: string;
        age: number;  // Merged according to the rules
        email: string;
      };
      settings: {
        theme: string;
      };
    };
  }
*/
```

So, `DeepStrictMerge` lets you seamlessly combine different object types into one, even when they have complex nested structures.

## DeepDateToString

`DeepDateToString` finds every `Date` type in an object and converts it to a `string` recursively.
It locates all `Date` properties—even deep within nested objects or arrays—and converts them to strings, which is especially useful for serialization or JSON conversion.

### Key Features

- **Recursive Conversion:** It transforms every `Date` type found in the object, including those in nested objects and arrays.
- **Ensures Type Consistency:** By explicitly converting `Date` to `string`, it prevents type mismatches during serialization or API responses.
- **Handles Complex Structures:** Works reliably even with deeply nested objects and arrays containing `Date` values.

### Example

```typescript
// Define an example object type
type Example = {
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    birthDate: Date;
    posts: {
      title: string;
      publishedAt: Date;
    }[];
  };
};

// Convert all Date properties to string using DeepDateToString
type StringifiedExample = DeepDateToString<Example>;

/*
  Resulting type StringifiedExample:
  {
    createdAt: string;
    updatedAt: string;
    user: {
      name: string;
      birthDate: string;
      posts: {
        title: string;
        publishedAt: string;
      }[];
    };
  }
*/
```

In short, `DeepDateToString` makes sure that every `Date` inside an object is converted to a `string`, ensuring type consistency for operations like serialization or JSON conversion.
