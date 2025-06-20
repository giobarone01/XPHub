import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Grid from "../../components/Grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import SkeletonCardGame from "../../components/SkeletonCard";
import { Button } from "@heroui/react";

export default function FilterPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const platform = searchParams.get("platform");
    const genre = searchParams.get("genre");
    const publisher = searchParams.get("publisher");
    const sort = searchParams.get("sort") || "-added";
    
    const [selectedPlatform, setSelectedPlatform] = useState(platform);
    const [selectedGenre, setSelectedGenre] = useState(genre);
    const [selectedPublisher, setSelectedPublisher] = useState(publisher);
    const [selectedSort, setSelectedSort] = useState(sort);
    
    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [errorMore, setErrorMore] = useState(null);

    const sortOptions = [
        { value: "-added", label: "Popularity (highest)" },
        { value: "added", label: "Popularity (lowest)" },
        { value: "-released", label: "Release date (newest)" },
        { value: "released", label: "Release date (oldest)" },
        { value: "-rating", label: "Rating (highest)" },
        { value: "rating", label: "Rating (lowest)" },
        { value: "name", label: "Name (A-Z)" },
        { value: "-name", label: "Name (Z-A)" },
        { value: "-metacritic", label: "Metacritic (highest)" },
        { value: "metacritic", label: "Metacritic (lowest)" },
    ];

    const buildUrl = (pageNum = 1) => {
        let url = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&page=${pageNum}`;
        
        if (selectedPlatform) {
            url += `&platforms=${selectedPlatform}`;
        }
        
        if (selectedGenre) {
            url += `&genres=${selectedGenre}`;
        }
        
        if (selectedPublisher) {
            url += `&publishers=${selectedPublisher}`;
        }
        
        if (selectedSort) {
            url += `&ordering=${selectedSort}`;
        }
        
        return url;
    };

    const initialUrl = buildUrl();
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        const fetchPlatforms = async () => {
            setLoadingFilters(true);
            try {
                const response = await fetch("https://api.rawg.io/api/platforms?key=65f57c71e58e4703a6b14f979b6d8fbb");
                if (!response.ok) throw new Error('Failed to fetch platforms');
                const data = await response.json();
                setPlatforms(data.results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlatforms();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch("https://api.rawg.io/api/genres?key=65f57c71e58e4703a6b14f979b6d8fbb");
                if (!response.ok) throw new Error('Failed to fetch genres');
                const data = await response.json();
                setGenres(data.results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await fetch("https://api.rawg.io/api/publishers?key=65f57c71e58e4703a6b14f979b6d8fbb&page_size=40");
                if (!response.ok) throw new Error('Failed to fetch publishers');
                const data = await response.json();
                setPublishers(data.results);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingFilters(false);
            }
        };

        fetchPublishers();
    }, []);

    useEffect(() => {
        updateUrl(buildUrl());
        setPage(1);
        setGames([]);
        setHasNext(true);
        
        const params = new URLSearchParams();
        if (selectedPlatform) params.set("platform", selectedPlatform);
        if (selectedGenre) params.set("genre", selectedGenre);
        if (selectedPublisher) params.set("publisher", selectedPublisher);
        if (selectedSort) params.set("sort", selectedSort);
        setSearchParams(params);
    }, [selectedPlatform, selectedGenre, selectedPublisher, selectedSort]);

    useEffect(() => {
        if (data?.results) {
            setGames(data.results);
            setHasNext(data.next !== null);
        }
    }, [data]);

    const handlePlatformChange = (e) => {
        setSelectedPlatform(e.target.value);
    };

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    const handlePublisherChange = (e) => {
        setSelectedPublisher(e.target.value);
    };

    const handleSortChange = (e) => {
        setSelectedSort(e.target.value);
    };

    useEffect(() => {
        updateUrl(buildUrl());
        setPage(1);
        setGames([]);
        setHasNext(true);
        
        const params = new URLSearchParams();
        if (selectedPlatform) params.set("platform", selectedPlatform);
        if (selectedGenre) params.set("genre", selectedGenre);
        if (selectedPublisher) params.set("publisher", selectedPublisher);
        if (selectedSort) params.set("sort", selectedSort);
        setSearchParams(params);
    }, [selectedPlatform, selectedGenre, selectedPublisher, selectedSort]);

    const resetFilters = () => {
        setSelectedPlatform("");
        setSelectedGenre("");
        setSelectedPublisher("");
        setSelectedSort("-added");
    };

    const loadMore = async () => {
        const nextPage = page + 1;
        setLoadingMore(true);
        try {
            const res = await fetch(buildUrl(nextPage));
            const data = await res.json();
            setGames(prev => [...prev, ...data.results]);
            setHasNext(data.next !== null);
            setPage(nextPage);
        } catch (error) {
            setErrorMore(error.message);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 my-10">
                {/* Filters section */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Filter Games</h1>
                    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                        {/* Platform Filter */}
                        <div className="w-full md:w-auto">
                            <label htmlFor="platform-select" className="block text-gray-300 mb-2">Platform</label>
                            <select
                                id="platform-select"
                                value={selectedPlatform || ""}
                                onChange={handlePlatformChange}
                                className="w-full md:w-64 bg-my-black/30 text-white border border-gray-700 rounded-md p-2"
                                disabled={loadingFilters}
                            >
                                <option value="">All platforms</option>
                                {platforms.map(platform => (
                                    <option key={platform.id} value={platform.id}>
                                        {platform.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Genre Filter */}
                        <div className="w-full md:w-auto">
                            <label htmlFor="genre-select" className="block text-gray-300 mb-2">Genre</label>
                            <select
                                id="genre-select"
                                value={selectedGenre || ""}
                                onChange={handleGenreChange}
                                className="w-full md:w-64 bg-my-black/30 text-white border border-gray-700 rounded-md p-2"
                                disabled={loadingFilters}
                            >
                                <option value="">All genres</option>
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.slug}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Publisher Filter */}
                        <div className="w-full md:w-auto">
                            <label htmlFor="publisher-select" className="block text-gray-300 mb-2">Publisher</label>
                            <select
                                id="publisher-select"
                                value={selectedPublisher || ""}
                                onChange={handlePublisherChange}
                                className="w-full md:w-64 bg-my-black/30 text-white border border-gray-700 rounded-md p-2"
                                disabled={loadingFilters}
                            >
                                <option value="">All publishers</option>
                                {publishers.map(publisher => (
                                    <option key={publisher.id} value={publisher.id}>
                                        {publisher.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Reset Button */}
                        <div className="w-full md:w-auto self-end">
                            <button
                                onClick={resetFilters}
                                className="bg-my-purple hover:bg-my-cyan text-white py-2 px-4 rounded-md transition-colors duration-300"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                    
                    {/* Results title with Sort dropdown - Responsive */}
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                            {selectedPlatform || selectedGenre || selectedPublisher ? 'Filtered results' : 'All games'}
                        </h2>
                        
                        {/* Sort Filter - Responsive */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-gray-300 whitespace-nowrap">Sort by:</span>
                            <select
                                id="sort-select"
                                value={selectedSort}
                                onChange={handleSortChange}
                                className="bg-my-black/30 text-white border border-gray-700 rounded-md p-1.5 text-sm flex-grow sm:flex-grow-0 min-w-[180px]"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
            </div>

            {error && <article className="text-red-500">{error}</article>}
            {errorMore && <article className="text-red-500">{errorMore}</article>}
        </div>

        {loading && games.length === 0 ? (
            <Grid>
                {[...Array(8)].map((_, index) => (
                    <SkeletonCardGame key={index} />
                ))}
            </Grid>
        ) : (
            <Grid>
                {games.map((game) => <CardGame key={game.id} game={game} />)}
            </Grid>
        )}

        {hasNext && (
            <div className="flex justify-center my-6">
                <Button
                    radius="full"
                    size="lg"
                    className="bg-my-purple hover:bg-my-purple/50 text-white transition-colors duration-300 flex items-center gap-2"
                    onClick={loadMore}
                    disabled={loadingMore}
                >
                    {loadingMore ? (
                        <>
                            <LoadingSpinner size="sm" className="text-white" />
                            Loading...
                        </>
                    ) : (
                        'Load More'
                    )}
                </Button>
            </div>
        )}
    </>
);
}