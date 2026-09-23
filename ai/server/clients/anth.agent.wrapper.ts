
// Use this wrapper to be mocked in tests with
// jest.mock("../server/clients/anth.agent.wrapper" in init.js
// Jest load code as CommonJs, claude-agent-sdk is ESM, tests fails
// Avoid error:
/*
Test suite failed to run
    Must use import to load ES Module: /var/www/application/node_modules/@anthropic-ai/claude-agent-sdk/sdk.mjs
    The file contains ESM syntax (import/export) that could not be executed as CommonJS. Either:
      - Configure a transform (e.g. babel-jest) that compiles this file to CommonJS (see https://jestjs.io/docs/code-transformation)
      - If the file is in "node_modules", allow it to be transformed by adjusting "transformIgnorePatterns" (see https://jestjs.io/docs/configuration#transformignorepatterns-arraystring)
      - Use Node v24.9+ where Jest supports require(esm) natively (see https://jestjs.io/docs/ecmascript-modules#require-of-esm)

    > 1 | import { query } from "@anthropic-ai/claude-agent-sdk";
*/

import { query } from "@anthropic-ai/claude-agent-sdk"; // ESM modules
export { query }