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
		<Link to={target} className="">
			<ol
				className="text-over-muted bg-dark hover:bg-muted-foreground/30
			px-4 py-2 rounded-full hover:bg-accent-blue hover:text-white transition-all
			duration-300 shadow-lg border border-muted-foreground/30 hover:border-accent-purple hover:scale-105 hover:rotate-3"
			>
				{title}
			</ol>
		</Link>
	);
}
