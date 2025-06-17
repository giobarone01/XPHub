import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../pages/homepage';
import ErrorPage from '../pages/error';
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import Layout from "../layout/Layout";
import SearchPage from "../pages/searchpage";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import AccountPage from "../pages/account";
import ScrollToTop from "../components/ScrollToTop";
import DevelopersPage from "../pages/topdevelopers";
import DeveloperDetailPage from "../pages/topdevelopers/detail";

export function Routing() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/developers" element={<DevelopersPage />} />
                    <Route path="/developers/:id" element={<DeveloperDetailPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
