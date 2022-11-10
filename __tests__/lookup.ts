import { TestScheduler } from "rxjs/testing";
import { lookup } from "../src/lookup";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe("match", () => {
  it("throwError if empty", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`a|`, {
        a: [],
      }).pipe(lookup(0));
      const expected = "#";
      expectObservable(source).toBe(expected);
    });
  });

  it("throwError if not found", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`a|`, {
        a: ["a"],
      }).pipe(lookup(1));
      const expected = "#";
      expectObservable(source).toBe(expected);
    });
  });

  it("of if found", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`a|`, {
        a: ["a", "b"],
      }).pipe(lookup(1));
      const expected = "a|";
      expectObservable(source).toBe(expected, {
        a: "b",
      });
    });
  });
});
