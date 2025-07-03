import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import GuessTheGame from '../../components/GuessTheGame';
import useFetchSolution from '../../hook/useFetchSolution';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getRawgUrl } from '../../config/api.js';
import { FaArrowLeft } from 'react-icons/fa';

export default function GuessTheGamePage() {
  const { data, loading, error } = useFetchSolution(
    getRawgUrl('games', { page_size: 100 })
  );

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6">
      <div className="flex items-center mb-3 sm:mb-4">
        <Link to="/minigames" className="text-my-cyan hover:text-white mr-3 flex items-center text-sm sm:text-base">
          <FaArrowLeft className="mr-1" /> Back to minigames
        </Link>
      </div>

      <PageTitle subtitle={'Test your video game knowledge! Guess the game from the blurred image. Can you reach 100 points?'}>Guess the game</PageTitle>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-8 sm:py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center p-4 sm:p-6 bg-black/40 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-red-500 text-sm sm:text-base">An error occurred while loading the games.</p>
          </div>
        ) : (
          <GuessTheGame games={data?.results || []} />
        )}
      </div>
    </div>
  );
}