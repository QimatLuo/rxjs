import { TestScheduler } from "rxjs/testing";
import { match } from "../src/match";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe("match", () => {
  it("throwError if not match", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`abc|`).pipe(match(/z/));
      const expected = "#";
      expectObservable(source).toBe(expected);
    });
  });

  it("of if match", () => {
    testScheduler.run((helpers) => {
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
