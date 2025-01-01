import { ok } from 'assert';
import test from 'node:test';
import typia from 'typia';
import { DeepStrictPick, Equal } from '../src';

interface Example {
  a: number;
  b: number;
  c: {
    d: string;
    e: string;
    f: {
      g: boolean;
      h: boolean;
    }[];
  }[];
}

test('DeepStrictPick(1)', () => {
  type Question = DeepStrictPick<Example, 'c[*].f[*].g'>;
  type Answer = Equal<Question, { c: { f: { g: boolean }[] }[] }>;

  ok(typia.random<Answer>());
});

test('DeepStrictPick(2)', () => {
  type Question = DeepStrictPick<Example, 'c[*].f'>;
  type Answer = Equal<Question, { c: { f: { g: boolean; h: boolean }[] }[] }>;

  ok(typia.random<Answer>());
});

test('DeepStrictPick(3)(1)', () => {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;

  ok(typia.random<Answer>());
});

test('DeepStrictPick(3)(2)', () => {
  type Question = DeepStrictPick<{ a: { b: 1; c: { d: number }[] } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;

  ok(typia.random<Answer>());
});

test('DeepStrictPick(3)(3)', () => {
  type Question = DeepStrictPick<{ a: 1 }[], '[*].a'>;
  type Answer = Equal<Question, { a: 1 }[]>;

  ok(typia.random<Answer>());
});
