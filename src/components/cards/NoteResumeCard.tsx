import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import Tip from "../ui/tip";

interface noteResumeCardProps {
	note: NoteEntity;
	onRemove: () => void;
}

export default function NoteResumeCard({
	note,
	onRemove,
}: noteResumeCardProps) {
	const [show, setShow] = useState<boolean>(true);

	const parentRef = useRef<HTMLDivElement>(null);

	note.subjects = [
		{id : 2,
			description: "tgeste",
			name: "tecnology"
		},
		{id : 2,
			description: "tgeste",
			name: "tecnology"
		},
		{id : 2,
			description: "tgeste",
			name: "tecnology"
		}
	]

	return (
		<motion.div
			ref={parentRef}
			layout
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0 }}
			className="border-accent-foreground/30 bg-muted-foreground/80 text-accent-foreground p-2 border relative rounded-lg"
		>
			<section className="p-4 hover:bg-accent-foreground/30 hover:rounded-lg transition-all duration-300">
				<h1 className="font-extrabold">{note.title}</h1>
			</section>

			{/* Text area */}
			<section className="ml-4 border rounded-lg bg-accent-foreground ">
				<span className="text-sm text-accent p-2 truncate">{note.note}</span>
			</section>


			
			<motion.div
			className="flex justify-end mt-2 items-end gap-2"

				
			>
				<span className="text-xs text-accent-foreground/80">Subjects on this note:</span>
				{note.subjects.map((subject) => (
					<Tip
						key={note.id + "dasdas"}
						name={subject.name}
						description={subject.description}
						parentRef={parentRef}
					/>
				))}
			</motion.div>

			{/* Footer */}
			<motion.section
				className="flex justify-end mt-2 gap-2"
				initial={{
					y: 20,
				}}
				animate={{
					y: 0,
					transitionDuration: 0.2,
					transition: {
						staggerChildren: 0.4,
					},
				}}
			>
				<SaveNoteButton callBack={() => {}} title="Read" type="success" />
				<SaveNoteButton callBack={() => {onRemove()}} title="Delete" type="alert" />
			</motion.section>
		</motion.div>
	);
}
