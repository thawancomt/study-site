import { AnimatePresence } from "framer-motion";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import CreateNote from "../components/modals/CreateNoteModal";
import type { NoteEntity } from "../ORM/notes/entities/notes.entity";
import MongoDBNotesRepo from "../ORM/notes/implementations/notes.concrete.mongodb.repository";
import { ConcreteNoteService } from "../ORM/notes/implementations/notes.concrete.service";

interface NoteServiceContextOptions {
	service: ConcreteNoteService;
	notes: NoteEntity[];
	setNotes: Dispatch<SetStateAction<NoteEntity[]>>;
	showCreateModal: boolean;
	toggleCreateModal: () => void;
}

const NoteServiceContext = createContext<NoteServiceContextOptions | null>(
	null,
);

function NoteServiceProvider({ children }: { children: React.ReactNode }) {
	const noteRepo = new MongoDBNotesRepo();
	const noteService = new ConcreteNoteService(noteRepo);

	const [notes, setNotes] = useState<NoteEntity[]>([]);

	const [showCreateModal, setShowCreateModal] = useState(false);

	function toggleCreateModal() {
		setShowCreateModal(!showCreateModal);
	}

	return (
		<NoteServiceContext.Provider
			value={{
				service: noteService,
				notes: notes,
				setNotes: setNotes,
				toggleCreateModal: toggleCreateModal,
				showCreateModal: showCreateModal,
			}}
		>
			{children}
			<AnimatePresence mode="wait">
				{showCreateModal && <CreateNote />}
			</AnimatePresence>
		</NoteServiceContext.Provider>
	);
}

function useNoteContext() {
	const context = useContext(NoteServiceContext);

	if (!context) {
		throw new Error("No context found");
	}

	return context;
}

export { NoteServiceProvider, useNoteContext };
