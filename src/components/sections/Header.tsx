import HeaderSearchBar from "../inputs/HeaderSearchBar";
import AppLogo from "../logo";
import SubjectNavBarLink from "../ui/SubjectNavBarLink";

export default function Header() {
	const links = [{ title: "Notes 📝", target: "my-notes" }];
	return (
		<header className="bg-dark-darker p-4 border-b-2 border-dark-muted">
			<section className=" mx-auto flex justify-between items-center flex-wrap">
				<div className="flex items-center justify-around gap-2 grow">
					<AppLogo />
					<HeaderSearchBar />
				</div>
				<nav>
					{links.map((link) => (
						<SubjectNavBarLink
							key={`link-${link.target}`}
							title={link.title}
							target={link.target}
						/>
					))}
				</nav>
			</section>
		</header>
	);
}
