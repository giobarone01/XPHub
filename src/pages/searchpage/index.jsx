import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Grid from "../../components/Grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import LoadMoreButton from "../../components/LoadMoreButton";
import { Link } from "react-router";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const [page, setPage] = useState(1);
    const [allGames, setAllGames] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&search=${game}&page=${page}`;

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
        updateUrl(`https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&search=${game}&page=1`);
    }, [game, updateUrl]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        updateUrl(`https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&search=${game}&page=${nextPage}`);
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
        <>
            <div className="container mx-auto px-4 my-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Results for: {game.charAt(0).toUpperCase() + game.slice(1)}</h1>
            </div>

            {error && <h1 className="container mx-auto px-4">{error}</h1>}
            <Grid>
                {allGames.map((game) => <CardGame key={game.id} game={game} />)}
            </Grid>

            <LoadMoreButton
                onClick={loadMore}
                loading={loading}
                hasMore={hasMore}
            />
        </>
    );
}