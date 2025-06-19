import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function FavoritesSection() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
    <div className="space-y-4 text-white text-sm">
        <h3 className="text-xl font-semibold mb-4">Giochi preferiti</h3>
        {favorites.length === 0 ? (
            <p className="text-gray-400">Non hai ancora giochi tra i preferiti.</p>
        ) : (
            <ul className="space-y-3">
                {favorites.map((game) => (
                    <li
                        key={game.id}
                        className="flex justify-between items-center bg-white/10 border border-white/10 rounded-xl p-3 backdrop-blur-sm hover:border-my-cyan/50 transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={game.game_image}
                                width={50}
                                height={50}
                                alt={game.game_name}
                                className="rounded-lg"
                            />
                            <span className="text-white">{game.game_name}</span>
                        </div>
                        <button
                            onClick={() => removeFavorite(game.game_id)}
                            className="text-red-400 hover:text-red-500 transition"
                        >
                            <FaTrashAlt />
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
}
