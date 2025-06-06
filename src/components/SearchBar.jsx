import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

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
            className="bg-my-black rounded-full flex items-center px-4 py-1 border-2 border-gray-700 w-full max-w-2xl hover:border-my-purple transition-colors duration-300 focus-within:border-my-purple focus-within:ring-2 focus-within:ring-my-purple/30"
        >
            <input
                type="text"
                name="search"
                placeholder={ariaInvalid ? "Search for something" : "Search a game..."}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
                className={`bg-my-black text-white text-base placeholder-gray-400 px-3 py-1 rounded-full focus:outline-none w-full ${ariaInvalid ? "placeholder-red-400" : ""
                    }`}
            />
            <button
                type="submit"
                className="text-gray-300 px-4 py-2 rounded-full hover:text-my-cyan focus:outline-none focus:text-my-cyan transition-all duration-300"
                aria-label="Search"
            >
                <FaSearch className="w-4 h-4" />
            </button>
        </form>

    );
}
