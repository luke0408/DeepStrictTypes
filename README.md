# How To Use

![example](https://github.com/user-attachments/assets/28316425-8302-453e-b238-0c732606e6a7)

```bash
npm i @kakasoo/deep-strict-types
```

# DeepStrictTypes

**DeepStrictTypes** extends TypeScript utility types, enabling safe operations like `Omit` and `Pick` on deeply nested objects or arrays by specifying keys to be inferred. It provides strict and accurate type checks, simplifying tasks like removing a single key from a nested object without recombining multiple types. Quickly and precisely omit or pick the internal keys you need!

## Key Features

### `DeepStrictObjectKeys`

Extract all nested keys from an object `T`, preserving its structure. Useful for safely handling specific keys at deeper levels of an object.

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

In arrays, elements are represented with the `[*]` symbol, ensuring perfect inference even for nested structures.

### `DeepStrictOmit`

Create a new type by excluding properties corresponding to key `K` from object `T`, preserving the nested structure.

```typescript
type Example = {
  user: {
    name: string;
    age: number;
  };
};

// Result: { user: { age: number; } }
type Omitted = DeepStrictOmit<Example, 'user.name'>;
```

This is particularly effective for branded types. Below is an example using the `typia` library:

```typescript
test('Apply DeepStrictOmit to branding types', () => {
  type TestInterface = {
    id: string;
    thumbnails: {
      name: string & MinLength<1> & MaxLength<255>;
      url: string;
    }[];
  };

  type Question = DeepStrictOmit<TestInterface, 'id'>;
  type IsAnswer = Equal<Question, { thumbnails: { name: string & MinLength<1> & MaxLength<255>; url: string }[] }>;

  ok(typia.random<IsAnswer>());
});
```

### `DeepStrictPick`

Select properties corresponding to key `K` from object `T`, preserving the nested structure.

```typescript
type Example = {
  user: {
    name: string;
    age: number;
  };
};

// Result: { user: { name: string; } }
type Picked = DeepStrictPick<Example, 'user.name'>;
```

### `DeepStrictUnbrand`

Remove branding from type `T`, even in deeply nested objects, simplifying the handling of branded types.

```typescript
type BrandedType = { value: number & { unit: 'dollar' } };

// Result: { value: number; }
type Unbranded = DeepStrictUnbrand<BrandedType>;
```

### `GetType`

Get the type of a specific key path from a nested object type `T`. This is useful for extracting the type of deeply nested properties safely.

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

// Result: string
type CityType = GetType<Example, 'user.address.city'>;

// Result: { city: string; zip: number; }
type AddressType = GetType<Example, 'user.address'>;
```

## Utility functions (Experimental)

### `DeepStrictAssert`

```typescript
interface Example {
  a: number;
  b: number;
  c: {
    d: string;
    e: string;
    f: {
      g: boolean;
      h: boolean;
    }[];
  }[];
}

declare const E: Example;

// Expected: { c: Array<{ d: string }> }
const answer = deepStrictAssert(E)('c[*].d');
```

---

This is just a part of the features provided by **DeepStrictTypes**, designed to enhance TypeScript's type manipulation capabilities and improve developer productivity. For more details, check out the library's full documentation.
