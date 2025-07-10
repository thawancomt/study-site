import { AnimatePresence, motion, scale } from "framer-motion";
import type React from "react";
import { useRef, useState } from "react";
import type { SubjectsEntity } from "../../ORM/subjects/entities/subjects.entity";

interface tipProps {
	name: SubjectsEntity["name"];
	description: SubjectsEntity["description"];
}
export default function Tip({ name, description}: tipProps) {

	return (
		<div
			className="bg-chart-1/40 hover:bg-chart-1/60 text-accent-foreground p-1 rounded-lg min-w-fit transition-colors duration-700"
		>

			{/* Text */}
			
			<p className="w-full text-center font-extrabold text-xs">{name}</p>
		</div>
	);
}
