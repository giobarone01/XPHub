import { useContext, useState, useEffect } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { FaTrashAlt, FaHeart, FaSort } from "react-icons/fa";
import CompactGameCard from "./CompactGameCard";
import useFetchSolution from "../hook/useFetchSolution";
import LoadMoreButton from "./LoadMoreButton";
import { getRawgUrl } from "../config/api.js";
import LoadingSpinner from "./LoadingSpinner";
import SkeletonCompactCard from "./SkeletonCompactCard";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesSection() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [sortBy, setSortBy] = useState("recent");
    const [filterText, setFilterText] = useState("");
    const [enrichedFavorites, setEnrichedFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    const [visibleItems, setVisibleItems] = useState(15);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);

            try {
                const enrichedGames = await Promise.all(
                    favorites.map(async (game) => {
                        try {
                            const response = await fetch(
                                getRawgUrl(`games/${game.game_id}`)
                            );
                            if (!response.ok) {
                                throw new Error(`Error fetching game ${game.game_id}`);
                            }
                            const gameData = await response.json();
                            return {
                                ...game,
                                rating: gameData.rating
                            };
                        } catch (error) {
                            console.error(`Failed to fetch game ${game.game_id}:`, error);
                            return game;
                        }
                    })
                );

                setEnrichedFavorites(enrichedGames);
            } catch (error) {
                console.error("Error fetching game details:", error);
                setEnrichedFavorites(favorites);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        if (favorites.length > 0) {
            fetchGameDetails();
        } else {
            setEnrichedFavorites([]);
            setLoading(false);
            setInitialLoad(false);
        }

        setVisibleItems(itemsPerPage);
    }, [favorites]);

    const sortedFavorites = [...enrichedFavorites].sort((a, b) => {
        if (sortBy === "name") {
            return a.game_name.localeCompare(b.game_name);
        } else if (sortBy === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        }
        return b.id - a.id;
    });

    const filteredFavorites = sortedFavorites.filter(game =>
        game.game_name.toLowerCase().includes(filterText.toLowerCase())
    );

    const loadMoreItems = () => {
        setVisibleItems(prev => prev + itemsPerPage);
    };

    const paginatedFavorites = filteredFavorites.slice(0, visibleItems);

    const hasMoreItems = filteredFavorites.length > visibleItems;

    useEffect(() => {
        setVisibleItems(itemsPerPage);
    }, [filterText, sortBy]);

    const renderSkeletons = () => {
        return Array(15).fill(0).map((_, index) => (
            <SkeletonCompactCard key={`skeleton-${index}`} height="150px" />
        ));
    };

    return (
        <div className="space-y-6 text-white text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                    <FaHeart className="text-danger text-xl" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Favorites</h3>
                </div>

                {favorites.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white/10 border border-white/10 rounded-lg px-3 py-1 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-my-purple/50 text-xs sm:text-sm w-full sm:w-auto font-medium transition-all duration-300"
                            >
                                <option value="recent">Recent</option>
                                <option value="name">Name</option>
                                <option value="rating">Rating</option>
                            </select>
                            <FaSort className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <input
                            type="text"
                            placeholder="Search favorites..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="bg-white/10 border border-white/10 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-my-purple/50 text-xs sm:text-sm w-full sm:w-auto font-medium transition-all duration-300"
                        />
                    </div>
                )}
            </div>

            {initialLoad ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {renderSkeletons()}
                </div>
            ) : favorites.length === 0 ? (
                <motion.div
                    className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <p className="text-gray-400">You don't have any favorite games.</p>
                    <p className="text-gray-500 text-xs mt-2">Explore and find games you like!</p>
                </motion.div>
            ) : (
                <AnimatePresence>
                    {filteredFavorites.length === 0 ? (
                        <motion.div
                            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            key="no-results"
                        >
                            <p className="text-gray-400">No results for "{filterText}"</p>
                            <p className="text-gray-500 text-xs mt-2">Try another search term</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {loading && paginatedFavorites.length === 0 ? (
                                    renderSkeletons()
                                ) : (
                                    paginatedFavorites.map((game) => (
                                        <motion.div
                                            key={game.id}
                                            className="relative group"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CompactGameCard
                                                game={{
                                                    id: game.game_id,
                                                    slug: game.game_slug || 'game',
                                                    name: game.game_name,
                                                    background_image: game.game_image
                                                }}
                                                height="150px"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    removeFavorite(game.game_id);
                                                }}
                                                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-red-400
                                                        hover:bg-red-400/20 hover:text-red-500 transition-all duration-300 opacity-0
                                                        group-hover:opacity-100 z-20 cursor-pointer"
                                                aria-label="Remove from favorites"
                                            >
                                                <FaTrashAlt size={14} />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <LoadMoreButton
                                    onClick={loadMoreItems}
                                    loading={loading}
                                    hasMore={hasMoreItems}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {loading && !initialLoad && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LoadingSpinner size="lg" className="text-my-purple" />
                    </motion.div>
                </div>
            )}
        </div>
    );
}
