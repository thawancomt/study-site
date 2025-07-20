import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react"; // Sugestão: usar ícones para um toque visual extra

// Definimos os tipos de props que o componente aceitará
interface InsightCardProps {
	title: string;
	value: string | number;
	colorVariant: "orange" | "blue" | "purple" | "green" | "yellow";
	icon?: React.ReactNode; // Prop opcional para um ícone
}

// Estilos base que todos os cards compartilharão
const baseCardStyles =
	"p-4 rounded-2xl border border-accent-foreground w-fit shadow-lg transition-all duration-300 ease-in-out flex-grow hover:shadow-xl flex items-center gap-4";

// Mapeamento das variantes de cor para as classes do TailwindCSS
// Usando as variáveis --color-chart-* do seu CSS
const colorVariants: Record<InsightCardProps["colorVariant"], string> = {
	orange:
		"bg-gradient-to-br from-chart-1/40 to-chart-5/60 hover:shadow-chart-1/30 text-accent",
	blue: "bg-gradient-to-br from-chart-2/40 to-chart-3/60 hover:shadow-chart-2/30 text-accent",
	purple:
		"bg-gradient-to-br from-chart-3/40 to-chart-2/60 hover:shadow-chart-3/30 text-accent",
	green:
		"bg-gradient-to-br from-chart-4/40 to-chart-5/60 hover:shadow-chart-4/30 text-accent",
	yellow:
		"bg-gradient-to-br from-chart-5/40 to-chart-1/60 hover:shadow-chart-5/30 text-accent",
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
	},
	exit: { opacity: 0, transition: { duration: 0.2 } },
};
export default function InsightCardForNoteListPage({
	title,
	value,
	colorVariant,
	icon,
}: InsightCardProps) {
	// Combina os estilos base com a variante de cor selecionada
	const combinedClasses = `${baseCardStyles} ${colorVariants[colorVariant]}`;

	return (
		<motion.div
			className={combinedClasses}
			whileHover={{ scale: 1.01 }}
			layout
			variants={cardVariants}
		>
			{icon ? icon : <Sparkles className="text-white/50" />}
			<div>
				<h3 className="text-xl font-bold text-background" translate="no">
					{value}
				</h3>
				<p className="text-sm text-background/60">{title}</p>
			</div>
		</motion.div>
	);
}
