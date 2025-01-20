/**
 * @title Type for checking if a type is `any`.
 *
 * This type uses a conditional check to determine if the provided type `T` is `any`.
 * - It works by checking if the type `T` extends from a condition that results in `true` when `T` is `any`, and `false` otherwise.
 * - If `T` is `any`, it resolves to `true`, otherwise it resolves to `false`.
 *
 * Example usage:
 * ```ts
 * type Test1 = IsAny<any>; // true
 * type Test2 = IsAny<string>; // false
 * ```
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
