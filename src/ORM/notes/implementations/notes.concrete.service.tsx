import type { NoteEntity, newNoteEntity } from "../entities/notes.entity";
import type { INoteRepository } from "../interfaces/notes.repository";
import type { INoteService } from "../interfaces/notes.service";
export class ConcreteNoteService implements INoteService {
	constructor(private noteRepository: INoteRepository) {}

	addNote(note: newNoteEntity): Promise<NoteEntity> {
		return this.noteRepository.create(note);
	}
	getNoteById(id: string): Promise<NoteEntity | null> {
		return this.noteRepository.findById(id);
	}
	modifyNote(
		id: string,
		note: Partial<NoteEntity>,
	): Promise<NoteEntity | null> {
		return this.noteRepository.update(id, note);
	}
	removeNote(id: string): Promise<boolean> {
		return this.noteRepository.delete(id);
	}

	testConn(): boolean {
		return false;
	}
}
