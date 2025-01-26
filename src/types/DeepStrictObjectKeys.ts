import { DeepStrictUnbrand } from './DeepStrictUnbrand';
import type { IsAny } from './IsAny';
import type { IsUnion } from './IsUnion';
import type { ValueType } from './ValueType';

namespace DeepStrictObjectKeys {
  export type Infer<
    T extends object,
    Joiner extends {
      array: string;
      object: string;
    } = {
      array: '[*]';
      object: '.';
    },
    P extends keyof T = keyof T,
  > = P extends string
    ? IsUnion<T[P]> extends true
      ? P
      : T[P] extends Array<infer Element extends object>
        ? P | `${P}${Joiner['array']}${Joiner['object']}${Infer<Element, Joiner>}`
        : T[P] extends ValueType
          ? P
          : IsAny<T[P]> extends true
            ? P
            : T[P] extends object
              ? T[P] extends Array<infer _Element>
                ? P
                : T[P] extends Record<string, never>
                  ? `${P}`
                  : `${P}` | `${P}${Joiner['object']}${Infer<T[P], Joiner>}`
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
 */
export type DeepStrictObjectKeys<
  T extends object,
  Joiner extends { array: string; object: string } = {
    array: '[*]';
    object: '.';
  },
> =
  DeepStrictUnbrand<T> extends Array<infer Element>
    ? Element extends object
      ? `${Joiner['array']}.${DeepStrictObjectKeys<Element, Joiner>}`
      : `${Joiner['array']}.${keyof Element extends string ? keyof Element : never}`
    : DeepStrictObjectKeys.Infer<DeepStrictUnbrand<T>, Joiner, Extract<keyof T, keyof DeepStrictUnbrand<T>>>;
