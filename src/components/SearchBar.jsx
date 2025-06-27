import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [isFocused, setIsFocused] = useState(false);

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
            className={`bg-my-black rounded-full flex items-center px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 border-2 border-gray-700 w-full transition-all duration-300 ${isFocused ? 'border-my-purple ring-2 ring-my-purple/30 scale-[1.01]' : 'hover:border-my-purple'}`}
        >
            <input
                type="text"
                name="search"
                placeholder={ariaInvalid
                    ? "Search for something..."
                    : (isMobile ? "Search games..." : "Search for games...")}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={search}
                aria-invalid={ariaInvalid}
                className={`bg-my-black text-white text-sm md:text-base placeholder-gray-400 px-1.5 md:px-3 py-0.5 rounded-full focus:outline-none w-full ${ariaInvalid ? "placeholder-red-400" : ""}`}
            />
            <button
                type="submit"
                className={`text-gray-300 px-1.5 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-full transition-all duration-300 ${isFocused ? 'text-my-cyan scale-110' : 'hover:text-my-cyan'} focus:outline-none focus:text-my-cyan cursor-pointer`}
                aria-label="Search"
            >
                <FaSearch className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
        </form>
    );
}
