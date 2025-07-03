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
import FilterPage from "../pages/filterpage";
import UpcomingPage from "../pages/upcomingpage";
import GameTherapistPage from "../pages/gametherapist";
import AboutPage from "../pages/about";
import ContactPage from "../pages/contact";
import PrivacyPage from "../pages/privacy";
import ProtectedRoute from "./ProtectedRoute";
import GuessTheGamePage from "../pages/minigames/guess";
import MinigamesPage from "../pages/minigames";

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
                    <Route path="/filter" element={<FilterPage />} />
                    <Route path="/upcoming" element={<UpcomingPage />} />
                    <Route path="/therapist" element={<GameTherapistPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/account" element={
                        <ProtectedRoute>
                            <AccountPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/developers" element={<DevelopersPage />} />
                    <Route path="/developers/:id" element={<DeveloperDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/minigames" element={<MinigamesPage />} />
                    <Route path="/minigames/guess" element={<GuessTheGamePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
