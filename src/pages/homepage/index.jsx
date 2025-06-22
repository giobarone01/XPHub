import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import useFetchSolution from "../../hook/useFetchSolution";
import LoadingSpinner from "../../components/LoadingSpinner";
import GamesSlider from "../../components/Slider";
import CompactGameCard from "../../components/CompactGameCard";
import SkeletonCardGame from "../../components/SkeletonCard";
import PageTitle from "../../components/PageTitle";

export default function HomePage() {
    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&dates=${getLastSixMonths()}&ordering=-rating&page=1`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    const { data: popularData, loading: loadingPopular, error: errorPopular } = useFetchSolution(
        `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&ordering=-added&page=1`
    );

    function getLastSixMonths() {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        return `${formatDate(sixMonthsAgo)},${formatDate(today)}`;
    }

    return (
        <>
            {(error || errorPopular) && <article className="container mx-auto">{error || errorPopular}</article>}
            <div className="container mx-auto px-4">
                <PageTitle subtitle="Top games released in the last months">
                    New and <span className="gradient-text">Trending</span>
                </PageTitle>
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
                <div className="container mx-auto px-4">
                    <h2 className="mb-4 text-xl font-bold text-white title-with-line">Most Popular Games</h2>
                    <GamesSlider
                        items={popularData.results.slice(0, 15)}
                        title=""
                        renderItem={(game) => (
                            <CompactGameCard key={game.id} game={game} height="120px" />
                        )}
                    />
                </div>
            )}
        </>
    );
}
