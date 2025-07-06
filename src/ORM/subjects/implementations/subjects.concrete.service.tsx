import type { IBaseRepository } from "../../base/baseRepo";
import type { NewSubject, SubjectsEntity } from "../entities/subjects.entity";
import type { IndexDBSubjectRepository } from "./subjects.concrete.repository";

export class SubjectsService {
	constructor(private repository: IBaseRepository<NewSubject, SubjectsEntity>) {}

	public async create(subject: NewSubject): Promise<SubjectsEntity | null> {
		if (await this.repository.getByName(subject.name)) {
			console.log("Already have been created");
			return null;
		}

		return this.repository
			.create(subject)
			.then((savedNewSubject) => {
				console.log(
					"Subject" + savedNewSubject.name + " Com o ID:" + savedNewSubject.id,
				);

				return savedNewSubject;
			})
			.catch((error) => {
				console.log("Error");
				return null;
			});
	}

	public async getAllSubjects() {
		const result : SubjectsEntity[] = await fetch("http://localhost:8000/api/subjects", {
			method: "GET"
		}).then(res => res.json())

		const data = Array.from(result).map( doc => ({
			"name" : doc.name, "description" : doc.description, "id" : doc.id
		}))

		return data
	}
}
