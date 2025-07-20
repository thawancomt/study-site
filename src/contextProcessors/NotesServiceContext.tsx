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
import type { NoteEntity } from "../ORM/notes/entities/notes.entity";
import MongoDBNotesRepo from "../ORM/notes/implementations/notes.concrete.mongodb.repository";
import { ConcreteNoteService } from "../ORM/notes/implementations/notes.concrete.service";

interface NoteServiceContextOptions {
    service: ConcreteNoteService;
    notes: NoteEntity[];
    noteForModal: NoteEntity;
    setNoteForModal: Dispatch<SetStateAction<NoteEntity>>;
    setNotes: Dispatch<SetStateAction<NoteEntity[]>>;
    showCreateModal: boolean;
    showReadNoteModal: boolean;
    toggleCreateModalVisibility: () => void;
    toggleReadNoteModalVisibility: () => void;
    updateNoteOnContext: (noteId: string, note: NoteEntity) => boolean;
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
    const [noteForModal, setnoteForModal] = useState<NoteEntity>({
        createdAt: new Date(),
        id: "",
        note: "",
        subjects: [],
        title: "",
        updatedAt: new Date(),
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showReadNoteModal, setShowReadNoteModal] = useState(false);

    const toggleCreateModalVisibility = useCallback(() => {
        setShowCreateModal((prev) => !prev);
    }, []);

    function updateNoteOnContext(noteId: string, updatedNote: NoteEntity) {
        const result = noteService.modifyNote(noteId, updatedNote);

        result.then((res) => {
            setNotes(
                notes.map((item) => {
                    if (item.id === noteId) {
                        return res ? res : item;
                    } else return item;
                }),
            );
        });

        return true;
    }

    function toggleReadNoteModalVisibility() {
        setShowReadNoteModal(!showReadNoteModal);
    }

    const contextValue = useMemo(
        () => ({
            service: noteService,
            notes: notes,
            noteForModal,
            setNoteForModal: setnoteForModal,
            setNotes: setNotes,
            showCreateModal: showCreateModal,
            showReadNoteModal: showReadNoteModal,
            toggleCreateModalVisibility: toggleCreateModalVisibility,
            updateNoteOnContext: updateNoteOnContext,
            toggleReadNoteModalVisibility: toggleReadNoteModalVisibility,
        }),

        [
            noteService,
            notes,
            showCreateModal,
            toggleCreateModalVisibility,
            // biome-ignore lint/correctness/useExhaustiveDependencies: <because i want hun>
            updateNoteOnContext,
        ],
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
