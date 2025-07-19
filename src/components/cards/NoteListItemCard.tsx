import { motion } from "framer-motion";
import type React from "react";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";

export default function NoteListItemCard({ note }: { note: NoteEntity }) {
	const { setNoteForModal, toggleReadNoteModalVisibility } = useNoteContext();

	function onClickCallback() {
		setNoteForModal(note)
		toggleReadNoteModalVisibility();
	}

	return (
		<motion.li
			onMouseDown={(e) => {
				onClickCallback();
			}}
			key={note.id}
			className="group cursor-pointer rounded-lg p-4 transition-colors hover:bg-white/10"
		>
			<h3 className="text-md font-semibold text-slate-200 transition-colors group-hover:text-white">
				{note.title}
			</h3>
			<p className="text-sm text-slate-400 transition-colors group-hover:text-slate-300">
				{note.note.slice(0, 100)}...
			</p>
		</motion.li>
	);
}
