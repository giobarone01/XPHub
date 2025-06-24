import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CardGame from "../../components/CardGame";
import usePaginatedFetch from "../../hook/usePaginatedFetch";
import Grid from "../../components/Grid";
import SkeletonCardGame from "../../components/SkeletonCard";
import LoadMoreButton from "../../components/LoadMoreButton";
import PageTitle from "../../components/PageTitle";
import { getRawgUrl } from "../../config/api.js";

export default function GenrePage() {
    const { genre } = useParams();
    const initialUrl = getRawgUrl("games", { genres: genre, page: 1 });

    const {
        loading,
        error,
        allData: games,
        hasMore,
        loadNextPage,
        reset
    } = usePaginatedFetch(initialUrl);

    useEffect(() => {
        reset(getRawgUrl("games", { genres: genre, page: 1 }));
    }, [genre, reset]);

    return (
        <>
            <div className="container mx-auto px-4">
                <PageTitle>
                    <span className="gradient-text">{genre.charAt(0).toUpperCase() + genre.slice(1)}</span> <span>Games</span>
                </PageTitle>
            </div>

            {error && <article>{error}</article>}

            {loading && games.length === 0 ? (
                <Grid>
                    {[...Array(8)].map((_, index) => (
                        <SkeletonCardGame key={index} />
                    ))}
                </Grid>
            ) : (
                <>
                    <Grid>
                        {games.map((game) => <CardGame key={game.id} game={game} />)}
                    </Grid>

                    <LoadMoreButton
                        onClick={loadNextPage}
                        loading={loading}
                        hasMore={hasMore}
                    />
                </>
            )}
        </>
    );
}