import { ok } from 'assert';
import test from 'node:test';
import typia from 'typia';
import { MaxLength, MinLength } from 'typia/lib/tags';
import { DeepStrictOmit, Equal } from '../src';

import { IShoppingSale } from '@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSale';

test('TEST 1. apply DeepStrictOmit to primitive property type of branding type', () => {
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
});

test('TEST 1. apply DeepStrictOmit to branding property type of branding type', () => {
  type Question = { id: string & typia.tags.Format<'uuid'>; name: string };
  type IsAnswer = Equal<DeepStrictOmit<Question, 'id'>, { name: string }>;
  ok(typia.random<IsAnswer>());
});

test('TEST 1', () => {
  type ISummary = Pick<IShoppingSale.ISummary, 'id' | 'content'>;
  type Question = DeepStrictOmit<ISummary, 'content.id'>;
  type __Answer = Omit<ISummary, 'content'> & { content: Omit<ISummary['content'], 'id'> };

  type IsAnswer = Equal<Question, __Answer>;
  ok(typia.random<IsAnswer>());
});

test('TEST 1', () => {
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
});

test('TEST 1', () => {
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
});

test('TEST 1', () => {
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
});
