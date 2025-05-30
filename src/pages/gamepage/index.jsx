import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function GamePage() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=65f57c71e58e4703a6b14f979b6d8fbb`;

    const load = async () => {
    try {
    const response = await fetch(initialUrl);
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    const json = await response.json();
    setData(json);
    } catch (error) {
    setError(error.message);
    setData(null);
    }
};

useEffect(() => {
    load();
}, [id]);

return (
    <div className="style-gamepage">
            {error && <h1>{error}</h1>}
            {data && (
                <>
                    <div className="style-game_info">
                        <h1>{data.name}</h1>
                        <p>{data.released}</p>
                        <p>Rating: {data.rating}</p>
                        <p>About:</p>
                        <p>{data.description_raw}</p>
                    </div>
                    <div className="style-game-image">
                        <img src={data.background_image} alt={data.name} />
                    </div>
                </>
            )}
        </div>
    );
}