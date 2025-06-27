import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function QuestionScreen({ question, options, currentQuestionIndex, totalQuestions, onAnswer, onBack }) {
    return (
        <motion.div
            key={currentQuestionIndex}
            className="rounded-xl p-6 backdrop-blur-sm bg-black/40 border border-white/10 shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-semibold mb-5 text-white text-center">
                {question}
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {options.map((option, index) => (
                    <motion.div
                        key={option.id}
                        className="w-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold p-2 sm:p-3 rounded-lg text-left border border-white/10 hover:border-my-cyan/50 transition-all duration-300 cursor-pointer flex items-center"
                        onClick={() => onAnswer(option.id)}
                        role="button"
                        tabIndex={0}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                        <span className="block w-full">{option.text}</span>
                    </motion.div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                    {Array.from({ length: totalQuestions }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 w-6 rounded-full ${index <= currentQuestionIndex ? 'bg-my-cyan' : 'bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-end mt-3">
                <div
                    className="bg-white/5 hover:bg-white/10 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-transparent hover:border-my-purple/50 transition-all duration-300 flex items-center gap-1 sm:gap-2 cursor-pointer w-auto"
                    onClick={onBack}
                    role="button"
                    tabIndex={0}
                >
                    <FaArrowLeft className="text-xs sm:text-sm" /> <span className="text-xs sm:text-sm font-semibold">Indietro</span>
                </div>
            </div>
        </motion.div>
    );
}