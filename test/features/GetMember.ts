import { ok } from 'node:assert';
import typia from 'typia';
import { GetMember, GetElementMember, Equal } from '../../src';

/**
 * Tests that GetMember correctly extracts a simple member key.
 */
export function test_types_get_member_simple() {
  type Question = GetMember<"a.b", "a">;
  type Answer = Equal<Question, "b">;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetMember correctly extracts a nested member key.
 */
export function test_types_get_member_nested() {
  type Question = GetMember<"a.b.c", "a">;
  type Answer = Equal<Question, "b.c">;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetMember returns never for non-matching keys.
 */
export function test_types_get_member_no_match() {
  type Question = GetMember<"a.b.c", "d">;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetMember handles deeply nested keys.
 */
export function test_types_get_member_deep_nested() {
  type Question = GetMember<"root.level1.level2.level3", "root">;
  type Answer = Equal<Question, "level1.level2.level3">;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetElementMember correctly extracts member from array element key.
 */
export function test_types_get_element_member_array() {
  type Question = GetElementMember<"a[*].b", "a">;
  type Answer = Equal<Question, "b">;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetElementMember falls back to GetMember for regular keys.
 */
export function test_types_get_element_member_fallback() {
  type Question = GetElementMember<"a.b.c", "a">;
  type Answer = Equal<Question, "b.c">;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetElementMember handles nested array element keys.
 */
export function test_types_get_element_member_nested_array() {
  type Question = GetElementMember<"items[*].details.name", "items">;
  type Answer = Equal<Question, "details.name">;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetElementMember returns never for non-matching array element keys.
 */
export function test_types_get_element_member_no_match() {
  type Question = GetElementMember<"a[*].b", "c">;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}