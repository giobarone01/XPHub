import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
            setAriaInvalid(null);
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="bg-my-black rounded-full flex items-center px-3 sm:px-4 py-0.5 sm:py-1 md:py-1.5 border-2 border-gray-700 w-full max-w-2xl hover:border-my-purple transition-colors duration-300 focus-within:border-my-purple focus-within:ring-2 focus-within:ring-my-purple/30"
        >
            <input
                type="text"
                name="search"
                placeholder={ariaInvalid 
                    ? "Search for something" 
                    : isMobile ? "Search..." : "Search a game..."}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
                className={`bg-my-black text-white text-sm sm:text-base md:text-base placeholder-gray-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full focus:outline-none w-full ${ariaInvalid ? "placeholder-red-400" : ""}`}
            />
            <button
                type="submit"
                className="text-gray-300 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full hover:text-my-cyan focus:outline-none focus:text-my-cyan transition-all duration-300"
                aria-label="Search"
            >
                <FaSearch className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </button>
        </form>
    );
}
