import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify("0.0.0-test"),
  },
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: ["src/**/*.d.ts", "src/.puzzles/**", "src/test"],
      include: ["**/*.ts"],
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
  },
});
