import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";
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

	return (
		<motion.div
			ref={parentRef}
			layout
			onClick={onRemove}
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0 }}
			className="border-accent-foreground bg-muted-foreground text-accent-foreground p-2 border hover:bg-muted hover:text-chart-5 relative"
		>
			<h1>{note.title}</h1>
			<section className="ml-4 ">
				<span className="text-sm text-dark-muted truncate">{note.note}</span>
			</section>
			<div>
				{note.subjects.map((subject) => (
					<Tip
						key={note.id + "dasdas"}
						name={subject.name}
						description={subject.description}
						parentRef={parentRef}
					/>
				))}
			</div>
		</motion.div>
	);
}
