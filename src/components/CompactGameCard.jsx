import { Link } from 'react-router-dom';
import { Card } from '@heroui/react';
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CompactGameCard({ game, height = '120px', showTitle = true }) {
    return (
        <Link to={`/games/${game.slug}/${game.id}`}>
            <Card className={`relative w-full overflow-hidden hover:scale-105 transition-transform duration-300 group`} style={{ height }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <LazyLoadGameImage
                        image={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {showTitle && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                        <h4 className="text-white font-semibold text-sm md:text-md drop-shadow line-clamp-2 group-hover:text-my-cyan transition-colors">
                            {game.name}
                        </h4>
                    </div>
                )}
            </Card>
        </Link>
    );
}