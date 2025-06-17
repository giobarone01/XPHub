import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import { useEffect } from "react";
import Grid from "../../components/Grid";
import LoadingSpinner from "../../components/LoadingSpinner";
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
            <div className="container my-10 mx-4">
                <h1 className="text-4xl font-semibold">{genre.charAt(0).toUpperCase() + genre.slice(1)} games  </h1>
            </div>

            {error && <article>{error}</article>}

            {loading ? (
                <Grid>
                    {[...Array(8)].map((_, index) => (
                        <SkeletonCardGame key={index} />
                    ))}
                </Grid>
            ) : (
                <Grid>
                    {data?.results.map((game) => <CardGame key={game.id} game={game} />)}
                </Grid>
            )}
        </>
    );
}