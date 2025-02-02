import { ElementOf } from './ElementOf';

export type RemoveAfterDot<T extends object, K extends string> = K extends `${infer First}.${infer Last}`
  ? First extends keyof T
    ? T[First] extends Array<any>
      ? `${First}[*].${string}`
      : T[First] extends object
        ? `${First}.${RemoveAfterDot<T[First], Last>}`
        : never
    : First extends '[*]'
      ? T extends Array<any>
        ? RemoveAfterDot<ElementOf<T>, Last>
        : never
      : First extends `${infer Second extends string}[*]`
        ? Second extends keyof T
          ? T[Second] extends object
            ? `${First}.${RemoveAfterDot<T[Second], Last>}`
            : never
          : never
        : never
  : K extends keyof T
    ? T[K] extends Array<any>
      ? `${K}[*].${string}`
      : `${K}.${string}`
    : T extends Array<any>
      ? RemoveAfterDot<ElementOf<T>, K>
      : never;
