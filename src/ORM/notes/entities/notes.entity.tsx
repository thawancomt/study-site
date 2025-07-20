import type { SubjectsEntity } from "../../subjects/entities/subjects.entity";

export type NoteEntity = {
	id: string;
	title: string;
	note: string;
	createdAt: Date;
	updatedAt: Date;
	subjects: SubjectsEntity[];
	aiResume?: string;
};

export type NewNoteEntity = Omit<NoteEntity, "id">;
