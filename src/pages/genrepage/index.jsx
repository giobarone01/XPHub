import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import { useEffect } from "react";
import Grid from "../../components/Grid";
import SkeletonCardGame from "../../components/SkeletonCard";

export default function GenrePage() {
    const { genre } = useParams();

    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&genres=${genre}&page=1`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);


    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&genres=${genre}&page=1`;
        updateUrl(newUrl);
    }, [genre, updateUrl]);

    return (
        <>
            <h2>Welcome to {genre} page</h2>

            {error && <article>{error}</article>}

            <Grid>
                {loading
                    ? Array.from({ length: 20 }).map((_, i) => <SkeletonCardGame key={i} />)
                    : data?.results.map((game) => <CardGame key={game.id} game={game} />)}
            </Grid>
        </>
    );
}