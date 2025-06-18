import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function GenresDropdown() {
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchGenres = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("https://api.rawg.io/api/genres?key=65f57c71e58e4703a6b14f979b6d8fbb");
            if (!response.ok) throw new Error('Failed to fetch genres');
            const data = await response.json();
            setGenres(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const genreList = useMemo(() => {
        return genres?.map((genre) => (
            <Link
                key={genre.id}
                to={`/games/${genre.slug}`}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-my-black/30 rounded transition-colors duration-150"
            >
                {genre.name}
            </Link>
        ));
    }, [genres]);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left hover:bg-my-black/20 transition-colors duration-200 cursor-pointer"
                aria-expanded={isOpen}
                aria-controls="genres-dropdown"
            >
                <span className="block text-gray-300 hover:text-my-cyan transition-colors duration-250 font-semibold text-white text-xl">Genres</span>
                <svg
                    className={`w-5 h-5 mr-6 text-my-cyan transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div id="genres-dropdown" className="mt-2 pl-4">
                    {error ? (
                        <div className="text-red-400 text-sm">
                            <p>{error}</p>
                            <button
                                onClick={fetchGenres}
                                className="mt-1 text-my-cyan hover:underline"
                            >
                                Retry
                            </button>
                        </div>
                    ) : isLoading ? (
                        <div className="flex space-x-2 px-3 py-2">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-4 h-4 bg-my-cyan rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                />
                            ))}
                        </div>
                    ) : (
                        genreList
                    )}
                </div>
            )}
        </div>
    );
}