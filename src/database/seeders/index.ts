import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Syllabus } from "../../models/syllabus";
import { SyllabusSeeder } from "./syllabusSeeder";

/**
 * DO NOT EXECUTE ON PRODUCTION
 */
export async function main() {
  dotenv.config();

  // biome-ignore lint/complexity/useLiteralKeys: not production code
  // biome-ignore lint/style/noNonNullAssertion: not production code
  const dbUrl = process.env["DATABASE_URL"]!;

  const db = drizzle(dbUrl);

  // seed
  await db.insert(Syllabus).values(SyllabusSeeder);
}

if (require.main === module) {
  main().catch(console.error);
}
