import { DeepStrictObjectKeys } from '../types';

type RemoveStartWithDot<T extends string> = T extends `.${infer R extends string}` ? R : T;

type Replace<T extends string> = ReplaceWildcard<T>;

type ReplaceWildcard<S extends string> = S extends '[*]'
  ? `${number}`
  : S extends `[*].${infer Rest}`
    ? `${number}.${ReplaceWildcard<Rest>}`
    : S extends `${infer Prefix extends string}.[*]${infer Rest}` // `[ ]` 패턴을 찾음
      ? `${Prefix}.${number}${ReplaceWildcard<Rest>}` // `[ ]`를 `${number}`로 대체하고, 나머지를 재귀 처리
      : S extends `${infer Prefix extends string}[*]${infer Rest}`
        ? `${Prefix}.${number}${ReplaceWildcard<Rest>}`
        : S; // 더 이상 `[ ]`가 없으면 문자열 반환

type ReturnType<
  Target extends object,
  Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
> = [Target] extends [never] ? [] : RemoveStartWithDot<Replace<DeepStrictObjectKeys<Target, Joiner, false>>>[];

export function deepStrictObjectKeys<
  Target extends object,
  Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
>(target: Target): ReturnType<Target, Joiner> {
  let joiner: Joiner = { array: '[*]', object: '.' } as Joiner;
  if (joiner === undefined) {
    joiner = { array: '[*]', object: '.' } as Joiner;
  }

  const response = [];
  const keys = Object.keys(target);
  response.push(...keys);

  for (const key of keys) {
    if (key in target) {
      const value = (target as any)[key];
      if (typeof value === 'object' && value !== null) {
        const children = deepStrictObjectKeys(value).map((el) => `${key}.${el}`);
        response.push(...children);
      }
    }
  }

  return Array.from(new Set(response)) as ReturnType<Target, Joiner>;
}
