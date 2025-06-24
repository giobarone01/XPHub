import { useState, useContext } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import { FaCog, FaLock, FaBell, FaSignOutAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { getFieldError, FormSchemaLogin } from "../lib/validationForm.js";
import { useNavigate } from "react-router-dom";

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
            toast.error("Le nuove password non corrispondono");
            return;
        }

        const passwordError = getFieldError(FormSchemaLogin, "password", passwordData.newPassword);
        if (passwordError) {
            toast.error("La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: passwordData.newPassword
        });

        if (error) {
            toast.error("Errore durante il cambio password: " + error.message);
        } else {
            toast.success("Password aggiornata con successo!");
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
            toast.error("Errore durante il logout: " + error.message);
        } else {
            navigate('/', { replace: true });
        }
    };

    return (
        <div className="space-y-6 text-white text-sm sm:text-base">
            <div className="flex items-center gap-3 mb-6">
                <FaCog className="text-my-cyan text-xl" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Account settings</h3>
            </div>

            <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-cyan/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaLock className="text-my-cyan" />
                            <h4 className="text-sm sm:text-base font-medium">Security</h4>
                        </div>
                        <button
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="text-xs sm:text-sm bg-my-cyan/20 hover:bg-my-cyan/30 text-my-cyan px-3 py-1 rounded-lg"
                        >
                            {showPasswordForm ? "Cancel" : "Change password"}
                        </button>
                    </div>

                    {showPasswordForm && (
                        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
                            <div>
                                <label className="block mb-1 text-gray-300 text-xs sm:text-sm">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                    required
                                    className="w-full bg-white/10 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-300 text-xs sm:text-sm">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                    required
                                    className="w-full bg-white/10 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 rounded-lg bg-my-cyan/60 hover:bg-my-cyan/80 text-white font-medium text-xs sm:text-sm disabled:opacity-50"
                            >
                                {loading ? "Aggiornamento..." : "Aggiorna Password"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-my-purple/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FaSignOutAlt className="text-red-400" />
                            <h4 className="text-sm sm:text-base font-medium">Logout</h4>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="text-xs sm:text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}