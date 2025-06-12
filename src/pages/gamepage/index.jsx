import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/ChatBox";
import GamesSlider from "../../components/Slider";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { Button, Divider, Chip } from "@heroui/react";
import FallbackImg from "../../assets/fallback.png";

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

    if (error) return <h1 className="text-red-500 text-center mt-8">{error}</h1>;
    if (loading || !data) return <p className="text-center mt-8">Loading game details...</p>;

    const trailerUrl = moviesData?.results?.[0]?.data?.max || null;

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Copertina */}
            <div className="relative rounded-xl overflow-hidden mb-8 h-96">
                <img
                    src={data.background_image || FallbackImg}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end p-6">
                    <div className="w-full">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{data.name}</h1>
                                <p className="text-gray-300 mb-4">{data.released}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-tiny text-white/80 flex items-center gap-1">
                                    Rating:
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < Math.round(data.rating) ? "text-yellow-400" : "text-gray-600"}>
                                            ★
                                        </span>
                                    ))}
                                    <span className="ml-1 text-white/60">({data.rating?.toFixed(2) || "N/A"})</span>
                                </p>
                                <ToggleFavorite data={data} />
                            </div>
                        </div>

                        <div className="flex gap-2 text-white drop-shadow-lg mb-1">
                            {[...new Set(
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
                    {/* About */}
                    <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <p className="text-gray-300 whitespace-pre-line">
                            {data.description_raw || "No description available."}
                        </p>
                    </div>

                    {/* Screenshots */}
                    {screenshotsData?.results?.length > 0 && (
                        <div className="mb-8">
                            <GamesSlider
                                title="Screenshots"
                                slidesPerView={3}
                                enableLightbox = {true}
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
                        <div className="bg-gray-900/50 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.genres?.map(genre => (
                                    <Chip key={genre.id} variant="flat" color="secondary">
                                        {genre.name}
                                    </Chip>
                                )) || "N/A"}
                            </div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Developers</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.developers?.map(dev => (
                                    <Chip key={dev.id} variant="flat">
                                        {dev.name}
                                    </Chip>
                                )) || "N/A"}
                            </div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.tags?.slice(0, 5).map(tag => (
                                    <Chip key={tag.id} variant="flat" color="primary">
                                        {tag.name}
                                    </Chip>
                                )) || "N/A"}
                            </div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-4">
                            <h3 className="font-semibold mb-2">Stores</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.stores?.map(store => (
                                    <Button
                                        key={store.id}
                                        as="a"
                                        href={`https://${store.store.domain}`}
                                        target="_blank"
                                        size="sm"
                                        variant="flat"
                                    >
                                        {store.store.name}
                                    </Button>
                                )) || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">

                    {/* Trailer */}
                    {trailerUrl && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                            <video controls className="w-full rounded-xl">
                                <source src={trailerUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

                    <div className="bg-gray-900/50 rounded-xl p-6">
                        <h3 className="font-bold text-xl mb-4">Game Stats</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-gray-400 text-sm">Metacritic</p>
                                <p className="text-white font-medium">
                                    {data.metacritic ? `${data.metacritic}/100` : "N/A"}
                                </p>
                            </div>
                            <Divider />
                            <div>
                                <p className="text-gray-400 text-sm">Playtime</p>
                                <p className="text-white font-medium">
                                    {data.playtime ? `${data.playtime} hours` : "N/A"}
                                </p>
                            </div>
                            <Divider />
                            <div>
                                <p className="text-gray-400 text-sm">Achievements</p>
                                <p className="text-white font-medium">
                                    {data.achievements_count || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {data.stores?.length > 0 && (
                        <div className="bg-gray-900/50 rounded-xl p-6">
                            <h3 className="font-bold text-xl mb-4">Where to Buy</h3>
                            <div className="space-y-2">
                                {data.stores?.slice(0, 3).map(store => (
                                    <Button
                                        key={store.id}
                                        as="a"
                                        href={`https://${store.store.domain}`}
                                        target="_blank"
                                        fullWidth
                                        className="justify-between"
                                        endContent="→"
                                    >
                                        {store.store.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Community Chat */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Community Chat</h2>
                <div className="bg-gray-900/50 rounded-xl p-6">
                    <Chatbox data={data} />
                </div>
            </div>
        </div>
    );
}
