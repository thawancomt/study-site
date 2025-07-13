import { AnimatePresence } from "framer-motion";
import type React from "react";
import CreateNote from "../components/modals/CreateNoteModal";
import Header from "../components/sections/Header";
import { useNoteContext } from "../contextProcessors/NotesServiceContext";

type AppLayoutProps = {
	children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
	const { showCreateModal } = useNoteContext();
	return (
		<div>
			<Header />
			{children}
			<AnimatePresence mode="wait">
				{showCreateModal && <CreateNote />}
			</AnimatePresence>
		</div>
	);
}
