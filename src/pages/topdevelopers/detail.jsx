import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";
import Grid from "../../components/Grid";
import SkeletonCardGame from "../../components/SkeletonCard";
import { Button } from "@heroui/react";

export default function DeveloperDetailPage() {
    const { id } = useParams();
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [errorMore, setErrorMore] = useState(null);

    const { data: devData, loading: devLoading, error: devError } = useFetchSolution(
        `https://api.rawg.io/api/developers/${id}?key=65f57c71e58e4703a6b14f979b6d8fbb`
    );

    const { data: initialGames, loading: initialLoading, error: initialError } = useFetchSolution(
        `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&developers=${id}&page=1`
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
                `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&developers=${id}&page=${nextPage}`
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

    if (devLoading || initialLoading) return <p>Loading...</p>;
    if (devError) return <p>Error loading developer: {devError}</p>;
    if (initialError) return <p>Error loading games: {initialError}</p>;
    if (errorMore) return <p>Error loading more games: {errorMore}</p>;

    return (
        <>
            <div className="container y-10 mx-4 my-10">
                <h1 className="text-4xl font-semibold">
                    Games by {devData?.name}
                </h1>
                <p className="text-lg mt-2">{devData?.games_count ?? games.length} games</p>
            </div>

            <Grid>
                {games.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
                {loadingMore && Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCardGame key={`skeleton-${i}`} />
                ))}
            </Grid>

            {hasNext && !loadingMore && (
                <div className="flex justify-center my-6">
                    <Button
                        radius="full"
                        size="lg"
                        className="bg-my-purple hover:bg-my-cyan text-white transition-colors duration-300"
                        onClick={loadMore}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </>
    );
}