import { ok } from 'assert';
import test from 'node:test';
import typia, { tags } from 'typia';
import { Equal, GetType } from '../src';

test('Date props', () => {
  type Question = GetType<
    {
      prop: Date;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, Date>;
  ok(typia.random<Answer>());
});

test('union with Date and string', () => {
  type Question = GetType<
    {
      prop: Date | string;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, Date | string>;
  ok(typia.random<Answer>());
});

test('branding type of string (typia)', () => {
  type Question = GetType<
    {
      prop: string & tags.Format<'date-time'>;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, string & tags.Format<'date-time'>>;
  ok(typia.random<Answer>());
});

test('branding type of string', () => {
  type Question = GetType<
    {
      prop: number & { unit: 'dollar' | 'won' };
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number & { unit: 'dollar' | 'won' }>;
  ok(typia.random<Answer>());
});

test('primitive type and object type / apply conservative type reasoning', () => {
  type Question = GetType<
    {
      prop: number | { value: number; unit: 'dollar' | 'won' };
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number | { value: number; unit: 'dollar' | 'won' }>;
  ok(typia.random<Answer>());
});

test('primitive type and array type / apply conservative type reasoning', () => {
  type Question = GetType<
    {
      prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number | Array<{ value: number; unit: 'dollar' | 'won' }>>;
  ok(typia.random<Answer>());
});

test('union type with object and array / apply conservative type reasoning', () => {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<
    Question,
    { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>
  >;
  ok(typia.random<Answer>());
});

test('nested object with 2 depth', () => {
  type Answer = Equal<
    GetType<
      {
        prop: { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      'prop.value'
    >,
    number
  >;

  ok(typia.random<Answer>());
});

test('nested object with 2 depth', () => {
  type Answer = Equal<
    GetType<
      {
        prop: { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      'prop.unit'
    >,
    'dollar' | 'won'
  >;

  ok(typia.random<Answer>());
});

test('nested object with 3 depth', () => {
  type Question = GetType<
    {
      prop: {
        value: number;
        unit: 'dollar';
        country: {
          name: string;
          location: string;
        };
      };
      other: number;
    },
    'prop.country.name'
  >;
  type Answer = Equal<Question, string>;
  ok(typia.random<Answer>());
});

test('array property', () => {
  type Question = GetType<
    {
      prop: number[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number[]>;
  ok(typia.random<Answer>());
});

test('union array property', () => {
  type Question = GetType<
    {
      prop: (number | string)[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, (string | number)[]>;
  ok(typia.random<Answer>());
});

test('array of branding type of string property', () => {
  type Question = GetType<
    {
      prop: (string & { unit: 'dollar' | 'won' })[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, (string & { unit: 'dollar' | 'won' })[]>;
  ok(typia.random<Answer>());
});

test('array of branding type of string property (typia)', () => {
  type Question = GetType<
    {
      prop: (string & tags.Format<'uuid'>)[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, (string & tags.Format<'uuid'>)[]>;
  ok(typia.random<Answer>());
});

test('array of branding type of string property', () => {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, { value: number; unit: 'dollar' | 'won' }[]>;
  ok(typia.random<Answer>());
});

test('key in an array', () => {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[],
    '[*].prop'
  >;
  type Answer = Equal<Question, { value: number; unit: 'dollar' | 'won' }[]>;
  ok(typia.random<Answer>());
});

test('a key in a two-dimensional array', () => {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[][],
    '[*].[*].prop[*].unit'
  >;
  type Answer = Equal<Question, 'dollar' | 'won'>;
  ok(typia.random<Answer>());
});
