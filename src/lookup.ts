import { fromNullable } from "./fromNullable";
import { map, mergeMap, pipe } from "rxjs";

export const lookup = <T>(i: number) =>
  pipe(
    map((x: T[]) => x[i]),
    mergeMap(fromNullable)
  );
