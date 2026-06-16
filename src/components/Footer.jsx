import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const columns = [
    {
        title: "Explore",
        links: [
            { to: "/", label: "Home" },
            { to: "/filter", label: "All games" },
            { to: "/upcoming", label: "Upcoming" },
        ],
    },
    {
        title: "Play",
        links: [
            { to: "/therapist", label: "Game Therapist" },
            { to: "/minigames", label: "Minigames" },
            { to: "/developers", label: "Developers" },
        ],
    },
    {
        title: "Company",
        links: [
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/privacy", label: "Privacy" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative mt-12 border-t border-white/10 bg-my-black/60 text-white backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-my-cyan/60 to-transparent" />

            <div className="container mx-auto px-4 py-10 sm:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="XPHub Logo" className="h-8 w-auto" />
                            <span className="text-xl font-bold">XPHub</span>
                        </Link>
                        <p className="mt-3 max-w-xs text-sm text-gray-400">
                            Your hub to discover, track and play your next favorite game.
                        </p>
                    </div>

                    {/* Nav columns */}
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{col.title}</h3>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="text-sm text-gray-300 transition-colors hover:text-my-cyan">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-gray-400 sm:flex-row">
                    <span>© {new Date().getFullYear()} XPHub. All rights reserved.</span>
                    <span>
                        Game data powered by{" "}
                        <a href="https://rawg.io" target="_blank" rel="noopener noreferrer" className="text-gray-300 transition-colors hover:text-my-cyan">
                            RAWG
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
