import { useState, useContext } from "react";
import SessionContext from "../../context/SessionContext";
import AccountForm from "../../components/AccountForm";
import FavoritesSection from "../../components/FavoritesSection";
import UserStats from "../../components/UserStats";
import AccountSettings from "../../components/AccountSettings";
import { FaUser, FaHeart, FaChartBar, FaCog } from "react-icons/fa";

export default function AccountPage() {
    const { session, profile } = useContext(SessionContext);
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="max-w-6xl mx-auto py-6 px-4">
            {/* Tabs navigation - fixed at top on mobile, sidebar on desktop */}
            <div className="md:flex md:gap-12">
                <div className="relative md:w-48 mb-8 md:mb-0 md:sticky md:top-20 md:self-start md:h-fit">
                    {/* Container delle tab con layout a griglia su mobile e altezza fissa */}
                    <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-2 md:overflow-visible h-[100px] md:h-auto">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`p-2 md:p-3 md:pl-[10px] transition-colors duration-200 flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-3 relative cursor-pointer group rounded-lg md:h-14 md:w-full text-xs sm:text-sm
                            ${activeTab === "profile"
                                ? "text-my-cyan font-medium bg-white/5 border-b-2 md:border-b-0 md:border-l-4 md:border-my-cyan"
                                : "text-gray-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent md:border-b-0 md:border-l-4 md:border-transparent"}`}
                        >
                            <FaUser className="h-4 w-4 mb-1 md:h-5 md:w-5 md:mb-0" />
                            <span className="font-medium text-xs md:text-base">Profile</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("favorites")}
                            className={`p-2 md:p-3 md:pl-[10px] transition-colors duration-200 flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-3 relative cursor-pointer group rounded-lg md:h-14 md:w-full text-xs sm:text-sm
                            ${activeTab === "favorites"
                                ? "text-my-cyan font-medium bg-white/5 border-b-2 md:border-b-0 md:border-l-4 md:border-my-purple"
                                : "text-gray-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent md:border-b-0 md:border-l-4 md:border-transparent"}`}
                        >
                            <FaHeart className="h-4 w-4 mb-1 md:h-5 md:w-5 md:mb-0" />
                            <span className="font-medium text-xs md:text-base">Favorites</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("stats")}
                            className={`p-2 md:p-3 md:pl-[10px] transition-colors duration-200 flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-3 relative cursor-pointer group rounded-lg md:h-14 md:w-full text-xs sm:text-sm
                            ${activeTab === "stats"
                                ? "text-my-cyan font-medium bg-white/5 border-b-2 md:border-b-0 md:border-l-4 md:border-my-cyan"
                                : "text-gray-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent md:border-b-0 md:border-l-4 md:border-transparent"}`}
                        >
                            <FaChartBar className="h-4 w-4 mb-1 md:h-5 md:w-5 md:mb-0" />
                            <span className="font-medium text-xs md:text-base">Statistics</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`p-2 md:p-3 md:pl-[10px] transition-colors duration-200 flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-3 relative cursor-pointer group rounded-lg md:h-14 md:w-full text-xs sm:text-sm
                            ${activeTab === "settings"
                                ? "text-my-cyan font-medium bg-white/5 border-b-2 md:border-b-0 md:border-l-4 md:border-my-cyan"
                                : "text-gray-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent md:border-b-0 md:border-l-4 md:border-transparent"}`}
                        >
                            <FaCog className="h-4 w-4 mb-1 md:h-5 md:w-5 md:mb-0" />
                            <span className="font-medium text-xs md:text-base">Settings</span>
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1 md:pt-2">
                    {activeTab === "profile" && <AccountForm />}
                    {activeTab === "favorites" && <FavoritesSection />}
                    {activeTab === "stats" && <UserStats />}
                    {activeTab === "settings" && <AccountSettings />}
                </div>
            </div>
        </div>
    );
}