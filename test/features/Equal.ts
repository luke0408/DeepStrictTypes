import { ok } from 'node:assert';
import typia from 'typia';
import { Equal } from '../../src';

/**
 * Tests that Equal returns true for identical primitive types.
 */
export function test_types_equal_identical_primitives() {
  type Question = Equal<string, string>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for different primitive types.
 */
export function test_types_equal_different_primitives() {
  type Question = Equal<string, number>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns true for identical object types.
 */
export function test_types_equal_identical_objects() {
  type Question = Equal<{ a: number; b: string }, { a: number; b: string }>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for different object types with same keys but different value types.
 */
export function test_types_equal_different_object_values() {
  type Question = Equal<{ a: number; b: string }, { a: string; b: string }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for objects with different keys.
 */
export function test_types_equal_different_object_keys() {
  type Question = Equal<{ a: number }, { b: number }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles union types.
 */
export function test_types_equal_union_types() {
  type Question = Equal<string | number, string | number>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for different union types.
 */
export function test_types_equal_different_union_types() {
  type Question = Equal<string | number, string | boolean>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles array types.
 */
export function test_types_equal_array_types() {
  type Question = Equal<string[], string[]>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles never type.
 */
export function test_types_equal_never_type() {
  type Question = Equal<never, never>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles any type.
 */
export function test_types_equal_any_type() {
  type Question = Equal<any, any>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}