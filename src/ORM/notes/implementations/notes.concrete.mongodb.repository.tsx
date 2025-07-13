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
		});

		if (!result.ok) {
			throw new Error("Got an error while receiving the server response");
		}

		return result.json();
	}

	async delete(id: string): Promise<boolean> {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
			}),
		});

		if (result.ok) {
			console.log(await result.json());
		}

		return !!result;
	}

	async findById(id: string): Promise<NoteEntity | null> {
		const query = `id=${id}`;
		const result = await fetch(`http://localhost:8000/api/notes?${query}`, {
			method: "GET",
		});

		if (result.ok) {
			const data = await result.json();
			console.log("data", data);

			return data;
		} else {
			throw Error("got an error while fetching the id");
		}
	}

	getByName(name: string) {}

	async update(
		id: string,
		entity: Partial<NoteEntity>,
	): Promise<NoteEntity | null> {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(entity),
		}).then(async (res) => res.json());

		return result;
	}

	public async getAllNotes() {
		const result = await fetch("http://localhost:8000/api/notes", {
			method: "GET",
		}).then((res) => res.json());

		return result;
	}
}
