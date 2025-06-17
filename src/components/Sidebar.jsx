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
        <aside
            ref={sidebarRef}
            className={`
                bg-my-black text-white w-52 pl-12 mt-16 space-y-3
                ${isOpen ? 'fixed z-50 inset-y-0 left-0 transform translate-x-0' : 'hidden lg:block lg:relative lg:translate-x-0'}
                lg:block lg:relative lg:translate-x-0
                transition-transform duration-300
            `}
        >
            <GenresDropdown />
            {/* Link Developers in stile dropdown */}
            <div className="mb-6">
                <Link
                    to="/developers"
                    className="block pt-2 text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-xl"
                    onClick={() => isOpen && toggleSidebar()}
                >
                    Developers
                </Link>
            </div>
        </aside>
    );
}