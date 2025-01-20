import type { Equal } from './Equal';

/**
 * 제네릭 타입 `T`가 자기 자신의 요소와 동일한지를 검증한다.
 */
type IsPartitionSameEntire<T, P = T> = T extends any // T를 각각의 요소 타입으로 분리하기 위한 조건부 타입
  ? P extends T // 유니온 타입이면 이 조건부 타입에서 false | true가 나와야 한다.
    ? false
    : true
  : never;

/**
 * @title Type for checking if a type is a union type.
 *
 * This type uses the `IsPartitionSameEntire` type to check whether the provided type `T` is a union type.
 * - It works by partitioning the type `T` and checking if the type consists of multiple distinct elements.
 * - If the type `T` is a union type, the result will be `true`, otherwise `false`.
 *
 * Example usage:
 * ```ts
 * type Test1 = IsUnion<string | number>; // true
 * type Test2 = IsUnion<string>; // false
 * ```
 */
export type IsUnion<T> = Equal<IsPartitionSameEntire<T>, boolean> extends true ? true : false;
