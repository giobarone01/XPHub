import useFetchSolution from "../../hook/useFetchSolution.jsx";
import DeveloperCard from "../../components/DeveloperCard.jsx";
import Grid from "../../components/Grid.jsx";
import SkeletonCardGame from "../../components/SkeletonCard.jsx";
import { motion } from "framer-motion";
import PageTitle from "../../components/PageTitle.jsx";
import { getRawgUrl } from "../../config/api.js";

export default function DevelopersPage() {
    const { data, loading, error, load } = useFetchSolution(
        getRawgUrl("developers", { page_size: 40 })
    );

    const developers = data?.results;

    return (
        <>
            <div className="container mx-auto px-4">
                <PageTitle>
                    <span className="gradient-text">Developers</span>
                </PageTitle>
            </div>

            {error && (
                <div className="container mx-auto px-4 text-red-400 mb-4">
                    <p>{error}</p>
                    <button
                        onClick={load}
                        className="mt-2 px-3 py-1 bg-my-cyan rounded text-black hover:bg-my-purple transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading ? (
                <Grid>
                    {[...Array(8)].map((_, index) => (
                        <SkeletonCardGame key={index} />
                    ))}
                </Grid>
            ) : (
                <Grid>
                    {developers?.map((dev) => <DeveloperCard key={dev.id} developer={dev} />)}
                </Grid>
            )}
        </>
    );
}