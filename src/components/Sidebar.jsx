import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaHome, FaThLarge, FaRegClock, FaBrain, FaDice, FaCode, FaLayerGroup, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { getRawgUrl } from "../config/api.js";

const navItems = [
    { to: "/", label: "Home", Icon: FaHome, end: true },
    { to: "/filter", label: "All games", Icon: FaThLarge },
    { to: "/upcoming", label: "Upcoming Games", Icon: FaRegClock },
    { to: "/therapist", label: "Game Therapist", Icon: FaBrain },
    { to: "/minigames", label: "Minigames", Icon: FaDice },
    { to: "/developers", label: "Developers", Icon: FaCode },
];

const itemBase = "relative flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors";
const itemActive = "bg-gradient-to-r from-my-cyan/20 to-my-purple/20 text-white";
const itemIdle = "text-gray-300 hover:bg-white/5 hover:text-white";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef();
    const [genres, setGenres] = useState([]);
    const [genresOpen, setGenresOpen] = useState(false);

    useEffect(() => {
        fetch(getRawgUrl("genres"))
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error("genres"))))
            .then((d) => setGenres(d.results || []))
            .catch(() => {});
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, toggleSidebar]);

    const closeMobile = () => isOpen && toggleSidebar();

    return (
        <>
            {/* MOBILE: overlay + drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={toggleSidebar}
            />
            <aside
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-50 h-full w-64 space-y-1 overflow-y-auto bg-my-black/95 px-4 pt-20 pb-8 backdrop-blur-md transform transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <NavLink end to="/" onClick={closeMobile} className={({ isActive }) => `${itemBase} ${isActive ? itemActive : itemIdle}`}>
                    <FaHome className="shrink-0 text-xl" />
                    <span className="font-medium">Home</span>
                </NavLink>

                {/* Genres accordion */}
                <button
                    onClick={() => setGenresOpen((v) => !v)}
                    className={`${itemBase} ${itemIdle} w-full`}
                    aria-expanded={genresOpen}
                >
                    <FaLayerGroup className="shrink-0 text-xl" />
                    <span className="font-medium">Genres</span>
                    <FaChevronDown className={`ml-auto text-sm transition-transform duration-200 ${genresOpen ? "rotate-180" : ""}`} />
                </button>
                {genresOpen && (
                    <div className="mb-1 ml-4 max-h-60 space-y-0.5 overflow-y-auto border-l border-white/10 pl-3">
                        {genres.map((g) => (
                            <Link
                                key={g.id}
                                to={`/games/${g.slug}`}
                                onClick={closeMobile}
                                className="block rounded-md px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-my-purple/20 hover:text-white"
                            >
                                {g.name}
                            </Link>
                        ))}
                    </div>
                )}

                {navItems.slice(1).map(({ to, label, Icon }) => (
                    <NavLink key={to} to={to} onClick={closeMobile} className={({ isActive }) => `${itemBase} ${isActive ? itemActive : itemIdle}`}>
                        <Icon className="shrink-0 text-xl" />
                        <span className="font-medium">{label}</span>
                    </NavLink>
                ))}
            </aside>

            {/* DESKTOP: collapsible icon rail (sticky, expands on hover) */}
            <aside className="hidden w-16 shrink-0 lg:block">
                <nav className="group sticky top-20 z-30 flex w-16 flex-col gap-1 rounded-r-2xl px-2 py-3 transition-[width] duration-300 ease-out hover:w-60 hover:bg-my-black/95 hover:shadow-2xl hover:ring-1 hover:ring-white/10 hover:backdrop-blur-md">
                    {navItems.map(({ to, label, Icon, end }) => (
                        <NavLink key={to} end={end} to={to} className="block">
                            {({ isActive }) => (
                                <span className={`${itemBase} ${isActive ? itemActive : itemIdle}`}>
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-my-cyan to-my-purple" />
                                    )}
                                    <Icon className="min-w-[20px] shrink-0 text-xl" />
                                    <span className="hidden whitespace-nowrap font-medium group-hover:inline">{label}</span>
                                </span>
                            )}
                        </NavLink>
                    ))}

                    {/* Genres with hover flyout */}
                    <div className="group/gen relative">
                        <span className={`${itemBase} ${itemIdle} cursor-pointer`}>
                            <FaLayerGroup className="min-w-[20px] shrink-0 text-xl" />
                            <span className="hidden whitespace-nowrap font-medium group-hover:inline">Genres</span>
                            <FaChevronRight className="ml-auto hidden text-xs text-gray-500 group-hover:block" />
                        </span>
                        <div className="invisible absolute left-full top-0 z-50 ml-2 max-h-[70vh] w-56 translate-x-1 overflow-y-auto rounded-xl bg-my-black/95 p-2 opacity-0 shadow-2xl ring-1 ring-white/10 backdrop-blur-md transition-all duration-200 group-hover/gen:visible group-hover/gen:translate-x-0 group-hover/gen:opacity-100">
                            <p className="px-3 py-1 text-xs uppercase tracking-wider text-gray-500">Genres</p>
                            {genres.map((g) => (
                                <Link
                                    key={g.id}
                                    to={`/games/${g.slug}`}
                                    className="block rounded-md px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-my-purple/20 hover:text-white"
                                >
                                    {g.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
