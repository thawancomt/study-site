import { animate, motion } from "framer-motion";
import { Book, Container, Type } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface InputProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<any>>;
}

const containerVariants = {
	initial: {
		opacity: 0,
		x: 33,
		borderWidth: 2,
		borderColor: "hsl(100, 30%, 0%)",
	},
	animate: {
		opacity: 1,
		x: 0,
		borderColor: "hsl(100, 30%, 30%)",
	},
	transition: {
		delay: 1,
	},
};

export default function InputWithTextAndIcon({ value, setValue }: InputProps) {
	useEffect(() => {
		setValue("Title");
	}, []);

	return (
		<motion.div
			className="flex relative bg-accent-foreground/70 hover:bg-accent-foreground rounded-2xl transition-all duration-750"
			variants={containerVariants}
			initial="initial"
			animate="animate"
			transition={"transition"}
		>
			<input
				type="text"
				value={value}
				placeholder="Title"
				className="text-accent bg-transparent p-4  rounded-md w-full focus:outline-none ml-8"
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			<Type className="absolute top-1/2 -translate-y-1/2 left-2 text-accent" />
		</motion.div>
	);
}
