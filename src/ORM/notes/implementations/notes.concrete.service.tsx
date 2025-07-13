import type { NewNoteEntity, NoteEntity } from "../entities/notes.entity";
import type { INoteRepository } from "../interfaces/notes.repository";
import type { INoteService } from "../interfaces/notes.service";
export class ConcreteNoteService implements INoteService {
	constructor(private noteRepository: INoteRepository) {}

	addNote(note: NewNoteEntity): Promise<NoteEntity> {
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

	getAll(): NoteEntity[] {
		return this.noteRepository.getAllNotes();
	}

	async resumeNote(note: NoteEntity): Promise<JSON> {

		const request_body = {
			model: "llama-3.2-1b-instruct",
			messages: [{ role: "user", content: note.note }], 
			temperature: 0.9,
		};

		const model_response = await fetch(
			"http://localhost:1234/v1/chat/completions",
			{
				method: "POST",
				body: JSON.stringify(request_body),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		console.log("tentei");

		return await model_response.json();
	}
}
