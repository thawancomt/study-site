import { AnimatePresence, motion, scale } from "framer-motion";
import { CircleAlertIcon, CirclePlus, Sparkles } from "lucide-react";
import React, { type ReactNode, useEffect, useState } from "react";
import { useNoteContext } from "../../../contextProcessors/NotesServiceContext";

interface SaveNoteButtonProps {
	title: string;
	callBack: () => void;
	type: "success" | "alert" | "info";
	icon?: ReactNode & { type: { name: string } };
}

const baseButtonStyles =
	"rounded-xl p-2 text-sm font-semibold shadow-sm transition-all duration-500 ease-in-out  flex items-center gap-2 overflow-hidden group shadow-xs shadow-white ";
const buttonTypeStyles: Record<SaveNoteButtonProps["type"], string> = {
	success: "bg-primary text-primary-foreground hover:bg-primary/90",
	alert: "bg-destructive/70 text-white/80 hover:bg-destructive/80",
	info: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
};

export default function NoTitleHoverButton({
	title,
	callBack,
	type,
	icon,
}: SaveNoteButtonProps) {
	const [showText, setShowText] = useState(false);
	const [styleType, setStyleType] = useState<SaveNoteButtonProps["type"]>(type);

	const combinedClasses = `${baseButtonStyles} ${buttonTypeStyles[styleType]}`;

	let showTimeOut;

    const {showCreateModal} = useNoteContext()

	return (
		<motion.button
			type="button"
			onClick={callBack}
			whileHover={{
				scale: 1.1,
			}}
            whileTap={{
                scale: 0.8,
                transition: {
                    duration: 0.3,
                    type: "spring"
                }
            }}

			onMouseEnter={() => {
				clearTimeout(showTimeOut);
				setShowText(true);
				setStyleType("info");
			}}
			onMouseLeave={() => {
				showTimeOut = setTimeout(() => {
					setShowText(false);
					setStyleType("success");
				}, 1000);
			}}
			className={combinedClasses}
		>
			<AnimatePresence mode="wait">
				<motion.div
					initial={{
						rotate: 30,
						y: 4,
					}}
					animate={{
						rotate: 0,
						y: 0,
					}}
					exit={{
						rotate: 60,
						y: 4,
					}}
					transition={{
						type: "spring",
						duration: 0.5,
					}}
				>
					{icon ?? (
						<CirclePlus className="group-hover:rotate-45 transition-all duration-300 group-hover:scale-105" />
					)}
				</motion.div>
			</AnimatePresence>
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
							opacity: 1,
							width: 0,
							display: "none",
							transition: {
								duration: 0.1,
							},
						}}
					>
						{title}
					</motion.span>
				)}
			</AnimatePresence>
		</motion.button>
	);
}
