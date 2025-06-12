import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ data, className = "" }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => el.game_id == data.id);

    return (
        <button
            onClick={() => {
                isFavorite() ? removeFavorite(data.id) : addFavorites(data);
            }}
            className={`text-white cursor-pointer hover:text-my-cyan transition-colors duration-300 ${className}`}
            aria-label={isFavorite() ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite() ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
}
