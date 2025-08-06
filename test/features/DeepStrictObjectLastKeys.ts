import { ok } from 'node:assert';
import typia, { tags } from 'typia';
import { DeepStrictObjectLastKeys, Equal } from '../../src';

/**
 * Tests that DeepStrictObjectLastKeys correctly handles Date properties.
 */
export function test_types_deep_strict_object_last_keys_date_props() {
  type Question = DeepStrictObjectLastKeys<{
    prop: Date;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles union with Date and string.
 */
export function test_types_deep_strict_object_last_keys_union_date_string() {
  type Question = DeepStrictObjectLastKeys<{
    prop: Date | string;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles branding type of string (typia).
 */
export function test_types_deep_strict_object_last_keys_branding_string_typia() {
  type Question = DeepStrictObjectLastKeys<{
    prop: string & tags.Format<'date-time'>;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles branding type of number.
 */
export function test_types_deep_strict_object_last_keys_branding_number() {
  type Question = DeepStrictObjectLastKeys<{
    prop: number & { unit: 'dollar' | 'won' };
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys applies conservative type reasoning for primitive and object union.
 */
export function test_types_deep_strict_object_last_keys_primitive_object_union() {
  type Question = DeepStrictObjectLastKeys<{
    prop: number | { value: number; unit: 'dollar' | 'won' };
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys applies conservative type reasoning for primitive and array union.
 */
export function test_types_deep_strict_object_last_keys_primitive_array_union() {
  type Question = DeepStrictObjectLastKeys<{
    prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys applies conservative type reasoning for object and array union.
 */
export function test_types_deep_strict_object_last_keys_object_array_union() {
  type Question = DeepStrictObjectLastKeys<{
    prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles nested object with 2 depth.
 */
export function test_types_deep_strict_object_last_keys_nested_object_2_depth() {
  type Question = DeepStrictObjectLastKeys<{
    prop: { value: number; unit: 'dollar' | 'won' };
    other: number;
  }>;
  type Answer = Equal<Question, 'other' | 'prop.value' | 'prop.unit'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles nested object with 3 depth.
 */
export function test_types_deep_strict_object_last_keys_nested_object_3_depth() {
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
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles array property.
 */
export function test_types_deep_strict_object_last_keys_array_property() {
  type Question = DeepStrictObjectLastKeys<{
    prop: number[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles union array property.
 */
export function test_types_deep_strict_object_last_keys_union_array_property() {
  type Question = DeepStrictObjectLastKeys<{
    prop: (number | string)[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles array of branding type of string property.
 */
export function test_types_deep_strict_object_last_keys_array_branding_string() {
  type Question = DeepStrictObjectLastKeys<{
    prop: (string & { unit: 'dollar' | 'won' })[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles array of branding type of string property (typia).
 */
export function test_types_deep_strict_object_last_keys_array_branding_string_typia() {
  type Question = DeepStrictObjectLastKeys<{
    prop: (string & tags.Format<'uuid'>)[];
    other: number;
  }>;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles array of object with branding properties.
 */
export function test_types_deep_strict_object_last_keys_array_object_branding() {
  type Question = DeepStrictObjectLastKeys<{
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }>;
  type Answer = Equal<Question, 'other' | 'prop[*].unit' | 'prop[*].value'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles keys in an array.
 */
export function test_types_deep_strict_object_last_keys_in_array() {
  type Question = DeepStrictObjectLastKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[]
  >;
  type Answer = Equal<Question, '[*].other' | '[*].prop[*].unit' | '[*].prop[*].value'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectLastKeys correctly handles keys in a two-dimensional array.
 */
export function test_types_deep_strict_object_last_keys_in_2d_array() {
  type Question = DeepStrictObjectLastKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[][]
  >;
  type Answer = Equal<Question, '[*].[*].other' | '[*].[*].prop[*].unit' | '[*].[*].prop[*].value'>;
  ok(typia.random<Answer>());
}
