// ─────────────────────────────────────────────
// Central Event Storage Service
// Admin writes → User reads (via localStorage)
// ─────────────────────────────────────────────

const KEYS = {
    events: 'dromoney_event_configs_v2',
    questions: 'dromoney_quiz_questions_v2',
    prizes: 'dromoney_draw_prizes_v2',
    tasks: 'dromoney_race_tasks_v2',
    participants: 'dromoney_event_participants_v2'
};

// ─── Default Data ───────────────────────────

const DEFAULT_EVENTS = [
    {
        id: 'quiz-daily',
        title: 'Daily Quiz',
        tag: 'Quiz',
        fee: 10,
        prize: '₹500',
        startTime: '7:00 PM',
        participants: 12,
        status: 'Active'
    },
    {
        id: 'lucky-draw',
        title: 'Lucky Draw',
        tag: 'Draw',
        fee: 15,
        prize: '₹1000',
        startTime: '8:00 PM',
        participants: 8,
        status: 'Active'
    },
    {
        id: 'gold-prediction',
        title: 'Gold Prediction',
        tag: 'Prediction',
        fee: 20,
        prize: '₹2000',
        startTime: 'Live Now',
        participants: 5,
        status: 'Active',
        coinReward: 40
    },
    {
        id: 'task-race',
        title: 'Task Race',
        tag: 'Task',
        fee: 25,
        prize: '₹1500',
        startTime: 'Live Now',
        participants: 3,
        status: 'Active',
        timeLimit: 60
    }
];

const DEFAULT_QUESTIONS = [
    { id: 1, question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], answer: 1 },
    { id: 2, question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: 2 },
    { id: 3, question: "Which is the largest organ in the human body?", options: ["Lungs", "Brain", "Heart", "Skin"], answer: 3 },
    { id: 4, question: "Who wrote the Indian National Anthem?", options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Mahatma Gandhi", "Subhash Chandra Bose"], answer: 0 },
    { id: 5, question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: 2 },
    { id: 6, question: "Which ocean is the largest in the world?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
    { id: 7, question: "What is the primary language spoken in Brazil?", options: ["Spanish", "Portuguese", "English", "French"], answer: 1 },
    { id: 8, question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
    { id: 9, question: "Who is known as the Father of the Indian Constitution?", options: ["Jawaharlal Nehru", "B. R. Ambedkar", "Sardar Patel", "Rajendra Prasad"], answer: 1 },
    { id: 10, question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Silver", "Oxygen", "Iron"], answer: 2 }
];

const DEFAULT_PRIZES = [
    { id: 1, label: '₹50', coins: 0, cash: 50 },
    { id: 2, label: '₹200', coins: 0, cash: 200 },
    { id: 3, label: '₹100', coins: 0, cash: 100 },
    { id: 4, label: '50 Coins', coins: 50, cash: 0 },
    { id: 5, label: '₹500', coins: 0, cash: 500 },
    { id: 6, label: '20 Coins', coins: 20, cash: 0 },
    { id: 7, label: '₹150', coins: 0, cash: 150 },
    { id: 8, label: '75 Coins', coins: 75, cash: 0 }
];

const DEFAULT_TASKS = [
    { id: 1, text: 'Open the Dromoney App', points: 5 },
    { id: 2, text: 'Visit the Earn Section', points: 10 },
    { id: 3, text: 'Check your coins balance', points: 10 },
    { id: 4, text: 'View one Task in the task list', points: 15 },
    { id: 5, text: "Share your referral link", points: 20 },
    { id: 6, text: 'Visit Business Ideas page', points: 15 },
    { id: 7, text: "Check today's events", points: 10 },
    { id: 8, text: 'Read How It Works guide', points: 15 }
];

// ─── Helper ─────────────────────────────────

const load = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// ─── Events Config ───────────────────────────

export const eventStorage = {

    // ── Events ──────────────────────────────

    getEvents: () => {
        const stored = load(KEYS.events, null);
        if (!stored) {
            save(KEYS.events, DEFAULT_EVENTS);
            return DEFAULT_EVENTS;
        }
        return stored;
    },

    updateEvent: (eventId, updates) => {
        const events = eventStorage.getEvents();
        const updated = events.map(e => e.id === eventId ? { ...e, ...updates } : e);
        save(KEYS.events, updated);
        return updated;
    },

    updateAllEvents: (events) => {
        save(KEYS.events, events);
    },

    // ── Quiz Questions ───────────────────────

    getQuestions: () => {
        const stored = load(KEYS.questions, null);
        if (!stored) {
            save(KEYS.questions, DEFAULT_QUESTIONS);
            return DEFAULT_QUESTIONS;
        }
        return stored;
    },

    updateQuestions: (questions) => {
        save(KEYS.questions, questions);
    },

    // ── Lucky Draw Prizes ────────────────────

    getPrizes: () => {
        const stored = load(KEYS.prizes, null);
        if (!stored) {
            save(KEYS.prizes, DEFAULT_PRIZES);
            return DEFAULT_PRIZES;
        }
        return stored;
    },

    updatePrizes: (prizes) => {
        save(KEYS.prizes, prizes);
    },

    // ── Task Race Tasks ──────────────────────

    getTasks: () => {
        const stored = load(KEYS.tasks, null);
        if (!stored) {
            save(KEYS.tasks, DEFAULT_TASKS);
            return DEFAULT_TASKS;
        }
        return stored;
    },

    updateTasks: (tasks) => {
        save(KEYS.tasks, tasks);
    },

    // ── Participants ─────────────────────────

    getParticipants: (eventId) => {
        const all = load(KEYS.participants, {});
        return all[eventId] || [];
    },

    getAllParticipants: () => {
        return load(KEYS.participants, {});
    },

    addParticipant: (eventId, record) => {
        // record: { name, score, result, prize, joinedAt }
        const all = load(KEYS.participants, {});
        if (!all[eventId]) all[eventId] = [];
        // Avoid duplicates by name for same day
        const exists = all[eventId].find(p => p.name === record.name);
        if (!exists) {
            all[eventId].push({
                ...record,
                id: Date.now(),
                timestamp: Date.now(),
                prizeStatus: 'Pending',
                joinedAt: new Date().toLocaleString('en-IN')
            });
            save(KEYS.participants, all);
        }
    },

    awardPrize: (eventId, participantId, prizeNote) => {
        const all = load(KEYS.participants, {});
        if (all[eventId]) {
            all[eventId] = all[eventId].map(p =>
                p.id === participantId
                    ? { ...p, prizeStatus: 'Awarded', prizeNote: prizeNote || 'Prize Awarded by Admin' }
                    : p
            );
            save(KEYS.participants, all);
        }
    },

    // ── Stats ────────────────────────────────

    getEventStats: (eventId) => {
        const participants = eventStorage.getParticipants(eventId);
        const awarded = participants.filter(p => p.prizeStatus === 'Awarded').length;
        const scores = participants.map(p => p.score || 0);
        const topScore = scores.length ? Math.max(...scores) : 0;
        return {
            total: participants.length,
            awarded,
            topScore
        };
    }
};
