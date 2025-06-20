import React from 'react';

export default function RatingStars({ rating, showValue = true }) {
    return (
        <p className="text-tiny text-white/80 flex items-center gap-1">
            Rating:
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-600"}>
                    ★
                </span>
            ))}
            {showValue && <span className="ml-1 text-white/60">({rating?.toFixed(2) || "N/A"})</span>}
        </p>
    );
}