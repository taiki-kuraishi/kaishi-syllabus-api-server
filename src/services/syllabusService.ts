import { RpcTarget } from "cloudflare:workers";
import type { SelectSyllabus } from "../models/syllabus";
import type { SyllabusRepositoryInterface } from "../repositories/interfaces/syllabusRepositoryInterface";

export class SyllabusService extends RpcTarget {
  private readonly repository: SyllabusRepositoryInterface;

  constructor(repository: SyllabusRepositoryInterface) {
    super();
    this.repository = repository;
  }

  /**
   * 全権取得
   */
  async getAllSyllabus(): Promise<SelectSyllabus[]> {
    const result = await this.repository.getAllSyllabus();
    return result;
  }
}
