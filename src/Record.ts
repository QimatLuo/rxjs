import { Observable, UnaryFunction, map, pipe } from "rxjs";

export function zipObj<K, A>(
  keys: readonly [K]
): UnaryFunction<
  Observable<readonly [A]>,
  Observable<{
    K: A;
  }>
>;
export function zipObj<K, L, A, B>(
  keys: readonly [K, L]
): UnaryFunction<
  Observable<readonly [A, B]>,
  Observable<{
    K: A;
    L: B;
  }>
>;
export function zipObj<K, L, M, A, B, C>(
  keys: readonly [K, L, M]
): UnaryFunction<
  Observable<readonly [A, B, C]>,
  Observable<{
    K: A;
    L: B;
    M: C;
  }>
>;
export function zipObj<K, L, M, N, A, B, C, D>(
  keys: readonly [K, L, M, N]
): UnaryFunction<
  Observable<readonly [A, B, C, D]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
  }>
>;
export function zipObj<K, L, M, N, O, A, B, C, D, E>(
  keys: readonly [K, L, M, N, O]
): UnaryFunction<
  Observable<readonly [A, B, C, D, E]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
    O: E;
  }>
>;
export function zipObj<K, L, M, N, O, P, A, B, C, D, E, F>(
  keys: readonly [K, L, M, N, O, P]
): UnaryFunction<
  Observable<readonly [A, B, C, D, E, F]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
    O: E;
    P: F;
  }>
>;
export function zipObj<K, L, M, N, O, P, Q, A, B, C, D, E, F, G>(
  keys: readonly [K, L, M, N, O, P, Q]
): UnaryFunction<
  Observable<readonly [A, B, C, D, E, F, G]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
    O: E;
    P: F;
    Q: G;
  }>
>;
export function zipObj<K, L, M, N, O, P, Q, R, A, B, C, D, E, F, G, H>(
  keys: readonly [K, L, M, N, O, P, Q, R]
): UnaryFunction<
  Observable<readonly [A, B, C, D, E, F, G, H]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
    O: E;
    P: F;
    Q: G;
    R: H;
  }>
>;
export function zipObj<K, L, M, N, O, P, Q, R, S, A, B, C, D, E, F, G, H, I>(
  keys: readonly [K, L, M, N, O, P, Q, R, S]
): UnaryFunction<
  Observable<readonly [A, B, C, D, E, F, G, H, I]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
    O: E;
    P: F;
    Q: G;
    R: H;
    S: I;
  }>
>;
export function zipObj<
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J
>(
  keys: readonly [K, L, M, N, O, P, Q, R, S, T]
): UnaryFunction<
  Observable<readonly [A, B, C, D, E, F, G, H, I, J]>,
  Observable<{
    K: A;
    L: B;
    M: C;
    N: D;
    O: E;
    P: F;
    Q: G;
    R: H;
    S: I;
    T: J;
  }>
>;
export function zipObj(keys: ReadonlyArray<string>) {
  return pipe(
    map((values: ReadonlyArray<unknown>) =>
      keys.reduce<any>((o, k, i) => ({ ...o, [k]: values[i] }), {})
    )
  );
}
