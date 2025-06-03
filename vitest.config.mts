import path from "node:path";
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  resolve: {
    alias: {
      "@script": path.resolve(__dirname, "script"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
  test: {
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.jsonc",
          environment: "test",
        },
      },
    },
  },
});
