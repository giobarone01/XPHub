import logo from '../assets/logo.png'

export default function Header() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-my-black">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-8" />
                <a href="/" className="font-bold text-xl text-white">XPHub</a>
            </div>


            {/* Center menu */}
            <div className="flex space-x-2 bg-black rounded-full px-4 py-2">
                <a href="#" className="text-white text-sm px-3 py-1 rounded-full bg-black focus:outline-none">
                    Overview
                </a>
                <a href="" className="text-white text-sm px-3 py-1 rounded-full bg-black focus:outline-none hover:bg-[#333]">
                    Services
                </a>
            </div>

            {/* Account dropdown */}
            <details className="relative z-50 group">
                <summary className="cursor-pointer bg-my-cyan text-black font-semibold text-sm px-5 py-2 rounded-full">
                    Account
                </summary>
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg text-sm text-right hidden group-open:block">
                    <li className="border-b hover:bg-gray-100">
                        <a href="#" className="block px-4 py-2">Profile</a>
                    </li>
                    <li className="border-b hover:bg-gray-100">
                        <a href="#" className="block px-4 py-2">Settings</a>
                    </li>
                    <li className="hover:bg-gray-100">
                        <a href="#" className="block px-4 py-2">Logout</a>
                    </li>
                </ul>
            </details>
        </nav>
    );
}
