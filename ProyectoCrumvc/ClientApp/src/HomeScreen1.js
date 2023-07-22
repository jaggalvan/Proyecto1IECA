import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogss from "./pages/Blogss";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Calificaciones from "./pages/Calificaciones";
export default function HomeScreen1() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogss />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="calificaciones" element={<Calificaciones />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

