/**
 * @title Type for Inferring the Element Type of an Array.
 */
export type ElementOf<T extends Array<any>> = T extends Array<infer Element> ? Element : never;
