import { WorkerEntrypoint } from "cloudflare:workers";
import { drizzleClient } from "./libs/drizzle-orm/clients";
import { SyllabusRepositoryImpl } from "./repositories/implementations/syllabusRepositoryImpl";
import { HealthCheckService } from "./services/healthCheckService";
import { SyllabusService } from "./services/syllabusService";

export default class extends WorkerEntrypoint {
  public readonly healthCheckService: HealthCheckService;
  public readonly syllabusService: SyllabusService;

  constructor(ctx: ExecutionContext, env: Env) {
    super(ctx, env);

    this.healthCheckService = new HealthCheckService();

    const databaseClient = drizzleClient(env.DATABASE_URL);

    const syllabusRepository = new SyllabusRepositoryImpl(databaseClient);

    this.syllabusService = new SyllabusService(syllabusRepository);
  }

  fetch(): Response {
    return Response.json({
      status: "ok",
    });
  }
}
