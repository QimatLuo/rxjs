import { TestScheduler } from "rxjs/testing";
import { fromNullable } from "../src/fromNullable";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe("fromNullable", () => {
  it.each([null, undefined])("throwError if %s", (a) => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source = fromNullable(a);
      const expected = "#";
      expectObservable(source).toBe(expected);
    });
  });

  it.each([0, "", false])("of if %s", (a) => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source = fromNullable(a);
      const expected = "(a|)";
      expectObservable(source).toBe(expected, { a });
    });
  });
});
