import MobileOptimizedMotion from "../MobileOptimizedMotion";
import TouchFeedback from "../TouchFeedback";
import { FaGamepad, FaArrowLeft } from "react-icons/fa";

export default function PlatformSelection({ platforms, onSelectPlatform, onBack, hasAnswers }) {
    return (
        <MobileOptimizedMotion
            className="rounded-xl p-6 backdrop-blur-sm bg-black/40 border border-white/10 hover:border-my-cyan/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white text-center">
                Which platform do you want for your gaming therapy?
            </h2>

            <p className="text-gray-300 mb-3 sm:mb-4 text-center text-xs sm:text-sm">
                Select your platform to receive personalized recommendations
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 max-h-[200px] sm:max-h-[250px] overflow-y-auto p-1 sm:p-2 mb-3 sm:mb-4">
                <TouchFeedback
                    className="bg-my-purple hover:bg-my-purple/80 text-white p-1.5 sm:p-2 rounded-lg border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer text-center"
                    activeClassName="bg-my-purple/60 border-white/70"
                    onClick={() => onSelectPlatform(null)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="flex items-center justify-center gap-1 sm:gap-2 py-0.5 sm:py-1">
                        <FaGamepad className="text-xs sm:text-sm" />
                        <span className="text-xs sm:text-sm font-semibold">All</span>
                    </div>
                </TouchFeedback>

                {platforms.map((platform) => (
                    <TouchFeedback
                        key={platform.id}
                        className="bg-white/5 hover:bg-white/10 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-transparent hover:border-my-cyan/50 transition-all duration-300 cursor-pointer text-center"
                        activeClassName="bg-white/20 border-my-cyan/70"
                        onClick={() => onSelectPlatform(platform.id)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="flex items-center justify-center gap-1 sm:gap-2 py-0.5 sm:py-1">
                            <span className="text-xs sm:text-sm font-semibold">{platform.name}</span>
                        </div>
                    </TouchFeedback>
                ))}
            </div>

            <div className="text-center">
                <TouchFeedback
                    className="bg-white/5 hover:bg-white/10 text-white m-2 sm:m-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-transparent hover:border-my-purple/50 transition-all duration-300 cursor-pointer inline-flex items-center gap-1 sm:gap-2"
                    activeClassName="bg-white/20 border-my-purple/70"
                    onClick={onBack}
                    role="button"
                    tabIndex={0}
                >
                    <FaArrowLeft className="text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm font-semibold">Back</span>
                </TouchFeedback>
            </div>
        </MobileOptimizedMotion>
    );
}