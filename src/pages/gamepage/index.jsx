import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import GamesSlider from "../../components/Slider";
import RatingStars from "../../components/RatingStars";
import RatingsBreakdown from "../../components/RatingsBreakdown";
import CompactGameCard from "../../components/CompactGameCard";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid, FaGlobe } from "react-icons/fa";
import { SiSteam, SiEpicgames, SiGogdotcom, SiPlaystation, SiGoogleplay, SiAppstore } from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";
import { Divider } from "@heroui/react";
import FallbackImg from "../../assets/fallback.png";
import { Link } from "react-router-dom";
import { getRawgUrl } from "../../config/api.js";

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
    return slug;
};

const metacriticClass = (score) =>
    score >= 75
        ? "border-my-green text-my-green"
        : score >= 50
            ? "border-yellow-400 text-yellow-400"
            : "border-red-400 text-red-400";

export default function GamePage() {
    const { id } = useParams();
    const { data, loading, error } = useFetchSolution(getRawgUrl(`games/${id}`));
    const { data: screenshotsData } = useFetchSolution(getRawgUrl(`games/${id}/screenshots`));
    const { data: moviesData } = useFetchSolution(getRawgUrl(`games/${id}/movies`));
    const { data: suggestedData } = useFetchSolution(getRawgUrl(`games/${id}/suggested`));

    const [showFullDesc, setShowFullDesc] = useState(false);

    useEffect(() => {
        setShowFullDesc(false);
    }, [id]);

    useEffect(() => {
        if (data?.name) document.title = `${data.name} — XPHub`;
        return () => { document.title = "XPHub"; };
    }, [data?.name]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8 animate-pulse">
                <div className="mb-8 h-64 rounded-xl bg-white/5 sm:h-80 md:h-96" />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="h-40 rounded-xl bg-white/5" />
                        <div className="h-48 rounded-xl bg-white/5" />
                    </div>
                    <div className="space-y-6">
                        <div className="h-32 rounded-xl bg-white/5" />
                        <div className="h-40 rounded-xl bg-white/5" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="container mx-auto py-12 text-center">
                <p className="text-lg text-red-400">{error || "Game not found"}</p>
                <Link to="/" className="mt-4 inline-block text-my-cyan transition-colors hover:text-my-purple">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    const trailerUrl = moviesData?.results?.[0]?.data?.max || null;
    const uniquePlatforms = [...new Set(data.platforms?.map((p) => normalizePlatformSlug(p.platform.slug)) || [])];
    const description = data.description_raw || "No description available.";
    const isLongDesc = description.length > 400;

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Cover hero */}
            <div className="relative mb-6 h-64 overflow-hidden rounded-2xl sm:h-80 md:h-96">
                <img
                    src={data.background_image || FallbackImg}
                    alt={data.name}
                    className="ken-burns absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-my-black/90 via-my-black/40 to-transparent p-4 sm:p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl">{data.name}</h1>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-200">
                        {data.released && <span>{data.released}</span>}
                        {data.esrb_rating?.name && (
                            <span className="rounded border border-white/20 px-1.5 py-0.5 text-xs uppercase tracking-wide">
                                {data.esrb_rating.name}
                            </span>
                        )}
                        {uniquePlatforms.length > 0 && (
                            <span className="flex items-center gap-2">
                                {uniquePlatforms.map((slug, i) => {
                                    const Icon = platformIcons[slug];
                                    return Icon ? (
                                        <span key={i} title={slug} aria-label={slug} className="drop-shadow-sm">{Icon}</span>
                                    ) : null;
                                })}
                            </span>
                        )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <RatingStars rating={data.rating || 0} showLabel={false} className="text-sm" />
                        {data.metacritic && (
                            <span className={`rounded-md border px-2 py-0.5 text-sm font-bold ${metacriticClass(data.metacritic)}`}>
                                {data.metacritic}
                            </span>
                        )}
                        <span className="text-lg">
                            <ToggleFavorite data={data} />
                        </span>
                        {data.website && (
                            <a
                                href={data.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-my-cyan"
                            >
                                <FaGlobe /> Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-3">
                <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:col-span-2">
                    {/* About */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-purple/50 sm:p-4 md:p-6">
                        <h2 className="mb-2 text-xl font-semibold text-white sm:mb-3">About</h2>
                        <p className={`whitespace-pre-line text-xs text-gray-300 sm:text-sm md:text-base ${!showFullDesc && isLongDesc ? "line-clamp-5" : ""}`}>
                            {description}
                        </p>
                        {isLongDesc && (
                            <button
                                onClick={() => setShowFullDesc((v) => !v)}
                                className="mt-2 text-sm font-medium text-my-cyan transition-colors hover:text-my-purple-light"
                            >
                                {showFullDesc ? "Show less" : "Read more"}
                            </button>
                        )}
                    </div>

                    {/* Screenshots */}
                    {screenshotsData?.results?.length > 0 && (
                        <div>
                            <GamesSlider
                                title="Screenshots"
                                slidesPerView={3}
                                enableLightbox={true}
                                items={screenshotsData.results}
                                renderItem={(shot) => (
                                    <img
                                        key={shot.id}
                                        src={shot.image}
                                        alt={`Screenshot ${shot.id}`}
                                        className="h-48 w-full cursor-pointer rounded-xl object-cover"
                                    />
                                )}
                            />
                        </div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        {/* Genres */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-cyan/50 sm:p-4">
                            <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3">Genres</h3>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {data.genres?.map((genre) => (
                                    <Link
                                        key={genre.id}
                                        to={`/games/${genre.slug}`}
                                        className="rounded-full bg-my-cyan/20 px-2 py-1 text-xs font-medium text-my-cyan transition hover:bg-my-cyan/40 sm:px-3 sm:text-sm"
                                    >
                                        {genre.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Developers */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-purple/50 sm:p-4">
                            <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3">Developers</h3>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {data.developers?.map((dev) => (
                                    <Link
                                        key={dev.id}
                                        to={`/developers/${dev.id}`}
                                        className="rounded-full bg-my-purple/80 px-2 py-1 text-xs font-medium text-white transition hover:bg-my-purple/40 sm:px-3 sm:text-sm"
                                    >
                                        {dev.name}
                                    </Link>
                                )) || "N/A"}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-green/50 sm:col-span-2 sm:p-4">
                            <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {data.tags?.slice(0, 8).map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="rounded-full bg-my-green/20 px-2 py-1 text-xs font-medium text-my-green transition hover:bg-my-green/40 sm:px-3 sm:text-sm"
                                    >
                                        #{tag.name}
                                    </span>
                                )) || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Trailer */}
                    {trailerUrl && (
                        <div>
                            <h2 className="mb-3 text-xl font-semibold text-white">Trailer</h2>
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-my-purple/50">
                                <video controls className="w-full">
                                    <source src={trailerUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}

                    {/* Game Stats */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-cyan/50 sm:p-4 md:p-6">
                        <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3">Game Stats</h3>
                        <div className="space-y-2 text-sm text-gray-300 sm:space-y-3 sm:text-base">
                            <div className="flex items-center justify-between">
                                <span>Metacritic</span>
                                {data.metacritic ? (
                                    <span className={`rounded-md border px-2 py-0.5 text-sm font-bold ${metacriticClass(data.metacritic)}`}>
                                        {data.metacritic}/100
                                    </span>
                                ) : (
                                    <span className="font-medium text-white">N/A</span>
                                )}
                            </div>
                            <Divider className="opacity-20" />
                            <div className="flex justify-between">
                                <span>Playtime</span>
                                <span className="font-medium text-white">{data.playtime ? `${data.playtime} hours` : "N/A"}</span>
                            </div>
                            <Divider className="opacity-20" />
                            <div className="flex justify-between">
                                <span>Achievements</span>
                                <span className="font-medium text-white">{data.achievements_count || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Player Ratings */}
                    {data.ratings?.length > 0 && (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-green/50 sm:p-4 md:p-6">
                            <h3 className="mb-3 text-lg font-semibold text-white">Player Ratings</h3>
                            <RatingsBreakdown ratings={data.ratings} />
                        </div>
                    )}

                    {/* Where to Buy */}
                    {data.stores?.length > 0 && (
                        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-my-cyan/10 to-my-purple/10 p-3 shadow-inner backdrop-blur-sm transition-all duration-300 sm:p-4 md:p-6">
                            <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3">Where to Buy</h3>
                            <div className="space-y-3">
                                {data.stores.slice(0, 5).map((store) => {
                                    const name = store.store.name.toLowerCase();
                                    const iconsMap = {
                                        steam: <SiSteam className="h-5 w-5" />,
                                        "epic games": <SiEpicgames className="h-5 w-5" />,
                                        gog: <SiGogdotcom className="h-5 w-5" />,
                                        "xbox store": <TiVendorMicrosoft className="h-5 w-5" />,
                                        playstation: <SiPlaystation className="h-5 w-5" />,
                                        "google play": <SiGoogleplay className="h-5 w-5" />,
                                        "app store": <SiAppstore className="h-5 w-5" />,
                                    };
                                    const Icon = Object.entries(iconsMap).find(([key]) => name.includes(key))?.[1] || null;

                                    return (
                                        <a
                                            key={store.id}
                                            href={`https://${store.store.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-my-cyan/30"
                                        >
                                            <span className="text-xs font-medium sm:text-sm">{store.store.name}</span>
                                            {Icon && <span>{Icon}</span>}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Games */}
            {suggestedData?.results?.length > 0 && (
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-semibold text-white title-with-line">Similar Games</h2>
                    <GamesSlider
                        items={suggestedData.results.slice(0, 15)}
                        title=""
                        renderItem={(game) => <CompactGameCard key={game.id} game={game} height="120px" />}
                    />
                </div>
            )}

            {/* Community Chat */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-my-green/50 sm:p-4 md:p-6">
                <h2 className="mb-2 text-xl font-semibold text-white sm:mb-3">Community Chat</h2>
                <Chatbox data={data} />
            </div>
        </div>
    );
}
