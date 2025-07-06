import type { SubjectsEntity } from "../../subjects/entities/subjects.entity";

export type NoteEntity = {
    id: number
	title: string;
	note: string;
	createdAt: Date;
	updatedAt: Date;
	subjects: SubjectsEntity["id"][]
};

export type NewNoteEntity = Omit<NoteEntity, "id">
