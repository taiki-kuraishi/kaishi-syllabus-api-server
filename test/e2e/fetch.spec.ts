import { createExecutionContext, env, waitOnExecutionContext } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import WorkerClass from "../../src/index";

describe("fetch entry point", () => {
  it("responds with status ok", async () => {
    // arrange
    const ctx = createExecutionContext();
    const worker = new WorkerClass(ctx, env);

    // act
    const response = await worker.fetch();
    await waitOnExecutionContext(ctx);

    // assert
    expect(await response.json()).toEqual({ status: "ok" });
  });
});
