// Definition of questions for the "character" path
export const characterQuestions = [
    {
        id: 1,
        text: "If you were stranded on a desert island, would you prefer...",
        options: [
            { id: "a", text: "An infinite book that changes story every time", tags: ["story", "singleplayer", "adventure"] },
            { id: "b", text: "A device to communicate with random strangers", tags: ["multiplayer", "social", "online"] },
            { id: "c", text: "A kit to build anything", tags: ["simulation", "building", "strategy"] },
            { id: "d", text: "A weapon to hunt and defend yourself", tags: ["action", "shooter", "survival"] }
        ]
    },
    {
        id: 2,
        text: "In your recurring dreams, you often find yourself...",
        options: [
            { id: "a", text: "Flying over fantastic landscapes", tags: ["adventure", "open-world", "fantasy"] },
            { id: "b", text: "Solving complex puzzles", tags: ["puzzle", "strategy", "indie"] },
            { id: "c", text: "Fighting against monsters or enemies", tags: ["action", "rpg", "fighting"] },
            { id: "d", text: "Running without ever stopping", tags: ["racing", "sports", "arcade"] }
        ]
    },
    {
        id: 3,
        text: "If you could have a superpower, you would choose...",
        options: [
            { id: "a", text: "Reading people's minds", tags: ["detective", "mystery", "visual-novel"] },
            { id: "b", text: "Controlling time", tags: ["strategy", "time-manipulation", "puzzle"] },
            { id: "c", text: "Superhuman strength and endurance", tags: ["action", "fighting", "superhero"] },
            { id: "d", text: "Invisibility", tags: ["stealth", "infiltration", "horror"] }
        ]
    },
    {
        id: 4,
        text: "When you're stressed, you relax better by...",
        options: [
            { id: "a", text: "Immersing yourself in a compelling story", tags: ["story-rich", "atmospheric", "rpg"] },
            { id: "b", text: "Venting your anger (in a healthy way!)", tags: ["action", "shooter", "fighting"] },
            { id: "c", text: "Creating or building something", tags: ["simulation", "building", "crafting"] },
            { id: "d", text: "Solving logical problems", tags: ["puzzle", "strategy", "board-game"] }
        ]
    },
    {
        id: 5,
        text: "Your inner animal is...",
        options: [
            { id: "a", text: "A lone wolf", tags: ["singleplayer", "open-world", "survival"] },
            { id: "b", text: "A social and playful dolphin", tags: ["multiplayer", "party", "casual"] },
            { id: "c", text: "A wise and reflective owl", tags: ["strategy", "turn-based", "4x"] },
            { id: "d", text: "A predatory and competitive hawk", tags: ["competitive", "esports", "shooter"] }
        ]
    }
];

// Definition of questions for the "mood" path
export const moodQuestions = [
    {
        id: 1,
        text: "How do you feel right now?",
        options: [
            { id: "a", text: "Stressed and tense", tags: ["relaxing", "casual", "puzzle"] },
            { id: "b", text: "Bored and looking for stimulation", tags: ["action", "adventure", "open-world"] },
            { id: "c", text: "Sad or melancholic", tags: ["atmospheric", "story-rich", "feel-good"] },
            { id: "d", text: "Energetic and pumped up", tags: ["fast-paced", "competitive", "action"] }
        ]
    },
    {
        id: 2,
        text: "How much time do you have to play today?",
        options: [
            { id: "a", text: "Just a few minutes", tags: ["short", "casual", "arcade"] },
            { id: "b", text: "About an hour", tags: ["indie", "singleplayer", "story-rich"] },
            { id: "c", text: "Several hours", tags: ["open-world", "rpg", "adventure"] },
            { id: "d", text: "All day/evening", tags: ["multiplayer", "mmo", "long"] }
        ]
    },
    {
        id: 3,
        text: "What would you like to experience through gaming right now?",
        options: [
            { id: "a", text: "Escape from reality", tags: ["fantasy", "sci-fi", "immersive"] },
            { id: "b", text: "Feel powerful and in control", tags: ["power-fantasy", "action", "superhero"] },
            { id: "c", text: "Relax and unwind", tags: ["relaxing", "atmospheric", "casual"] },
            { id: "d", text: "Challenge myself", tags: ["difficult", "souls-like", "challenging"] }
        ]
    },
    {
        id: 4,
        text: "Who will you be playing with today?",
        options: [
            { id: "a", text: "By myself", tags: ["singleplayer", "story-rich", "immersive"] },
            { id: "b", text: "With friends online", tags: ["multiplayer", "co-op", "online"] },
            { id: "c", text: "With friends in person", tags: ["local-multiplayer", "party", "co-op"] },
            { id: "d", text: "With strangers online", tags: ["mmo", "competitive", "team-based"] }
        ]
    },
    {
        id: 5,
        text: "What is your main goal right now?",
        options: [
            { id: "a", text: "Distract myself from thoughts", tags: ["immersive", "fast-paced", "action"] },
            { id: "b", text: "Socialize and connect with others", tags: ["social", "multiplayer", "co-op"] },
            { id: "c", text: "Immerse myself in a good story", tags: ["narrative", "story-rich", "atmospheric"] },
            { id: "d", text: "Stimulate my mind", tags: ["puzzle", "strategy", "simulation"] }
        ]
    }
];

// Phrases for results based on the path
export const characterTherapistPhrases = [
    "After a careful analysis of your gaming subconscious...",
    "My gaming diagnosis is clear...",
    "Your gamer neurons tell me that...",
    "Your player soul reveals that...",
    "According to my gaming therapy..."
];

export const moodTherapistPhrases = [
    "For your current mood, I prescribe...",
    "The shock therapy for your mood includes...",
    "To alleviate the symptoms of your emotional state...",
    "The gaming cure for your present moment is...",
    "To satisfy your current emotional needs..."
];