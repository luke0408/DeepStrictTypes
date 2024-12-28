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
                ? `${P}`
                : `${P}` | `${P}${Joiner['object']}${__DeepStrictObjectKeys<T[P], Joiner>}`
            : never
  : never;

/**
 * @title 중첩된 객체 혹은 배열의 모든 키를 표기하는 타입.
 *
 * 중첩된 객체의 모든 키를 뽑는 타입으로, 만약 중첩된 객체가 있을 경우 점 기호를 기준으로 객체를 표현한다.
 * 배열인 경우에는 `[*]` 기호를 이용하여 표기한다.
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
  P extends keyof T = keyof T,
> =
  T extends Array<infer Element>
    ? Element extends object
      ? `${Joiner['array']}.${DeepStrictObjectKeys<Element, Joiner>}`
      : `${Joiner['array']}.${keyof Element extends string ? keyof Element : never}`
    : __DeepStrictObjectKeys<T, Joiner, P>;
