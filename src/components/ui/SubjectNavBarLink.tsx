import { Link } from "react-router";

type SubjectNavBarLinkProps = {
	title: string;
	target: string;
};

export default function SubjectNavBarLink({
	title,
	target,
}: SubjectNavBarLinkProps) {
	return (
		<Link to={target} className="text-over-muted bg-dark px-3 py-1 rounded-full
			hover:bg-gray-900 hover:text-over-muted hover:shadow shadow-lg
			border border-gray-700 
		">
			{title}
		</Link>
	);
}
