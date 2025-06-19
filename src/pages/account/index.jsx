import { useState, useContext } from "react";
import SessionContext from "../../context/SessionContext";
import AccountForm from "../../components/AccountForm";
import FavoritesSection from "../../components/FavoritesSection";

export default function AccountPage() {
    const { session, profile } = useContext(SessionContext);
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-white mb-6">
                Ciao {profile?.first_name || session?.user.user_metadata.first_name} 👋
            </h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300
          ${activeTab === "profile"
                            ? "bg-my-cyan/40 text-white border border-my-cyan/70"
                            : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"}`}
                >
                    Profilo
                </button>
                <button
                    onClick={() => setActiveTab("favorites")}
                    className={`px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300
          ${activeTab === "favorites"
                            ? "bg-my-purple/40 text-white border border-my-purple/70"
                            : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"}`}
                >
                    Preferiti
                </button>
            </div>

            <div className="rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 transition-all duration-300">
                {activeTab === "profile" && <AccountForm />}
                {activeTab === "favorites" && <FavoritesSection />}
            </div>
        </div>
    );
}