/**
 * @title The type that draws only objects from key names that infer members.
 *
 * It is a helper type for use in other types, a type that cuts the back string to infer objects among keys inferred as {@link DeepStrictObjectKeys}.
 *
 * ```ts
 * type Example = RemoveArraySymbol<"a[]">; // a
 * ```
 */
export type RemoveArraySymbol<
  T extends string,
  ArraySymbol extends string = '[*]',
> = T extends `${infer P}${ArraySymbol}` ? P : T;
