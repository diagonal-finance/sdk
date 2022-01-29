import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => ({
    verbose: true,
    collectCoverageFrom: [
        "<rootDir>/**/*.ts",
        "!<rootDir>/**/index.ts",
        "!<rootDir>/**/*.d.ts",
        "!<rootDir>/src/artifacts/**/*.ts",
        "!<rootDir>/src/artifacts/**/*.json",
        "!<rootDir>/**/*.config.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 95,
            lines: 95,
            statements: 95,
        },
    },
});
