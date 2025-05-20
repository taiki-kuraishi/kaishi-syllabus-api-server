declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {
    DATABASE_URL: "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
  }
}
