import { AnimatePresence, motion, scale } from "framer-motion";
import { Sparkles } from "lucide-react";
import React, { type ReactNode, useEffect, useState } from "react";

interface SaveNoteButtonProps {
	title: string;
	callBack: () => void;
	type: "success" | "alert" | "info";
	icon?: ReactNode & { type: { name: string } };
}

const baseButtonStyles =
	"rounded-xl p-2 text-sm font-semibold shadow-sm transition-all duration-200 ease-in-out transform  flex basis-[20%] shrink-1  ";
const buttonTypeStyles: Record<SaveNoteButtonProps["type"], string> = {
	success: "bg-primary text-primary-foreground hover:bg-primary/90",
	alert: "bg-destructive/70 text-white/80 hover:bg-destructive/80",
	info: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
};

export default function SaveNoteButton({
	title,
	callBack,
	type,
	icon,
}: SaveNoteButtonProps) {
	const combinedClasses = `${baseButtonStyles} ${buttonTypeStyles[type]}`;
	const [animate, setAnimate] = useState(0);


	return (
		<motion.button
			type="button"
			onClick={callBack}
			whileHover={{
				scale: 1.02,
			}}
			transition={{}}
			className={combinedClasses + "flex items-center gap-2"}
		>
			<AnimatePresence mode="wait">
				<motion.div
					key={animate}
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
					{icon ?? <Sparkles />}
				</motion.div>
			</AnimatePresence>
			<motion.span
				initial={{
					opacity: 0,

				}}
				animate={{
					opacity: 1
				}}
			>{title}</motion.span>
		</motion.button>
	);
}
