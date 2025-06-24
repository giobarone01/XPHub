import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import { FaGamepad, FaHeart, FaComment, FaStar } from "react-icons/fa";

export default function UserStats() {
    const { session } = useContext(SessionContext);
    const [stats, setStats] = useState({
        totalFavorites: 0,
        totalComments: 0,
        lastActive: null,
        topGenres: [],
        accountAge: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            if (!session?.user) return;

            setLoading(true);

            const { data: favorites, error: favError } = await supabase
                .from("favorites")
                .select("*", { count: "exact" })
                .eq("user_id", session.user.id);

            const { data: comments, error: commentsError } = await supabase
                .from("messages")
                .select("*", { count: "exact" })
                .eq("profile_id", session.user.id);

            const createdAt = new Date(session.user.created_at);
            const now = new Date();
            const diffTime = Math.abs(now - createdAt);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            setStats({
                totalFavorites: favorites?.length || 0,
                totalComments: comments?.length || 0,
                lastActive: session.user.last_sign_in_at,
                accountAge: diffDays
            });

            setLoading(false);
        }

        fetchStats();
    }, [session]);

    if (loading) {
        return (
            <div className="space-y-6 text-white text-sm sm:text-base">
                <div className="flex items-center gap-3 mb-6">
                    <FaGamepad className="text-my-cyan text-xl" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Your Statistics</h3>
                </div>
                <div className="flex justify-center py-8">
                    <svg className="animate-spin h-8 w-8 text-my-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-white text-sm sm:text-base">
            <div className="flex items-center gap-3 mb-6">
                <FaGamepad className="text-my-cyan text-xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Your Statistics</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-cyan/30">
                    <div className="flex items-center gap-3 mb-4">
                        <FaHeart className="text-red-400" />
                        <h4 className="text-sm sm:text-base font-medium">Favorites</h4>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-my-cyan">{stats.totalFavorites}</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Games added to favorites</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-purple/30">
                    <div className="flex items-center gap-3 mb-4">
                        <FaComment className="text-my-purple" />
                        <h4 className="text-sm sm:text-base font-medium">Comments</h4>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-my-purple">{stats.totalComments}</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Comments left</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-cyan/30">
                    <div className="flex items-center gap-3 mb-4">
                        <FaStar className="text-yellow-400" />
                        <h4 className="text-sm sm:text-base font-medium">Activity</h4>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm">
                        Last login: <span className="text-my-cyan">{new Date(stats.lastActive).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Continue exploring new games!</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-purple/30">
                    <div className="flex items-center gap-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h4 className="text-sm sm:text-base font-medium">Account</h4>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm">
                        Account age: <span className="text-my-purple">{stats.accountAge} days</span>
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Thank you for being part of our community!</p>
                </div>
            </div>
        </div>
    );
}