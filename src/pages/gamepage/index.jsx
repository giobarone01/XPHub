import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";

export default function GamePage() {
    const { id } = useParams();
    const initialUrl = `https://api.rawg.io/api/games/${id}?key=65f57c71e58e4703a6b14f979b6d8fbb`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games/${id}?key=65f57c71e58e4703a6b14f979b6d8fbb`;
        updateUrl(newUrl);
    }, [id, updateUrl]);

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
                        <ToggleFavorite data={data} />
                    </div>
                    <div className="style-game-image">
                        <img src={data.background_image} alt={data.name} />
                    </div>
                </>
            )}
        </div>
    );
}
