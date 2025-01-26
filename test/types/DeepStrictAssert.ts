import test from 'node:test';
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

test('DeepStrictAssert(1)(1)', () => {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('a'));
});

test('DeepStrictAssert(1)(2)', () => {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('b'));
});

test('DeepStrictAssert(1)(3)', () => {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('c'));
});

test('DeepStrictAssert(2)(1)', () => {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('c[*].d'));
});

test('DeepStrictAssert(2)(2)', () => {
  typia.assertEquals(deepStrictAssert(typia.random<Example>())('c[*].e'));
});

test('DeepStrictAssert(2)(3)', () => {
  const original = typia.random<Example>();
  const answer = deepStrictAssert(original)('c[*].f');

  typia.assertEquals(answer);
});

test('DeepStrictAssert(3)(1)', () => {
  const original = typia.random<Example>();
  typia.assertEquals(deepStrictAssert(original)('c[*].f[*].g'));
});

test('DeepStrictAssert(3)(2)', () => {
  const original = typia.random<Example>();
  typia.assertEquals(deepStrictAssert(original)('c[*].f[*].h'));
});

test('DeepStrictAssert(4)', () => {
  const original = typia.random<Example[] & tags.MinItems<1>>();
  typia.assertEquals(deepStrictAssert(original)('[*].a'));
});
