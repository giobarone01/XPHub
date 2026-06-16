const colors = {
    exceptional: "bg-my-green",
    recommended: "bg-my-cyan",
    meh: "bg-yellow-400",
    skip: "bg-red-400",
};

export default function RatingsBreakdown({ ratings }) {
    if (!ratings?.length) return null;
    const total = ratings.reduce((sum, r) => sum + r.count, 0) || 1;

    return (
        <div className="space-y-3">
            {ratings.map((r) => {
                const percent = r.percent ?? (r.count / total) * 100;
                return (
                    <div key={r.id}>
                        <div className="mb-1 flex justify-between text-xs text-gray-300">
                            <span className="capitalize">{r.title}</span>
                            <span className="text-gray-400">{r.count}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                                className={`h-full rounded-full ${colors[r.title] || "bg-my-purple"}`}
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
