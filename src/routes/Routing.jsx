import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../pages/homepage';
import ErrorPage from '../pages/error';
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import Layout from "../layout/Layout";
import SearchPage from "../pages/searchpage";

export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
