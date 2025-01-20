/**
 * @title Type for Retrieving Members from a Specific Key.
 *
 * The `GetMember<T, O>` type extracts the part of the key `T` after the given prefix key `O`.
 * If `T` starts with `O`, it returns the remaining portion of the key after `O`.
 *
 * Example Usage:
 * ```ts
 * type b = GetMember<"a.b", "a">; // "b"
 * type b_c = GetMember<"a.b.c", "a">; // "b.c"
 * ```
 */
export type GetMember<T extends string, O extends string> = T extends `${O}.${infer Rest}` ? Rest : never;

/**
 * @title Type for Retrieving the Key of an Element Member from a Specific Key.
 *
 * The `GetElementMember<T, First>` type handles both regular keys and array element keys.
 * If the key `T` represents an array element (denoted by `[*]`), it returns the key after the array element.
 * Otherwise, it falls back to using `GetMember<T, First>` to retrieve the remaining portion of the key.
 *
 * Example Usage:
 * ```ts
 * type ElementKey = GetElementMember<"a[*].b", "a">; // "b"
 * type NestedKey = GetElementMember<"a.b.c", "a">; // "b.c"
 * ```
 */
export type GetElementMember<T extends string, First extends string> = T extends `${First}[*].${infer Rest}`
  ? Rest
  : GetMember<T, First>;
