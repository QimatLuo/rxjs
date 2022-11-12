import { testScheduler } from "../testScheduler";
import { filterTest, mapTest } from "../src/test";

describe("filterTest", () => {
  it("filter boolean if by match result", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`abc|`).pipe(filterTest(/b/));
      const expected = "-b-|";
      expectObservable(source).toBe(expected);
    });
  });
});

describe("mapTest", () => {
  it("map boolean if by match result", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`abc|`).pipe(mapTest(/b/));
      const expected = "abc|";
      expectObservable(source).toBe(expected, {
        a: false,
        b: true,
        c: false,
      });
    });
  });
});
