/**
 * Task Storage Service (Simulated Backend)
 * 
 * This utility handles saving and retrieving tasks and completions from LocalStorage.
 * When a real backend is ready, we only need to replace these functions with API calls.
 */

const TASKS_KEY = 'dromoney_tasks';
const COMPLETED_TASKS_KEY = 'dromoney_completed_tasks';

// Initial Mock Tasks (Exactly what client asked for)
const INITIAL_TASKS = [
    { 
        id: '1', 
        type: 'Web', 
        title: 'Visit Business Idea Page', 
        description: 'Explore our curated business ideas to earn more.', 
        reward: 1, 
        icon: 'Monitor',
        config: { url: '/user/business-ideas', timer: 15 }
    },
    { 
        id: '2', 
        type: 'Video', 
        title: 'Watch a Short Video', 
        description: 'Watch this 30s video to gain coins.', 
        reward: 1, 
        icon: 'Youtube',
        config: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', timer: 30 }
    },
    { 
        id: '4', 
        type: 'Spin', 
        title: 'Spin the Wheel', 
        description: 'Try your luck and win up to 5 coins!', 
        reward: 5, 
        icon: 'Disc',
        config: { min: 0, max: 5 }
    }
];

export const taskStorage = {
    // Get all active tasks
    getTasks: () => {
        const stored = localStorage.getItem(TASKS_KEY);
        if (!stored) {
            localStorage.setItem(TASKS_KEY, JSON.stringify(INITIAL_TASKS));
            return INITIAL_TASKS;
        }
        return JSON.parse(stored);
    },

    // Add a new task (Admin Side)
    saveTask: (task) => {
        const tasks = taskStorage.getTasks();
        const newTask = { 
            ...task, 
            id: Date.now().toString(),
            status: 'Active' 
        };
        const updated = [...tasks, newTask];
        localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
        return newTask;
    },

    // Delete a task (Admin Side)
    deleteTask: (id) => {
        const tasks = taskStorage.getTasks();
        const updated = tasks.filter(t => t.id !== id);
        localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    },

    // Update an existing task (Admin Side)
    updateTask: (id, updatedData) => {
        const tasks = taskStorage.getTasks();
        const updated = tasks.map(t => t.id === id ? { ...t, ...updatedData } : t);
        localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    },

    // Mark task as completed for a user
    markComplete: (taskId) => {
        const completed = taskStorage.getCompletedTasks();
        if (!completed.includes(taskId)) {
            const updated = [...completed, taskId];
            localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(updated));
        }
    },

    // Get list of completed task IDs
    getCompletedTasks: () => {
        const stored = localStorage.getItem(COMPLETED_TASKS_KEY);
        return stored ? JSON.parse(stored) : [];
    }
};
