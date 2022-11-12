import { testScheduler } from "../testScheduler";
import { filterTest, mapTest, match } from "../src/RegExp";

describe("match", () => {
  it("throwError if not match", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`abc|`).pipe(match(/z/));
      const expected = "#";
      expectObservable(source).toBe(expected);
    });
  });

  it("of if match", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const re = /\w/;
      const source = cold(`abc|`).pipe(match(re));
      const expected = cold("abc|", {
        a: "a".match(re) || [],
        b: "b".match(re) || [],
        c: "c".match(re) || [],
      });
      expectObservable(source).toEqual(expected);
    });
  });
});

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
