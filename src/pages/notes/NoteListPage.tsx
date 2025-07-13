// src/pages/NotesPage.jsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import InsightCardForNoteListPage from "../../components/cards/InsightCardForNoteListPage";
import NoteResumeCard from "../../components/cards/NoteResumeCard";
import CreateNoteFluent from "../../components/modals/CreateNoteButton";
import CreateNote from "../../components/modals/CreateNoteModal";
import ReadNoteModal from "../../components/modals/ReadNoteModal";
import NotesSearchInput from "../../components/ui/inputs/NotesSearchInput";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import { useNoteModal } from "../../contextProcessors/ReadNoteModalContext";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.2,
		},
	},
};

export function countWords(notes) {
	return notes.reduce((total, item) => {
		const words = item.note.split(" ").length;
		return total + words;
	}, 0);
}

export function mostUsedWord(notes) {
	const wordDict = {};

	notes.map((notes) => {
		const words = notes.note.split(" ");

		words.map((word) => {
			if (word === "") {
			} else {
				wordDict[word] = (wordDict?.[word] || 0) + 1;
			}
		});
	});

	return Object.keys(wordDict).reduce((max, currWord) => {
		return wordDict[currWord] > wordDict[max] ? currWord : max;
	}, 0);
}

export default function NotesPage() {
	const [loaded, setLoaded] = useState(false);
	const [noteSearchQuery, setNoteSearchQuery] = useState("");


	// Note: It's often better to initialize these outside the component
	// or use useMemo to avoid re-creating them on every render.
	const { service, notes, setNotes, noteForModal, setNoteForModal, toggleReadNoteModalVisibility } = useNoteContext();

	async function loadNotes() {
		const result = await service.getAll();
		setNotes(result);
	}

	useEffect(() => {
		loadNotes();
		setTimeout(() => {
			setLoaded(true);
		}, 50);
	}, []);


	useEffect(() => {
		console.log(noteSearchQuery);
	}, [noteSearchQuery]);

	function handleDelete(id: string) {
		service.removeNote(id);
	}

	function handleOpenModal(note: NoteEntity) {
		console.log(note);
		
		toggleReadNoteModalVisibility()
		setNoteForModal(note)
		
	}

	

	return (
		<>
			<section className="hover:bg-accent-foreground rounded-lg p-4 border border-accent/20 m-1">
				<h1 className="text-background text-lg">My Notes</h1>
				<span className="text-md text-background/30">
					Visualize your notes, edit it or create new ones...
				</span>
			</section>

			{/* Insights from notes */}
			{loaded && (
				<motion.section
					className="hover:bg-accent-foreground rounded-lg p-4 border border-accent/20 m-1 flex  gap-4 *:grow  "
					variants={containerVariants}
					initial="hidden"
					animate="show"
				>
					<InsightCardForNoteListPage
						colorVariant="yellow"
						title="Typed words"
						value={`${countWords(notes)}`}
					/>
					<InsightCardForNoteListPage
						colorVariant="green"
						title="Total notes"
						value={`${notes.length}`}
					/>
					<InsightCardForNoteListPage
						colorVariant="purple"
						title="Most used words"
						value={`"${mostUsedWord(notes)}"`}
					/>
				</motion.section>
			)}

			<AnimatePresence mode="popLayout">
				<motion.div
					className="flex flex-wrap border p-4 m-1 rounded-2xl bg-accent-foreground/80 border-accent/10 gap-2 *:grow *:max-w-1/2  "
					layout
					variants={containerVariants}
					initial="hidden"
					animate={loaded ? "show" : "hidden"}
				>
					<div className={"!w-full !max-w-full "}>
						<NotesSearchInput onTyping={setNoteSearchQuery} className=""/>
					</div>

					{notes.length && notes.length ? (
						notes
							.filter(
								(note) =>
									note.note
										.toLocaleLowerCase()
										.includes(noteSearchQuery.toLocaleLowerCase()) ||
									note.title
										.toLocaleLowerCase()
										.includes(noteSearchQuery.toLocaleLowerCase()),
							)
							.map((note) => (
								<NoteResumeCard
									note={note}
									key={note.id}
									onDelete={() => {
										handleDelete(note.id);
									}}
									onReadOpen={() => {
										handleOpenModal(note);
									}}
								/>
							))
					) : (
						<div>
							<h1 className="text-white">No notes</h1>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
			<CreateNoteFluent></CreateNoteFluent>
		</>
	);
}
