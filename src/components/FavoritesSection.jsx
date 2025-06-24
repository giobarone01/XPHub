import { useContext, useState, useEffect } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { FaTrashAlt, FaGamepad, FaSort, FaFilter } from "react-icons/fa";
import CompactGameCard from "./CompactGameCard";
import useFetchSolution from "../hook/useFetchSolution";
import LoadMoreButton from "./LoadMoreButton";
import { getRawgUrl } from "../config/api.js";

export default function FavoritesSection() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [sortBy, setSortBy] = useState("recent"); // recent, name, rating
    const [filterText, setFilterText] = useState("");
    const [enrichedFavorites, setEnrichedFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Stato per la paginazione
    const [visibleItems, setVisibleItems] = useState(15);
    const itemsPerPage = 15;

    // Recupera i dettagli dei giochi dall'API RAWG
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
                            return game; // Mantieni il gioco originale senza rating
                        }
                    })
                );
                
                setEnrichedFavorites(enrichedGames);
            } catch (error) {
                console.error("Error fetching game details:", error);
                setEnrichedFavorites(favorites); // Fallback ai preferiti originali
            } finally {
                setLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchGameDetails();
        } else {
            setEnrichedFavorites([]);
            setLoading(false);
        }
        
        // Reset della paginazione quando cambiano i preferiti
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
    
    // Funzione per caricare più elementi
    const loadMoreItems = () => {
        setVisibleItems(prev => prev + itemsPerPage);
    };
    
    // Ottieni solo i preferiti da visualizzare in base alla paginazione
    const paginatedFavorites = filteredFavorites.slice(0, visibleItems);
    
    // Verifica se ci sono altri elementi da caricare
    const hasMoreItems = filteredFavorites.length > visibleItems;

    // Reset della paginazione quando cambia il filtro
    useEffect(() => {
        setVisibleItems(itemsPerPage);
    }, [filterText, sortBy]);

    return (
        <div className="space-y-6 text-white text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">                
                <div className="flex items-center gap-3">
                    <FaGamepad className="text-my-purple text-xl" />
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

            {favorites.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <p className="text-gray-400">You don't have any favorite games.</p>
                    <p className="text-gray-500 text-xs mt-2">Explore and find games you like!</p>
                </div>
            ) : filteredFavorites.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                    <p className="text-gray-400">No results for "{filterText}"</p>
                    <p className="text-gray-500 text-xs mt-2">Try another search term</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {paginatedFavorites.map((game) => (
                            <div key={game.id} className="relative group">
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
                            </div>
                        ))}
                    </div>
                    
                    {/* Aggiungi il LoadMoreButton */}
                    <LoadMoreButton 
                        onClick={loadMoreItems} 
                        loading={loading} 
                        hasMore={hasMoreItems} 
                    />
                </>
            )}
        </div>
    );
}
