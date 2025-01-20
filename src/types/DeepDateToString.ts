/**
 * A utility type that recursively converts all `Date` types within a nested object or array to `string`.
 *
 * - If `T` is an array of objects, the type processes each element recursively.
 * - If `T` is a `Date`, it is converted to `string`.
 * - If `T` is an object, each key is checked recursively for `Date` types or nested objects.
 */
export type DeepDateToString<T> =
  T extends Array<infer I extends object>
    ? Array<DeepDateToString<I>>
    : T extends Date
      ? string
      : {
          [K in keyof T]: T[K] extends infer I
            ? I extends Date
              ? string
              : I extends object
                ? DeepDateToString<I>
                : I
            : never;
        };
