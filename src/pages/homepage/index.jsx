import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import useFetchSolution from "../../hook/useFetchSolution";
import SkeletonCardGame from "../../components/SkeletonCard";
export default function HomePage() {
    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&dates=2024-01-01,2024-12-31&page=1`;

    const { data, loading, error } = useFetchSolution(initialUrl);

    return (

<Grid>
    {error && <article>{error}</article>}

    {loading &&
        Array.from({ length: 20 }).map((_, i) => <SkeletonCardGame key={i} />)}

    {!loading &&
        data &&
        data.results.map((game) => (
            <CardGame key={game.id} game={game} />
        ))}
</Grid>
    );
}
