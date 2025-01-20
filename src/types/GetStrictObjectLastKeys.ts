import type { IsAny } from './IsAny';
import type { IsUnion } from './IsUnion';
import type { ValueType } from './ValueType';

type __DeepStrictObjectKeys<
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
      ? P | `${P}${Joiner['array']}${Joiner['object']}${__DeepStrictObjectKeys<Element, Joiner>}`
      : T[P] extends ValueType
        ? P
        : IsAny<T[P]> extends true
          ? P
          : T[P] extends object
            ? T[P] extends Array<infer _Element>
              ? P
              : T[P] extends Record<string, never>
                ? never
                : `${P}${Joiner['object']}${__DeepStrictObjectKeys<T[P], Joiner>}`
            : never
  : never;

/**
 * @title Type for Extracting the Last Level Keys from Nested Objects, Including Array Elements.
 *
 * The `DeepStrictObjectLastKeys<T, Joiner, P>` type extracts the keys from the last level of a nested object `T`,
 * with support for arrays. It returns keys with array indices (`[*]`) and object keys using a custom separator defined
 * by the `Joiner` object.
 * - For arrays, it appends array indices (`[*]`) followed by the key of the element.
 * - For objects, it recursively traverses the nested structure and appends the last level keys.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepStrictObjectLastKeys<{ a: { b: { c: number[] } } }>; // "a.b.c"
 * type Example2 = DeepStrictObjectLastKeys<{ a: { b: number[]; c: { d: string }[] } }>; // "a.b" | "a.c" | "a.c[*].d"
 * ```
 */
export type DeepStrictObjectLastKeys<
  T extends object,
  Joiner extends { array: string; object: string } = {
    array: '[*]';
    object: '.';
  },
  P extends keyof T = keyof T,
> =
  T extends Array<infer Element>
    ? Element extends object
      ? `${Joiner['array']}.${DeepStrictObjectLastKeys<Element, Joiner>}`
      : `${Joiner['array']}.${keyof Element extends string ? keyof Element : never}`
    : __DeepStrictObjectKeys<T, Joiner, P>;
