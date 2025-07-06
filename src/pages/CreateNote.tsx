import { type ChangeEvent, useEffect, useRef, useState } from "react";
import type { newNoteEntity } from "../ORM/notes/entities/notes.entity";
import { ConcreteNoteRepository } from "../ORM/notes/implementations/notes.concrete.repository";
import type { ConcreteNoteService } from "../ORM/notes/implementations/notes.concrete.service";
import type { SubjectsEntity } from "../ORM/subjects/entities/subjects.entity";
import { IndexDBSubjectRepository } from "../ORM/subjects/implementations/subjects.concrete.repository";
import { SubjectsService } from "../ORM/subjects/implementations/subjects.concrete.service";
import MongoDBSubjectRepo from "../ORM/subjects/implementations/subjectsMongoDB.concrete.repository";

type CreateNoteProps = {
	noteService: ConcreteNoteService;
};

const MongoDBSubjectRepoW = new MongoDBSubjectRepo();
const subjectService = new SubjectsService(MongoDBSubjectRepoW);

export default function CreateNote({ noteService }: CreateNoteProps) {
	const [subjects, setSubjects] = useState<SubjectsEntity[]>([]);
    const [selectedSubjects, setSelectedSubjects] = useState<SubjectsEntity[]>([]);

	const [note, setNote] = useState<newNoteEntity>({
		title: "",
		note: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		subject: [],
	});


    const selectInputRef = useRef<HTMLSelectElement>(null)

	useEffect(() => {
		subjectService.getAllSubjects().then((result) => {
			setSubjects(result)			
		});
	}, []);

	function handleSaveNote() {
		noteService
			.addNote({
                ...note, 
                subject : selectedSubjects
            })
			.then((savedNote) => {
				console.log(savedNote);
			})
			.catch((error) => {
				console.error("Error saving note:", error);
			});

            resetComponent()
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

        setSelectedSubjects(newSelectedSubjects)
        
	}

    function resetComponent() {
        setNote({
            ...note,
            note  : "",
            title : ""
        });

        setSelectedSubjects([])
    }

	return (
		<form className="text-neutral bg-dark-muted">
			<div>
				<select
					name=""
					id=""
					multiple
					className="w-full"
                    ref={selectInputRef}
                    value={selectedSubjects.map(subject => subject.name)}
					onChange={handleSelection}
				>
					{Array.from(subjects).map((subject, index) => (
						<option key={index} value={subject.name}>{subject.name}</option>
					))}
				</select>
			</div>

			<label htmlFor="note-title">Title</label>
			<input
				type="text"
				id="note-title"
				className="border-neutral-50 border m-1 p-2 rounded"
				value={note.title}
				onChange={(e) => setNote({ ...note, title: e.target.value })}
			/>

			<label htmlFor="note-content">Content</label>
			<textarea
				id="note-content"
				rows={10}
				className="border-neutral-50 border m-1 p-2 rounded"
				value={note.note}
				onChange={(e) => setNote({ ...note, note: e.target.value })}
			/>
			<section>
				<button type="button" className="btn-muted" onClick={handleSaveNote}>
					Save note
				</button>
			</section>
		</form>
	);
}
