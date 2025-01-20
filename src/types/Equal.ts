/**
 * Implementation method
 */
type Expression<X> = <T>() => T extends X ? 1 : 2;

/**
 * @title Type for Checking if Two Types are Equal.
 *
 * The `Equal<X, Y>` type uses conditional types and a helper type `Expression<X>`
 * to determine if two types `X` and `Y` are the same. It returns `true` if they are
 * equal, and `false` otherwise.
 */
export type Equal<X, Y> = Expression<X> extends Expression<Y> ? true : false;
