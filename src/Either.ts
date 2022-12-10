import { of, throwError } from "rxjs";

type Either = {
  _tag: string;
  right?: unknown;
  left?: unknown;
};
export const fromEither = <A extends Either>(ma: A) =>
  ma._tag === "Right" ? of(ma.right) : throwError(() => ma.left);
