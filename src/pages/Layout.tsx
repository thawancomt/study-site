import type React from "react";
import { Link } from "react-router";
import Header from "../components/sections/Header";

type AppLayoutProps = {
	children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
