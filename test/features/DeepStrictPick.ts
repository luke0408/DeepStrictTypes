import { ok } from 'assert';
import typia from 'typia';
import { DeepStrictPick, Equal } from '../../src';

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

/**
 * Tests that DeepStrictPick correctly picks nested array properties.
 */
export function test_types_deep_strict_pick_nested_array_property() {
  type Question = DeepStrictPick<Example, 'c[*].f[*].g'>;
  type Answer = Equal<Question, { c: { f: { g: boolean }[] }[] }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks array of objects.
 */
export function test_types_deep_strict_pick_array_of_objects() {
  type Question = DeepStrictPick<Example, 'c[*].f'>;
  type Answer = Equal<Question, { c: { f: { g: boolean; h: boolean }[] }[] }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks nested object property.
 */
export function test_types_deep_strict_pick_nested_object_property() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks simple property from complex object.
 */
export function test_types_deep_strict_pick_simple_from_complex() {
  type Question = DeepStrictPick<{ a: { b: 1; c: { d: number }[] } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks from array using array notation.
 */
export function test_types_deep_strict_pick_from_array_notation() {
  type Question = DeepStrictPick<{ a: 1 }[], '[*].a'>;
  type Answer = Equal<Question, { a: 1 }[]>;

  ok(typia.random<Answer>());
}
