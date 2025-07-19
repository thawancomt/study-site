import { Link } from "react-router";

export default function AppLogo() {
	return (
		<Link
			to="/"
			className="text-2xl font-bold text-over-dark hover:text-accent-purple transition-colors duration-300"
		>
			SGTS
		</Link>
	);
}
