// src/components/cards/NoteResumeCard.jsx

import { motion, number } from "framer-motion";
import { useRef, useState } from "react";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import Tip from "../ui/tip";

interface noteResumeCardProps {
	note: NoteEntity;
	onRemove: () => void;
}

const cardVariants = {
	// The names "hidden" and "show" match the parent's variants
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export default function NoteResumeCard({
	note,
	onRemove,
}: noteResumeCardProps) {
	const parentRef = useRef<HTMLDivElement>(null);

	// Hardcoded subjects for example
	note.subjects = [
		{ id: 1, description: "tgeste", name: "technology" },
		{ id: 2, description: "tgeste", name: "science" },
		{ id: 3, description: "tgeste", name: "art" },
	];
    const DEFAULT_MAX_CHARS = 300
	const [maxChars, setMaxChars] = useState(DEFAULT_MAX_CHARS);

	function handleExpandNote() {
		if (Number.isNaN(maxChars)) {
			setMaxChars(DEFAULT_MAX_CHARS);
			return;
		} else {
			setMaxChars(NaN);
		}
	}

	return (
		// 👇 The props initial="hidden" and animate="show" have been removed from here
		<motion.div
			ref={parentRef}
			layout
			variants={cardVariants}
			exit={{ opacity: 0 }}
			className="border-accent-foreground/30 bg-muted-foreground/80 text-accent-foreground p-2 border relative rounded-lg h-fit"
		>
			<section className="p-4 hover:bg-accent-foreground/30 bg-accent-foreground/40 mb-2 rounded-lg transition-all duration-300">
				<h1 className="font-extrabold">{note.title}</h1>
			</section>

			{/* Text area */}
			<section className="ml-4 border rounded-lg bg-accent-foreground ">
				<span className="text-sm text-accent p-2 ">
					{note.note.slice(0, maxChars || Infinity - 3)}{" "}
					{note.note.length > maxChars ? "..." : undefined}
				</span>
			</section>

			{note.subjects && (
				<motion.div className="flex justify-end mt-2 items-end gap-2">
					<span className="text-xs text-accent-foreground/80">
						Subjects on this note:
					</span>
					{note.subjects.map((subject) => (
						<Tip
							key={subject.id} // Use a unique key like subject.id
							name={subject.name}
							description={subject.description}
						/>
					))}
				</motion.div>
			)}

			{/* Footer */}
			<motion.section
				className="flex justify-end mt-2 gap-2"
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.2, staggerChildren: 0.4 }}
			>
				{note.note.length > maxChars || !isNaN(maxChars) ? (
					note.note.length > maxChars && (
						<SaveNoteButton
							callBack={handleExpandNote}
							title="Expand"
							type="info"
						/>
					)
				) : (
					<SaveNoteButton
						callBack={handleExpandNote}
						title="Minimize"
						type="info"
					/>
				)}
				<SaveNoteButton callBack={() => {}} title="Read" type="success" />
				<SaveNoteButton callBack={onRemove} title="Delete" type="alert" />
			</motion.section>
		</motion.div>
	);
}
