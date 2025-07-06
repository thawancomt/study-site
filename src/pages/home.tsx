import { Link } from "react-router";
import App from "../App";
import Header from "../components/sections/Header";

export default function Home() {
	return (
		<main className="flex gap-8 *:border *:bg-amber-400/20 *:p-4">
			<Link to={"/create-note"}>Create Note</Link>
			<Link to={"/create-subject"}>Create Subject</Link>
		</main>
	);
}
