import { DeepStrictObjectKeys } from './types/DeepStrictObjectKeys';
import { DeepStrictPick } from './types/DeepStrictPick';

export const deepStrictAssert =
  <T extends object>(input: T) =>
  <K extends DeepStrictObjectKeys<T>>(key: K): DeepStrictPick<T, K> => {
    const keys = key.split(/(?:\[\*\])?\./g).filter(Boolean);

    console.log(keys);
    const traverse = (input: Record<string, any> | Record<string, any>[], keys: string[]): any => {
      const [first, ...rest] = keys;
      console.log(first);

      if (input instanceof Array) {
        const elements = input.map((element) => {
          if (first in element) {
            if (typeof element[first] === 'object' && element[first] !== null) {
              return { [first]: traverse(element[first], rest) };
            }

            return { [first]: element[first] };
          }

          return element;
        });

        return elements;
      } else {
        if (first in input) {
          if (typeof input[first] === 'object' && input[first] !== null) {
            return { [first]: traverse(input[first], rest) };
          }
          return { [first]: input[first] };
        }

        throw new Error(`input doesn\'t has key: ${first}`);
      }
    };

    return traverse(input, keys) as DeepStrictPick<T, K>;
  };
