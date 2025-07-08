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
			className="bg-chart-1/40 text-accent-foreground p-1 rounded-lg m-1 w-fit min-w-32 "
			onMouseOver={() => {
                console.log(parentRef.current);
                
				setShowToast(true);
			}}
			onMouseLeave={() => {
				setShowToast(false);
			}}
			onFocus={() => {}}
		>
			<span className="">{name}</span>
			<AnimatePresence mode="wait">
				{showToast && (
					<motion.div
						className="absolute bg-accent-foreground text-muted p-2 rounded-full"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.09, y: 10 }}
						style={{
							x: parentRef.current?.getBoundingClientRect().x,
							y: parentRef.current?.getBoundingClientRect().y,
						}}
					>
						<p>{description}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
