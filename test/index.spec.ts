import { createExecutionContext, env, waitOnExecutionContext } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import WorkerClass from "../src/index";

describe("Hello World worker", () => {
  it("responds with Hello World! (unit style)", async () => {
    // arrange
    const ctx = createExecutionContext();
    const worker = new WorkerClass(ctx, env);

    // act
    const response = await worker.fetch();
    await waitOnExecutionContext(ctx);

    // assert
    expect(await response.text()).toMatchInlineSnapshot(`"Hello from counter-service"`);
  });
});
