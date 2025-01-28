import { ok } from 'node:assert';
import test, { describe } from 'node:test';
import typia, { tags } from 'typia';
import { DeepStrictObjectKeys, Equal } from '../../src';

describe('empty array', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      [],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, never>;
    ok(typia.random<Answer>());
  });

  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      [],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, never>;
    ok(typia.random<Answer>());
  });
});

describe('array of any', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      any[],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, '[*]'>;
    ok(typia.random<Answer>());
  });

  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      any[],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, '[*]'>;
    ok(typia.random<Answer>());
  });
});

describe('number array', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      [1],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, '[*]'>;
    ok(typia.random<Answer>());
  });

  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      [1],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, '[*]'>;
    ok(typia.random<Answer>());
  });
});

describe('Date props', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: Date;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: Date;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('union with Date and string', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: Date | string;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: Date | string;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('branding type of string (typia)', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: string & tags.Format<'date-time'>;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: string & tags.Format<'date-time'>;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('array as branding type of string (typia)', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (string & tags.Format<'date-time'>)[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;

    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (string & tags.Format<'date-time'>)[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('branding type of string', () => {
  test('normal: isNotSafe', () => {});
  type Question = DeepStrictObjectKeys<
    {
      prop: number & { unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other'>;
  ok(typia.random<Answer>());

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number & { unit: 'dollar' | 'won' };
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('primitive type and object type / apply conservative type reasoning', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number | { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number | { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('primitive type and array type / apply conservative type reasoning', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;

    type Answer = Equal<Question, 'prop' | 'other' | 'prop[*].value' | 'prop[*].unit'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('union type with object and array / apply conservative type reasoning', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit' | 'prop[*].value' | 'prop[*].unit'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('nested object with 2 depth', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit'>;
    ok(typia.random<Answer>());
  });
});

describe('nested object with 3 depth', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
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
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<
      Question,
      | 'prop' // depth 1
      | 'other'
      | 'prop.value' // depth 2
      | 'prop.unit'
      | 'prop.country'
      | 'prop.country.name' // depth 3
      | 'prop.country.location'
    >;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
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
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<
      Question,
      | 'prop' // depth 1
      | 'other'
      | 'prop.value' // depth 2
      | 'prop.unit'
      | 'prop.country'
      | 'prop.country.name' // depth 3
      | 'prop.country.location'
    >;
    ok(typia.random<Answer>());
  });
});

describe('array property', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: number[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('union array property', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (number | string)[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (number | string)[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('array of branding type of string property', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (string & { unit: 'dollar' | 'won' })[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (string & { unit: 'dollar' | 'won' })[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('array of branding type of string property (typia)', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (string & tags.Format<'uuid'>)[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: (string & tags.Format<'uuid'>)[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other'>;
    ok(typia.random<Answer>());
  });
});

describe('array of branding type of string property', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' }[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, 'prop' | 'other' | 'prop[*].unit' | 'prop[*].value'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' }[];
        other: number;
      },
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, 'prop' | 'other' | 'prop[*].unit' | 'prop[*].value'>;
    ok(typia.random<Answer>());
  });
});

describe('key in an array', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' }[];
        other: number;
      }[],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, '[*]' | '[*].prop' | '[*].other' | '[*].prop[*].value' | '[*].prop[*].unit'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' }[];
        other: number;
      }[],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, '[*]' | '[*].prop' | '[*].other' | '[*].prop[*].value' | '[*].prop[*].unit'>;
    ok(typia.random<Answer>());
  });
});

describe('a key in a two-dimensional array', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' }[];
        other: number;
      }[][],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<
      Question,
      '[*]' | '[*].[*]' | '[*].[*].prop' | '[*].[*].other' | '[*].[*].prop[*].value' | '[*].[*].prop[*].unit'
    >;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      {
        prop: { value: number; unit: 'dollar' | 'won' }[];
        other: number;
      }[][],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<
      Question,
      '[*]' | '[*].[*]' | '[*].[*].prop' | '[*].[*].other' | '[*].[*].prop[*].value' | '[*].[*].prop[*].unit'
    >;
    ok(typia.random<Answer>());
  });
});

describe('readonly empty array. (tuple)', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      readonly [],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, never>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      readonly [],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, never>;
    ok(typia.random<Answer>());
  });
});

describe('readonly not empty array. (tuple)', () => {
  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      readonly [1],
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, '[*]'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      readonly [1],
      {
        array: '[*]';
        object: '.';
      },
      true
    >;
    type Answer = Equal<Question, '[*]'>;
    ok(typia.random<Answer>());
  });
});

describe('Array<{a:number}>', () => {
  type Target = { a: number }[];

  test('normal: isNotSafe', () => {
    type Question = DeepStrictObjectKeys<
      Target,
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, '[*]' | '[*].a'>;
    ok(typia.random<Answer>());
  });

  test('normal: isSafe', () => {
    type Question = DeepStrictObjectKeys<
      Target,
      {
        array: '[*]';
        object: '.';
      },
      false
    >;
    type Answer = Equal<Question, '[*]' | '[*].a'>;
    ok(typia.random<Answer>());
  });
});
