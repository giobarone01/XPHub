import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import LazyLoadGameImage from "./LazyLoadGameImage";
import ToggleFavorite from "./ToggleFavorite";
import PlatformIcon from "./PlatformIcon";
import RatingStars from "./RatingStars";
import FallbackCardImg from "../assets/fallbackcard.png";
import { FaArrowRight } from "react-icons/fa";
import useTilt from "../hook/useTilt";

export default function CardGame({ game }) {
    const tilt = useTilt({ max: 7 });
    const genres = game.genres?.map((g) => g.name).join(", ") || "N/A";

    const normalizePlatformSlug = (slug) => {
        if (slug.includes("playstation")) return "playstation";
        if (slug.includes("xbox")) return "xbox";
        if (slug.includes("nintendo")) return "nintendo";
        return slug;
    };
    const uniquePlatforms = [...new Set(
        game.platforms?.map(p => normalizePlatformSlug(p.platform.slug)) || []
    )];

    return (
        <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="tilt-card group h-[280px] sm:h-[320px] md:h-[350px] w-full"
        >
        <Card className="tilt-inner relative h-full w-full overflow-hidden transition-shadow duration-300 hover:ring-2 hover:ring-my-cyan/60 hover:shadow-[0_18px_40px_-10px_rgba(34,211,238,0.35)]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start p-2 sm:p-3">
                <div className="flex gap-1 sm:gap-2 text-white drop-shadow-lg mb-1">
                    {uniquePlatforms.map((slug, i) => (
                        <PlatformIcon key={i} platform={slug} className="text-xs sm:text-sm md:text-base" />
                    ))}
                </div>
                <h4 className="text-white font-semibold text-sm sm:text-base md:text-large line-clamp-2 drop-shadow-lg">
                    {game.name}
                </h4>
            </CardHeader>

            <div className="absolute top-2 right-2 z-10 p-1 drop-shadow-lg">
                <ToggleFavorite data={game} className="text-sm sm:text-base" />
            </div>

            <div className="absolute inset-0 overflow-hidden bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110">
                    <LazyLoadGameImage image={game.background_image || FallbackCardImg } alt={game.name} />
                </div>
            </div>

            <div className="card-spotlight" />

            <CardFooter className="absolute bottom-0 z-20 flex items-center justify-between rounded-xl bg-black/50 transition-all duration-300 p-2 sm:p-3 w-full">
                <div className="flex flex-col gap-0.5 sm:gap-1 max-w-[65%] overflow-hidden">
                    <p className="text-xs sm:text-tiny text-white/80 line-clamp-1">{genres}</p>
                    <RatingStars rating={game.rating} className="text-xs sm:text-sm" />
                </div>
                <Button
                    as={Link}
                    to={`/games/${game.slug}/${game.id}`}
                    radius="full"
                    size="sm"
                    className="bg-my-purple hover:bg-my-cyan text-white transition-colors duration-300 text-[10px] sm:text-xs px-2 sm:px-3 py-1 flex items-center gap-1"
                >
                    <span className="hidden sm:inline">Details</span><FaArrowRight className="text-[10px] sm:text-xs flex-shrink-0" />
                </Button>
            </CardFooter>
        </Card>
        </div>
    );
}
