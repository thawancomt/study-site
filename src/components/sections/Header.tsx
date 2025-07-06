import SearchSubjectInput from "../inputs/SearchSubjectInput";
import AppLogo from "../logo";
import SubjectNavBarLink from "../ui/SubjectNavBarLink";

export default function Header() {
	const links = [{ title: "Notes 📝", target: "my-notes" }];
	return (
		<header className="bg-dark-muted p-2">
			<section className=" flex justify-between items-center px-4">
				<AppLogo/>

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
