import { IBaseRepository } from "../../base/baseRepo";
import { NewSubject, SubjectsEntity } from "../entities/subjects.entity";

export interface ISubjectsRepository extends IBaseRepository<NewSubject, SubjectsEntity> {}