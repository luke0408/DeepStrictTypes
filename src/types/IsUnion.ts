import type { Equal } from './Equal';

/**
 * Helper type that checks if a partition of type T is the same as the entire type T.
 * This works by distributing T through conditional types and checking if each partition
 * equals the whole. For union types, this produces `false | true`, while for single types
 * it produces just `false`.
 *
 * @internal
 * @template T - The type to check
 * @template P - The preserved original type (defaults to T)
 */
type IsPartitionSameEntire<T, P = T> = T extends any // Distribute T to each element for union types
  ? P extends T // If T is a union, this conditional produces false | true
    ? false
    : true
  : never;

/**
 * @title Type for checking if a type is a union type.
 *
 * This type uses the `IsPartitionSameEntire` helper type to check whether the provided type `T` is a union type.
 * It works by partitioning the type `T` and checking if the type consists of multiple distinct elements.
 *
 * The detection mechanism:
 * - For union types: produces `boolean` (which is `false | true`)
 * - For single types: produces `false`
 * - Then checks if the result equals `boolean` to determine if it's a union
 *
 * @template T - The type to check
 * @returns `true` if T is a union type, `false` otherwise
 *
 * @example
 * ```typescript
 * type Test1 = IsUnion<string | number>; // true
 * type Test2 = IsUnion<string>; // false
 * type Test3 = IsUnion<'a' | 'b' | 'c'>; // true
 * type Test4 = IsUnion<{ a: string } | { b: number }>; // true
 * type Test5 = IsUnion<never>; // false
 * type Test6 = IsUnion<unknown>; // false
 * type Test7 = IsUnion<any>; // false
 * type Test8 = IsUnion<boolean>; // true (boolean is true | false)
 * ```
 */
export type IsUnion<T> = Equal<IsPartitionSameEntire<T>, boolean> extends true ? true : false;
