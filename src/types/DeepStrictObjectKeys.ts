import { DeepStrictUnbrand } from './DeepStrictUnbrand';
import { Equal } from './Equal';
import type { IsAny } from './IsAny';
import type { IsUnion } from './IsUnion';
import type { ValueType } from './ValueType';

namespace DeepStrictObjectKeys {
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
          ? P
          : // If a user wants to explore a type that is a union of primitive types and object types.
            | P
              | (Target[P] extends infer E
                  ? E extends ValueType
                    ? P
                    : E extends object
                      ? E extends Array<infer _Element extends object>
                        ?
                            | P
                            // | (Equal<IsSafe, true> extends true ? never : `${P}[*]`) // end of array
                            | `${P}${Joiner['array']}${Joiner['object']}${Infer<_Element, Joiner, IsSafe>}` // recursive
                        : `${P}${Joiner['object']}${Infer<E, Joiner, IsSafe>}` // recursive
                      : never // Remove all primitive types of union types.
                  : never)
        : Target[P] extends Array<infer Element extends object>
          ?
              | P
              // | (Equal<IsSafe, true> extends true ? never : `${P}[*]`) // end of array
              | `${P}${Joiner['array']}${Joiner['object']}${Infer<Element, Joiner, false>}`
          : Target[P] extends Array<infer _Element>
            ? Equal<IsSafe, true> extends true
              ? P
              : P | never // `${P}[*]`
            : Target[P] extends ValueType
              ? P
              : IsAny<Target[P]> extends true
                ? P
                : Target[P] extends object
                  ? Target[P] extends Record<string, never>
                    ? `${P}`
                    : `${P}` | `${P}${Joiner['object']}${Infer<Target[P], Joiner, false>}`
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
  // Equal<Target, any[]> extends true
  //   ? Joiner['array']
  //   :
  // Equal<Target, never[]> extends true
  //   ? Joiner['array']
  //   :
  // Equal<Target, any> extends true // If target is just any type, We just know that it is string.
  //   ? string
  //   :
  DeepStrictUnbrand<Target> extends Array<infer Element>
    ? IsAny<Element> extends true
      ? Joiner['array']
      : Element extends object
        ? Joiner['array'] | `${Joiner['array']}.${DeepStrictObjectKeys<Element, Joiner, IsSafe>}`
        : Joiner['array']
    : DeepStrictUnbrand<Target> extends readonly (infer Element)[] // TODO: support tuple types
      ? IsAny<Element> extends true
        ? Joiner['array']
        : Element extends object
          ? Joiner['array'] | `${Joiner['array']}.${DeepStrictObjectKeys<Element, Joiner, IsSafe>}`
          : Joiner['array']
      : DeepStrictObjectKeys.Infer<DeepStrictUnbrand<Target>, Joiner, IsSafe>;
