import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import { FaChartBar, FaHeart, FaComment, FaHistory, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loading"
                    className="space-y-6 text-white text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <FaChartBar className="text-my-cyan text-xl" />
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Your Statistics</h3>
                    </div>
                    <div className="flex justify-center py-8">
                        <svg className="animate-spin h-8 w-8 text-my-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    className="space-y-6 text-white text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="flex items-center gap-3 mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaChartBar className="text-my-cyan text-xl" />
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Your Statistics</h3>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div
                            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-cyan/30"
                            variants={item}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaHeart className="text-red-400" />
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                                {stats.totalFavorites}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mt-2">Games added to favorites</p>
                        </motion.div>

                        <motion.div
                            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-purple/30"
                            variants={item}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaComment className="text-my-cyan" />
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-white">
                                {stats.totalComments}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mt-2">Comments left</p>
                        </motion.div>

                        <motion.div
                            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-cyan/30"
                            variants={item}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaHistory className="text-yellow-400" />
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Last login: <span className="text-my-cyan">
                                    {new Date(stats.lastActive).toLocaleDateString()}
                                </span>
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mt-2">Continue exploring new games!</p>
                        </motion.div>

                        <motion.div
                            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-purple/30"
                            variants={item}
                            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaCalendarAlt className="h-5 w-5 text-green-400" />
                                <h4 className="text-sm sm:text-base font-medium">Account</h4>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Account age: <span className="text-my-cyan">
                                    {stats.accountAge} days
                                </span>
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mt-2">Thank you for being part of our community!</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}