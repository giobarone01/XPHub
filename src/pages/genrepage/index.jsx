import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";

export default function GenrePage() {
    const { genre } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&genres=${genre}&page=1`;

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
    }, [genre]);

    return (
        <>
            <h2>Welcome to {genre} page</h2>
            <div className="grid-games-list">
                {error && <article>{error}</article>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </>
    );
}