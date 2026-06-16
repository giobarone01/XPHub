export default function RatingStars({ rating, showValue = true, showLabel = true, className = "" }) {
    return (
        <p className={`flex items-center gap-1 text-white/80 ${className || "text-tiny"}`}>
            {showLabel && "Rating:"}
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-600"}>
                    ★
                </span>
            ))}
            {showValue && <span className="ml-1 text-white/60">({rating?.toFixed(2) || "N/A"})</span>}
        </p>
    );
}