import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-my-black text-white py-8 mt-12 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">

                {/* Logo + Nome */}
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <img src={logo} alt="XPHub Logo" className="h-8 w-auto" />
                    <span className="font-bold text-lg sm:text-xl text-white">XPHub</span>
                </div>

                {/* Link utili */}
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <Link to="/about" className="hover:text-my-cyan transition">Chi siamo</Link>
                    <Link to="/contatti" className="hover:text-my-cyan transition">Contatti</Link>
                    <Link to="/privacy" className="hover:text-my-cyan transition">Privacy</Link>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} XPHub. Tutti i diritti riservati.
                </div>
            </div>
        </footer>
    );
}
