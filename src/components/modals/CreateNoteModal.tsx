import { motion } from "framer-motion";
import { Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import type { NewNoteEntity } from "../../ORM/notes/entities/notes.entity";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";
import InputWithTextAndIcon from "../ui/inputs/TitleInput";

const cardStyles = {
    normal: "border-2 border-dark-muted",
    saved: "border-2 border-green-500",
    deleted: "border-2 border-red-500",
};

export default function CreateNoteModal() {
    const [cardState, setCardState] = useState<"normal" | "saved" | "deleted">(
        "normal",
    );

    const { service, toggleCreateModalVisibility } = useNoteContext();

    const [note, setNote] = useState<NewNoteEntity>({
        title: "",
        note: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        subjects: [],
    });

    async function handleSaveNote() {
        try {
            await service.addNote({
                ...note,
                subjects: [],
            });

            setCardState("saved");

            setTimeout(toggleCreateModalVisibility, 800);
        } catch {
            setCardState("deleted");
        }
    }

    function resetComponent() {
        setCardState("deleted");
        setNote({
            ...note,
            note: "",
            title: "",
        });
    }

    useEffect(() => {
        setTimeout(() => {
            setCardState("normal");
        }, 600);
    }, []);

    return (
        <motion.div
            className="w-screen h-screen bg-dark/30 backdrop-blur-sm fixed inset-0 flex justify-center items-center "
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            onClick={() => {
                toggleCreateModalVisibility();
            }}
        >
            <motion.div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={`${cardStyles[cardState]} rounded-lg shadow-lg bg-dark text-over-dark p-6 w-11/12 md:w-3/4 lg:w-8/12 max-h-[80vh] overflow-y-auto transition-all duration-500`}
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
            >
                <motion.div>
                    <motion.h1 className="ml-4 my-2 text-lg">
                        Create a new note
                    </motion.h1>
                </motion.div>
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
                <main className="w-full flex justify-center p-2">
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
                        placeholder="Type your thoughts"
                        className="w-full h-64 bg-dark-muted focus:outline-none focus:border-none text-over-dark p-4 rounded-md "
                    ></textarea>
                </main>
                <footer className="w-full flex justify-end gap-4">
                    <SaveNoteButton
                        title="Save"
                        callBack={handleSaveNote}
                        type={"create"}
                        icon={<Save />}
                    />
                    <SaveNoteButton
                        title="Discard"
                        callBack={resetComponent}
                        type={
                            note.note.length > 0 || note.title.length > 0
                                ? "alert"
                                : "disabled"
                        }
                        icon={<Trash2 />}
                    />
                </footer>
            </motion.div>
        </motion.div>
    );
}
