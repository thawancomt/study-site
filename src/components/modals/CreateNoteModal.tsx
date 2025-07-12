import { motion } from "framer-motion";
import { useState } from "react";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import type { NewNoteEntity } from "../../ORM/notes/entities/notes.entity";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import InputWithTextAndIcon from "../ui/inputs/TitleInput";

export default function CreateNoteModal() {
	const { service } = useNoteContext();

	const [note, setNote] = useState<NewNoteEntity>({
		title: "",
		note: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		subjects: [],
	});

	async function handleSaveNote() {
		const result = await service.addNote({
			...note,
			subjects: [],
		});

		return result;
	}

	function resetComponent() {
		setNote({
			...note,
			note: "",
			title: "",
		});
	}

	return (
		<motion.div className="bg-accent-foreground/30 backdrop-blur-2xl w-[50vh] rounded shadow-lg shadow-dark border border-accent/20 p-2 hover:shadow-accent/10 fixed inset-0"
			initial={{
				opacity: 0,
				x : document.body.clientWidth
			}}
			animate={{
				opacity: 1,
				x: 0

			}}
			exit={{
				x: document.body.clientWidth,
				opacity: 0
			}}

			transition={{
				type: "spring",
			}}
		>
			<section className="border-accent">
				<InputWithTextAndIcon
					value={note.title}
					setValue={(newValue) => {
						setNote({
							...note,
							title: newValue,
						});
					}}
				/>
			</section>
			<main className=" w-full flex justify-center p-2">
				<textarea
					value={note.note}
					onChange={(e) => {
						setNote((prev) => ({
							...prev,
							note: e.target.value,
						}));
					}}
					name=""
					id=""
					className="w-[80vh]  focus:outline-none focus:border-none text-accent bg-sidebar-accent-foreground/70 p-4  rounded-md focus-within:ring-amber-300"
				></textarea>
			</main>
			<footer className="w-full flex justify-end gap-4">
				<SaveNoteButton title="Save" callBack={handleSaveNote} type={"info"} />
				<SaveNoteButton
					title="Discard"
					callBack={resetComponent}
					type={"alert"}
				/>
			</footer>
		</motion.div>
	);
}
