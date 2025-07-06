import { openDB } from "idb";
import type { NewSubject, SubjectsEntity } from "../entities/subjects.entity";
import type { ISubjectsRepository } from "../repositories/subjects.repository";

const STORE_NAME: string = "subjects";

export class IndexDBSubjectRepository implements ISubjectsRepository {
	public storeName = STORE_NAME;

	dbPromisse = openDB(STORE_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {
					keyPath: "id",
					autoIncrement: true,
				});
			}
		},
	});

	public async create(entity: NewSubject): Promise<SubjectsEntity> {
		const db = await this.dbPromisse;

		const id = await db.put(STORE_NAME, entity);

		// Atomic
		// const tx = db.transaction(this.defaultStoreName, "readwrite")
		// const store = tx.objectStore(this.defaultStoreName)
		// store.put(entity)

		return {
			...entity,
			id: Number(id),
		};
	}

	public delete(id: string): Promise<boolean> {
		throw new Error("Not implemented yet");
	}

	public findById(id: string): Promise<SubjectsEntity | null> {
		throw new Error("Not implemented yet");
	}

	public update(
		id: string,
		entity: Partial<SubjectsEntity>,
	): Promise<SubjectsEntity | null> {
		throw new Error("Not implemented yet");
	}

	public async getByName(
		name: SubjectsEntity["name"],
	): Promise<SubjectsEntity | null> {
		const db = await this.dbPromisse;
		const allSubjects: SubjectsEntity[] = await db.getAll(STORE_NAME);

		const found = allSubjects.find((subject) => subject.name === name);
		return found ? found : null; // Se não encontrar, retorna null
	}
}
