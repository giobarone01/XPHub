import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout() {
    const location = useLocation();
    const hideSidebarPaths = ['/login', '/register', '/account'];
    const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

    return (
        <div className="min-h-screen bg-my-black text-white flex flex-col">
            <header className="sticky top-0 z-30">
                <Header />
            </header>

            <div className="flex flex-1 w-full">
                {!shouldHideSidebar && <Sidebar />}

                <main className="flex-1 pt-4 pb-20 overflow-x-hidden">
                    <div className="w-full px-2 sm:px-4">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}