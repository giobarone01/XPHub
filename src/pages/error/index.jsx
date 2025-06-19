import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function ErrorPage() {
    useEffect(() => {
        toast.error('An error occurred while loading the page');
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-my-black text-white p-4">
            <div className="text-center max-w-md">
                <h1 className="text-5xl font-bold text-my-cyan mb-4">Oops!</h1>
                <p className="text-xl mb-6">Something went wrong while loading the page.</p>
                <p className="mb-8">Don't worry, you can go back to the home page and try again.</p>
                
                <Link 
                    to="/" 
                    className="inline-block bg-my-purple hover:bg-my-purple/80 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}