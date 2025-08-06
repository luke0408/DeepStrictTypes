import { DeepStrictUnbrand } from './DeepStrictUnbrand';
import { Equal } from './Equal';
import type { IsAny } from './IsAny';
import type { IsUnion } from './IsUnion';
import type { ValueType } from './ValueType';

namespace DeepStrictObjectKeys {
  /**
   * Internal helper type that recursively extracts all keys from nested objects
   * @template Target - The object type to extract keys from
   * @template Joiner - Defines the symbols used to join nested paths (array: '[*]', object: '.')
   * @template IsSafe - Controls whether to explore union types that mix primitives and objects
   * @template P - The current property keys being processed (excludes array methods)
   */
  export type Infer<
    Target extends object,
    Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
    IsSafe extends boolean = true,
    P extends keyof Target = Exclude<keyof Target, keyof []>,
  > = [Target] extends [never]
    ? never
    : P extends string
      ? IsUnion<Target[P]> extends true
        ? Equal<IsSafe, true> extends true
          ? P // In safe mode, only return the key itself for union types
          : // In unsafe mode, explore union types that mix primitives and objects
            | P
              | (Target[P] extends infer E
                  ? E extends ValueType
                    ? P // For primitive types, just return the key
                    : E extends object
                      ? E extends Array<infer _Element extends object>
                        ? // For arrays of objects, add array notation and recurse into elements
                          | P
                            // | (Equal<IsSafe, true> extends true ? never : `${P}[*]`) // end of array
                            | `${P}${Joiner['array']}${Joiner['object']}${Infer<_Element, Joiner, IsSafe>}` // recursive
                        : // For regular objects, add object notation and recurse
                          `${P}${Joiner['object']}${Infer<E, Joiner, IsSafe>}` // recursive
                      : never // Remove all primitive types of union types.
                  : never)
        : Target[P] extends Array<infer Element extends object>
          ? // Handle arrays containing objects
            | P
              // | (Equal<IsSafe, true> extends true ? never : `${P}[*]`) // end of array
              | `${P}${Joiner['array']}${Joiner['object']}${Infer<Element, Joiner, false>}`
          : Target[P] extends Array<infer _Element>
            ? // Handle arrays containing primitives
              Equal<IsSafe, true> extends true
              ? P
              : P | never // `${P}[*]`
            : Target[P] extends ValueType
              ? P // For primitive values, just return the key
              : IsAny<Target[P]> extends true
                ? P // For 'any' type, return the key
                : Target[P] extends object
                  ? Target[P] extends Record<string, never>
                    ? `${P}` // For empty objects, just return the key
                    : `${P}` | `${P}${Joiner['object']}${Infer<Target[P], Joiner, false>}` // For objects with properties, include both the key and nested paths
                  : never
      : never;
}

/**
 * @title Type for Listing All Keys of Nested Objects or Arrays.
 *
 * A type that extracts all keys of a nested object. If the object contains nested properties,
 * the keys are represented using dot notation. For arrays, the keys are represented using
 * the `[*]` symbol.
 *
 * ```ts
 * type Example1 = DeepStrictObjectKeys<{ a: { b: 1; c: 2 } }>; // "a" | "a.b" | "a.c"
 * type Example2 = DeepStrictObjectKeys<{ a: { b: 1; c: { d: number }[] } }>; // "a" | "a.b" | "a.c" | "a.c[*].d"
 * ```
 * @template Target Destination type for which you want to pull a key
 * @template Joiner It means what symbol to connect when recursively spinning superimposed types.
 * @template IsSafe When a key is a combination type of a primitive type and an object, it means whether to perform a recursive search or not.
 */
export type DeepStrictObjectKeys<
  Target extends object,
  Joiner extends { array: string; object: string } = {
    array: '[*]';
    object: '.';
  },
  IsSafe extends boolean = true,
> =
  // First, unbrand the target to handle branded types properly
  DeepStrictUnbrand<Target> extends Array<infer Element>
    ? // Handle regular arrays
      IsAny<Element> extends true
      ? Joiner['array'] // For any[], just return the array symbol
      : Element extends object
        ? // For arrays of objects, return both the array key and nested object keys
          Joiner['array'] | `${Joiner['array']}.${DeepStrictObjectKeys<Element, Joiner, IsSafe>}`
        : // For arrays of primitives, just return the array symbol
          Joiner['array']
    : DeepStrictUnbrand<Target> extends readonly (infer Element)[] // Handle readonly arrays
      ? IsAny<Element> extends true
        ? Joiner['array']
        : Element extends object
          ? Joiner['array'] | `${Joiner['array']}.${DeepStrictObjectKeys<Element, Joiner, IsSafe>}`
          : Joiner['array']
      : // For non-array objects, use the Infer helper to extract all nested keys
        DeepStrictObjectKeys.Infer<DeepStrictUnbrand<Target>, Joiner, IsSafe>;
