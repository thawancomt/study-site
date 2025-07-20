// components/SaveNoteButton.tsx

import { motion } from "framer-motion"; // motion is still needed for motion.span
import { Sparkles } from "lucide-react"; // Sparkles if it's the default icon
import React, { type ReactNode, useState } from "react";
import { Button } from "./Button";

// Existing interface, now we use it for SaveNoteButton's specific props
export type SaveNoteButtonProps = {
    title: string;
    callBack: () => void;
    type: "success" | "alert" | "info" | "disabled" | "create";
    icon?: ReactNode & { type: { name: string } }; // Keep this specific type if needed for validation
};

export const baseButtonStyles =
    "rounded-xl p-2 text-sm font-semibold shadow-sm transition-all duration-200 ease-in-out transform flex basis-[50%] shrink-1 disabled:cursor-not-allowed flex items-center gap-2 overflow-hidden";

export const buttonTypeStyles: Record<SaveNoteButtonProps["type"], string> = {
    success: "bg-primary text-primary-foreground hover:bg-primary/90",
    alert: "bg-destructive/70 text-white/80 hover:bg-destructive/80",
    info: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    disabled: "bg-secondary/30 text-secondary-foreground hover:bg-secondary/50",
    create: "bg-green-600 text-white hover:bg-green-700",
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
        <Button
            onClick={async () => {
                await callBack();
            }}
            className={combinedClasses}
            disabled={type === "disabled"}
            whileHover={{ scale: 1.02 }}
            icon={icon ?? <Sparkles />}
        >
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                className="text-ellipsis whitespace-break-spaces"
            >
                {title}
            </motion.span>
        </Button>
    );
}
