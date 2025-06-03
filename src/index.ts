import { WorkerEntrypoint } from "cloudflare:workers";
import { drizzleClient } from "./libs/drizzle-orm/clients";
import type { SelectSyllabus } from "./models/syllabus";
import { SyllabusRepositoryImpl } from "./repositories/implementations/syllabusRepositoryImpl";
import { SyllabusService, type SyllabusServiceInterface } from "./services/syllabusService";

export default class extends WorkerEntrypoint {
  async fetch(): Promise<Response> {
    return Response.json({
      status: "ok",
    });
  }
}

export class SyllabusServiceEntryPoint
  extends WorkerEntrypoint
  implements SyllabusServiceInterface
{
  private readonly syllabusService: SyllabusService;

  constructor(ctx: ExecutionContext, env: Env) {
    super(ctx, env);

    const databaseClient = drizzleClient(env.DATABASE_URL);
    const repository = new SyllabusRepositoryImpl(databaseClient);
    this.syllabusService = new SyllabusService(repository);
  }

  async getAllSyllabus(): Promise<SelectSyllabus[]> {
    return await this.syllabusService.getAllSyllabus();
  }
}
