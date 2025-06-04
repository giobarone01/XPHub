import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GenresDropdown() {
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const fetchGenres = async () => {
        try {
            const response = await fetch("https://api.rawg.io/api/genres?key=65f57c71e58e4703a6b14f979b6d8fbb");
            if (!response.ok) throw new Error('Failed to fetch genres');
            const data = await response.json();
            setGenres(data.results);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-left bg-my-black/10 hover:bg-my-black/20 rounded-lg transition-colors duration-200"
            >
                <span className="font-semibold text-white">Genres</span>
                <svg
                    className={`w-5 h-5 text-my-cyan transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="mt-2 space-y-1 pl-4">
                    {error ? (
                        <p className="text-red-400 text-sm">{error}</p>
                    ) : genres ? (
                        genres.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/games/${genre.slug}`}
                                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-my-black/30 rounded transition-colors duration-150"
                            >
                                {genre.name}
                            </Link>
                        ))
                    ) : (
                        <div className="flex space-x-2 px-3 py-2">
                            <div className="w-4 h-4 bg-my-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-4 h-4 bg-my-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-4 h-4 bg-my-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-my-black/80 text-white focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed lg:sticky top-0 left-0 h-screen w-64 z-40
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                bg-gradient-to-b from-my-black to-my-black/90 backdrop-blur-lg
                shadow-xl overflow-y-auto
            `}>
                <div className="p-6 space-y-8">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <GenresDropdown />
                    </div>
                </div>
            </aside>
        </>
    );
}