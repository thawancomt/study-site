import type { IBaseRepository } from "../../base/baseRepo";
import type { NewSubject, SubjectsEntity } from "../entities/subjects.entity";

export interface ISubjectsRepository
    extends IBaseRepository<NewSubject, SubjectsEntity> {}
