import { Search } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface NotesSearchInputProps {
    value?: string;
    onTyping?: (
        newValue: string,
    ) => undefined | Dispatch<SetStateAction<string>>;
    icon?: React.ReactNode;
    className?: string;
}
export default function NotesSearchInput({
    onTyping,
    icon,
    className,
    value,
}: NotesSearchInputProps) {
    return (
        <div className="relative w-full group ">
            <input
                type="text"
                className={
                    className +
                    " w-96 focus:w-full border transition-all duration-500  rounded-lg p-2 text-accent  focus:outline-none border-muted-foreground pl-16 "
                }
                placeholder="Search your notes"
                value={value}
                onChange={(e) => {
                    onTyping?.(e.target.value);
                }}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 group-hover:rotate-12 transition-all duration-500 group-hover:scale-105  group-hover:w-10 text-accent">
                {icon ?? <Search />}
            </div>
        </div>
    );
}
