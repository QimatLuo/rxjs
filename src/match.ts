import { fromNullable } from "./fromNullable";
import { map, mergeMap, pipe } from "rxjs";

export const match = (r: RegExp) =>
  pipe(
    map((x: string) => x.match(r)),
    mergeMap(fromNullable)
  );
