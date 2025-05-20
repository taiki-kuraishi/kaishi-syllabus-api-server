import { createExecutionContext, env, waitOnExecutionContext } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import WorkerClass from "../../src/index";

describe("Health Check", () => {
  it("responds with status ok", async () => {
    // arrange
    const ctx = createExecutionContext();
    const worker = new WorkerClass(ctx, env);

    // act
    const response = await worker.healthCheckService.healthCheck();
    await waitOnExecutionContext(ctx);

    // assert
    expect(await response).toEqual({ status: "ok" });
  });
});
