import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { DeepStrictUnbrand } from './DeepStrictUnbrand';
import type { GetElementMember } from './GetMember';

type ____DeepStrictOmit<T extends object, K extends DeepStrictObjectKeys<T>> = [K] extends [never]
  ? T
  : {
      [key in keyof T as key extends K ? never : key]: T[key] extends Array<infer Element extends object>
        ? key extends string
          ? Element extends Date
            ? Array<Element>
            : GetElementMember<K, key> extends DeepStrictObjectKeys<Element>
              ? Array<____DeepStrictOmit<Element, GetElementMember<K, key>>>
              : Array<Element>
          : never
        : T[key] extends Array<infer Element>
          ? Array<Element>
          : T[key] extends object
            ? key extends string
              ? T[key] extends Date
                ? T[key]
                : GetElementMember<K, key> extends DeepStrictObjectKeys<T[key]>
                  ? ____DeepStrictOmit<T[key], GetElementMember<K, key>>
                  : T[key]
              : never
            : T[key];
    };

type _DeepStrictOmit<T extends object, K extends DeepStrictObjectKeys<T>> =
  T extends Array<infer Element extends object>
    ? Array<
        _DeepStrictOmit<
          Element,
          GetElementMember<K, ''> extends DeepStrictObjectKeys<Element> ? GetElementMember<K, ''> : never
        >
      >
    : ____DeepStrictOmit<T, K>;

/**
 * @title Type for Removing Specific Keys from an Interface.
 *
 * The `DeepStrictOmit<T, K>` type creates a new type by excluding properties
 * corresponding to the key `K` from the object `T`, while preserving the nested structure.
 * It enables precise omission of keys even in deeply nested objects or arrays.
 *
 * {@link DeepStrictObjectKeys} can be used to determine valid keys for omission,
 * including nested keys represented with dot notation (`.`) and array indices represented with `[*]`.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepStrictOmit<{ a: { b: 1; c: 2 } }, "a.b">; // { a: { c: 2 } }
 * type Example2 = DeepStrictOmit<{ a: { b: 1; c: { d: number }[] } }, "a.c[*].d">; // { a: { b: 1; c: {}[] } }
 * type Example3 = DeepStrictOmit<{ a: 1 }[], "[*].a">; // {}[]
 * ```
 */
export type DeepStrictOmit<T extends object, K extends DeepStrictObjectKeys<DeepStrictUnbrand<T>>> = _DeepStrictOmit<
  T,
  Extract<K, DeepStrictObjectKeys<T>>
>;
