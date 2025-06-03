import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function FavoritesSection() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div>
            <h3>Giochi preferiti</h3>
            {favorites.length === 0 ? (
                <p>Non hai ancora giochi tra i preferiti.</p>
            ) : (
                <ul>
                    {favorites.map((game) => (
                        <li key={game.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <img src={game.game_image} width={50} height={50} alt={game.game_name} />
                                <span>{game.game_name}</span>
                            </div>
                            <button onClick={() => removeFavorite(game.game_id)}>
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
