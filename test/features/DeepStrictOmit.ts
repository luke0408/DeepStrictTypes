import { ok } from 'assert';
import typia from 'typia';
import { MaxLength, MinLength } from 'typia/lib/tags';
import { DeepStrictOmit, Equal } from '../../src';

import { IShoppingSale } from '@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSale';

/**
 * Tests that DeepStrictOmit correctly applies to primitive property type of branding type.
 */
export function test_types_deep_strict_omit_primitive_branding_type() {
  type TestInterface = {
    id: string;
    title: string;
    thumbnails: {
      name: null | (string & MinLength<1> & MaxLength<255>);
      extension: null | (string & MinLength<1> & MaxLength<8>);
      url: string;
    }[];
  };

  type Question = DeepStrictOmit<TestInterface, 'id'>;
  type IsAnswer = Equal<
    Question,
    {
      title: string;
      thumbnails: {
        name: null | (string & MinLength<1> & MaxLength<255>);
        extension: null | (string & MinLength<1> & MaxLength<8>);
        url: string;
      }[];
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit correctly applies to branding property type of branding type.
 */
export function test_types_deep_strict_omit_branding_property_type() {
  type Question = { id: string & typia.tags.Format<'uuid'>; name: string };
  type IsAnswer = Equal<DeepStrictOmit<Question, 'id'>, { name: string }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works with complex type example.
 */
export function test_types_deep_strict_omit_complex_type() {
  type ISummary = Pick<IShoppingSale.ISummary, 'id' | 'content'>;
  type Question = DeepStrictOmit<ISummary, 'content.id'>;
  type __Answer = Omit<ISummary, 'content'> & { content: Omit<ISummary['content'], 'id'> };

  type IsAnswer = Equal<Question, __Answer>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when picked property is branding type (typia).
 */
export function test_types_deep_strict_omit_picked_property_branding_typia() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<
    DeepStrictOmit<Question, 'id'>,
    {
      content: { id: string & typia.tags.Format<'uuid'> };
      name: string;
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when one of picked properties is branding type (typia).
 */
export function test_types_deep_strict_omit_one_picked_property_branding_typia() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<
    DeepStrictOmit<Question, 'id' | 'name'>,
    {
      content: { id: string & typia.tags.Format<'uuid'> };
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when one picked property is nested key type and branding type (typia).
 */
export function test_types_deep_strict_omit_nested_key_branding_typia() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<
    DeepStrictOmit<Question, 'content.id' | 'name'>,
    {
      id: string & typia.tags.Format<'uuid'>;
      content: {};
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when all properties are omitted.
 */
export function test_types_deep_strict_omit_all_properties() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<DeepStrictOmit<Question, 'id' | 'name' | 'content'>, {}>;
  ok(typia.random<IsAnswer>());
}
