import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center space-y-6"
			>
				<div className="text-8xl font-bold text-neutral/30">404</div>
				<h1 className="text-3xl font-bold text-over-dark">Page Not Found</h1>
				<p className="text-neutral max-w-md mx-auto">
					The page you're looking for doesn't exist. It might have been moved,
					deleted, or you entered the wrong URL.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
					>
						Go Home
					</button>
					<button
						type="button"
						onClick={() => navigate("/subjects")}
						className="bg-dark-muted text-over-dark px-6 py-3 rounded-lg hover:bg-dark-muted/80 transition-colors"
					>
						View Subjects
					</button>
				</div>
			</motion.div>
		</div>
	);
}
