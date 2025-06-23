import { motion } from "framer-motion";

export default function FilterPanel({
    showFilters,
    platforms,
    genres,
    publishers,
    selectedPlatform,
    selectedGenre,
    selectedPublisher,
    handlePlatformChange,
    handleGenreChange,
    handlePublisherChange,
    resetFilters,
    loadingFilters,
    filterVariants,
    itemVariants
}) {
    return (
        <motion.div
            className="md:block"
            variants={filterVariants}
            initial="closed"
            animate="open"
            exit="closed"
        >
            <motion.div className="flex flex-col md:flex-row gap-3 flex-wrap" variants={itemVariants}>
                {/* Platform Filter */}
                <motion.div className="w-full md:w-auto" variants={itemVariants}>
                    <label htmlFor="platform-select" className="block text-gray-300 mb-1 text-sm">Platform</label>
                    <select
                        id="platform-select"
                        value={selectedPlatform || ""}
                        onChange={handlePlatformChange}
                        className="w-full md:w-56 bg-my-black/30 text-white border border-gray-700 rounded-md p-1.5 text-sm"
                        disabled={loadingFilters}
                    >
                        <option value="">All platforms</option>
                        {platforms.map(platform => (
                            <option key={platform.id} value={platform.id}>
                                {platform.name}
                            </option>
                        ))}
                    </select>
                </motion.div>

                {/* Genre Filter */}
                <motion.div className="w-full md:w-auto" variants={itemVariants}>
                    <label htmlFor="genre-select" className="block text-gray-300 mb-1 text-sm">Genre</label>
                    <select
                        id="genre-select"
                        value={selectedGenre || ""}
                        onChange={handleGenreChange}
                        className="w-full md:w-56 bg-my-black/30 text-white border border-gray-700 rounded-md p-1.5 text-sm"
                        disabled={loadingFilters}
                    >
                        <option value="">All genres</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.slug}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </motion.div>

                {/* Publisher Filter */}
                <motion.div className="w-full md:w-auto" variants={itemVariants}>
                    <label htmlFor="publisher-select" className="block text-gray-300 mb-1 text-sm">Publisher</label>
                    <select
                        id="publisher-select"
                        value={selectedPublisher || ""}
                        onChange={handlePublisherChange}
                        className="w-full md:w-56 bg-my-black/30 text-white border border-gray-700 rounded-md p-1.5 text-sm"
                        disabled={loadingFilters}
                    >
                        <option value="">All publishers</option>
                        {publishers.map(publisher => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.name}
                            </option>
                        ))}
                    </select>
                </motion.div>

                {/* Reset Button */}
                <motion.div className="w-full md:w-auto self-end" variants={itemVariants}>
                    <button
                        onClick={resetFilters}
                        className="bg-my-purple hover:bg-my-cyan text-white py-1.5 px-3 rounded-md transition-colors duration-300 text-sm"
                    >
                        Reset Filters
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}