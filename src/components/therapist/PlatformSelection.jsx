import { motion } from "framer-motion";
import { FaGamepad, FaArrowLeft } from "react-icons/fa";

export default function PlatformSelection({ platforms, onSelectPlatform, onBack, hasAnswers }) {
    return (
        <motion.div
            className="rounded-xl p-6 backdrop-blur-sm bg-black/40 border border-white/10 hover:border-my-cyan/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white text-center">
                Su quale piattaforma vuoi la terapia videoludica?
            </h2>

            <p className="text-gray-300 mb-3 sm:mb-4 text-center text-xs sm:text-sm">
                Seleziona la tua piattaforma per ricevere consigli personalizzati
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 max-h-[200px] sm:max-h-[250px] overflow-y-auto p-1 sm:p-2 mb-3 sm:mb-4">
                <div
                    className="bg-my-purple hover:bg-my-purple/80 text-white p-1.5 sm:p-2 rounded-lg border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer text-center"
                    onClick={() => onSelectPlatform(null)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="flex items-center justify-center gap-1 sm:gap-2 py-0.5 sm:py-1">
                        <FaGamepad className="text-xs sm:text-sm" />
                        <span className="text-xs sm:text-sm font-semibold">Tutte</span>
                    </div>
                </div>

                {platforms.map((platform) => (
                    <div
                        key={platform.id}
                        className="bg-white/5 hover:bg-white/10 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-transparent hover:border-my-cyan/50 transition-all duration-300 cursor-pointer text-center"
                        onClick={() => onSelectPlatform(platform.id)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="flex items-center justify-center gap-1 sm:gap-2 py-0.5 sm:py-1">
                            <span className="text-xs sm:text-sm font-semibold">{platform.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <div
                    className="bg-white/5 hover:bg-white/10 text-white m-2 sm:m-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-transparent hover:border-my-purple/50 transition-all duration-300 cursor-pointer inline-flex items-center gap-1 sm:gap-2"
                    onClick={onBack}
                    role="button"
                    tabIndex={0}
                >
                    <FaArrowLeft className="text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm font-semibold">Indietro</span>
                </div>
            </div>
        </motion.div>
    );
}