import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  coveragePathIgnorePatterns: ["./testScheduler.ts"],
  preset: "ts-jest",
};

export default jestConfig;
