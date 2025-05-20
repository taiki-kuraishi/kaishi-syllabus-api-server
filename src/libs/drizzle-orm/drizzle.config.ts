import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/models/*",
  out: "./supabase/migrations",
});
