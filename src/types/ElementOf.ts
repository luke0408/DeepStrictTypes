/**
 * @title Type for Inferring the Element Type of an Array.
 *
 * Extracts the element type from an array type. This utility type uses conditional types
 * with the `infer` keyword to extract the type of elements contained within an array.
 *
 * @template T - The array type from which to extract the element type
 * @returns The type of elements in the array, or `never` if T is not an array
 *
 * @example
 * ```typescript
 * type StringArray = string[];
 * type StringElement = ElementOf<StringArray>; // string
 *
 * type NumberArray = number[];
 * type NumberElement = ElementOf<NumberArray>; // number
 *
 * type MixedArray = (string | number)[];
 * type MixedElement = ElementOf<MixedArray>; // string | number
 *
 * type ObjectArray = { id: number; name: string }[];
 * type ObjectElement = ElementOf<ObjectArray>; // { id: number; name: string }
 *
 * type ReadonlyArray = readonly string[];
 * type ReadonlyElement = ElementOf<ReadonlyArray>; // string
 *
 * type TupleArray = [string, number, boolean];
 * type TupleElement = ElementOf<TupleArray>; // string | number | boolean
 * ```
 */
export type ElementOf<T extends any[] | readonly any[]> = T extends (infer E)[]
  ? E
  : T extends readonly (infer E)[]
    ? E
    : never;
