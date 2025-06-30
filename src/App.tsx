import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import SubjectsPage from "./pages/SubjectsPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/subjects" element={<SubjectsPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
