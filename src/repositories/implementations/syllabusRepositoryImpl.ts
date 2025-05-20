import type { DrizzleClient } from "../../libs/drizzle-orm/clients";
import { type SelectSyllabus, Syllabus } from "../../models/syllabus";
import type { SyllabusRepositoryInterface } from "../interfaces/syllabusRepositoryInterface";

export class SyllabusRepositoryImpl implements SyllabusRepositoryInterface {
  private readonly client: DrizzleClient;

  constructor(client: DrizzleClient) {
    this.client = client;
  }

  async getAllSyllabus(): Promise<SelectSyllabus[]> {
    const result = await this.client.select().from(Syllabus);
    return result;
  }
}
