
import { Link } from "react-router"

type SubjectNavBarLinkProps = {
	title: string;
	target: string;
};

export default function SubjectNavBarLink({
	title,
	target,
}: SubjectNavBarLinkProps) {
	return (
		<Link
			to={target}
			className="text-over-muted bg-dark px-4 py-2 rounded-full hover:bg-accent-blue hover:text-white transition-all duration-300 shadow-lg border border-transparent hover:border-accent-purple"
		>
			{title}
		</Link>
	);
}

