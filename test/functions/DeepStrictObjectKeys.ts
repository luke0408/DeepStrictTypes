import { ok } from 'node:assert';
import test from 'node:test';
import typia, { tags } from 'typia';
import { deepStrictObjectKeys, DeepStrictObjectKeys } from '../../src';

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

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] union type with object and array / apply conservative type reasoning', () => {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
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

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] union array property', () => {
  interface Target {
    prop: (number | string)[];
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] array of branding type of string property', () => {
  interface Target {
    prop: (string & { unit: 'dollar' | 'won' })[];
    other: number;
  }
  const target: Target = { prop: ['1' as string & { unit: 'dollar' | 'won' }], other: 1 };

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] array of branding type of string property (typia)', () => {
  interface Target {
    prop: (string & tags.Format<'uuid'>)[];
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] array of branding type of string property', () => {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] [deepStrictObjectKeys] key in an array', () => {
  type Target = {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }[];
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] 1. [deepStrictObjectKeys] a key in a two-dimensional array', () => {
  type Target = {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }[][];
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});

test('[function] 2. [deepStrictObjectKeys] a key in a two-dimensional array', () => {
  type Target = { a: 1 }[][];
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
});
