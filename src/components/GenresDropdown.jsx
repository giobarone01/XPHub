import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { getRawgUrl } from "../config/api.js";

export default function GenresDropdown({ toggleSidebar }) {
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fetchGenres = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(getRawgUrl("genres"));
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

    const dropdownVariants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.15,
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 }
    };

    const genreList = useMemo(() => {
        return genres?.map((genre) => (
            <motion.div key={genre.id} variants={itemVariants}>
                <Link
                    to={`/games/${genre.slug}`}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-my-purple/20 rounded-md transition-all duration-200 transform hover:translate-x-1"
                    onClick={() => toggleSidebar && toggleSidebar()}
                >
                    {genre.name}
                </Link>
            </motion.div>
        ));
    }, [genres, toggleSidebar]);

    return (
        <div className="mb-6 pt-2" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center justify-between w-full text-left hover:bg-my-black/20 transition-colors duration-200 cursor-pointer rounded-md"
                aria-expanded={isOpen}
                aria-controls="genres-dropdown"
            >
                <span className="block text-gray-300 group-hover:text-my-cyan transition-colors duration-250 font-semibold text-lg sm:text-xl">Genres</span>
                <motion.svg
                    animate={{ 
                        rotate: isOpen ? 180 : 0,
                        opacity: 1  // Sempre visibile
                    }}
                    transition={{ 
                        duration: 0.15,
                        type: "spring", 
                        stiffness: 300 
                    }}
                    className="w-5 h-5 mr-6 text-my-cyan"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="relative">
                        <motion.div
                            id="genres-dropdown"
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="pt-1 pl-4 md:max-h-none md:overflow-visible max-h-60 overflow-y-auto"
                        >
                            {error ? (
                                <motion.div variants={itemVariants} className="text-red-400 text-sm">
                                    <p>{error}</p>
                                    <button
                                        onClick={fetchGenres}
                                        className="mt-1 text-my-cyan hover:underline"
                                    >
                                        Retry
                                    </button>
                                </motion.div>
                            ) : isLoading ? (
                                <motion.div variants={itemVariants} className="flex space-x-2 px-3 py-2">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-4 h-4 bg-my-cyan rounded-full"
                                            animate={{
                                                y: [0, -10, 0],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeInOut",
                                                repeat: Infinity,
                                                delay: i * 0.1
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                genreList
                            )}
                        </motion.div>
                        <div className="md:hidden absolute bottom-0 left-0 right-0 h-8 pointer-events-none flex items-end pb-1">
                            <svg className="w-5 h-5 text-my-cyan animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}