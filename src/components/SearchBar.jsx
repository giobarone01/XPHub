import { useState } from "react";
import { useNavigate } from "react-router";

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
        <form onSubmit={handleSearch} className="bg-black rounded-full flex items-center px-4 py-1">
            <input
                type="text"
                name="search"
                placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
                className={`bg-black text-white text-sm placeholder-gray-400 px-3 py-1 rounded-full focus:outline-none ${ariaInvalid ? "border border-red-500" : ""}`}
            />
            <button
                type="submit"
                className="text-white text-sm px-3 py-1 ml-2 rounded-full bg-black hover:bg-[#333] focus:outline-none"
            >
                Search
            </button>
        </form>
    );
}
