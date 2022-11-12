import { fromNullable } from "./Observable";
import { filter, map, mergeMap, pipe } from "rxjs";

export const match = (r: RegExp) =>
  pipe(
    map((x: string) => x.match(r)),
    mergeMap(fromNullable)
  );

export function test(r: RegExp) {
  return (x: string) => r.test(x);
}

export const filterTest = (r: RegExp) => pipe(filter(test(r)));

export const mapTest = (r: RegExp) => pipe(map(test(r)));
