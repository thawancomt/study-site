import type { NoteEntity } from "./entities/notes.entity";

export type INoteService = {
	addNote(note: NoteEntity): Promise<NoteEntity>;
	getNoteById(id: string): Promise<NoteEntity | null>;
	modifyNote(id: string, note: Partial<NoteEntity>): Promise<NoteEntity | null>;
	removeNote(id: string): Promise<boolean>;
};
