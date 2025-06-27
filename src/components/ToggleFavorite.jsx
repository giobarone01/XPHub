import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";
import SessionContext from "../context/SessionContext";
import { toast } from "react-toastify";

export default function ToggleFavorite({ data, className = "" }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);
    const { session } = useContext(SessionContext);

    const isFavorite = () => favorites.find((el) => el.game_id == data.id);

    const handleToggleFavorite = () => {
        if (!session) {
            toast.error((
                <div className="flex items-center gap-2">
                    <span>Please sign in to add games to favorites</span>
                </div>
            ));
            return;
        }

        isFavorite() ? removeFavorite(data.id) : addFavorites(data);
    };

    return (
        <button
            onClick={handleToggleFavorite}
            className={`text-white cursor-pointer hover:text-my-cyan transition-colors duration-300 ${className}`}
            aria-label={isFavorite() ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite() ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
}
