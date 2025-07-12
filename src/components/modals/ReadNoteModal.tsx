import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useState } from "react";
import { useNoteModal } from "../../contextProcessors/ReadNoteModalContext";
import { countWords } from "../../pages/notes/NoteListPage";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";

interface ReadNoteModalProps {
	onClose: () => void;
}

export default function ReadNoteModal({ onClose }: ReadNoteModalProps) {
	const { note, setNote } = useNoteModal();
	const [noteContent, setNoteContent] = useState(note.note);
	const handleSave = () => {
		console.log("noteContent", noteContent);
	};
	return (
		<motion.div
			className="w-screen h-screen bg-accent-foreground/60 backdrop-blur-2xl fixed inset-0 flex justify-center items-center"
			onClick={onClose}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0.1,
			}}
		>
			<motion.div
				className="border-2 border-primary rounded-lg shadow-lg bg-card text-card-foreground p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto "
				initial={{
					scale: 0.9,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
					transition: {
						duration: 0.4,
						ease: "easeOut",
					},
				}}
				exit={{
					scale: 0.9,
					opacity: 0,
				}}
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
			>
				<div className="flex justify-between items-start mb-4">
					<h2 className="text-2xl font-bold text-primary">{note.title}</h2>

					<button
						type="button"
						onClick={onClose}
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<X size={24} />
					</button>
				</div>
				<div className="flex gap-2 *:bg-primary/30 w-fit *:px-2 *:rounded-xl *:text-xs mb-2 -mt-2">
					<span>words: {countWords([note])}</span>
					<span>letters: {noteContent.length}</span>
				</div>

				<div className="flex flex-col gap-4">
					<textarea
						value={noteContent}
						onChange={
							(e) => {
                                setNote( prev => ({
                                    ...prev,
                                    note : e.target.value

                                }))
                                setNoteContent(e.target.value)
                            }
						}
						className="h-64"
					/>
					<div>
						<SaveNoteButton
							callBack={() => {}}
							title="Save"
							type="success"
							icon={<Save></Save>}
						/>
					</div>
				</div>

				{note.subjects && note.subjects.length > 0 && (
					<div className="mt-6 pt-4 border-t border-border">
						<h3 className="text-lg font-semibold mb-2 text-primary">
							Related Subjects
						</h3>
						<div className="flex flex-wrap gap-2">
							{note.subjects.map((subject) => (
								<span
									key={subject.id}
									className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
								>
									{subject.name}
								</span>
							))}
						</div>
					</div>
				)}
			</motion.div>
			<motion.div
				className="flex items-center gap-2 mt-3 ml-2 absolute bottom-0 right-1/2 -translate-y-1/2 translate-x-1/2  p-2 rounded-2xl backdrop-blur-sm border border-accent/3"
				initial={{
					y: 100,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
					transition: {
						damping: 20,
						stiffness: 400,
						type: "spring",
					},
				}}
				exit={{
					y: 10,
				}}
			>
				<p className="text-accent text-xs">Created at:</p>
				<span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
					{note.createdAt?.toDateString() || "jan 12 2023"}
				</span>
			</motion.div>
		</motion.div>
	);
}
