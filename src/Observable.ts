import { of, throwError } from "rxjs";

export function fromNullable<A>(a: A) {
  return a == null ? throwError(() => "error") : of(a);
}
