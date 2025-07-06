import { ul } from "framer-motion/client";
import { useEffect, useState } from "react";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
import MongoDBNotesRepo from "../../ORM/notes/implementations/notes.concrete.mongodb.repository";
import { ConcreteNoteService } from "../../ORM/notes/implementations/notes.concrete.service";
import MongoDBSubjectRepo from "../../ORM/subjects/implementations/subjectsMongoDB.concrete.repository";
import CreateNote from "./CreateNote";

export default function NotesPage() {
	const [notes, setNotes] = useState<NoteEntity[]>([]);

	const notesRepo = new MongoDBNotesRepo();
	const service = new ConcreteNoteService(notesRepo);

	async function loadNotes() {
		const result = await service.getAll();
        setNotes(result)
	}

	return (
		<>
			<CreateNote noteService={service} />
			<button
				type="button"
				className="text-white bg-dark-muted p-2 rounded-md"
				onClick={loadNotes}
			>
				Carregar todas as notas
			</button>
			{notes && (
				<ul>
					{notes.map((note) => (
						<li key={note.id}>{note.title} : {note.note} <span className="text-xs">{note.id}</span></li>
					))}
				</ul>
			)}
		</>
	);
}
