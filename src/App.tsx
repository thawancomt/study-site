import { BrowserRouter, Route, Routes } from "react-router";
import { ConcreteNoteRepository } from "./ORM/notes/implementations/notes.concrete.repository";
import { ConcreteNoteService } from "./ORM/notes/implementations/notes.concrete.service";
import CreateNote from "./pages/CreateNote";
import CreateSubjectPage from "./pages/CreateSubject";
import Home from "./pages/Home";
import AppLayout from "./pages/Layout";
import SubjectsPage from "./pages/SubjectsPage";

function App() {
	const noteRepository = new ConcreteNoteRepository();
	const noteService = new ConcreteNoteService(noteRepository);

	return (
		<BrowserRouter>
			<AppLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/subjects" element={<SubjectsPage />} />
					<Route
						path="/create-note"
						element={<CreateNote noteService={noteService} />}
					/>
					<Route path="/create-subject" element={<CreateSubjectPage />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	);
}

export default App;
