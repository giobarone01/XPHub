import LoadingSpinner from "./LoadingSpinner";

export default function LoadMoreButton({ onClick, loading, hasMore }) {
    if (!hasMore) return null;

    const handleInteraction = (e) => {
        e.preventDefault();
        if (!loading) {
            onClick();
        }
    };

    return (
        <div className="flex justify-center my-6">
            <button
                className="bg-my-purple hover:bg-my-purple/50 text-white rounded-full py-3 px-6 min-w-[150px] transition-colors duration-300 flex items-center justify-center gap-2 touch-manipulation cursor-pointer"
                onClick={handleInteraction}
                onTouchEnd={handleInteraction}
                disabled={loading}
                aria-label="Carica altri contenuti"
            >
                {loading ? (
                    <>
                        <LoadingSpinner size="sm" className="text-white" />
                        Loading...
                    </>
                ) : (
                    'Load More'
                )}
            </button>
        </div>
    );
}