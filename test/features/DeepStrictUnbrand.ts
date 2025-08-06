import { ok } from 'node:assert';
import typia from 'typia';
import { DeepStrictUnbrand, Equal } from '../../src';

/**
 * Tests that DeepStrictUnbrand correctly handles empty array.
 */
export function test_types_deep_strict_unbrand_empty_array() {
  type Question = DeepStrictUnbrand<[]>;
  type Answer = Equal<Question, []>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles two-dimensional empty array.
 */
export function test_types_deep_strict_unbrand_2d_empty_array() {
  type Question = DeepStrictUnbrand<[][]>;
  type Answer = Equal<Question, [][]>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles non-brand types.
 */
export function test_types_deep_strict_unbrand_non_brand_type() {
  type Question = DeepStrictUnbrand<string | Date>;
  type Answer = Equal<Question, string | Date>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles property that is not a brand type.
 */
export function test_types_deep_strict_unbrand_property_non_brand() {
  type Question = DeepStrictUnbrand<{ prop: string | Date }>;
  type Answer = Equal<Question, { prop: string | Date }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles brand types by removing branding.
 */
export function test_types_deep_strict_unbrand_brand_type() {
  type Question = DeepStrictUnbrand<string & Date>;
  type Answer = Equal<Question, string>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles property that is a brand type.
 */
export function test_types_deep_strict_unbrand_property_brand() {
  type Question = DeepStrictUnbrand<{ prop: string }>;
  type Answer = Equal<Question, { prop: string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles brand type in nested object.
 */
export function test_types_deep_strict_unbrand_nested_brand_type() {
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
}

/**
 * Tests that DeepStrictUnbrand correctly handles any array.
 */
export function test_types_deep_strict_unbrand_any_array() {
  type Question = DeepStrictUnbrand<any[]>;
  type Answer = Equal<Question, any[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles array of objects.
 */
export function test_types_deep_strict_unbrand_object_array() {
  type Question = DeepStrictUnbrand<{ a: number }[]>;
  type Answer = Equal<Question, { a: number }[]>;
  ok(typia.random<Answer>());
}
