import { createExecutionContext, env, waitOnExecutionContext } from "cloudflare:test";
import { count } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import WorkerClass from "../../../src/index";
import { drizzleClient } from "../../../src/libs/drizzle-orm/clients";
import { Syllabus } from "../../../src/models/syllabus";
import { cleanTestDatabase } from "../../utils/cleanDatabase";

describe("syllabusService.getAllSyllabus", () => {
  const client = drizzleClient(env.DATABASE_URL);

  beforeAll(async () => {
    await cleanTestDatabase(env.DATABASE_URL);
  });

  it("should retrieve all syllabuses", async () => {
    // arrange
    const ctx = createExecutionContext();
    const worker = new WorkerClass(ctx, env);
    const expected = {
      id: "00000000-0000-0000-0000-000000000001",
      name: "マシンラーニング実習",
      startTerm: 1,
      endTerm: 2,
      category: "実習",
      credits: "2",
      dayOfWeek: 3, // 月曜日
      period: 2,
      location: "米山キャンパス",
      isCompulsory: false,
      description:
        "マシンラーニングの内容を踏まえ、商用分野におけるアプリケーションに、機械学習がどのように利用されているかを理解するとともに、本格的なAIアプリケーションに必要とされる大規模ニューラルネットワークの実装とその応用法を理解する。主に、大規模深層学習、音声認識、自然言語処理、その他AI活用などの実アプリケーションの実装を通し、自ら実行環境の設計・構築を行えるスキルを養成する。",
      learningObjectives:
        "１．商用分野におけるアプリケーションに機械学習がどのように利用されているか理解する。２．本格的なAIアプリケーションに必要とされる大規模ニューラルネットワークの実装とその応用法を理解する。３．より野心的で先進的な機械学習アプローチについて理解する。",
      version: "1.0",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    await client.insert(Syllabus).values(expected);

    // act
    const response = await worker.syllabusService.getAllSyllabus();
    await waitOnExecutionContext(ctx);

    // assert
    // assert database count
    const actualCount = await client.select({ count: count() }).from(Syllabus);
    expect(actualCount[0].count).toEqual(1);
    expect(await response).toEqual([expected]);
  });
});
