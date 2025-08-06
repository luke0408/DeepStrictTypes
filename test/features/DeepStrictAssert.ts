import typia, { tags } from 'typia';
import { deepStrictAssert } from '../../src';

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
 * Tests that deepStrictAssert can access a top-level property 'a' from an object
 */
export function test_functions_deepStrictAssert_accesses_top_level_property_a() {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('a'));
}

/**
 * Tests that deepStrictAssert can access a top-level property 'b' from an object
 */
export function test_functions_deepStrictAssert_accesses_top_level_property_b() {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('b'));
}

/**
 * Tests that deepStrictAssert can access a top-level array property 'c' from an object
 */
export function test_functions_deepStrictAssert_accesses_top_level_array_property_c() {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('c'));
}

/**
 * Tests that deepStrictAssert can access nested property 'd' from all elements in array 'c'
 * using wildcard notation 'c[*].d'
 */
export function test_functions_deepStrictAssert_accesses_nested_property_d_in_array_with_wildcard() {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('c[*].d'));
}

/**
 * Tests that deepStrictAssert can access nested property 'e' from all elements in array 'c'
 * using wildcard notation 'c[*].e'
 */
export function test_functions_deepStrictAssert_accesses_nested_property_e_in_array_with_wildcard() {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('c[*].e'));
}

/**
 * Tests that deepStrictAssert can access nested array property 'f' from all elements in array 'c'
 * using wildcard notation 'c[*].f'
 */
export function test_functions_deepStrictAssert_accesses_nested_array_f_in_array_with_wildcard() {
  const original = typia.random<Example>();
  const answer = deepStrictAssert(original)('c[*].f');

  typia.assertEquals(answer);
}

/**
 * Tests that deepStrictAssert can access deeply nested property 'g' through double array navigation
 * using wildcard notation 'c[*].f[*].g'
 */
export function test_functions_deepStrictAssert_accesses_deeply_nested_property_g_with_double_wildcard() {
  const original = typia.random<Example>();
  typia.assertEquals(deepStrictAssert(original)('c[*].f[*].g'));
}

/**
 * Tests that deepStrictAssert can access deeply nested property 'h' through double array navigation
 * using wildcard notation 'c[*].f[*].h'
 */
export function test_functions_deepStrictAssert_accesses_deeply_nested_property_h_with_double_wildcard() {
  const original = typia.random<Example>();
  typia.assertEquals(deepStrictAssert(original)('c[*].f[*].h'));
}

/**
 * Tests that deepStrictAssert can access property 'a' from all elements when the root is an array
 * using wildcard notation '[*].a'
 */
export function test_functions_deepStrictAssert_accesses_property_a_from_root_array_with_wildcard() {
  const original = typia.random<Example[] & tags.MinItems<1>>();
  typia.assertEquals(deepStrictAssert(original)('[*].a'));
}
