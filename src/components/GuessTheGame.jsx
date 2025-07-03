import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { FaSkull, FaTrophy } from 'react-icons/fa';
import LazyLoadGameImage from './LazyLoadGameImage';
import MobileOptimizedMotion from './MobileOptimizedMotion';
import FallbackCardImg from '../assets/fallbackcard.png';
import useGuessTheGame from '../hook/useGuessTheGame';
import GameImage from './GuessTheGameUI/GameImage';
import GameOptions from './GuessTheGameUI/GameOptions';
import GameControls from './GuessTheGameUI/GameControls';
import GameOver from './GuessTheGameUI/GameOver';
import GameWon from './GuessTheGameUI/GameWon';

export default function GuessTheGame({ games = [] }) {
  const {
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
  } = useGuessTheGame(games);

  if (loading) {
    return (
      <div className="text-center p-4 sm:p-6 bg-black/40 rounded-xl backdrop-blur-sm border border-white/10">
        <p className="text-white">Loading game...</p>
      </div>
    );
  }

  if (gameWon) {
    return <GameWon TARGET_SCORE={TARGET_SCORE} resetGame={resetGame} />;
  }

  if (gameOver) {
    return <GameOver score={score} highScore={highScore} resetGame={resetGame} />;
  }

  return (
    <div className="p-4 sm:p-6 bg-black/40 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300">
      <div className="flex flex-col sm:flex-row mb-4 gap-2 sm:gap-4 items-start sm:items-center w-full">
        <div className="flex gap-3 sm:gap-4 items-center">
          <p className="text-my-cyan text-xs sm:text-sm font-semibold">Score: {score}/100</p>
          <p className="text-yellow-500 text-xs sm:text-sm font-semibold">High-Score: {highScore}</p>
        </div>
      </div>

      {currentGame ? (
        <>
          <GameImage currentGame={currentGame} blurLevel={blurLevel} result={result} />
          <GameOptions 
            options={options} 
            handleOptionSelect={handleOptionSelect} 
            selectedOption={selectedOption} 
            currentGame={currentGame} 
            result={result} 
          />
          <GameControls 
            reduceBlur={reduceBlur} 
            blurLevel={blurLevel} 
            result={result} 
            resetGame={resetGame} 
          />
        </>
      ) : null}
    </div>
  );
}