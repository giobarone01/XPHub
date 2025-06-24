import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function FavoritesSection() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <>
            <h2>Your favorite games</h2>
            {favorites.length === 0 && <p>No favorites at the moment...</p>}
            <ul>
                {favorites.map((game) => (
                    <li key={game.id} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <img width={50} height={50} src={game.game_image} alt={game.game_name} />
                            <p>{game.game_name}</p>
                        </div>
                        <button className="secondary" onClick={() => removeFavorite(game.game_id)}>
                            <FaTrashAlt />
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
