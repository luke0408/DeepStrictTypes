import type { ArrayType, StringType } from '@kakasoo/proto-typescript';
import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { ElementOf } from './ElementOf';
import type { RemoveArraySymbol } from './RemoveArraySymbol';

/**
 * Helper type that extracts all value types from an object type.
 * Similar to `T[keyof T]`, it returns a union of all property value types.
 *
 * @internal
 * @template T - The object type to extract values from
 */
type ValueOf<T> = T[keyof T];

/**
 * @title Type for extracting the type at a specific nested path in an object.
 *
 * This type extracts the type of a specific key from a nested object structure,
 * supporting arrays and deeply nested keys. It uses `DeepStrictObjectKeys`
 * to validate the key path and correctly resolves the type for the given key.
 *
 * Key features:
 * - Supports dot notation for nested object access (e.g., "a.b.c")
 * - Handles array access with `[*]` notation (e.g., "items[*].name")
 * - Type-safe: only accepts valid key paths as defined by `DeepStrictObjectKeys`
 * - Recursively resolves nested types through objects and arrays
 *
 * @template T - The object type to extract from
 * @template K - The key path string (must be a valid key from DeepStrictObjectKeys<T>)
 * @returns The type at the specified path, or `never` if the path is invalid
 *
 * @example
 * ```typescript
 * type Data = {
 *   user: {
 *     name: string;
 *     posts: {
 *       title: string;
 *       tags: string[];
 *     }[];
 *   };
 * };
 *
 * type UserType = GetType<Data, "user">; // { name: string; posts: {...}[] }
 * type NameType = GetType<Data, "user.name">; // string
 * type PostsType = GetType<Data, "user.posts">; // { title: string; tags: string[] }[]
 * type PostType = GetType<Data, "user.posts[*]">; // { title: string; tags: string[] }
 * type TitleType = GetType<Data, "user.posts[*].title">; // string
 * type TagsType = GetType<Data, "user.posts[*].tags">; // string[]
 * type TagType = GetType<Data, "user.posts[*].tags[*]">; // string
 * ```
 */
export type GetType<T extends object, K extends DeepStrictObjectKeys<T>> =
  StringType.Split<K, '.'> extends [infer First extends keyof T]
    ? ValueOf<Pick<T, First>>
    : StringType.Split<K, '.'> extends [infer First extends string, ...infer Rest extends string[]]
      ? RemoveArraySymbol<First> extends keyof T
        ? ValueOf<Pick<T, RemoveArraySymbol<First>>> extends object
          ? ValueOf<Pick<T, RemoveArraySymbol<First>>> extends Array<infer E>
            ? E extends object
              ? GetType<E, Extract<ArrayType.Join<Rest, '.'>, DeepStrictObjectKeys<E>>>
              : E
            : GetType<
                ValueOf<Pick<T, RemoveArraySymbol<First>>>,
                Extract<ArrayType.Join<Rest, '.'>, DeepStrictObjectKeys<ValueOf<Pick<T, RemoveArraySymbol<First>>>>>
              >
          : never
        : T extends any[]
          ? RemoveArraySymbol<First> extends '' // just empty string type like as `[].campaign`
            ? GetType<ElementOf<T>, Extract<ArrayType.Join<Rest, '.'>, DeepStrictObjectKeys<ElementOf<T>>>>
            : never
          : never
      : never;
