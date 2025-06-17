import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import logo from '../assets/logo.png';
import SearchBar from './SearchBar.jsx';
import SessionContext from "../context/SessionContext";

export default function Header({ toggleSidebar }) {
    const { session, profile } = useContext(SessionContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout error:', error);
            alert('Error during sign out');
            return;
        }
        navigate('/', { replace: true });
    };

    useEffect(() => {
        const downloadImage = async (path) => {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path);
                if (error) throw error;
                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            } catch (error) {
                console.log("Errore caricamento avatar:", error.message);
            }
        };

        if (profile?.avatar_url) {
            downloadImage(profile.avatar_url);
        }
    }, [profile]);

    return (
        <header className="sticky top-0 z-40 bg-my-black">
            <nav className="w-full mx-auto sm:px-8 pt-6 flex items-center justify-between">

                <button
                    onClick={toggleSidebar}
                    className="md:inline-block lg:hidden mr-3 p-2 rounded hover:bg-my-cyan/30 focus:outline-none"
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex items-center space-x-2 flex-shrink-0">
                    <Link to="/" className="flex items-center space-x-2 rounded">
                        <img src={logo} alt="XPHub Logo" className="h-8 w-auto" />
                        <span className="font-bold text-xl text-white hover:text-my-cyan transition-colors duration-200 hidden lg:inline">
                            XPHub
                        </span>
                    </Link>
                </div>

                <div className="flex-1 max-w-xl mx-4 hidden md:block">
                    <SearchBar />
                </div>

                <div className="flex items-center space-x-4">
                    <div className="md:hidden mr-2">
                        <SearchBar mobile />
                    </div>

                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full object-cover border border-white"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-400 border border-white" />
                                )}
                                <span className="text-white font-medium hidden sm:inline">
                                    {profile?.username}
                                </span>
                                <svg
                                    className={`h-4 w-4 text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute top-full right-0 mt-2 w-48 bg-my-dark rounded-lg shadow-lg py-2 border border-gray-700 z-50"
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <Link
                                        to="/account"
                                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-my-cyan hover:text-black transition"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1117.804 5.121 9 9 0 015.121 17.804z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        My Account
                                    </Link>
                                    <button
                                        onClick={signOut}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hidden sm:inline-block text-white hover:text-my-cyan transition-colors duration-200 px-3 py-1"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-my-cyan text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-cyan-400 transition-colors duration-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}