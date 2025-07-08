import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function SearchSubjectInput() {
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<input
				type="text"
				placeholder="Search for a subject..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onFocus={() => setShowSearchResults(true)}
				onBlur={() => setShowSearchResults(false)}
				className="w-full p-2 rounded-lg bg-dark-muted text-over-muted focus:outline-none focus:ring-2 focus:ring-color-over-dark"
			/>
			<AnimatePresence mode="wait">
				{showSearchResults && (
					<motion.div
						className="absolute  rounded-lg left-0 top-32 w-full  p-2"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
					>
						<ul className="flex bg-dark-muted/20 p-2 rounded-lg  *:border *:grow *:shrink-0 *:basis-[200px] overflow-x-auto">
							<motion.li
								className="p-2 hover:bg-dark-muted rounded-lg"
								initial={{ opacity: 0, display: "none" }}
								animate={{ opacity: 1, display: "flex" }}
								exit={{ opacity: 0, display: "none" }}
								transition={{ duration: 0.3 }}
							>
								Subject 1
							</motion.li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
