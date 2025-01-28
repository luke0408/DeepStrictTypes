export type RemoveLastProperty<S extends string> = S extends `${infer First}.${infer Last}`
  ? First extends `${infer ObjectPart}[*]`
    ? First | ObjectPart | `${First}.${RemoveLastProperty<Last>}`
    : `${First}` | `${First}.${RemoveLastProperty<Last>}`
  : never;
