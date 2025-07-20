import type { IBaseRepository } from "../../base/baseRepo";
import type { NewNoteEntity, NoteEntity } from "../entities/notes.entity";

export interface INoteRepository
	extends IBaseRepository<NewNoteEntity, NoteEntity> {
		/**
		 * getAllNotes
		 */
		public getAllNotes() {
			continue;
		}
}
