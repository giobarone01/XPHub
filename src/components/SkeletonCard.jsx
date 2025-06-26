export default function SkeletonCardGame() {
    return (
        <div className="relative h-[280px] sm:h-[320px] md:h-[350px] w-full animate-pulse bg-gray-900 rounded-xl overflow-hidden">
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 space-y-1 sm:space-y-2 z-10">
                <div className="flex gap-1 sm:gap-2">
                    <div className="h-3 w-3 sm:h-4 sm:w-4 bg-my-purple rounded-full"></div>
                    <div className="h-3 w-3 sm:h-4 sm:w-4 bg-my-purple rounded-full"></div>
                    <div className="h-3 w-3 sm:h-4 sm:w-4 bg-my-purple rounded-full"></div>
                </div>
                <div className="h-4 sm:h-5 w-3/4 bg-my-purple rounded"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 sm:p-4 flex justify-between items-center rounded-b-xl">
                <div className="space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 w-24 sm:w-40 bg-my-cyan rounded"></div>
                    <div className="h-3 sm:h-4 w-12 sm:w-20 bg-my-cyan rounded"></div>
                </div>
                <div className="h-6 sm:h-8 w-16 sm:w-24 bg-my-purple rounded-full"></div>
            </div>
        </div>
    );
}
