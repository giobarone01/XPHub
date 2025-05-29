import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(', ');

    return (
        <article key={game.id}>
            <LazyLoadGameImage image={game.background_image} />
            <strong>{game.name}</strong>
            <small>{genres}</small>
            <p>{game.released}</p>
            <button>Visita il gioco</button>
        </article>
    );
}