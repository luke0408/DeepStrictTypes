import { ok } from 'node:assert';
import test from 'node:test';
import typia, { tags } from 'typia';
import { DeepStrictObjectLastKeys, Equal } from '../src';

test('Date props', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: Date;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('union with Date and string', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: Date | string;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('branding type of string (typia)', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: string & tags.Format<'date-time'>;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('branding type of string', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: number & { unit: 'dollar' | 'won' };
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('primitive type and object type / apply conservative type reasoning', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: number | { value: number; unit: 'dollar' | 'won' };
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('primitive type and array type / apply conservative type reasoning', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('union type with object and array / apply conservative type reasoning', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('nested object with 2 depth', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: { value: number; unit: 'dollar' | 'won' };
    other: number;
  }>;
  type Answer = Equal<Question, 'other' | 'prop.value' | 'prop.unit'>;
  ok(typia.random<Answer>());
});

test('nested object with 3 depth', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: {
      value: number;
      unit: 'dollar';
      country: {
        name: string;
        location: string;
      };
    };
    other: number;
  }>;
  type Answer = Equal<
    Question,
    | 'other' // depth 1
    | 'prop.value' // depth 2
    | 'prop.unit'
    | 'prop.country.name' // depth 3
    | 'prop.country.location'
  >;
  ok(typia.random<Answer>());
});

test('array property', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: number[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('union array property', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: (number | string)[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('array of branding type of string property', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: (string & { unit: 'dollar' | 'won' })[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('array of branding type of string property (typia)', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: (string & tags.Format<'uuid'>)[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
});

test('array of branding type of string property', () => {
  type Question = DeepStrictObjectLastKeys<{
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }>;
  type Answer = Equal<Question, 'other' | 'prop[*].unit' | 'prop[*].value'>;
  ok(typia.random<Answer>());
});

test('key in an array', () => {
  type Question = DeepStrictObjectLastKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[]
  >;
  type Answer = Equal<Question, '[*].other' | '[*].prop[*].unit' | '[*].prop[*].value'>;
  ok(typia.random<Answer>());
});

test('a key in a two-dimensional array', () => {
  type Question = DeepStrictObjectLastKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[][]
  >;
  type Answer = Equal<Question, '[*].[*].other' | '[*].[*].prop[*].unit' | '[*].[*].prop[*].value'>;
  ok(typia.random<Answer>());
});
