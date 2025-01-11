# How To Use

```bash
npm i @kakasoo/deep-strict-types
```

# DeepStrictTypes

**DeepStrictTypes** extends TypeScript utility types, enabling safe operations like `Omit` and `Pick` on nested objects or arrays by specifying the keys to be inferred. This allows for more strict and accurate type checks. **Now, you don't have to recombine numerous types daily to remove a single key from a nested object. You can quickly omit and pick the internal keys you want!**

## DeepStrictObjectKeys

`DeepStrictObjectKeys<T>` extracts all nested keys from an object `T`, preserving the structure of the nested object and returning the types of the keys. This is useful when you need to handle specific keys safely at deeper levels of an object.

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

In the case of an array, the inside is represented by the `[*]` symbol. Of course, the arrangement of the array, the arrangement of objects in the array, and even if the top object is an array, it is perfectly inferred.

## DeepStrictOmit

`DeepStrictOmit<T, K>` creates a new type by excluding properties corresponding to the key K from object T, while preserving the nested structure. This type allows precise omission of keys even in deeply nested objects.

```ts
type Example = {
  user: {
    name: string;
    age: number;
  };
};

// Result: { user: { age: number; } }
type Omitted = DeepStrictOmit<Example, 'user.name'>;
```

This is also useful for branding types. Below is an example of defining a branding type using a library called typia, in which DeepStrictOmit can also be safely used.

```ts
test('TEST 1. apply DeepStrictOmit to primitive property type of branding type', () => {
  type TestInterface = {
    id: string;
    title: string;
    thumbnails: {
      name: null | (string & MinLength<1> & MaxLength<255>);
      extension: null | (string & MinLength<1> & MaxLength<8>);
      url: string;
    }[];
  };

  type Question = DeepStrictOmit<TestInterface, 'id'>;
  type IsAnswer = Equal<
    Question,
    {
      title: string;
      thumbnails: {
        name: null | (string & MinLength<1> & MaxLength<255>);
        extension: null | (string & MinLength<1> & MaxLength<8>);
        url: string;
      }[];
    }
  >;

  ok(typia.random<IsAnswer>());
});
```

## DeepStrictPick

`DeepStrictPick<T, K>` creates a new type by selecting only the properties corresponding to the key K from object T, while preserving the nested structure. It allows safely selecting specific keys even from deep objects.

```ts
type Example = {
  user: {
    name: string;
    age: number;
  };
};

// Result: { user: { name: string; } }
type Picked = DeepStrictPick<Example, 'user.name'>;
```

## DeepStrictUnbrand

DeepStrictUnbrand<T> removes branding from type T and applies it even to deeply nested objects. This makes handling complex branded types simpler by removing the branding for more straightforward use.

```ts
type BrandedType = { brand: number & { type: 'won' } };

// Result: { value: number; }
type Unbranded = DeepStrictUnbrand<BrandedType>;
```

## SubTypes for implementation

### ElementOf

ElementOf<T> extracts the type of elements from an array type T. This is useful to explicitly define the element type of an array and perform operations on that element.

```ts
type ArrayExample = string[];

// Result: string
type ElementType = ElementOf<ArrayExample>;
```

### Equal

Equal<A, B> evaluates whether types A and B are the same and returns true or false. This is used to validate whether two types are identical.

```ts
type A = { a: number };
type B = { a: number };

// Result: true
type AreEqual = Equal<A, B>;
```
