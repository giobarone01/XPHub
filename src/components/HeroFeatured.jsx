import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";
import PlatformIcon from "./PlatformIcon";
import ToggleFavorite from "./ToggleFavorite";
import FallbackImg from "../assets/fallback.png";

export default function HeroFeatured({ game }) {
    if (!game) return null;

    const genres = game.genres?.map((g) => g.name).slice(0, 3).join(" · ") || "";

    const normalizePlatformSlug = (slug) => {
        if (slug.includes("playstation")) return "playstation";
        if (slug.includes("xbox")) return "xbox";
        if (slug.includes("nintendo")) return "nintendo";
        return slug;
    };
    const uniquePlatforms = [...new Set(
        game.platforms?.map((p) => normalizePlatformSlug(p.platform.slug)) || []
    )];

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 mb-10"
        >
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 h-[360px] sm:h-[420px] md:h-[480px]">
                <img
                    src={game.background_image || FallbackImg}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-8 md:p-12 max-w-2xl">
                    <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-my-cyan/40 bg-my-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-my-cyan">
                        <FaStar className="text-[10px]" /> Featured
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg line-clamp-2">
                        {game.name}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-200">
                        {game.rating > 0 && (
                            <span className="flex items-center gap-1.5 font-semibold">
                                <FaStar className="text-yellow-400" />
                                {game.rating.toFixed(1)}
                            </span>
                        )}
                        {genres && <span className="text-gray-300">{genres}</span>}
                        {uniquePlatforms.length > 0 && (
                            <span className="flex items-center gap-2 text-white/90">
                                {uniquePlatforms.map((slug, i) => (
                                    <PlatformIcon key={i} platform={slug} />
                                ))}
                            </span>
                        )}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <Link
                            to={`/games/${game.slug}/${game.id}`}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-my-cyan to-my-purple px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-my-purple/30 transition-transform duration-300 hover:scale-105"
                        >
                            View details <FaArrowRight className="text-xs" />
                        </Link>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg backdrop-blur-sm transition-colors hover:bg-white/10">
                            <ToggleFavorite data={game} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
