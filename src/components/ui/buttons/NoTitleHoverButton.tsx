// components/NoTitleHoverButton.tsx
import { AnimatePresence, motion } from "framer-motion"; // motion is still needed for motion.span
import { CirclePlus } from "lucide-react";
import React, { type ReactNode, useState } from "react";
import { useNoteContext } from "../../../contextProcessors/NotesServiceContext";
import { Button } from "./Button";
import {
	baseButtonStyles,
	buttonTypeStyles,
	type SaveNoteButtonProps, // Still useful for defining the 'type'
} from "./SaveNoteButton"; // Import from the same location

export default function NoTitleHoverButton({
	title,
	callBack,
	type, // We'll still receive the initial type, but override on hover
	icon,
}: SaveNoteButtonProps) {
	const [showText, setShowText] = useState(false);
	const [styleType, setStyleType] = useState<SaveNoteButtonProps["type"]>(type);

	const combinedClasses = `${baseButtonStyles} ${buttonTypeStyles[styleType]}`;

	// Use useRef for timeouts to prevent issues with stale closures
	// Or, better yet, use a state variable for the timeout ID
	const [showTimeoutId, setShowTimeoutId] = useState<NodeJS.Timeout | null>(
		null,
	);

	const { showCreateModal } = useNoteContext();

	return (
		<Button
			onClick={callBack}
			className={combinedClasses}
			whileHover={{
				scale: 1.1,
			}}
			whileTap={{
				scale: 0.8,
				transition: {
					duration: 0.3,
					type: "spring",
				},
			}}
			onMouseEnter={() => {
				if (showTimeoutId) clearTimeout(showTimeoutId);
				setShowText(true);
				setStyleType("create");
			}}
			onMouseLeave={() => {
				const id = setTimeout(() => {
					setShowText(false);
					setStyleType("success");
				}, 1000);
				setShowTimeoutId(id);
			}}
			icon={
				icon ?? (
					<CirclePlus className="group-hover:rotate-45 transition-all duration-300 group-hover:scale-105" />
				)
			}
		>
			<AnimatePresence mode="wait">
				{(showText || showCreateModal) && (
					<motion.span
						className="text-nowrap"
						initial={{
							opacity: 0,
							width: 0,
							x: 100,
						}}
						animate={{
							opacity: 1,
							width: "fit-content",
							x: 0,
							transition: {
								duration: 0.3,
								damping: 150,
								stiffness: 540,
							},
						}}
						exit={{
							opacity: 1, // Keep opacity at 1 during exit for a smoother disappear
							width: 0,
							display: "none", // Remove from layout after animation
							transition: {
								duration: 0.1,
							},
						}}
					>
						{title}
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);
}
