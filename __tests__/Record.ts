import { testScheduler } from "../testScheduler";
import { zipObj } from "../src/Record";

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
