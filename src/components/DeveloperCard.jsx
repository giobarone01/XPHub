import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { Link } from "react-router-dom";

export default function DeveloperCard({ developer }) {
    return (
        <Card className="relative h-[300px] w-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <CardHeader className="absolute z-10 top-4 left-4 right-4">
                <h3 className="text-white font-semibold text-xl drop-shadow-lg">{developer.name}</h3>
            </CardHeader>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <img
                    src={developer.image_background || "/default-dev-bg.jpg"}
                    alt={developer.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <CardFooter className="absolute bottom-0 z-20 flex flex-col items-start p-4 bg-black/60 rounded-t-lg">
                <p className="text-sm text-white/80 mb-2">{developer.games_count} games published</p>
                <Button
                    as={Link}
                    to={`/developers/${developer.id}`}
                    radius="full"
                    size="sm"
                    className="bg-my-purple hover:bg-my-cyan text-white transition-colors duration-300"
                >
                    View Profile
                </Button>
            </CardFooter>
        </Card>
    );
}