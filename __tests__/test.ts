import { TestScheduler } from "rxjs/testing";
import { filterTest, mapTest, test } from "../src/test";

const testScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
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
