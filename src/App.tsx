import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./pages/home";
import AppLayout from "./pages/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import NotesPage from "./pages/notes/NoteListPage";
import SubjectsPage from "./pages/SubjectsPage";

function App() {
	return (
		<BrowserRouter>
			<AppLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/my-notes" element={<NotesPage />} />
					<Route path="/subjects" element={<SubjectsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	);
}

export default App;
