import type { IBaseRepository } from "../../base/baseRepo";
import type { NoteEntity, newNoteEntity } from "../entities/notes.entity";

export interface INoteRepository
	extends IBaseRepository<newNoteEntity, NoteEntity> {}
