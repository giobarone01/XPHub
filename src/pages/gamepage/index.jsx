import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import GamesSlider from "../../components/Slider";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiSteam, SiEpicgames, SiGogdotcom, SiPlaystation, SiGoogleplay, SiAppstore } from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";
import { Button, Divider } from "@heroui/react";
import FallbackImg from "../../assets/fallback.png";
import { Link } from "react-router-dom";

export default function GamePage() {
    const { id } = useParams();
    const gameUrl = `https://api.rawg.io/api/games/${id}?key=65f57c71e58e4703a6b14f979b6d8fbb`;
    const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=65f57c71e58e4703a6b14f979b6d8fbb`;
    const moviesUrl = `https://api.rawg.io/api/games/${id}/movies?key=65f57c71e58e4703a6b14f979b6d8fbb`;

    const { data, loading, error } = useFetchSolution(gameUrl);
    const { data: screenshotsData } = useFetchSolution(screenshotsUrl);
    const { data: moviesData } = useFetchSolution(moviesUrl);

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

    if (loading) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" className="text-my-cyan" />
                <p className="mt-4 text-gray-400">Loading game details...</p>
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

    const trailerUrl = moviesData?.results?.[0]?.data?.max || null;

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Game Cover */}
            <div className="relative rounded-xl overflow-hidden mb-8 h-96">
                <img
                    src={data?.background_image || FallbackImg}
                    alt={data?.name || "Game cover"}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-my-black/80 via-my-black/50 to-transparent flex items-end p-6">
                    <div className="w-full">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{data?.name}</h1>
                                <p className="text-gray-300 mb-4">{data?.released}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-tiny text-white/80 flex items-center gap-1">
                                    Rating:
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < Math.round(data?.rating || 0) ? "text-yellow-400" : "text-gray-600"}>
                                            ★
                                        </span>
                                    ))}
                                    <span className="ml-1 text-white/60">({(data?.rating || 0)?.toFixed(2)})</span>
                                </p>
                                <ToggleFavorite data={data} />
                            </div>
                        </div>

                        <div className="flex gap-2 text-white drop-shadow-lg mb-1">
                            {data?.platforms && [...new Set(
                                data.platforms?.map(p => normalizePlatformSlug(p.platform.slug))
                            )].map((slug, i) => {
                                const Icon = platformIcons[slug];
                                return Icon ? (
                                    <span key={i} title={slug} className="text-base drop-shadow-sm" aria-label={slug}>
                                        {Icon}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* About Section */}
                    <div className="rounded-xl p-6 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-purple/50 transition-all duration-300">
                        <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
                        <p className="text-gray-300 text-sm whitespace-pre-line">
                            {data.description_raw || "No description available."}
                        </p>
                    </div>

                    {/* Screenshots */}
                    {screenshotsData?.results?.length > 0 && (
                        <div className="mb-8">
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
                                        className="rounded-xl object-cover w-full h-48 cursor-pointer"
                                    />
                                )}
                            />
                        </div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Genres Card */}
                        <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-cyan/50 transition-all duration-300">
                            <h3 className="font-semibold text-lg text-white mb-3">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.genres?.map(genre => (
                                    <Link
                                        key={genre.id}
                                        to={`/games/${genre.slug}`}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-my-cyan/20 text-my-cyan hover:bg-my-cyan/40 transition"
                                    >
                                        {genre.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Developers Card */}
                        <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-purple/50 transition-all duration-300">
                            <h3 className="font-semibold text-lg text-white mb-3">Developers</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.developers?.map(dev => (
                                    <Link
                                        key={dev.id}
                                        to={`/developers/${dev.id}`}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-my-purple/80 text-white hover:bg-my-purple/40 transition"
                                    >
                                        {dev.name}
                                    </Link>
                                )) || "N/A"}
                            </div>
                        </div>

                        {/* Tags Card */}
                        <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-green/50 transition-all duration-300">
                            <h3 className="font-semibold text-lg text-white mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.tags?.slice(0, 5).map(tag => (
                                    <span
                                        key={tag.id}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-my-green/20 text-my-green hover:bg-my-green/40 transition"
                                    >
                                        #{tag.name}
                                    </span>
                                )) || "N/A"}
                            </div>
                        </div>

                        {/* Stores Card */}
                        <div className="rounded-xl p-4 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300">
                            <h3 className="font-semibold text-lg text-white mb-3">Stores</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.stores?.map(store => (
                                    <Button
                                        key={store.id}
                                        as="a"
                                        href={`https://${store.store.domain}`}
                                        target="_blank"
                                        size="sm"
                                        variant="outline"
                                        className="px-3 py-1 rounded-full text-xs font-medium border my-cyan/30 text-white hover:bg-white/10 transition"
                                    >
                                        {store.store.name}
                                    </Button>
                                )) || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Trailer */}
                    {trailerUrl && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                            <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-purple/50 transition-all duration-300">
                                <video controls className="w-full">
                                    <source src={trailerUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}

                    {/* Game Stats */}
                    <div className="rounded-xl p-6 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-cyan/50 transition-all duration-300">
                        <h3 className="font-semibold text-xl text-white mb-4">Game Stats</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex justify-between">
                                <span>Metacritic</span>
                                <span className="text-white font-medium">{data.metacritic ? `${data.metacritic}/100` : "N/A"}</span>
                            </div>
                            <Divider className="opacity-20" />
                            <div className="flex justify-between">
                                <span>Playtime</span>
                                <span className="text-white font-medium">{data.playtime ? `${data.playtime} hours` : "N/A"}</span>
                            </div>
                            <Divider className="opacity-20" />
                            <div className="flex justify-between">
                                <span>Achievements</span>
                                <span className="text-white font-medium">{data.achievements_count || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Where to Buy */}
                    {data.stores?.length > 0 && (
                        <div className="rounded-xl p-6 mb-6 backdrop-blur-sm bg-gradient-to-br from-my-cyan/10 to-my-purple/10 border border-white/10 shadow-inner transition-all duration-300">
                            <h3 className="font-bold text-xl text-white mb-4">Where to Buy</h3>
                            <div className="space-y-3">
                                {data.stores.slice(0, 5).map(store => {
                                    const name = store.store.name.toLowerCase();
                                    const iconsMap = {
                                        steam: <SiSteam className="w-5 h-5" />,
                                        "epic games": <SiEpicgames className="w-5 h-5" />,
                                        gog: <SiGogdotcom className="w-5 h-5" />,
                                        "xbox store": <TiVendorMicrosoft className="w-5 h-5" />,
                                        playstation: <SiPlaystation className="w-5 h-5" />,
                                        "google play": <SiGoogleplay className="w-5 h-5" />,
                                        "app store": <SiAppstore className="w-5 h-5" />,
                                    };
                                    const Icon = Object.entries(iconsMap).find(([key]) => name.includes(key))?.[1] || null;

                                    return (
                                        <a
                                            key={store.id}
                                            href={`https://${store.store.domain}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between px-4 py-2 bg-white/10 hover:bg-my-cyan/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <span className="text-sm font-medium">{store.store.name}</span>
                                            {Icon && <span>{Icon}</span>}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Community Chat */}
            <div className="rounded-xl p-6 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-my-green/50 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Community Chat</h2>
                <Chatbox data={data} />
            </div>
        </div>
    );
}