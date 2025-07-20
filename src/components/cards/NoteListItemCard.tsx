import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import type { NoteEntity } from "../../ORM/notes/entities/notes.entity";

const itemAnimationVariant = {
    initial: {
        opacity: 0,
        x: 35,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
};

export default function NoteListItemCard({ note }: { note: NoteEntity }) {
    const { setNoteForModal, toggleReadNoteModalVisibility } = useNoteContext();

    function onClickCallback() {
        setNoteForModal(note);
        toggleReadNoteModalVisibility();
    }

    return (
        <motion.li
            variants={itemAnimationVariant}
            onMouseDown={(_e) => {
                onClickCallback();
            }}
            key={note.id}
            className="group cursor-pointer rounded-lg p-4 transition-colors hover:bg-white/10 bg-accent-foreground/30 border border-foreground/10 backdrop-blur-2xl"
        >
            <h3 className="text-md font-semibold text-slate-200 transition-colors group-hover:text-white flex justify-between items-center">
                {note.title}
                {/* Enable the ai icon for note that has resume by AI */}
                {note.aiResume && (
                    <div className="">
                        <Sparkles
                            className="w-4 h-4"
                            aria-label="the AI resume"
                            alt="teste"
                        />
                    </div>
                )}
            </h3>
            <p className="text-sm text-slate-400 transition-colors group-hover:text-slate-300">
                {note.note.slice(0, 100)}...
            </p>
        </motion.li>
    );
}
