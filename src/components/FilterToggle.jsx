import { motion } from "framer-motion";

export default function FilterToggle({ showFilters, setShowFilters }) {
    return (
        <div className="md:hidden mb-4">
            <button
                onClick={() => setShowFilters(prev => !prev)}
                className="w-full bg-my-purple hover:bg-my-purple/80 text-white rounded-md p-2 flex justify-between items-center transition-colors duration-300"
            >
                <span className="text-sm font-medium">{showFilters ? 'Nascondi filtri' : 'Mostra filtri'}</span>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ rotate: showFilters ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
            </button>
        </div>
    );
}