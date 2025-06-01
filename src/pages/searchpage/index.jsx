import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Grid from "../../components/Grid";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&search=${game}`;

    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <>
            <h1>Risultati per: {game} game</h1>
            {loading && <p>loading...</p>}
            {error && <h1>{error}</h1>}
            <Grid>
                {data && data.results.map(( game ) => <CardGame key={game.id} game={game} />)}
            </Grid>
        </>
    );
}