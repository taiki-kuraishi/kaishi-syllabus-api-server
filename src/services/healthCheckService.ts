import { RpcTarget } from "cloudflare:workers";

export class HealthCheckService extends RpcTarget {
  public async healthCheck() {
    return { status: "ok" };
  }
}
