import { BrowserRouter, Route, Routes } from "react-router";
import { NoteServiceProvider } from "./contextProcessors/NotesServiceContext";
import ReadModalProvider from "./contextProcessors/ReadNoteModalContext";
import Home from "./pages/home";
import AppLayout from "./pages/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import NotesPage from "./pages/notes/NoteListPage";
import SubjectsPage from "./pages/SubjectsPage";

function App() {
	return (
		<ReadModalProvider>
			<NoteServiceProvider>
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
			</NoteServiceProvider>
		</ReadModalProvider>
	);
}

export default App;
