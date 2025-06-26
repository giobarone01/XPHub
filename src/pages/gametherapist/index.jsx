import { useContext } from "react";
import { motion } from "framer-motion";
import PageTitle from "../../components/PageTitle";
import LoadingSpinner from "../../components/LoadingSpinner";
import TherapistContext from "../../context/TherapistContext";
import PathSelection from "../../components/therapist/PathSelection";
import PlatformSelection from "../../components/therapist/PlatformSelection";
import QuestionScreen from "../../components/therapist/QuestionScreen";
import ResultsScreen from "../../components/therapist/ResultsScreen";
import { characterQuestions, moodQuestions, characterTherapistPhrases, moodTherapistPhrases } from "../../context/therapistData";

export default function GameTherapistPage() {
    const {
        showPathSelection, setShowPathSelection,
        selectedPath, setSelectedPath,
        currentQuestion, setCurrentQuestion,
        answers, setAnswers,
        showResults, setShowResults,
        recommendedGames,
        loading,
        platforms,
        selectedPlatform, setSelectedPlatform,
        showPlatformSelection, setShowPlatformSelection,
        analyzeAnswers,
        resetQuiz
    } = useContext(TherapistContext);

    // Function to get current questions based on selected path
    const getCurrentQuestions = () => {
        return selectedPath === 'character' ? characterQuestions : moodQuestions;
    };

    // Handle path selection
    const handlePathSelection = (path) => {
        setSelectedPath(path);
        setShowPathSelection(false);
        setCurrentQuestion(0);
    };

    // Handle platform selection
    const handlePlatformSelection = (platformId) => {
        setSelectedPlatform(platformId);
        setShowPlatformSelection(false);

        // If we're already in results, reanalyze answers with the new platform
        if (showResults) {
            analyzeAnswers(platformId);
        } else if (Object.keys(answers).length > 0) {
            analyzeAnswers(platformId);
        }
    };

    // Handle question answers
    const handleAnswer = (optionId) => {
        const questions = getCurrentQuestions();
        const currentQ = questions[currentQuestion];
        const selectedOption = currentQ.options.find(opt => opt.id === optionId);

        // Save the answer
        setAnswers(prev => ({
            ...prev,
            [currentQ.id]: selectedOption
        }));

        // Move to next question or show results
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Last question completed, show platform selection
            setShowPlatformSelection(true);
        }
    };

    // Function to go back during questions
    const handleBackInQuestions = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        } else {
            setShowPathSelection(true);
            resetQuiz();
        }
    };

    // Function to switch path
    const handleSwitchPath = (newPath) => {
        setSelectedPath(newPath);
        setShowResults(false);
        setCurrentQuestion(0);
        setAnswers({});
    };

    // Get a random phrase based on the path
    const getRandomPhrase = () => {
        const phrases = selectedPath === 'character' ? characterTherapistPhrases : moodTherapistPhrases;
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    };

    // Function to get the name of the selected platform
    const getSelectedPlatformName = () => {
        if (!selectedPlatform) return "";
        const platform = platforms.find(p => p.id === selectedPlatform);
        return platform ? platform.name : "";
    };

    return (
        <>
            <PageTitle subtitle="Scopri quali giochi sono perfetti per te">
                Game <span className="gradient-text">Therapist</span>
            </PageTitle>

            <div className="mx-auto">
                {showPathSelection ? (
                    <PathSelection onSelectPath={handlePathSelection} />
                ) : showPlatformSelection ? (
                    <PlatformSelection
                        platforms={platforms}
                        onSelectPlatform={handlePlatformSelection}
                        onBack={() => {
                            if (Object.keys(answers).length > 0) {
                                setShowPlatformSelection(false);
                            } else {
                                setShowPathSelection(true);
                                resetQuiz();
                            }
                        }}
                        hasAnswers={Object.keys(answers).length > 0}
                    />
                ) : loading ? (
                    <motion.div
                        className="rounded-xl p-6 backdrop-blur-sm bg-black/40 border border-white/10 shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-center justify-center py-6">
                            <LoadingSpinner size="lg" />
                            <p className="mt-3 text-gray-300">Analisi in corso...</p>
                        </div>
                    </motion.div>
                ) : !showResults ? (
                    <QuestionScreen
                        question={getCurrentQuestions()[currentQuestion].text}
                        options={getCurrentQuestions()[currentQuestion].options}
                        currentQuestionIndex={currentQuestion}
                        totalQuestions={getCurrentQuestions().length}
                        onAnswer={handleAnswer}
                        onBack={handleBackInQuestions}
                    />
                ) : (
                    <ResultsScreen
                        selectedPath={selectedPath}
                        platformName={getSelectedPlatformName()}
                        randomPhrase={getRandomPhrase()}
                        recommendedGames={recommendedGames}
                        onRestart={resetQuiz}
                        onSwitchPath={handleSwitchPath}
                        onChangePlatform={() => {
                            setShowPlatformSelection(true);
                            setShowResults(false);
                        }}
                    />
                )}
            </div>
        </>
    );
}