import type React from "react";
import SubjectNavBarLink from "../ui/SubjectNavBarLink";

interface SideMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
	const links = [{ title: "Notes 📝", target: "my-notes" }];

	return (
		<div
			className={`fixed top-0 right-0 h-full bg-dark-darker w-64 transform ${
				isOpen ? "translate-x-0" : "translate-x-full"
			} transition-transform duration-300 ease-in-out z-50`}
		>
			<div className="p-4 bg-accent-foreground h-screen">
				<div className="flex justify-end">
					<button type="button" onClick={onClose} className="text-white mb-4">
						Close
					</button>
				</div>
				<nav className="flex flex-col">
					{links.map((link) => (
						<SubjectNavBarLink
							key={`side-link-${link.target}`}
							title={link.title}
							target={link.target}
							onClick={onClose}
						/>
					))}
				</nav>
			</div>
		</div>
	);
};

export default SideMenu;
