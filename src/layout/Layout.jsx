import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar"
import Searchbar from "../components/SearchBar";

export default function Layout() {
    return (
        <div className="style-layout-system bg-my-black text-white">

            <Header />

            <div className="style-searchbar-content">
                <Searchbar />
            </div>

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