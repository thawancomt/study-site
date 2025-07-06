import type { SubjectsEntity } from "../../entities/subjects.entity";

export default function SubjectListItem({ name, description }: SubjectsEntity) {
	return <li>
        <h1>{name}</h1>
        <span>{description}</span>
    </li>;
}
