import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import logo from '../assets/logo.png';
import SearchBar from './SearchBar.jsx';
import SessionContext from "../context/SessionContext";

export default function Header() {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert('Signed out successfully');
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-my-black">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-8" />
                <Link to="/" className="font-bold text-xl text-white">XPHub</Link>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Account dropdown */}
            {session ? (
                <details className="relative z-50 group">
                    <summary className="cursor-pointer bg-my-cyan text-black font-semibold text-sm px-5 py-2 rounded-full">
                        Account
                    </summary>
                    <ul className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg text-sm text-right hidden group-open:block">
                        <li className="border-b hover:bg-gray-100">
                            <Link to="/account" className="block px-4 py-2">Settings</Link>
                        </li>
                        <li className="hover:bg-gray-100">
                            <button
                                onClick={signOut}
                                className="w-full text-left px-4 py-2"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </details>
            ) : (
                <div className="flex space-x-4">
                    <Link to="/login" className="text-white hover:text-my-cyan transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="bg-my-cyan text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-cyan-400 transition-colors">
                        Register
                    </Link>
                </div>
            )}
        </nav>
    );
}
