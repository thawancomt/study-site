import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.js";
import Home from "./pages/home.js";
import SubjectsPage from "./pages/SubjectsPage.js";

createRoot(document.getElementById("root")).render(<App></App>);
