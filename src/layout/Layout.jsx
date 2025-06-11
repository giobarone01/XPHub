import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout() {
    const location = useLocation();
    const hideSidebarPaths = ['/login', '/register', '/account'];
    const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-my-black text-white flex flex-col">
            <header className="top-0">
                <Header toggleSidebar={toggleSidebar} />
            </header>

            <div className="flex flex-1 w-full">
                {!shouldHideSidebar && (
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                )}

                <main className="flex-1 pt-4 pb-10 px-8 overflow-x-hidden">
                    <div className="w-full px-2 sm:px-4">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}