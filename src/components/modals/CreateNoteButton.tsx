import { CirclePlus, X } from "lucide-react";
import { useContext, useState } from "react";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import NoTitleHoverButton from "../ui/buttons/NoTitleHoverButton";
import SaveNoteButton from "../ui/buttons/SaveNoteButton";

export default function CreateNoteFluent() {
	const { showCreateModal, toggleCreateModalVisibility } = useNoteContext();
	return (
		<div className="fixed bottom-4 right-4">
			<NoTitleHoverButton
				callBack={toggleCreateModalVisibility}
				title={showCreateModal ? "Close" : "Create note"}
				type="success"
			/>
		</div>
	);
}
