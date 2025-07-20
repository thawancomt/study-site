import type { IBaseRepository } from "../../base/baseRepo";
import type { NewSubject, SubjectsEntity } from "../entities/subjects.entity";

export default class MongoDBSubjectRepo
	implements IBaseRepository<NewSubject, SubjectsEntity>
{
	async create(entity: NewSubject): Promise<SubjectsEntity> {
		return await fetch("http://localhost:8000/api/subjects", {
			body: JSON.stringify(entity),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		}).then((res) => res.json());
	}

	delete(id: string): Promise<boolean> {}

	findById(id: string): Promise<SubjectsEntity | null> {}

	async getByName(name: string) {
		const query = `name=${name}`;

		const result = await fetch(`http://localhost:8000/api/subjects?${query}`, {
			method: "GET",
		});

		return result;
	}

	update(
		id: string,
		entity: Partial<SubjectsEntity>,
	): Promise<SubjectsEntity | null> {}
}
