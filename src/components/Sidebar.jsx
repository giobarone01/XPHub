import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GenresDropdown from "./GenresDropdown";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, toggleSidebar]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={toggleSidebar}
            />
            <aside
                ref={sidebarRef}
                className={`
        fixed top-0 left-0 h-full bg-my-black text-white w-52 pt-16 pl-6
        space-y-1
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:top-auto lg:left-auto lg:h-auto lg:bg-transparent lg:pl-12 lg:block lg:z-auto
    `}
            >
                <Link
                        to="/"
                        className="mb-6 block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-lg sm:text-xl"
                        onClick={() => isOpen && toggleSidebar()}
                    >
                        Home
                    </Link>
                <GenresDropdown toggleSidebar={toggleSidebar} />
                    <Link
                        to="/upcoming"
                        className="mb-6 block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-lg sm:text-xl"
                        onClick={() => isOpen && toggleSidebar()}
                    >
                        Upcoming Games
                    </Link>
                    <Link
                        to="/developers"
                        className="mb-6 block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-lg sm:text-xl"
                        onClick={() => isOpen && toggleSidebar()}
                    >
                        Developers
                    </Link>
                    <Link
                        to="/filter"
                        className="mb-6 block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-lg sm:text-xl"
                        onClick={() => isOpen && toggleSidebar()}
                    >
                        All games
                    </Link>
                    <Link
                        to="/therapist"
                        className="mb-6 block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-lg sm:text-xl"
                        onClick={() => isOpen && toggleSidebar()}
                    >
                        Game Therapist
                    </Link>
                    <Link
                        to="/minigames"
                        className="mb-6 block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-lg sm:text-xl"
                        onClick={() => isOpen && toggleSidebar()}
                    >
                        Minigames
                    </Link>
            </aside>
        </>
    );
}