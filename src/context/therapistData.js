// Definition of questions for the "character" path
export const characterQuestions = [
    {
        id: 1,
        text: "Se fossi bloccato su un'isola deserta, preferiresti...",
        options: [
            { id: "a", text: "Un libro infinito che cambia storia ogni volta", tags: ["story", "singleplayer", "adventure"] },
            { id: "b", text: "Un dispositivo per comunicare con estranei casuali", tags: ["multiplayer", "social", "online"] },
            { id: "c", text: "Un kit per costruire qualsiasi cosa", tags: ["simulation", "building", "strategy"] },
            { id: "d", text: "Un'arma per cacciare e difenderti", tags: ["action", "shooter", "survival"] }
        ]
    },
    {
        id: 2,
        text: "Nei tuoi sogni ricorrenti, ti ritrovi spesso a...",
        options: [
            { id: "a", text: "Volare sopra paesaggi fantastici", tags: ["adventure", "open-world", "fantasy"] },
            { id: "b", text: "Risolvere enigmi complessi", tags: ["puzzle", "strategy", "indie"] },
            { id: "c", text: "Combattere contro mostri o nemici", tags: ["action", "rpg", "fighting"] },
            { id: "d", text: "Correre senza mai fermarti", tags: ["racing", "sports", "arcade"] }
        ]
    },
    {
        id: 3,
        text: "Se potessi avere un superpotere, sceglieresti...",
        options: [
            { id: "a", text: "Leggere nella mente delle persone", tags: ["detective", "mystery", "visual-novel"] },
            { id: "b", text: "Controllare il tempo", tags: ["strategy", "time-manipulation", "puzzle"] },
            { id: "c", text: "Forza e resistenza sovrumane", tags: ["action", "fighting", "superhero"] },
            { id: "d", text: "Invisibilità", tags: ["stealth", "infiltration", "horror"] }
        ]
    },
    {
        id: 4,
        text: "Quando sei stressato, ti rilassi meglio...",
        options: [
            { id: "a", text: "Immergendoti in una storia avvincente", tags: ["story-rich", "atmospheric", "rpg"] },
            { id: "b", text: "Sfogando la rabbia (in modo sano!)", tags: ["action", "shooter", "fighting"] },
            { id: "c", text: "Creando o costruendo qualcosa", tags: ["simulation", "building", "crafting"] },
            { id: "d", text: "Risolvendo problemi logici", tags: ["puzzle", "strategy", "board-game"] }
        ]
    },
    {
        id: 5,
        text: "Il tuo animale interiore è...",
        options: [
            { id: "a", text: "Un lupo solitario", tags: ["singleplayer", "open-world", "survival"] },
            { id: "b", text: "Un delfino sociale e giocoso", tags: ["multiplayer", "party", "casual"] },
            { id: "c", text: "Un gufo saggio e riflessivo", tags: ["strategy", "turn-based", "4x"] },
            { id: "d", text: "Un falco predatore e competitivo", tags: ["competitive", "esports", "shooter"] }
        ]
    }
];

// Definition of questions for the "mood" path
export const moodQuestions = [
    {
        id: 1,
        text: "Come ti senti in questo momento?",
        options: [
            { id: "a", text: "Stressato/a e teso/a", tags: ["relaxing", "casual", "puzzle"] },
            { id: "b", text: "Annoiato/a e in cerca di stimoli", tags: ["action", "adventure", "open-world"] },
            { id: "c", text: "Triste o malinconico/a", tags: ["atmospheric", "story-rich", "feel-good"] },
            { id: "d", text: "Energico/a e carico/a", tags: ["fast-paced", "competitive", "action"] }
        ]
    },
    {
        id: 2,
        text: "Quanto tempo hai a disposizione per giocare oggi?",
        options: [
            { id: "a", text: "Solo pochi minuti", tags: ["short", "casual", "arcade"] },
            { id: "b", text: "Circa un'ora", tags: ["indie", "singleplayer", "story-rich"] },
            { id: "c", text: "Diverse ore", tags: ["open-world", "rpg", "adventure"] },
            { id: "d", text: "Tutta la giornata/serata", tags: ["multiplayer", "mmo", "long"] }
        ]
    },
    {
        id: 3,
        text: "Cosa vorresti provare attraverso il gioco in questo momento?",
        options: [
            { id: "a", text: "Evadere dalla realtà", tags: ["fantasy", "sci-fi", "immersive"] },
            { id: "b", text: "Sentirmi potente e in controllo", tags: ["power-fantasy", "action", "superhero"] },
            { id: "c", text: "Rilassarmi e distendermi", tags: ["relaxing", "atmospheric", "casual"] },
            { id: "d", text: "Mettermi alla prova", tags: ["difficult", "souls-like", "challenging"] }
        ]
    },
    {
        id: 4,
        text: "Con chi giocherai oggi?",
        options: [
            { id: "a", text: "Da solo/a", tags: ["singleplayer", "story-rich", "immersive"] },
            { id: "b", text: "Con amici online", tags: ["multiplayer", "co-op", "online"] },
            { id: "c", text: "Con amici in presenza", tags: ["local-multiplayer", "party", "co-op"] },
            { id: "d", text: "Con sconosciuti online", tags: ["mmo", "competitive", "team-based"] }
        ]
    },
    {
        id: 5,
        text: "Qual è il tuo obiettivo principale in questo momento?",
        options: [
            { id: "a", text: "Distrarmi dai pensieri", tags: ["immersive", "fast-paced", "action"] },
            { id: "b", text: "Socializzare e connettermi con altri", tags: ["social", "multiplayer", "co-op"] },
            { id: "c", text: "Immergermi in una bella storia", tags: ["narrative", "story-rich", "atmospheric"] },
            { id: "d", text: "Stimolare la mente", tags: ["puzzle", "strategy", "simulation"] }
        ]
    }
];

// Phrases for results based on the path
export const characterTherapistPhrases = [
    "Dopo un'attenta analisi del tuo subconscio videoludico...",
    "La mia diagnosis ludica è chiara...",
    "I tuoi neuroni da gamer mi dicono che...",
    "La tua anima di giocatore rivela che...",
    "Secondo la mia terapia videoludica..."
];

export const moodTherapistPhrases = [
    "Per il tuo stato d'animo attuale, prescrivo...",
    "La terapia d'urto per il tuo umore prevede...",
    "Per alleviare i sintomi del tuo stato emotivo...",
    "La cura videoludica per il tuo momento presente è...",
    "Per soddisfare i tuoi bisogni emotivi attuali..."
];