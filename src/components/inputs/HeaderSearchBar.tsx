import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNoteContext } from "../../contextProcessors/NotesServiceContext";
import HeaderSearchDropDown from "../modals/dropDown/headerSearchDropDown";

export default function HeaderSearchBar() {
	const [showModal, setShowModal] = useState(false);
	const [query, setQuery] = useState("");

	const { notes } = useNoteContext();

	const [fetchData] = useDebounce(query, 400);

	return (
		<div className="relative w-full max-w-md">
			<input
				onFocus={() => {
					setShowModal(true);
				}}
				onBlur={() => {
					setShowModal(false);
				}}
				onChange={(e) => {
					setQuery(e.target.value);
				}}
				type="text"
				placeholder="Search notes"
				className="w-full bg-dark-muted/30 text-over-muted px-4 py-2 rounded-full border-2 border-transparent focus:border-accent-blue focus:outline-none transition-all duration-300"
			/>
			<Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral w-5 h-5" />

			<div className="absolute mt-5 w-full z-50">
				{showModal && (
					<HeaderSearchDropDown
						onType={() => {}}
						data={notes}
						query={fetchData}
					/>
				)}
			</div>
		</div>
	);
}
