import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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

		
		for (let i = 1; i < result.length; i++) {
			setTimeout(() => {
				setNotes( (prev) => ([...prev, result[i]]))

			}, 100 * i)
		}
	}

	function removeById(noteID: string) {
		setNotes((prev) => prev.filter((note) => note.id !== noteID));
	}

	useEffect(() => {
		loadNotes();
	}, []);

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
			<motion.div
				className="grid grid-cols-2"
				layout
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					staggerChildren: 0.5,
					duration: 2,
				}}
			>
				<AnimatePresence mode="popLayout">
					{notes &&
						Array.from(notes).map((note) => (
							<NoteResumeCard
								note={note}
								key={note.id}
								onRemove={() => {
									removeById(note.id);
								}}
							/>
						))}
				</AnimatePresence>
			</motion.div>
		</>
	);
}
