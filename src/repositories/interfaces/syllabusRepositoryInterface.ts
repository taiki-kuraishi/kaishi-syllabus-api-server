import type { SelectSyllabus } from "../../models/syllabus";

export interface SyllabusRepositoryInterface {
  getAllSyllabus(): Promise<SelectSyllabus[]>;
}
