import { Button } from '@heroui/react';
import { FaTrophy } from 'react-icons/fa';

export default function GameWon({ TARGET_SCORE, resetGame }) {
    return (
        <div className="p-4 sm:p-6 bg-black/40 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300">
            <div className="text-center py-4 sm:py-8">
                <h3 className="text-xl sm:text-2xl font-bold text-green-500 mb-2">Congratulations!</h3>

                <div className="flex justify-center mt-3 sm:mt-4 mb-6 sm:mb-8">
                    <FaTrophy className="text-yellow-500 text-4xl sm:text-6xl" />
                </div>

                <p className="text-lg sm:text-xl text-white mb-2">You've reached {TARGET_SCORE} points!</p>
                <p className="text-base sm:text-lg text-white mb-4 sm:mb-6">You're a true gaming expert!</p>
                <Button
                    onClick={resetGame}
                    className="bg-my-purple hover:bg-my-purple/80 text-white px-4 sm:px-6 py-2 rounded-xl text-base sm:text-lg transition-colors duration-300 mx-auto"
                >
                    Play Again
                </Button>
            </div>
        </div>
    );
}