import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import useFetchSolution from "../../hook/useFetchSolution";
import GamesSlider from "../../components/Slider";
import CompactGameCard from "../../components/CompactGameCard";
import SkeletonCardGame from "../../components/SkeletonCard";
import PageTitle from "../../components/PageTitle";
import HeroFeatured from "../../components/HeroFeatured";
import { getRawgUrl } from "../../config/api.js";

export default function HomePage() {
    const initialUrl = getRawgUrl("games", {
        dates: getLastSixMonths(),
        ordering: "-rating",
        page: 1
    });
    const { data, loading, error } = useFetchSolution(initialUrl);

    const { data: popularData, error: errorPopular } = useFetchSolution(
        getRawgUrl("games", { ordering: "-added", page: 1 })
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

    const featured = data?.results?.[0];
    const restGames = data?.results?.slice(1) || [];

    return (
        <>
            {(error || errorPopular) && <article className="container mx-auto">{error || errorPopular}</article>}

            {loading ? (
                <div className="container mx-auto px-4 mb-10">
                    <div className="h-[360px] sm:h-[420px] md:h-[480px] rounded-2xl bg-my-black/60 animate-pulse" />
                </div>
            ) : (
                <HeroFeatured game={featured} />
            )}

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
                    {restGames.map((game) => <CardGame key={game.id} game={game} />)}
                </Grid>
            )}
            {popularData?.results?.length > 0 && (
                <div className="container mx-auto px-4 mt-10">
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
