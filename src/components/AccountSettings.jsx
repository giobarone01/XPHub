import { useState, useContext } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import { FaCog, FaLock, FaSignOutAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { getFieldError, FormSchemaLogin } from "../lib/validationForm.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountSettings() {
    const { session } = useContext(SessionContext);
    const [loading, setLoading] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        const passwordError = getFieldError(FormSchemaLogin, "password", passwordData.newPassword);
        if (passwordError) {
            toast.error("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: passwordData.newPassword
        });

        if (error) {
            toast.error("Error changing password: " + error.message);
        } else {
            toast.success("Password updated successfully!");
            setShowPasswordForm(false);
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }

        setLoading(false);
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Error during logout: " + error.message);
        } else {
            navigate('/', { replace: true });
        }
    };

    return (
        <motion.div
            className="space-y-6 text-white text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <FaCog className="text-my-cyan text-xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Account settings</h3>
            </motion.div>

            <div className="space-y-4">
                <motion.div
                    className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-cyan/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaLock className="text-my-cyan" />
                            <h4 className="text-sm sm:text-base font-medium">Security</h4>
                        </div>
                        <motion.button
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="text-xs sm:text-sm bg-my-cyan/20 hover:bg-my-cyan/30 text-my-cyan px-3 py-1 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showPasswordForm ? "Cancel" : "Change password"}
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {showPasswordForm && (
                            <motion.form
                                onSubmit={handlePasswordChange}
                                className="mt-4 space-y-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <label className="block mb-1 text-gray-300 text-xs sm:text-sm">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        required
                                        className="w-full bg-white/10 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <label className="block mb-1 text-gray-300 text-xs sm:text-sm">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                        required
                                        className="w-full bg-white/10 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                                    />
                                </motion.div>
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 rounded-lg bg-my-cyan/60 hover:bg-my-cyan/80 text-white font-medium text-xs sm:text-sm disabled:opacity-50"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    whileHover={{ scale: loading ? 1 : 1.05 }}
                                    whileTap={{ scale: loading ? 1 : 0.95 }}
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-purple/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaSignOutAlt className="text-red-400" />
                            <h4 className="text-sm sm:text-base font-medium">Logout</h4>
                        </div>
                        <motion.button
                            onClick={handleSignOut}
                            className="text-xs sm:text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Log out
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}