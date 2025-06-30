import SearchSubjectInput from "../inputs/SearchSubjectInput";
import SubjectNavBarLink from "../ui/SubjectNavBarLink";

export default function Header() {
	const links = [{ title: "My Subjects", target: "subjects" }];
	return (
		<header className="bg-dark-muted p-2">
			<section className=" flex justify-between items-center px-4">
				<a
					className="text-neutral text-xl bg-dark/80 p-2 rounded-lg
                    hover:bg-gradient-to-b hover:from-dark hover:to-dark-muted/30

                    transition-colors duration-300 ease-in-out
                "
					href="/"
				>
					STGS
				</a>

				<nav>
					{links.map((link, index) => (
						<SubjectNavBarLink
							key={`link-${link.target}`}
							title={link.title}
							target={link.target}
						/>
					))}
				</nav>
			</section>

			<SearchSubjectInput />
		</header>
	);
}
