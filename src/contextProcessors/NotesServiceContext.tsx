import { createContext, useContext } from "react";
import MongoDBNotesRepo from "../ORM/notes/implementations/notes.concrete.mongodb.repository";
import { ConcreteNoteService } from "../ORM/notes/implementations/notes.concrete.service";

interface NoteServiceContextOptions {
	service: ConcreteNoteService;
}

const NoteServiceContext = createContext<NoteServiceContextOptions|null>(null);

 function NoteServiceProvider({ children }: { children: React.ReactNode }) {
	const noteRepo = new MongoDBNotesRepo();
	const noteService = new ConcreteNoteService(noteRepo);

	return (
		<NoteServiceContext.Provider value={{service : noteService }}>
			{children}
		</NoteServiceContext.Provider>
	);
}

function useNoteContext() {
    const context = useContext(NoteServiceContext);

    if (!context) {
        throw new Error("No context found")
    }

    return context
}

export {
	NoteServiceProvider, useNoteContext
}