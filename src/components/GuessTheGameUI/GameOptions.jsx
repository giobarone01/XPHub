import { Button } from '@heroui/react';
import MobileOptimizedMotion from '../MobileOptimizedMotion';

export default function GameOptions({ options, handleOptionSelect, selectedOption, currentGame, result }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {options.map((option, index) => (
                <MobileOptimizedMotion
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Button
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full py-2 sm:py-3 text-white text-left px-3 sm:px-4 rounded-xl transition-colors duration-300 ${selectedOption === option
                            ? option === currentGame.name
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-red-600 hover:bg-red-700'
                            : 'bg-my-purple hover:bg-my-purple/80'}`}
                        disabled={result !== null}
                    >
                        <span className="text-sm sm:text-base truncate block">{option}</span>
                    </Button>
                </MobileOptimizedMotion>
            ))}
        </div>
    );
}