export type SubjectsEntity = {
	id: number;
	name: string;
	description: string;
};

type NewSubject = Omit<SubjectsEntity, "id">;

export type { NewSubject };
