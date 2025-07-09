import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { Card } from '@heroui/react';
import Grid from '../../components/Grid';

const MINIGAMES = [
    {
        id: 'guess',
        title: 'Guess the Game',
        description: 'Test your video game knowledge! Guess the game title from the blurred image.',
        path: '/minigames/guess',
        color: 'bg-my-purple'
    },
];

export default function MinigamesPage() {
    return (
        <div className="container mx-auto px-4 py-6">
            <PageTitle subtitle={'Have fun with our collection of video game themed mini games!'}>
                <span className="gradient-text">Minigames</span>
            </PageTitle>

            <div className="mx-auto">
                <Grid columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {MINIGAMES.map((game) => (
                        <MiniGameCard key={game.id} game={game} />
                    ))}
                </Grid>
            </div>
        </div>
    );
}

function MiniGameCard({ game }) {
    return (
        <Link to={game.path} className="block h-full transition-transform duration-300 hover:scale-[1.02]">
            <Card className={`p-4 sm:p-6 h-full ${game.color} rounded-lg border border-white/10 transition-all duration-300 hover:brightness-110 shadow-md hover:shadow-lg`}>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{game.title}</h2>
                <p className="text-sm sm:text-base text-white/80">{game.description}</p>
            </Card>
        </Link>
    );
}