import { pre, title } from "framer-motion/client";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import type { NewNoteEntity } from "../../ORM/notes/entities/notes.entity";
import type { ConcreteNoteService } from "../../ORM/notes/implementations/notes.concrete.service";
import type { SubjectsEntity } from "../../ORM/subjects/entities/subjects.entity";
import { SubjectsService } from "../../ORM/subjects/implementations/subjects.concrete.service";
import MongoDBSubjectRepo from "../../ORM/subjects/implementations/subjectsMongoDB.concrete.repository";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import InputWithTextAndIcon from "../ui/inputs/TitleInput";

type CreateNoteProps = {
	noteService: ConcreteNoteService;
};

const MongoDBSubjectRepoW = new MongoDBSubjectRepo();
const subjectService = new SubjectsService(MongoDBSubjectRepoW);

export default function CreateNote({ noteService }: CreateNoteProps) {
	const [subjects, setSubjects] = useState<SubjectsEntity[]>([]);
	const [selectedSubjects, setSelectedSubjects] = useState<SubjectsEntity[]>(
		[],
	);

	const [note, setNote] = useState<NewNoteEntity>({
		title: "",
		note: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		subjects: [],
	});


	useEffect(() => {
		subjectService.getAllSubjects().then((result) => {
			setSubjects(result);
		});
	}, []);

	async function handleSaveNote() {
		const result = await noteService.addNote({
			...note,
			subjects: []
		});

		return result;
	}

	function handleSelection(e: ChangeEvent<HTMLSelectElement>) {
		const selectedOptions = e.target.selectedOptions;

		const newSelectedSubjects: SubjectsEntity[] = [];

		Array.from(selectedOptions).map((option) => {
			const subject = subjects.find((subject) => subject.name === option.value);
			if (!subject) return;
			newSelectedSubjects.push(subject);
		});

		console.log("Achados", newSelectedSubjects);

		setSelectedSubjects(newSelectedSubjects);
	}

	function resetComponent() {
		setNote({
			...note,
			note: "",
			title: "",
		});

		setSelectedSubjects([]);
	}

	return (
		<div className="bg-accent-foreground/30 backdrop-blur-2xl w-[50vh] rounded shadow-lg shadow-dark border border-accent/20 p-2 hover:shadow-accent/10">
			<section className="border-accent">
				<InputWithTextAndIcon
					value={note.title}
					setValue={(newValue) => {
						setNote({
							...note,
							title: newValue,
						});
					}}
				/>
			</section>
			<main className=" w-full flex justify-center p-2">
				<textarea
				value={note.note}
				onChange={(e) => {
					setNote( prev => ({
						...prev,
						note : e.target.value
					}))
				}}
					name=""
					id=""
					className="w-[80vh]  focus:outline-none focus:border-none text-accent bg-sidebar-accent-foreground/70 p-4  rounded-md focus-within:ring-amber-300"
				></textarea>
			</main>
			<footer className="w-full flex justify-end gap-4">
				<SaveNoteButton title="Save" callBack={handleSaveNote} type={"info"}/>
				<SaveNoteButton title="Discard" callBack={resetComponent} type={"alert"}/>
			</footer>
		</div>
	);
}
