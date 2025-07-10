import { motion } from "framer-motion";

interface SaveNoteButtonProps {
	title: string;
	callBack: () => void;
	type: "success" | "alert" | "info";
}

const baseButtonStyles =
	"rounded p-2 text-sm font-semibold shadow-sm transition-all duration-200 ease-in-out transform  flex basis-[20%] shrink-1 hover:basis-[30%] hover:justify-center";
const buttonTypeStyles: Record<SaveNoteButtonProps["type"], string> = {
	success: "bg-primary text-primary-foreground hover:bg-primary/90",
	alert: "bg-destructive/70 text-white/80 hover:bg-destructive/80",
	info: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
};

export default function SaveNoteButton({
	title,
	callBack,
	type,
}: SaveNoteButtonProps) {
	const combinedClasses = `${baseButtonStyles} ${buttonTypeStyles[type]}`;

	return (
		<motion.button type="button" onClick={callBack} className={combinedClasses}>
			{title}
		</motion.button>
	);
}
