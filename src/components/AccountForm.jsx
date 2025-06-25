import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Avatar from "./Avatar";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export default function AccountForm() {
    const { session, profile, setProfile } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");

    useEffect(() => {
        if (profile) {
            setUsername(profile.username ?? "");
            setFirstName(profile.first_name ?? "");
            setLastName(profile.last_name ?? "");
            setAvatarUrl(profile.avatar_url ?? "");
            setLoading(false);
        }
    }, [profile]);

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault();
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl === null ? null : (avatarUrl ?? avatar_url),
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            if (error.message.includes("username") && error.message.includes("unique")) {
                toast.error("Username already used");
            } else {
                toast.error("Error updating profile: " + error.message);
            }
            setLoading(false);
            return;
        }

        toast.success("Profile updated successfully!");

        setUsername(updates.username);
        setFirstName(updates.first_name);
        setLastName(updates.last_name);
        setAvatarUrl(updates.avatar_url);

        if (setProfile) {
            setProfile(updates);
        }

        setLoading(false);
    };

    const hasChanges =
        username !== (profile?.username ?? "") ||
        first_name !== (profile?.first_name ?? "") ||
        last_name !== (profile?.last_name ?? "") ||
        avatar_url !== (profile?.avatar_url ?? "");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={updateProfile} className="space-y-6 text-white text-sm sm:text-base">
                <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <Avatar
                        url={avatar_url}
                        size={150}
                        onUpload={(event, url) => updateProfile(event, url)}
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <label className="block mb-1 text-gray-300 text-xs sm:text-sm font-medium">Email</label>
                        <input
                            type="text"
                            value={session.user.email}
                            disabled
                            className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl p-3 cursor-not-allowed text-gray-400 backdrop-blur-sm"
                        />
                    </motion.div>

                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <label className="block mb-1 text-gray-300 text-xs sm:text-sm font-medium">Username</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-my-cyan/50 backdrop-blur-sm hover:border-my-cyan/30"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <label className="block mb-1 text-gray-300 text-xs sm:text-sm font-medium">First name</label>
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-my-cyan/50 backdrop-blur-sm hover:border-my-cyan/30"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <label className="block mb-1 text-gray-300 text-xs sm:text-sm font-medium">Last name</label>
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-my-cyan/50 backdrop-blur-sm hover:border-my-cyan/30"
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    whileHover={{ scale: hasChanges && !loading ? 1.02 : 1 }}
                >
                    <button
                        type="submit"
                        disabled={loading || !hasChanges}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-my-cyan/60 to-my-purple/60 hover:from-my-cyan/80 hover:to-my-purple/80 text-white font-medium text-sm sm:text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <FaSpinner className="h-5 w-5 text-white animate-spin" />
                                Updating...
                            </span>
                        ) : "Update"}
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
}