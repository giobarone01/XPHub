import { useState, useEffect } from "react";
import TherapistContext from "./TherapistContext";
import { getRawgUrl } from "../config/api.js";
import { characterQuestions, moodQuestions } from "./therapistData";

export default function TherapistProvider({ children }) {
    const [showPathSelection, setShowPathSelection] = useState(true);
    const [selectedPath, setSelectedPath] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [recommendedGames, setRecommendedGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [showPlatformSelection, setShowPlatformSelection] = useState(false);

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await fetch(getRawgUrl("platforms"));
                if (!response.ok) throw new Error('Failed to fetch platforms');
                const data = await response.json();
                setPlatforms(data.results);
            } catch (err) {
                console.error("Error fetching platforms:", err);
            }
        };

        fetchPlatforms();
    }, []);

    // Function to get current questions based on the selected path
    const getCurrentQuestions = () => {
        return selectedPath === 'character' ? characterQuestions : moodQuestions;
    };

    // Function to analyze answers and retrieve recommended games
    const analyzeAnswers = async (platformId = selectedPlatform) => {
        setLoading(true);

        // Collect all tags from the answers
        const allTags = Object.values(answers).flatMap(answer => answer.tags);

        // Count the frequency of each tag
        const tagFrequency = allTags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});

        // Sort tags by frequency
        const sortedTags = Object.entries(tagFrequency)
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0]);

        // Take the top 3 most frequent tags
        const topTags = sortedTags.slice(0, 3);

        // Use tags to search for recommended games
        try {
            // Build the query for the RAWG API
            const tagsParam = topTags.join(',');
            const queryParams = {
                tags: tagsParam,
                ordering: "-rating",
                page_size: 8
            };

            // Add platform filter if selected
            if (platformId) {
                queryParams.platforms = platformId;
            }

            const url = getRawgUrl("games", queryParams);

            const response = await fetch(url);
            const data = await response.json();

            setRecommendedGames(data.results || []);
            setShowResults(true);
        } catch (error) {
            console.error("Error fetching recommended games:", error);
        } finally {
            setLoading(false);
        }
    };

    // Reset the quiz
    const resetQuiz = () => {
        setShowPathSelection(true);
        setSelectedPath(null);
        setSelectedPlatform(null);
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setRecommendedGames([]);
        setShowPlatformSelection(false);
    };

    // Function to get the name of the selected platform
    const getSelectedPlatformName = () => {
        if (!selectedPlatform) return "";
        const platform = platforms.find(p => p.id === selectedPlatform);
        return platform ? platform.name : "";
    };

    return (
        <TherapistContext.Provider
            value={{
                showPathSelection, setShowPathSelection,
                selectedPath, setSelectedPath,
                currentQuestion, setCurrentQuestion,
                answers, setAnswers,
                showResults, setShowResults,
                recommendedGames, setRecommendedGames,
                loading, setLoading,
                platforms, setPlatforms,
                selectedPlatform, setSelectedPlatform,
                showPlatformSelection, setShowPlatformSelection,
                analyzeAnswers,
                resetQuiz,
                getCurrentQuestions,
                getSelectedPlatformName
            }}
        >
            {children}
        </TherapistContext.Provider>
    );
}