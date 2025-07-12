import { Search } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface NotesSearchInputProps {
	onTyping: Dispatch<SetStateAction<string>>;
}
export default function NotesSearchInput({ onTyping }: NotesSearchInputProps) {
	return (
		<div className="relative w-full group">
			<input
				type="text"
				className={
					"w-96 focus:w-full border transition-all duration-500  rounded-lg p-2 text-accent placeholder:text-accent/40 focus:outline-none border-muted-foreground pl-16 "
				}
				placeholder="Search your notes"
				onChange={(e) => {
					onTyping(e.target.value);
				}}
			/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent group-hover:rotate-12 transition-all duration-500 group-hover:scale-105   group-hover:w-10"/>
		</div>
	);
}
