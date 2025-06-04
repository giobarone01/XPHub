export default function SkeletonCardGame() {
    return (
        <div className="relative h-[350px] w-full animate-pulse bg-gray-900 rounded-xl overflow-hidden">
            <div className="absolute top-4 left-4 right-4 space-y-2 z-10">
                <div className="flex gap-2">
                    <div className="h-4 w-4 bg-my-purple rounded-full"></div>
                    <div className="h-4 w-4 bg-my-purple rounded-full"></div>
                    <div className="h-4 w-4 bg-my-purple rounded-full"></div>
                </div>
                <div className="h-5 w-3/4 bg-my-purple rounded"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between items-center rounded-b-xl">
                <div className="space-y-2">
                    <div className="h-4 w-40 bg-my-cyan rounded"></div>
                    <div className="h-4 w-20 bg-my-cyan rounded"></div>
                </div>
                <div className="h-8 w-24 bg-my-purple rounded-full"></div>
            </div>
        </div>
    );
}
