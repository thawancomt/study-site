import type { SubjectsEntity } from "../../subjects/entities/subjects.entity";

export type NoteEntity = {
    id: number
	title: string;
	note: string;
	createdAt: Date;
	updatedAt: Date;
	subject: SubjectsEntity[];
};

export type newNoteEntity = Omit<NoteEntity, "id">
