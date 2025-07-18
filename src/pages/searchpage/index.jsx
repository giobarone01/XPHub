import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Grid from "../../components/Grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import LoadMoreButton from "../../components/LoadMoreButton";
import { Link } from "react-router";
import PageTitle from "../../components/PageTitle";
import { getRawgUrl } from "../../config/api.js";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const initialUrl = getRawgUrl("games", { search: game, page: page });
    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        if (data && data.results) {
            if (page === 1) {
                setAllGames(data.results);
            } else {
                setAllGames(prev => [...prev, ...data.results]);
            }
            setHasMore(data.next !== null);
        }
    }, [data, page]);

    useEffect(() => {
        setPage(1);
        setAllGames([]);
        updateUrl(getRawgUrl("games", { search: game, page: 1 }));
    }, [game, updateUrl]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        updateUrl(getRawgUrl("games", { search: game, page: nextPage }));
    };

    if (loading && page === 1) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" className="text-my-cyan" />
                <p className="mt-4 text-gray-400">Searching...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="container mx-auto text-center py-12">
                <p className="text-red-400 text-lg">{error || "Game not found"}</p>
                <Link to="/" className="mt-4 inline-block text-my-cyan hover:text-my-purple transition-colors">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <PageTitle subtitle={`${allGames.length} risultati trovati`}>
                Risultati per <span className="gradient-text">"{game}"</span>
            </PageTitle>

            <Grid>
                {allGames.map((gameItem) => (
                    <CardGame key={gameItem.id} game={gameItem} />
                ))}
            </Grid>

            {hasMore && (
                <LoadMoreButton
                    onClick={loadMore}
                    loading={loading}
                />
            )}
        </div>
    );
}