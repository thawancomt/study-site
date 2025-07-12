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

	async delete(id: string): Promise<boolean> {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "DELETE",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				id : id 
			})
		})

		if (result.ok) {
			console.log( await result.json());
		}
		
		return !!result

	}

	findById(id: string): Promise<NoteEntity | null> {
		throw new Error
	}

	getByName(name: string) {}

	update(id: string, entity: Partial<NoteEntity>): Promise<NoteEntity | null> {
		throw new Error
	}

	public async getAllNotes() {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "GET",
		}).then((res) => res.json());

		return result;
	}
}
