import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import LazyLoadGameImage from "./LazyLoadGameImage";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";



export default function CardGame({ game }) {
    const genres = game.genres?.map((g) => g.name).join(", ") || "N/A";

    const platformIcons = {
        pc: <FaWindows />,
        playstation: <FaPlaystation />,
        xbox: <FaXbox />,
        mac: <FaApple />,
        linux: <FaLinux />,
        ios: <FaApple />,
        android: <FaAndroid />,
    };

    const normalizePlatformSlug = (slug) => {
        if (slug.includes("playstation")) return "playstation";
        if (slug.includes("xbox")) return "xbox";
        if (slug.includes("nintendo")) return "nintendo";
        return slug;
    };

    return (
        <Card isFooterBlurred className="relative h-[350px] w-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <div className="flex gap-2 text-white drop-shadow-lg mb-1">
                    {[...new Set(
                        game.platforms?.map(p => normalizePlatformSlug(p.platform.slug))
                    )].map((slug, i) => {
                        const Icon = platformIcons[slug];
                        return Icon ? (
                            <span key={i} title={slug} className="text-base drop-shadow-sm">
                                {Icon}
                            </span>
                        ) : null;
                    })}
                </div>
                <h4 className="text-white font-semibold text-large drop-shadow-lg">
                    {game.name}
                </h4>
            </CardHeader>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <LazyLoadGameImage image={game.background_image} alt={game.name} />
            </div>

            <CardFooter className="absolute bottom-0 z-20 flex items-center justify-between rounded-xl bg-black/50 transition-all duration-300">
                <div className="flex flex-col gap-1">
                    <p className="text-tiny text-white/80">{genres}</p>
                    <p className="text-tiny text-white/80">Rating: {game.rating || "N/A"}</p>
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
