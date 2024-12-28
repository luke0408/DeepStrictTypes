import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { DeepStrictOmit } from './DeepStrictOmit';
import type { DeepStrictUnbrand } from './DeepStrictUnbrand';
import type { RemoveAfterDot } from './RemoveAfterDot';
import type { RemoveLastProperty } from './RemoveLastProperty';

/**
 * @title 인터페이스에서 특정 키만을 뽑는 타입.
 * {@link DeepStrictObjectKeys} 을 이용해서 뽑을 키를 고를 수 있다.
 *
 * ```ts
 * type Example1 = DeepStrictPick<{ a: { b: 1; c: 2 } }, "a.b">;
 * type Example2 = DeepStrictPick<{ a: { b: 1; c: { d: number }[] } }, "a.c[*].d">;
 * type Example3 = DeepStrictPick<{ a: 1 }[], "[*].a">;
 * ```
 */
export type DeepStrictPick<T extends object, K extends DeepStrictObjectKeys<T>> = DeepStrictOmit<
  T,
  Exclude<
    DeepStrictObjectKeys<DeepStrictUnbrand<T>>,
    K | RemoveLastProperty<K> | RemoveAfterDot<DeepStrictUnbrand<T>, K>
  >
>;
