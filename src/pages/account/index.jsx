import { useState, useContext } from "react";
import SessionContext from "../../context/SessionContext";
import AccountForm from "../../components/AccountForm";
import FavoritesSection from "../../components/FavoritesSection";

export default function AccountPage() {
    const { session } = useContext(SessionContext);
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="container">
            <h1>Ciao {session?.user.user_metadata.first_name} 👋</h1>

            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <button onClick={() => setActiveTab("profile")} style={{ fontWeight: activeTab === "profile" ? "bold" : "normal" }}>
                    Profilo
                </button>
                <button onClick={() => setActiveTab("favorites")} style={{ fontWeight: activeTab === "favorites" ? "bold" : "normal" }}>
                    Favoriti
                </button>
            </div>

            {activeTab === "profile" && <AccountForm />}
            {activeTab === "favorites" && <FavoritesSection />}
        </div>
    );
}
