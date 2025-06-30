import { motion } from "framer-motion";
import { FaUserAlt, FaSmile } from "react-icons/fa";

export default function PathSelection({ onSelectPath }) {
    return (
        <motion.div
            className="rounded-xl p-6 backdrop-blur-sm bg-black/40 border border-white/10 shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-semibold mb-3 text-white text-center">
                Choose your gaming therapy
            </h2>

            <div className="flex flex-col space-y-2 sm:space-y-3 max-w-md mx-auto">
                <div
                    onClick={() => onSelectPath('character')}
                    className="flex items-center p-2 sm:p-3 rounded-lg border border-my-purple/90 hover:border-my-purple/80 bg-my-purple/40 hover:bg-my-purple/20 cursor-pointer transition-all duration-200 w-full sm:w-auto"
                >
                    <div className="bg-my-purple/40 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                        <FaUserAlt className="text-sm sm:text-base"/>
                    </div>
                    <div>
                        <h3 className="font-medium text-white text-sm sm:text-base">Character Analysis</h3>
                        <p className="text-xs text-gray-300">Discover games that match your personality</p>
                    </div>
                </div>

                <div
                    onClick={() => onSelectPath('mood')}
                    className="flex items-center p-2 sm:p-3 rounded-lg border border-my-cyan/30 hover:border-my-cyan/80 bg-my-cyan/10 hover:bg-my-cyan/20 cursor-pointer transition-all duration-200 w-full sm:w-auto"
                >
                    <div className="bg-my-cyan/20 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                        <FaSmile className="text-sm sm:text-base" />
                    </div>
                    <div>
                        <h3 className="font-medium text-white text-sm sm:text-base">Mood Therapy</h3>
                        <p className="text-xs text-gray-300">Find games that suit your current mood</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
                <p>Select the option that best fits your needs</p>
            </div>
        </motion.div>
    );
}