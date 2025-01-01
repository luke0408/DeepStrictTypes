import { StringType } from '@kakasoo/proto-typescript';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type BeforeDot<T extends string> = T extends `${infer Before}.${infer _}` ? Before : never;
type AfterDot<T extends string> = T extends `${infer _}.${infer After}` ? After : never;
type ValueOf<T> = T[keyof T];
type ToString<T> = T extends string ? T : T extends number ? `${T}` : never;

export type StringToDeepObject<T extends string, P extends string[] = StringType.Split<T, ','>> = UnionToIntersection<
  ValueOf<{
    [key in P[number]]: StringType.Includes<key, '.'> extends true
      ? Record<BeforeDot<key>, StringToDeepObject<ToString<AfterDot<key>>>>
      : Record<key, any>;
  }>
>;
