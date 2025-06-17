import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import useFetchSolution from "../../hook/useFetchSolution";
import LoadingSpinner from "../../components/LoadingSpinner";
import GamesSlider from "../../components/Slider";
import CompactGameCard from "../../components/CompactGameCard";
import SkeletonCardGame from "../../components/SkeletonCard"

export default function HomePage() {
    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&dates=2024-01-01,2024-12-31&page=1`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    const { data: popularData, loading: loadingPopular, error: errorPopular } = useFetchSolution(
        `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&ordering=-added&page=1`
    );

    return (
        <>
            {(error || errorPopular) && <article>{error || errorPopular}</article>}
            <div className="container y-10 mx-4 my-10">
                <h1 className="text-4xl font-semibold">Trending games</h1>
                <p>Most clicked</p>
            </div>
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
            {popularData?.results?.length > 0 && (
                <GamesSlider
                    items={popularData.results.slice(0, 15)}
                    title="Most Popular Games"
                    renderItem={(game) => (
                        <CompactGameCard key={game.id} game={game} height="120px" />
                    )}
                />
            )}
        </>
    );
}
