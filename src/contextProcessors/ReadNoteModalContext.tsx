import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { NoteEntity } from "../ORM/notes/entities/notes.entity";

interface ReadModalOptions {
	note: NoteEntity;
	setNote: Dispatch<SetStateAction<NoteEntity>>;
}

const ReadNoteModalContext = createContext<ReadModalOptions>(null);

export default function ReadModalProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [note, setNote] = useState<NoteEntity>({
		createdAt: new Date(),
		id: "",
		note: "",
		subjects: [],
		title: "",
		updatedAt: new Date(),
	});

	return (
		<ReadNoteModalContext.Provider value={{ note: note, setNote: setNote }}>
			{" "}
			{children}{" "}
		</ReadNoteModalContext.Provider>
	);
}

export function useNoteModal() {
	const context = useContext(ReadNoteModalContext);

	if (!context) {
		throw Error("Not found");
	}

	return context;
}
