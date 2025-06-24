import { useState, useEffect } from "react";
import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import useFetchSolution from "../../hook/useFetchSolution";
import SkeletonCardGame from "../../components/SkeletonCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import PageTitle from "../../components/PageTitle";
import { getRawgUrl } from "../../config/api.js";

export default function UpcomingPage() {
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState([]);

    function getNextSixMonths() {
        const today = new Date();
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return `${formatDate(today)},${formatDate(sixMonthsLater)}`;
    }


    const initialUrl = getRawgUrl("games", { dates: getNextSixMonths(), ordering: "released", page: page });

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        if (data && data.results) {
            if (page === 1) {
                setAllGames(data.results);
            } else {
                setAllGames(prev => [...prev, ...data.results]);
            }
        }
    }, [data, page]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        updateUrl(getRawgUrl("games", { dates: getNextSixMonths(), ordering: "released", page: nextPage }));
    };

    return (
        <>
            <div className="container mx-auto px-4">
                <PageTitle subtitle="Games releasing in the next few months">
                    <span className="gradient-text">Upcoming</span> Games
                </PageTitle>
            </div>

            {error && (
                <div className="container mx-auto px-4 text-red-400 mb-4">
                    An error occurred: {error}
                </div>
            )}

            {loading && page === 1 ? (
                <Grid>
                    {[...Array(8)].map((_, index) => (
                        <SkeletonCardGame key={index} />
                    ))}
                </Grid>
            ) : (
                <>
                    <Grid>
                        {allGames.map((game) => <CardGame key={game.id} game={game} />)}
                    </Grid>

                    <LoadMoreButton
                        onClick={loadMore}
                        loading={loading}
                        hasMore={!!data?.next}
                    />
                </>
            )}
        </>
    );
}