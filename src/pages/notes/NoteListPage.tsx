// src/pages/NotesPage.jsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import NoteResumeCard from "../../components/cards/NoteResumeCard";
import CreateNote from "../../components/modals/CreateNote";
import NotesSearchInput from "../../components/ui/inputs/NotesSearchInput";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
import MongoDBNotesRepo from "../../ORM/notes/implementations/notes.concrete.mongodb.repository";
import { ConcreteNoteService } from "../../ORM/notes/implementations/notes.concrete.service";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function NotesPage() {
	const [notes, setNotes] = useState<NoteEntity[]>([]);

	// Note: It's often better to initialize these outside the component
	// or use useMemo to avoid re-creating them on every render.
	const notesRepo = new MongoDBNotesRepo();
	const service = new ConcreteNoteService(notesRepo);

	async function loadNotes() {
		const result = await service.getAll();
		setNotes(result);
	}

	function removeById(noteID: string) {
		setNotes((prev) => prev.filter((note) => note.id !== noteID));
	}

	useEffect(() => {
		loadNotes();
	}, []);


    function countWords() {
        return notes.reduce((total, item) => {
            const words = item.note.split(" ").length
            return total + words
        }, 0)
    }

    function mostUsedWord() {
        const wordDict = {
        }

        notes.map((notes) => {
            const words = notes.note.split(" ")

            words.map((word) => {
                if (word === "") {
                } else {
                    wordDict[word] = ( wordDict?.[word] || 0) + 1
                }
            })
        })


        return Object.keys(wordDict).reduce((max, currWord) => {
            return wordDict[currWord] > wordDict[max] ? currWord : max
        }, 0)
    }

	return (
		<>
			
			<section className="hover:bg-accent-foreground rounded-lg p-4 border border-accent/20 my-2 mx-4">
				<h1 className="text-background text-lg">My Notes</h1>
				<span className="text-md text-background/30">
					Visualize your notes, edit it or create new ones...
				</span>
			</section>

			<section className="hover:bg-accent-foreground rounded-lg p-4 border border-accent/20 my-2 mx-4">
				<div className="bg-gradient-to-b from-chart-2/40 to-chart-3 p-4 rounded-2xl border hover:to-chart-2 hover:from-chart-3 border-accent-foreground w-fit shadow-lg hover:shadow-chart-3/30">
					<h1 className="text-accent">Notes: {notes.length}</h1>
				</div>
                <div className="bg-gradient-to-b from-chart-2/40 to-chart-3 p-4 rounded-2xl border hover:to-chart-2 hover:from-chart-3 border-accent-foreground w-fit shadow-lg hover:shadow-chart-3/30">
					<h1 className="text-accent">Words: {countWords()}</h1>
				</div>
                <div className="bg-gradient-to-b from-chart-2/40 to-chart-3 p-4 rounded-2xl border hover:to-chart-2 hover:from-chart-3 border-accent-foreground w-fit shadow-lg hover:shadow-chart-3/30">
					<h1 className="text-accent">Most used word: "{mostUsedWord()}"</h1>
				</div>
			</section>

			<AnimatePresence mode="popLayout">
				<motion.div
					className="flex border p-4 m-1 rounded-2xl bg-accent-foreground/80 border-accent/10 gap-2"
					layout
					variants={containerVariants}
					initial="hidden"
					animate={notes.length > 0 ? "show" : "hidden"}
				>
                <div className={"w-full"}>
				    <NotesSearchInput />
                </div>

					{notes.length && notes.length ? (
						notes.map((note) => (
							<NoteResumeCard
								note={note}
								key={note.id}
								onRemove={() => removeById(note.id)}
							/>
						))
					) : (
						<div>
							<h1 className="text-white">No notes</h1>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
			<CreateNote noteService={service} />
			<button
				type="button"
				className="text-white bg-dark-muted p-2 rounded-md"
				onClick={loadNotes}
			>
				Carregar todas as notas
			</button>
		</>
	);
}
