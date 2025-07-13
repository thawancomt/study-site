import { motion } from "framer-motion";
import { BookA, Brain, CloudCheck, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import { countWords } from "../../pages/notes/NoteListPage";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import NotesSearchInput from "../ui/inputs/NotesSearchInput";

const titleDivVariants = {
	initial: {
		opacity: 0,
		x: 20,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	transition: {
		duration: 1,
	},
};

const itemAnimationVariant = {
	animate: {
		x: 0,
	},
	initial: {
		x: 30,
	},
};

const modalContainerVariants = {
	initial: {
		opacity: 0,
		scale: 0.9,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			staggerChildren: 0.3,
			delayChildren: 0.2,
		},
	},
};

export default function ReadNoteModal() {
	const { toggleReadNoteModalVisibility, noteForModal, setNoteForModal } =
		useNoteContext();
	const [noteContent, setNoteContent] = useState(noteForModal.note);
	const [resume, setResume] = useState(noteForModal.AiResume || "");
	const [icon, setIcon] = useState(<Save key={"saveIconOnReadModal"} />);

	const { updateNoteOnContext: contextUpdateNote, service } = useNoteContext();

	const handleSave = async () => {
		contextUpdateNote(noteForModal.id, { ...noteForModal, note: noteContent });

		setIcon(<CloudCheck />);
		setTimeout(toggleReadNoteModalVisibility, 800);
	};

	async function resumeNote() {
		const result = await service.resumeNote(noteForModal)
		console.log(result);
		if (result) {
			const response = result.choices[0].message.content
			setResume(response);
			setNoteForModal({
				...noteForModal,
				AiResume: response
			})
			contextUpdateNote(noteForModal.id, noteForModal)
		}
	}


	useEffect(() => {
		console.log(noteForModal);
		
		setResume(noteForModal.AiResume)
	}, [noteForModal])


	return (
		<motion.div
			className="w-screen h-screen bg-accent-foreground/60 backdrop-blur-2xl fixed inset-0 flex justify-center items-center"
			onClick={toggleReadNoteModalVisibility}
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
				className="border-2 border-primary rounded-lg shadow-lg bg-card text-card-foreground p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-hidden "
				variants={modalContainerVariants}
				initial="initial"
				animate="animate"
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
			>
				<motion.div
					variants={titleDivVariants}
					className="flex justify-between items-start mb-4"
				>
					<NotesSearchInput
						value={noteForModal.title}
						className="border-none !text-accent-foreground text-2xl placeholder:text-accent-foreground/80"
						onTyping={(newTitle: string) => {
							setNoteForModal((prev) => ({
								...prev,
								title: newTitle,
							}));
						}}
						icon={<BookA className="text-foreground" />}
					/>

					<button
						type="button"
						onClick={toggleReadNoteModalVisibility}
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<X size={24} />
					</button>
				</motion.div>

				<motion.div
					variants={titleDivVariants}
					className="flex gap-2 *:bg-primary/30 w-fit *:px-2 *:rounded-xl *:text-xs mb-2 -mt-2"
				>
					<span>words: {countWords([noteForModal])}</span>
					<span>letters: {noteContent.length}</span>
				</motion.div>

				<motion.div
					className="flex flex-col gap-4"
					variants={itemAnimationVariant}
				>
					<textarea
						value={noteContent}
						onChange={(e) => {
							setNoteContent(e.target.value);
						}}
						className="h-64"
					/>
				</motion.div>

				<motion.div variants={itemAnimationVariant}>
					<textarea
						name=""
						id=""
						value={resume}
						readOnly
						className="w-full p-4 border-4 rounded-2xl border-green-700 bg-muted-foreground text-accent"
					></textarea>
				</motion.div>

				<motion.div variants={itemAnimationVariant}>
					<SaveNoteButton
						callBack={handleSave}
						title="Save"
						type="success"
						icon={icon}
					/>

					<SaveNoteButton
						callBack={async () => {
							await resumeNote();
						}}
						title="Get resume"
						type="create"
						icon={<Brain />}
					/>
				</motion.div>

				{noteForModal.subjects && noteForModal.subjects.length > 0 && (
					<div className="mt-6 pt-4 border-t border-border">
						<h3 className="text-lg font-semibold mb-2 text-primary">
							Related Subjects
						</h3>
						<div className="flex flex-wrap gap-2">
							{noteForModal.subjects.map((subject) => (
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
					{noteForModal.createdAt?.toDateString() || "jan 12 2023"}
				</span>
			</motion.div>
		</motion.div>
	);
}
