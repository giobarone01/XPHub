import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import SkeletonCardGame from "../../components/SkeletonCard";
import SkeletonText from "../../components/SkeletonText";
import LoadMoreButton from "../../components/LoadMoreButton";
import PageTitle from "../../components/PageTitle";
import { getRawgUrl } from "../../config/api.js";

export default function DeveloperDetailPage() {
    const { id } = useParams();
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [errorMore, setErrorMore] = useState(null);

    const { data: devData, loading: devLoading, error: devError } = useFetchSolution(
        getRawgUrl(`developers/${id}`)
    );

    const { data: initialGames, loading: initialLoading, error: initialError } = useFetchSolution(
        getRawgUrl("games", { developers: id, page: 1 })
    );

    useEffect(() => {
        if (initialGames?.results) {
            setGames(initialGames.results);
            setHasNext(initialGames.next !== null);
        }
    }, [initialGames]);

    useEffect(() => {
        setGames([]);
        setPage(1);
        setHasNext(true);
    }, [id]);

    const loadMore = async () => {
        const nextPage = page + 1;
        setLoadingMore(true);
        try {
            const res = await fetch(
                getRawgUrl("games", { developers: id, page: nextPage })
            );
            const data = await res.json();
            setGames(prev => [...prev, ...data.results]);
            setHasNext(data.next !== null);
            setPage(nextPage);
        } catch (error) {
            setErrorMore(error.message);
        } finally {
            setLoadingMore(false);
        }
    };

    if (devLoading || initialLoading) return (
    <>
        <div className="container mx-auto px-4 my-10">
            <SkeletonText width="50%" height="2.5rem" className="mb-2" /> {/* h1 skeleton */}
            <SkeletonText width="8rem" height="1.5rem" /> {/* p skeleton */}
        </div>
        <Grid>
            {[...Array(8)].map((_, index) => (
                <SkeletonCardGame key={index} />
            ))}
        </Grid>
    </>
);
    if (devError) return <p>Error loading developer: {devError}</p>;
    if (initialError) return <p>Error loading games: {initialError}</p>;
    if (errorMore) return <p>Error loading more games: {errorMore}</p>;

    return (
        <>
            <div className="container mx-auto px-4">
                <PageTitle subtitle={`${devData?.games_count ?? games.length} games`}>
                    Games by <span className="gradient-text">{devData?.name}</span>
                </PageTitle>
            </div>

            <Grid>
                {games.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </Grid>

            <LoadMoreButton
                onClick={loadMore}
                loading={loadingMore}
                hasMore={hasNext}
            />
        </>
    );
}