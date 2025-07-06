import type { IBaseRepository } from "../../base/baseRepo";
import type { NewNoteEntity, NoteEntity } from "../entities/notes.entity";
import type { INoteRepository } from "../interfaces/notes.repository";

export default class MongoDBNotesRepo implements INoteRepository {
	async create(entity: NewNoteEntity): Promise<NoteEntity> {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "POST",
			body: JSON.stringify(entity),
			headers: {
				"Content-Type": "application/json",
			},
		})
        
        if (!result.ok) {
            throw new Error("Got an error while receiving the server response")
        }

        return result.json()
	}

	delete(id: string): Promise<boolean> {}

	findById(id: string): Promise<NoteEntity | null> {}

	getByName(name: string) {}

	update(id: string, entity: Partial<NoteEntity>): Promise<NoteEntity | null> {}

	public async getAllNotes() {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "GET",
		}).then((res) => res.json());

		return result;
	}
}
