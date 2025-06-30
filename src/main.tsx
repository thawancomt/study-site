import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home.js";
import SubjectsPage from "./pages/SubjectsPage.js";
import App from "./App.js";

createRoot(document.getElementById("root")).render(<App></App>);
