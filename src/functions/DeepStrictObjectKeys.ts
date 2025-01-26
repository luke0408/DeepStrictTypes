import { DeepStrictObjectKeys } from '../types';

export function deepStrictObjectKeys<
  T extends object,
  Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
>(target: T, joiner?: Joiner): DeepStrictObjectKeys<T, Joiner>[] {
  if (joiner === undefined) {
    joiner = { array: '[*]', object: '.' } as Joiner;
  }

  return Array.from(
    new Set(
      Object.entries(target).flatMap(([key, value]) => {
        if (value instanceof Array) {
          const children = value.flatMap((el) => deepStrictObjectKeys(el));
          return [key, ...children];
        } else if (value !== null && typeof value === 'object') {
          const children = deepStrictObjectKeys(value);
          return [key, ...children];
        }

        return [key];
      }),
    ),
  ) as DeepStrictObjectKeys<T, Joiner>[];
}
