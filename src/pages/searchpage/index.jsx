import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Grid from "../../components/Grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&search=${game}`;

    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    if (loading) {
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
                {data && data.results.map(( game ) => <CardGame key={game.id} game={game} />)}
            </Grid>
        </>
    );
}