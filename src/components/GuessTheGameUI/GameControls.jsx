import { Button } from '@heroui/react';

export default function GameControls({ reduceBlur, blurLevel, result, resetGame }) {
    return (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <Button
                onClick={reduceBlur}
                className="bg-my-cyan/70 hover:bg-my-cyan text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm transition-colors duration-300 w-full sm:w-auto"
                disabled={blurLevel === 0 || result !== null}
            >
                Reduce Blur
            </Button>
            <p className="text-white/70 text-xs order-3 sm:order-2 text-center sm:text-left">
                Reducing blur makes the game easier
            </p>
            <Button
                onClick={resetGame}
                className="bg-red-600/70 hover:bg-red-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm transition-colors duration-300 w-full sm:w-auto order-2 sm:order-3"
            >
                Restart
            </Button>
        </div>
    );
}