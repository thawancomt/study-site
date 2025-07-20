// components/ui/Button.tsx

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

// Define the common props for our base button
interface ButtonProps {
    children: ReactNode; // This will hold the content of the button (icon, text, etc.)
    onClick: () => void;
    type?: "button" | "submit" | "reset"; // Standard HTML button types
    className?: string;
    disabled?: boolean;
    whileHover?: object;
    whileTap?: object;
    transition?: object;
    icon?: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
    whileHover = { scale: 1.02 }, // Default hover scale
    whileTap, // No default for whileTap as it's often specific
    transition = {}, // Default empty transition
    icon,
    onMouseEnter,
    onMouseLeave,
}: ButtonProps) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            whileHover={whileHover}
            whileTap={whileTap}
            disabled={disabled}
            transition={transition}
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
                    whileHover={{
                        rotate: 15,
                    }}
                >
                    {icon ?? <Sparkles />}
                </motion.div>
            </AnimatePresence>
            {children}
        </motion.button>
    );
};
