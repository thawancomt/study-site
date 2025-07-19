// src/components/cards/NoteResumeCard.jsx

import { motion } from "framer-motion";
import { BookA, BookOpenText, Maximize, Minimize2, Trash } from "lucide-react";
import { useRef, useState } from "react";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import Tip from "../ui/tip";

interface noteResumeCardProps {
	note: NoteEntity;
	onDelete: () => void;
	onReadOpen: () => void;
}

const cardVariants = {
	// The names "hidden" and "show" match the parent's variants
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export default function NoteResumeCard({
	note,
	onDelete,
	onReadOpen,
}: noteResumeCardProps) {
	const parentRef = useRef<HTMLDivElement>(null);

	// Hardcoded subjects for example
	note.subjects = [
		{ id: 1, description: "tgeste", name: "technology" },
		{ id: 2, description: "tgeste", name: "science" },
		{ id: 3, description: "tgeste", name: "art" },
	];
	const DEFAULT_MAX_CHARS = 300;
	const [maxChars, setMaxChars] = useState(DEFAULT_MAX_CHARS);

	function handleExpandNote() {
		if (Number.isNaN(maxChars)) {
			setMaxChars(DEFAULT_MAX_CHARS);
			return;
		} else {
			setMaxChars(NaN);
		}
	}

	function handleDelete() {
		onDelete();
	}

	function handleReadNote() {
		onReadOpen();
	}

	return (
		// 👇 The props initial="hidden" and animate="show" have been removed from here
		<motion.div
			ref={parentRef}
			layout
			variants={cardVariants}
			exit={{ opacity: 0 }}
			className="border-accent-foreground/30 bg-muted-foreground/80 hover:bg-muted-foreground/90 text-accent-foreground p-2 border relative rounded-lg h-fit flex-1 "
			whileHover={{
				scale: 1.02,
			}}
		>
			<motion.section className="p-4 hover:bg-accent-foreground/30 bg-accent-foreground/40 mb-2 rounded-lg transition-all duration-300 flex gap-2 items-center justify-start group ">
				<BookA className="group-hover:text-accent-foreground/90" />
				<motion.h1 layout className="font-extrabold">
					{note.title}
				</motion.h1>
			</motion.section>

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
				className="flex justify-end mt-2 gap-2 w-full "
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
							icon={<Maximize />}
						/>
					)
				) : (
					<SaveNoteButton
						callBack={handleExpandNote}
						title="Minimize"
						type="info"
						icon={<Minimize2 />}
					/>
				)}
				<SaveNoteButton
					callBack={handleReadNote}
					title="Read"
					type="success"
					icon={<BookOpenText className="w-4 h-4" />}
				/>
				<SaveNoteButton
					callBack={handleDelete}
					title="Delete"
					type="alert"
					icon={
						<Trash className="w-4 h-4 hover:rotate-12 transition-all duration-300" />
					}
				/>
			</motion.section>
		</motion.div>
	);
}
