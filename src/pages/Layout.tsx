import { AnimatePresence } from "framer-motion";
import type React from "react";
import CreateNote from "../components/modals/CreateNoteModal";
import ReadNoteModal from "../components/modals/ReadNoteModal";
import Header from "../components/sections/Header";
import { useNoteContext } from "../contextProcessors/NotesServiceContext";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    const { showCreateModal, showReadNoteModal } = useNoteContext();
    return (
        <div className="z-50">
            <Header />
            {children}
            <AnimatePresence mode="wait">
                {showCreateModal && <CreateNote />}
            </AnimatePresence>
            <AnimatePresence>
                {showReadNoteModal && <ReadNoteModal />}
            </AnimatePresence>
        </div>
    );
}
