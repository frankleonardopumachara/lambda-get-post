import type { Config } from "jest";

const fromPairs = (pairs: [string, string][]) =>
  pairs.reduce((res, [key, value]) => ({ ...res, [key]: value }), {});

const genModuleNameMapper = (paths: Record<string, string[]>) =>
  fromPairs(
    Object.entries(paths).map(([k, [v]]) => [
      `^${k.replace(/\*/, "(.*)")}`,
      `<rootDir>/${v.replace(/\*/, "$1")}`,
    ])
  );

const config: Config = {
  setupFilesAfterEnv: ["./test/jest.setup.ts"],
  moduleFileExtensions: ["js", "json", "ts"],
  testMatch: ["**/*.spec.ts", "**/*.e2e-spec.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  silent: false,
  testEnvironment: "node",
}

export default config;
