import { drizzleClient } from "../../src/libs/drizzle-orm/clients";
import { Syllabus } from "../../src/models/syllabus";

/**
 * テストメソッド毎にデータベースの全テーブルデータを削除するユーティリティ関数
 * @param database_url 接続先データベースのURL
 */
export const cleanTestDatabase = async (database_url: string): Promise<void> => {
  const client = drizzleClient(database_url);

  await client.delete(Syllabus);
};
