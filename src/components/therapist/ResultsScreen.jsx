import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Grid from "../../components/Grid";
import CardGame from "../../components/CardGame";

export default function ResultsScreen({ 
    selectedPath, 
    platformName, 
    randomPhrase, 
    recommendedGames, 
    onRestart, 
    onSwitchPath, 
    onChangePlatform 
}) {
    return (
        <motion.div
            className="rounded-xl backdrop-blur-sm bg-black/40 p-6 border border-white/10 shadow-inner transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                    {selectedPath === 'character'
                        ? "Risultati della terapia"
                        : "La tua prescrizione videoludica"}
                </h2>
                {platformName && (
                    <p className="text-my-cyan text-xs sm:text-sm mt-1">
                        per {platformName}
                    </p>
                )}
            </div>

            {recommendedGames.length > 0 ? (
                <>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">{randomPhrase}</h3>

                    <Grid>
                        {recommendedGames.map(game => (
                            <CardGame key={game.id} game={game} />
                        ))}
                    </Grid>
                </>
            ) : (
                <div className="py-3 sm:py-4 text-center">
                    <h3 className="text-base sm:text-lg font-medium text-my-cyan mb-1 sm:mb-2">Nessun gioco trovato</h3>
                    <p className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">
                        Non ho trovato giochi che corrispondono alle tue preferenze per la piattaforma selezionata.
                    </p>
                </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <div
                    className="bg-my-purple hover:bg-my-purple/80 text-white m-2 sm:m-3 px-2 sm:px-3 py-1 sm:py-2 rounded-3xl border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer w-full sm:w-auto text-center justify-center"
                    onClick={onRestart}
                    role="button"
                    tabIndex={0}
                >
                    <div className="flex items-center justify-center gap-1 sm:gap-2 py-1">
                        <span className="text-xs sm:text-sm font-semibold">Ricomincia</span>
                    </div>
                </div>

                {selectedPath === 'character' ? (
                    <div
                        className="bg-my-cyan hover:bg-my-cyan/80 text-black m-2 sm:m-3 px-2 sm:px-3 py-1 sm:py-2 rounded-3xl border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer w-full sm:w-auto text-center justify-center"
                        onClick={() => onSwitchPath('mood')}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="flex items-center justify-center gap-1 sm:gap-2 py-1">
                            <span className="text-xs sm:text-sm font-semibold">Prova terapia dell'umore</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className="bg-my-cyan hover:bg-my-cyan/80 text-black m-2 sm:m-3 px-2 sm:px-3 py-1 sm:py-2 rounded-3xl border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer w-full sm:w-auto text-center justify-center"
                        onClick={() => onSwitchPath('character')}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="flex items-center justify-center gap-1 sm:gap-2 py-1">
                            <span className="text-xs sm:text-sm font-semibold">Prova analisi carattere</span>
                        </div>
                    </div>
                )}

                <div
                    className="bg-white/5 hover:bg-white/10 text-white m-3 px-3 py-2 rounded-3xl border border-transparent hover:border-my-purple/50 transition-all duration-300 flex items-center gap-1 sm:gap-2 cursor-pointer w-full sm:w-auto text-center justify-center sm:justify-start"
                    onClick={onChangePlatform}
                    role="button"
                    tabIndex={0}
                >
                    <FaArrowLeft className="text-xs sm:text-sm" /> <span className="text-xs sm:text-sm font-semibold">Cambia piattaforma</span>
                </div>
            </div>
        </motion.div>
    );
}