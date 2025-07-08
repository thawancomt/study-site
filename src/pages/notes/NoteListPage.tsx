import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import NoteResumeCard from "../../components/cards/NoteResumeCard";
import CreateNote from "../../components/modals/CreateNote";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
import MongoDBNotesRepo from "../../ORM/notes/implementations/notes.concrete.mongodb.repository";
import { ConcreteNoteService } from "../../ORM/notes/implementations/notes.concrete.service";

export default function NotesPage() {
	const [notes, setNotes] = useState<NoteEntity[]>([]);

	const notesRepo = new MongoDBNotesRepo();
	const service = new ConcreteNoteService(notesRepo);

	async function loadNotes() {
		const result = await service.getAll();

		console.log(result);

		setNotes(result);
	}

	function removeById(noteID : string) {
		setNotes(prev => prev.filter(note => note.id !== noteID))
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
			<AnimatePresence mode="popLayout" >
				<motion.div className="grid grid-cols-2" layout>
					{notes &&
						Array.from(notes).map((note) => (
							<NoteResumeCard note={note} key={note.id} onRemove={ () => {
								removeById(note.id)
							}}/>
						))}
				</motion.div>
			</AnimatePresence>
		</>
	);
}
