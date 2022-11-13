import { testScheduler } from "../testScheduler";
import { lookup, zipObj } from "../src/Record";

describe("lookup", () => {
  it("throw if null", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const a = {
        a: null,
      };
      const source = cold(`a|`, { a }).pipe(lookup<typeof a>()("a"));
      const expected = "#";
      expectObservable(source).toBe(expected);
    });
  });

  it("of if found", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const a = {
        a: "A",
      };
      const source = cold(`a|`, { a }).pipe(lookup<typeof a>()("a"));
      const expected = "a|";
      expectObservable(source).toBe(expected, {
        a: "A",
      });
    });
  });
});

describe("zipObj", () => {
  it("zip keys and values", () => {
    testScheduler().run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source = cold(`a|`, {
        a: ["a", "b", "c", "d"] as const,
      }).pipe(zipObj(["k", "l", "m", "n"]));
      const expected = "a|";
      expectObservable(source).toBe(expected, {
        a: {
          k: "a",
          l: "b",
          m: "c",
          n: "d",
        },
      });
    });
  });
});
