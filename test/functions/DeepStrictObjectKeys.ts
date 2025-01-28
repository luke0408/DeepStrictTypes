import assert, { deepStrictEqual, ok } from 'node:assert';
import test, { describe } from 'node:test';
import typia, { tags } from 'typia';
import { DeepStrictObjectKeys, deepStrictObjectKeys, Equal } from '../../src';

describe('[function] Definition of `deepStrictObjectKeys` function', () => {
  test('just empty object', () => {
    const keys = deepStrictObjectKeys({}); // It must be just `[]`.
    type Answer = Equal<typeof keys, never[]>;
    ok(typia.random<Answer>());
  });

  test('just empty array', () => {
    const keys = deepStrictObjectKeys([]); // It must be just `[]`.
    const elements: string[] = [];
    deepStrictEqual(keys, elements);
  });

  test('just empty readonly array', () => {
    const keys = deepStrictObjectKeys([] as const); // It must be just `[]`.
    const elements: string[] = [];
    deepStrictEqual(keys, elements);
  });

  test('array in object with `as const`', () => {
    const keys = deepStrictObjectKeys({ a: [1] } as const); // It must be just `['a', 'a.0']`.
    const elements = ['a', 'a.0'];

    assert(typia.misc.literals<(typeof keys)[number]>().length === elements.length);
    deepStrictEqual(keys, elements);
  });

  test('', () => {
    const target = { a: [] } as const;
    const keys = deepStrictObjectKeys(target); // ['a']
    const elements = ['a'];

    assert(typia.misc.literals<(typeof keys)[number]>().length === elements.length);
    deepStrictEqual(keys, elements);
  });

  test('', () => {
    const target = { a: [1, 2, 3, 4] } as const;
    const keys = deepStrictObjectKeys(target);
    const elements = ['a', 'a.0', 'a.1', 'a.2', 'a.3'];

    assert(typia.misc.literals<(typeof keys)[number]>().length === elements.length);
    deepStrictEqual(keys, elements);
  });
});

test('[function] [deepStrictObjectKeys] Date props', () => {
  interface Target {
    prop: Date;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] union with Date and string', () => {
  interface Target {
    prop: Date | string;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] branding type of string (typia)', () => {
  interface Target {
    prop: string & tags.Format<'date-time'>;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] branding type of string', () => {
  interface Target {
    prop: number & { unit: 'dollar' | 'won' };
    other: number;
  }
  const target: Target = { prop: 1 as number & { unit: 'dollar' | 'won' }, other: 1 };

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] primitive type and object type / apply conservative type reasoning', () => {
  interface Target {
    prop: number | { value: number; unit: 'dollar' | 'won' };
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] primitive type and array type / apply conservative type reasoning', () => {
  interface Target {
    prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`>(key);
    ok(result, `actual: ${key}`);
  }
});

test('[function] [deepStrictObjectKeys] union type with object and array / apply conservative type reasoning', () => {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<
      'prop' | 'other' | 'prop.value' | 'prop.unit' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`
    >(key);
    ok(result, `actual: ${key}`);
  }
});

test('[function] [deepStrictObjectKeys] nested object with 2 depth', () => {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' };
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] nested object with 3 depth', () => {
  interface Target {
    prop: {
      value: number;
      unit: 'dollar';
      country: {
        name: string;
        location: string;
      };
    };
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] array property', () => {
  interface Target {
    prop: number[];
    other: number;
  }
  const target = typia.random<Target>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}`>(key);
    ok(result);
  }
});

test('[function] [deepStrictObjectKeys] union array property', () => {
  interface Target {
    prop: (number | string)[];
    other: number;
  }
  const target = typia.random<Target>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}`>(key);
    ok(result);
  }
});

test('[function] 1. [deepStrictObjectKeys] array of branding type of string property', () => {
  interface Target {
    prop: (string & { unit: 'dollar' | 'won' })[];
    other: number;
  }
  const target: Target = { prop: ['1' as string & { unit: 'dollar' | 'won' }], other: 1 };
  const keys = deepStrictObjectKeys(target); // 'prop', 'other'
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}`>(key);
    ok(result, `actual: ${key}`);
  }
});

test('[function] 2. [deepStrictObjectKeys] array of branding type of string property (typia)', () => {
  interface Target {
    prop: (string & tags.Format<'uuid'>)[];
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`>(key);
    ok(result);
  }
});

test('[function] 3. [deepStrictObjectKeys] array of branding type of string property', () => {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`>(key);
    ok(result);
  }
});

test('[function] [deepStrictObjectKeys] key in an array', () => {
  type Target = {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }[];
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<
      | `${number}`
      | `${number}.prop.${number}`
      | `${number}.prop`
      | `${number}.other`
      | `${number}.prop.${number}.value`
      | `${number}.prop.${number}.unit`
    >(key);
    ok(result);
  }
});

test('[function] 1. [deepStrictObjectKeys] a key in a two-dimensional array', () => {
  type Target = {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }[][];
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<
      | `${number}`
      | `${number}.${number}`
      | `${number}.${number}.prop`
      | `${number}.${number}.other`
      | `${number}.${number}.prop.${number}`
      | `${number}.${number}.prop.${number}.value`
      | `${number}.${number}.prop.${number}.unit`
    >(key);
    ok(result, `actual: ${key}`);
  }
});

test('[function] 2. [deepStrictObjectKeys] a key in a two-dimensional array', () => {
  type Target = { a: 1 }[][];
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target); // 0.0.a, 0.1.a, 1.0.a ... `${number}.${number}.a`
  for (const key of keys) {
    const result = typia.is<`${number}` | `${number}.${number}` | `${number}.${number}.a`>(key);
    ok(result);
  }
});

test('[function] 1. array and `as const`', () => {
  const keys = deepStrictObjectKeys([] as const);
  deepStrictEqual(keys, []);
});

test('[function] 2. array and `as const`', () => {
  const keys = deepStrictObjectKeys([1] as const);
  for (const key of keys) {
    const result = typia.is<`${number}`>(key);
    ok(result);
  }
});
