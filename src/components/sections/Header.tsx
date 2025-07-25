import { Hamburger, HamburgerIcon, Menu } from "lucide-react";
import { useState } from "react";
import HeaderSearchBar from "../inputs/HeaderSearchBar";
import AppLogo from "../logo";
import SubjectNavBarLink from "../ui/SubjectNavBarLink";
import SideMenu from "./SideMenu";

export default function Header() {
	const links = [{ title: "Notes 📝", target: "my-notes" }];
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	const toggleSideMenu = () => {
		setIsSideMenuOpen(!isSideMenuOpen);
	};

	return (
		<header className="bg-dark-darker p-4 border-b-2 border-dark-muted">
			<section className=" mx-auto flex justify-between items-center flex-wrap">
				<div className="flex items-center justify-around gap-2 grow">
					<AppLogo />
					<HeaderSearchBar />
				</div>
				<nav className="hidden md:flex">
					{links.map((link) => (
						<SubjectNavBarLink
							key={`link-${link.target}`}
							title={link.title}
							target={link.target}
						/>
					))}
				</nav>
				<div className="md:hidden flex items-center">
					<button onClick={toggleSideMenu} className="text-white">
						<Menu />
					</button>
				</div>
			</section>
			<SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
		</header>
	);
}
