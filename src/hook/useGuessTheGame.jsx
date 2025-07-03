import { useState, useEffect } from 'react';

export default function useGuessTheGame(games = []) {
    const [currentGame, setCurrentGame] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);
    const [blurLevel, setBlurLevel] = useState(10);
    const [loading, setLoading] = useState(true);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [usedGames, setUsedGames] = useState([]);
    const [gameWon, setGameWon] = useState(false);
    const TARGET_SCORE = 100;

    useEffect(() => {
        if (games.length >= 10) {
            setLoading(false);
            nextRound();
        }
    }, [games]);

    // Load high score from localStorage
    useEffect(() => {
        const savedHighScore = localStorage.getItem('guessGameHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    // Save high score to localStorage when it changes
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('guessGameHighScore', score.toString());
        }

        // Check if player has reached the target score
        if (score >= TARGET_SCORE) {
            setTimeout(() => {
                setGameWon(true);
            }, 1500);
        }
    }, [score, highScore]);

    const nextRound = () => {
        // Filter out games that have already been used
        const availableGames = games.filter(game => !usedGames.includes(game.id));

        // If we've used all games, reset the used games list
        if (availableGames.length === 0) {
            setUsedGames([]);
            nextRound();
            return;
        }

        // Select a random game from available games
        const randomIndex = Math.floor(Math.random() * availableGames.length);
        const game = availableGames[randomIndex];
        setCurrentGame(game);

        // Add this game to the used games list
        setUsedGames(prev => [...prev, game.id]);

        // Create options (1 correct + 3 wrong)
        const wrongOptions = [...games]
            .filter(g => g.id !== game.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(g => g.name);

        const allOptions = [game.name, ...wrongOptions].sort(() => 0.5 - Math.random());
        setOptions(allOptions);

        // Reset state
        setSelectedOption(null);
        setResult(null);
        setBlurLevel(10);
    };

    const handleOptionSelect = (option) => {
        if (result !== null) return;

        setSelectedOption(option);
        const isCorrect = option === currentGame.name;
        setResult(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            setTimeout(() => {
                setGameOver(true);
            }, 1500);
        }

        // Show the complete image
        setBlurLevel(0);

        // Move to next round after a short delay, only if the answer is correct
        if (isCorrect) {
            setTimeout(() => {
                nextRound();
            }, 2000);
        }
    };

    const resetGame = () => {
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setUsedGames([]);
        nextRound();
    };

    const reduceBlur = () => {
        setBlurLevel(prev => Math.max(prev - 2, 0));
    };

    return {
        currentGame,
        options,
        selectedOption,
        result,
        score,
        blurLevel,
        loading,
        highScore,
        gameOver,
        gameWon,
        TARGET_SCORE,
        handleOptionSelect,
        resetGame,
        reduceBlur
    };
}