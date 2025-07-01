import PageTitle from "../../components/PageTitle";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-my-black text-white p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <PageTitle title="About Us" />

                <div className="bg-my-dark rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-my-cyan mb-6">Our Mission</h2>
                    <p className="mb-6">
                        Welcome to XPHub, your ultimate destination for discovering and exploring video games.
                        Our mission is to connect gamers with the experiences they'll love and provide a
                        comprehensive platform for game discovery.
                    </p>

                    <h2 className="text-2xl font-bold text-my-cyan mb-6">Who We Are</h2>
                    <p className="mb-6">
                        XPHub was founded by a team of passionate gamers who wanted to create a better way to
                        discover and learn about games. We believe that gaming is more than just entertainment—it's
                        a form of art, storytelling, and connection.
                    </p>

                    <h2 className="text-2xl font-bold text-my-cyan mb-6">What We Offer</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Comprehensive game database with detailed information</li>
                        <li>Personalized recommendations based on your preferences</li>
                        <li>Community features to connect with other gamers</li>
                        <li>Game Therapist to help you find the perfect game for your mood</li>
                        <li>Latest news and updates from the gaming world</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-my-cyan mb-6">Join Our Community</h2>
                    <p className="mb-6">
                        XPHub is more than just a website—it's a community of gamers. Join us in our mission to
                        celebrate and explore the wonderful world of video games.
                    </p>
                </div>
            </div>
        </div>
    );
}