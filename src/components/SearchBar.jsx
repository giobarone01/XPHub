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
            className={`group flex w-full items-center gap-2 rounded-full border bg-my-black/60 px-3.5 py-2 backdrop-blur-sm transition-all duration-300 focus-within:border-my-cyan/60 focus-within:ring-2 focus-within:ring-my-cyan/20 ${ariaInvalid ? "border-red-400/60" : "border-white/10 hover:border-white/20"}`}
        >
            <button
                type="submit"
                className="text-gray-400 transition-colors group-focus-within:text-my-cyan hover:text-my-cyan cursor-pointer"
                aria-label="Search"
            >
                <FaSearch className="h-4 w-4" />
            </button>
            <input
                type="text"
                name="search"
                placeholder={isMobile ? "Search games..." : "Search for games..."}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
                className={`w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none md:text-base ${ariaInvalid ? "placeholder-red-400" : ""}`}
            />
        </form>
    );
}
