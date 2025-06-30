import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function DeveloperCard({ developer }) {
    return (
        <Card className="relative h-[250px] sm:h-[280px] md:h-[300px] w-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="absolute z-10 top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4">
                <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl drop-shadow-lg line-clamp-2">{developer.name}</h3>
            </CardHeader>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <img
                    src={developer.image_background || "/default-dev-bg.jpg"}
                    alt={developer.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <CardFooter className="absolute bottom-0 z-20 flex items-center justify-between p-2 sm:p-3 md:p-4 bg-black/60 rounded-t-lg w-full">
                <p className="text-xs sm:text-sm text-white/80">{developer.games_count} games published</p>
                <Button
                    as={Link}
                    to={`/developers/${developer.id}`}
                    radius="full"
                    size="sm"
                    className="bg-my-purple hover:bg-my-cyan text-white transition-colors duration-300 text-[10px] sm:text-xs px-2 sm:px-3 py-1 flex items-center gap-1"
                >
                    <span className="hidden sm:inline">View Profile</span><FaArrowRight className="text-[10px] sm:text-xs flex-shrink-0" />
                </Button>
            </CardFooter>
        </Card>
    );
}