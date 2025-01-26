import { DeepStrictObjectKeys } from '../types';

export function deepStrictObjectKeys<
  T extends object,
  Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
>(target: T, joiner?: Joiner): DeepStrictObjectKeys<T, Joiner, false>[] {
  if (joiner === undefined) {
    joiner = { array: '[*]', object: '.' } as Joiner;
  }

  return Array.from(
    new Set(
      Object.entries(target).flatMap(([key, value]) => {
        if (target instanceof Array) {
          return deepStrictObjectKeys(value, joiner).map((el) => `${joiner.array}.${el}`);
        } else if (target !== null && typeof target === 'object') {
          return deepStrictObjectKeys(value, joiner).flatMap((el) => `${joiner.object}.${el}`);
        } else {
          return [];
        }
      }),
    ),
  ) as DeepStrictObjectKeys<T, Joiner>[];
}
