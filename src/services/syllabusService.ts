import type { SelectSyllabus } from "../models/syllabus";
import type { SyllabusRepositoryInterface } from "../repositories/interfaces/syllabusRepositoryInterface";

export interface SyllabusServiceInterface {
  getAllSyllabus(): Promise<SelectSyllabus[]>;
}

export class SyllabusService implements SyllabusServiceInterface {
  private readonly repository: SyllabusRepositoryInterface;

  constructor(repository: SyllabusRepositoryInterface) {
    this.repository = repository;
  }

  /**
   * 全件取得
   */
  async getAllSyllabus(): Promise<SelectSyllabus[]> {
    return await this.repository.getAllSyllabus();
  }
}
