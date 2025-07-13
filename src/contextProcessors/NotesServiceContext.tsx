import { AnimatePresence } from "framer-motion";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useCallback,
	useContext,
	useMemo,
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
	toggleCreateModalVisibility: () => void;
	updateNoteOnContext: (noteId : string, note : NoteEntity) => boolean;
}

const NoteServiceContext = createContext<NoteServiceContextOptions | null>(
	null,
);

function NoteServiceProvider({ children }: { children: React.ReactNode }) {
	const [noteService] = useState(() => {
		const noteRepo = new MongoDBNotesRepo();
		return new ConcreteNoteService(noteRepo);
	});

	const [notes, setNotes] = useState<NoteEntity[]>([]);

	const [showCreateModal, setShowCreateModal] = useState(false);

	const toggleCreateModalVisibility = useCallback(() => {
		setShowCreateModal((prev) => !prev);
	}, []);

	function updateNoteOnContext(noteId: string, updatedNote: NoteEntity) {

		const result = noteService.modifyNote(noteId, updatedNote)

		if (!result) result;

		notes.map((item) => {
			if (item.id === noteId) {
				return updatedNote;
			} else return item;
		});

		return true
	}

	const contextValue = useMemo(
		() => ({
			service: noteService,
			notes : notes,
			setNotes : setNotes,
			showCreateModal: showCreateModal,
			toggleCreateModalVisibility : toggleCreateModalVisibility,
			updateNoteOnContext : updateNoteOnContext
		}),
		// biome-ignore lint/correctness/useExhaustiveDependencies: <because i want hun>
		[noteService, notes, showCreateModal, toggleCreateModalVisibility, updateNoteOnContext],
	);

	return (
		<NoteServiceContext.Provider value={contextValue}>
			{children}
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
