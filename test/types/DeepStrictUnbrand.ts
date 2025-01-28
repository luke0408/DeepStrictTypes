import { ok } from 'node:assert';
import test from 'node:test';
import typia from 'typia';
import { DeepStrictUnbrand, Equal } from '../../src';

test('If it is empty array', () => {
  type Question = DeepStrictUnbrand<[]>;
  type Answer = Equal<Question, []>;

  ok(typia.random<Answer>());
});

test('If it is empty array', () => {
  type Question = DeepStrictUnbrand<[][]>;
  type Answer = Equal<Question, [][]>;

  ok(typia.random<Answer>());
});

test('If it is not a brand type', () => {
  type Question = DeepStrictUnbrand<string | Date>;
  type Answer = Equal<Question, string | Date>;

  ok(typia.random<Answer>());
});

test('If property is not a brand type', () => {
  type Question = DeepStrictUnbrand<{ prop: string | Date }>;
  type Answer = Equal<Question, { prop: string | Date }>;

  ok(typia.random<Answer>());
});

test('If it is a brand type', () => {
  type Question = DeepStrictUnbrand<string & Date>;
  type Answer = Equal<Question, string>;

  ok(typia.random<Answer>());
});

test('If property is a brand type', () => {
  type Question = DeepStrictUnbrand<{ prop: string }>;
  type Answer = Equal<Question, { prop: string }>;

  ok(typia.random<Answer>());
});

test('If property is a brand type in nested object', () => {
  type Question = DeepStrictUnbrand<{
    nested: {
      prop: number & {
        type: 'WON';
      };
    };
  }>;

  type Answer = Equal<
    Question,
    {
      nested: {
        prop: number;
      };
    }
  >;

  ok(typia.random<Answer>());
});

test('if generic parameter is any[]', () => {
  type Question = DeepStrictUnbrand<any[]>;
  type Answer = Equal<Question, any[]>;
  ok(typia.random<Answer>());
});

test('if generic parameter is any[]', () => {
  type Question = DeepStrictUnbrand<{ a: number }[]>;
  type Answer = Equal<Question, { a: number }[]>;
  ok(typia.random<Answer>());
});
