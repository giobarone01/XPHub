import { useState, useEffect } from 'react';

export default function GenresDropdown() {
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = "https://api.rawg.io/api/genres?key=65f57c71e58e4703a6b14f979b6d8fbb";

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json);
        } catch (error) {
            setError(error.message);
            setGenres(null);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <details className="dropdown">
            <summary>Genres</summary>
            {error && <small>{error}</small>}
            <ul>
                {genres && genres.results.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </details>
    );
}