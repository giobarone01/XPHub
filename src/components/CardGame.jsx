import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import LazyLoadGameImage from "./LazyLoadGameImage";
import ToggleFavorite from "./ToggleFavorite";
import PlatformIcon from "./PlatformIcon";
import RatingStars from "./RatingStars";
import FallbackCardImg from "../assets/fallbackcard.png"

export default function CardGame({ game }) {
    const genres = game.genres?.map((g) => g.name).join(", ") || "N/A";

    return (
        <Card className="relative h-[350px] w-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <div className="flex gap-2 text-white drop-shadow-lg mb-1">
                    {[...new Set(
                        game.platforms?.map(p => p.platform.slug)
                    )].map((slug, i) => (
                        <PlatformIcon key={i} platform={slug} />
                    ))}
                </div>
                <h4 className="text-white font-semibold text-base sm:text-large drop-shadow-lg">
                    {game.name}
                </h4>
            </CardHeader>

            <div className="absolute top-2 right-2 z-10 p-1 drop-shadow-lg">
                <ToggleFavorite data={game} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <LazyLoadGameImage image={game.background_image || FallbackCardImg } alt={game.name} />
            </div>

            <CardFooter className="absolute bottom-0 z-20 flex items-center justify-between rounded-xl bg-black/50 transition-all duration-300">
                <div className="flex flex-col gap-1">
                    <p className="text-tiny text-white/80">{genres}</p>
                    <RatingStars rating={game.rating} />
                </div>
                <Button
                    as={Link}
                    to={`/games/${game.slug}/${game.id}`}
                    radius="full"
                    size="sm"
                    className="bg-my-purple hover:bg-my-cyan text-white transition-colors duration-300"
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}
