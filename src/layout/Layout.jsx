import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar"

export default function Layout() {
    return (
        <div className="style-layout-system bg-my-black text-white">

            <Header />

            <div className="style-sidebar-filter">
                <Sidebar />
            </div>

            <div className="style-main-content">
                <Outlet />
            </div>

            <Footer />

        </div>
    )
}