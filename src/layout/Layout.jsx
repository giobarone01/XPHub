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
                <Header toggleSidebar={toggleSidebar} shouldHideSidebar={shouldHideSidebar} />
            </header>

            <div className="flex flex-1 w-full">
                {!shouldHideSidebar && (
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                )}

                <main className="flex-1 pt-1 sm:pt-2 md:pt-3 lg:pt-4 pb-10 px-2 sm:px-6 md:px-8 overflow-x-hidden">
                    <div className="w-full px-4 sm:px-2 md:px-4">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}