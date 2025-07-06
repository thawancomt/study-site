import type React from "react";
import { Link } from "react-router";
import Header from "../components/sections/Header";

type AppLayoutProps = {
	children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<div>
			<Header/>
            <Link to={"/create-subject"}>Subjects</Link>
            <Link to={"/create-note"}>Notes</Link>
            <Link to={"/"}>Home</Link>
			{children}
		</div>
	);
}
