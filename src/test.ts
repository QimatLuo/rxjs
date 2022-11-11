import { filter, map, pipe } from "rxjs";

export function test(r: RegExp) {
  return (x: string) => r.test(x);
}

export const filterTest = (r: RegExp) => pipe(filter(test(r)));

export const mapTest = (r: RegExp) => pipe(map(test(r)));
