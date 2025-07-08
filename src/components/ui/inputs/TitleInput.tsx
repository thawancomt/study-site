import type React from "react";
import { useEffect, useState } from "react";

interface InputProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<any>>;
}

export default function InputWithTextAndIcon({ value, setValue }: InputProps) {

	const [titleChanged, setTitleChanged] = useState<boolean>(false)

	useEffect(() => {
		setValue("Title")
	}, [])

	return (
		<input
			type="text"
			value={value}
			placeholder="Title"
            className="text-accent bg-transparent p-4  rounded-md w-full focus:outline-none"
			onChange={(e) => {
				setValue(e.target.value);
			}}
		/>
	);
}
