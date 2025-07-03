import LazyLoadGameImage from '../LazyLoadGameImage';
import FallbackCardImg from '../../assets/fallbackcard.png';

export default function GameImage({ currentGame, blurLevel, result }) {
    return (
        <div className="mb-4 sm:mb-6 relative overflow-hidden rounded-xl aspect-video">
            <div style={{ filter: `blur(${blurLevel}px)` }} className="w-full h-full transition-all duration-500">
                <LazyLoadGameImage
                    image={currentGame.background_image || FallbackCardImg}
                    alt="Guess the game"
                />
            </div>

            {result && (
                <div className={`absolute inset-0 flex items-center justify-center ${result === 'correct' ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                    <p className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
                        {result === 'correct' ? 'Correct!' : 'Wrong!'}
                    </p>
                </div>
            )}
        </div>
    );
}