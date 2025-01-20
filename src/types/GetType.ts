import type { ArrayType, StringType } from '@kakasoo/proto-typescript';
import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { ElementOf } from './ElementOf';
import type { RemoveArraySymbol } from './RemoveArraySymbol';

/**
 * @title Type to infer all value types of generic T
 */
type ValueOf<T> = T[keyof T];

/**
 * @title A is the type that transforms the shape of B
 */
type Allow<A, B> = A extends B ? A : never;
type ToObject<T> = Allow<T, object>;

/**
 * @title The type that pulls out the type of a particular key on an interface.
 *
 * This type extracts the type of a specific key from a nested object,
 * supporting arrays and deeply nested keys. It uses `DeepStrictObjectKeys`
 * to handle the extraction of keys and correctly resolves the type for the given key.
 *
 * - If the key points to a primitive value, the type is returned directly.
 * - If the key points to an array, the type of the array elements is resolved.
 * - It supports nested keys using `.` notation to handle deep objects and arrays.
 *
 * @template T The interface type.
 * @template K The key string, which can represent a nested key path.
 *
 * Example usage:
 * ```ts
 * type Example1 = GetType<{ a: { b: { c: number } } }, "a.b">; // { c: number }
 * type Example2 = GetType<{ a: { b: { c: number } } }, "a.b.c">; // number
 * ```
 */
export type GetType<T extends object, K extends DeepStrictObjectKeys<T>> =
  StringType.Split<K, '.'> extends [infer First extends keyof T]
    ? ValueOf<ToObject<Pick<T, First>>>
    : StringType.Split<K, '.'> extends [infer First extends string, ...infer Rest extends string[]]
      ? RemoveArraySymbol<First> extends keyof T
        ? ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>> extends object
          ? ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>> extends Array<infer E>
            ? E extends object
              ? GetType<E, Allow<ArrayType.Join<Rest, '.'>, DeepStrictObjectKeys<E>>>
              : E
            : GetType<
                ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>>,
                Allow<
                  ArrayType.Join<Rest, '.'>,
                  DeepStrictObjectKeys<ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>>>
                >
              >
          : never
        : T extends any[]
          ? RemoveArraySymbol<First> extends '' // just empty string type like as `[].campaign`
            ? GetType<ElementOf<T>, Allow<ArrayType.Join<Rest, '.'>, DeepStrictObjectKeys<ElementOf<T>>>>
            : never
          : never
      : never;
