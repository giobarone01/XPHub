import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import ScrollToTop from "../components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/LoadingSpinner";

const Homepage = lazy(() => import("../pages/homepage"));
const ErrorPage = lazy(() => import("../pages/error"));
const GenrePage = lazy(() => import("../pages/genrepage"));
const GamePage = lazy(() => import("../pages/gamepage"));
const SearchPage = lazy(() => import("../pages/searchpage"));
const RegisterPage = lazy(() => import("../pages/register"));
const LoginPage = lazy(() => import("../pages/login"));
const AccountPage = lazy(() => import("../pages/account"));
const DevelopersPage = lazy(() => import("../pages/topdevelopers"));
const DeveloperDetailPage = lazy(() => import("../pages/topdevelopers/detail"));
const FilterPage = lazy(() => import("../pages/filterpage"));
const UpcomingPage = lazy(() => import("../pages/upcomingpage"));
const GameTherapistPage = lazy(() => import("../pages/gametherapist"));
const AboutPage = lazy(() => import("../pages/about"));
const ContactPage = lazy(() => import("../pages/contact"));
const PrivacyPage = lazy(() => import("../pages/privacy"));
const GuessTheGamePage = lazy(() => import("../pages/minigames/guess"));
const MinigamesPage = lazy(() => import("../pages/minigames"));

export function Routing() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<LoadingSpinner size="lg" className="min-h-[60vh]" />}>
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
            </Suspense>
        </BrowserRouter>
    );
}
