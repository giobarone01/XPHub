import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import useFetchSolution from "../../hook/useFetchSolution";
import SkeletonCardGame from "../../components/SkeletonCard";
import GamesSlider from "../../components/Slider";
import CompactGameCard from "../../components/CompactGameCard"

export default function HomePage() {
    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&dates=2024-01-01,2024-12-31&page=1`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    const { data: topData, loading: loadingTop, error: errorTop } = useFetchSolution(
        `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&ordering=-rating&page=1`
    );

    return (
        <>
            {(error || errorTop) && <article>{error || errorTop}</article>}
            <div className="container y-10 mx-4 my-10">
                <h1 className="text-4xl font-semibold">Trending games</h1>
                <p>Most clicked</p>
            </div>
            <Grid>
                {loading
                    ? Array.from({ length: 20 }).map((_, i) => <SkeletonCardGame key={i} />)
                    : data?.results.map((game) => <CardGame key={game.id} game={game} />)}
            </Grid>
            {topData?.results?.length > 0 && (
                <GamesSlider
                    items={topData.results.slice(0, 15)}
                    title="Highest ratings"
                    renderItem={(game) => (
                        <CompactGameCard key={game.id} game={game} height="120px" />
                    )}
                />
            )}
        </>
    );
}
