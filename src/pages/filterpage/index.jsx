import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import Grid from "../../components/Grid";
import SkeletonCardGame from "../../components/SkeletonCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import PageTitle from "../../components/PageTitle";
import FilterToggle from "../../components/FilterToggle";
import FilterPanel from "../../components/FilterPanel";
import SortSelector from "../../components/SortSelector";
import useGameFilters from "../../hook/useGameFilters";

export default function FilterPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const platform = searchParams.get("platform");
    const genre = searchParams.get("genre");
    const publisher = searchParams.get("publisher");
    const sort = searchParams.get("sort") || "-added";

    const {
        platforms,
        genres,
        publishers,
        loadingFilters,
        selectedPlatform,
        selectedGenre,
        selectedPublisher,
        selectedSort,
        showFilters,
        setShowFilters,
        handlePlatformChange,
        handleGenreChange,
        handlePublisherChange,
        handleSortChange,
        resetFilters,
        sortOptions,
        buildUrl
    } = useGameFilters(platform, genre, publisher, sort);

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [errorMore, setErrorMore] = useState(null);

    const filterVariants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 }
    };

    const initialUrl = buildUrl();
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

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
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <PageTitle subtitle="Find your favorite games" className="mb-0">
                        <span>All </span><span className="gradient-text">Games</span>
                    </PageTitle>

                    {/* Sort Filter */}
                    <SortSelector
                        selectedSort={selectedSort}
                        handleSortChange={handleSortChange}
                        sortOptions={sortOptions}
                    />
                </div>
            </div>
            <div className="container mx-auto px-4 my-6">
                {/* Filters section */}
                <div className="mb-6">
                    <FilterToggle showFilters={showFilters} setShowFilters={setShowFilters} />

                    <AnimatePresence>
                        {(showFilters || window.innerWidth >= 768) && (
                            <FilterPanel
                                showFilters={showFilters}
                                platforms={platforms}
                                genres={genres}
                                publishers={publishers}
                                selectedPlatform={selectedPlatform}
                                selectedGenre={selectedGenre}
                                selectedPublisher={selectedPublisher}
                                handlePlatformChange={handlePlatformChange}
                                handleGenreChange={handleGenreChange}
                                handlePublisherChange={handlePublisherChange}
                                resetFilters={resetFilters}
                                loadingFilters={loadingFilters}
                                filterVariants={filterVariants}
                                itemVariants={itemVariants}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {error && <article className="text-red-500">{error}</article>}
            {errorMore && <article className="text-red-500">{errorMore}</article>}

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

            <LoadMoreButton
                onClick={loadMore}
                loading={loadingMore}
                hasMore={hasNext}
            />
        </>
    );
}