import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(', ');

    return (
        <article key={game.id}>
            <LazyLoadGameImage image={game.background_image} />
            <strong>{game.name}</strong>
            <small>{genres}</small>
            <p>{game.released}</p>
            <Link to={`/games/${game.slug}/${game.id}`}>
                Vai al gioco
            </Link>
        </article>
    );
}