import { AnimatePresence, motion, scale } from "framer-motion";
import type React from "react";
import { useRef, useState } from "react";
import type { SubjectsEntity } from "../../ORM/subjects/entities/subjects.entity";

interface tipProps {
	name: SubjectsEntity["name"];
	description: SubjectsEntity["description"];
	parentRef: React.RefObject;
}
export default function Tip({ name, description, parentRef}: tipProps) {
	const [showToast, setShowToast] = useState(false);

	return (
		<div
			className="bg-chart-1/40 text-accent-foreground p-1 rounded-lg  w-fit min-w-32 "
			onMouseOver={() => {
                console.log(parentRef.current);
                
				setShowToast(true);
			}}
			onMouseLeave={() => {
				setShowToast(false);
			}}
			onFocus={() => {}}
		>

			{/* Text */}
			
			<p className="w-full text-center font-extrabold text-sm">{name}</p>
			<AnimatePresence mode="wait">
				{showToast && (
					<motion.div
						className="absolute bg-accent-foreground text-muted p-2 rounded-full  translate-y-1/2"
					>
						<p>{description}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
