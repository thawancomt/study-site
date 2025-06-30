type SubjectNavBarLinkProps = {
	title: string;
	target?: string;
};

export default function SubjectNavBarLink({
	title,
	target,
}: SubjectNavBarLinkProps) {
	return (
		<a href={target} className=" text-over-muted">
			{title}
		</a>
	);
}
