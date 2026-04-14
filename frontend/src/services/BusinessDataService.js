const STORAGE_KEY = 'dromoney_business_ideas';

const INITIAL_IDEAS = [
    {
        id: 'free-1',
        title: "Affiliate Marketing",
        desc: "Start promoting digital products via social media without any investment.",
        potential: "₹10k - ₹30k / mo",
        icon: "TrendingUp",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        type: "Free",
        steps: [
            { title: "Select Niche", text: "Identify high-demand products like tech gadgets, courses, or lifestyle tools." },
            { title: "Sign Up & Link", text: "Join platforms like Amazon Associates or Dromoney's internal affiliate partners." },
            { title: "Content Strategy", text: "Create reels, blogs, or WhatsApp groups to showcase product benefits." },
            { title: "Scale & Earn", text: "Track your sales and optimize conversion with high-converting scripts." }
        ]
    },
    {
        id: 'free-2',
        title: "Content Writing",
        desc: "Freelance writing for blogs and companies. Use your language skills.",
        potential: "₹5k - ₹20k / mo",
        icon: "TrendingUp",
        color: "text-blue-500",
        bg: "bg-blue-50",
        type: "Free",
        steps: [
            { title: "Build Portfolio", text: "Write 2-3 sample articles about finance, health, or travel to show clients." },
            { title: "Find Gigs", text: "Use LinkedIn or Dromoney tasks to find legitimate writing opportunities." },
            { title: "Quality Check", text: "Use AI tools to ensure grammar perfection and unique insights." },
            { title: "Direct Outreach", text: "Pitch to small business owners looking to grow their digital presence." }
        ]
    },
    {
        id: 'premium-1',
        title: "Premium SaaS Agency",
        desc: "Build and sell custom software solutions for local businesses.",
        potential: "₹50k - ₹2L+ / mo",
        icon: "Rocket",
        color: "text-purple-500",
        bg: "bg-purple-50",
        type: "Premium",
        price: 20,
        steps: [
            { title: "Market Analysis", text: "Identify local businesses with poor digital presence (restaurants, gyms, etc.)." },
            { title: "Product Bundling", text: "Offer a website + booking system + WhatsApp automation as a single package." },
            { title: "Outreach Machine", text: "Use cold calling or LinkedIn automation to set up 3-5 demos per week." },
            { title: "Retainer Model", text: "Charge a setup fee (₹20k) and a monthly maintenance fee (₹2k-₹5k)." }
        ]
    }
];

export const BusinessDataService = {
    getIdeas: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_IDEAS));
            return INITIAL_IDEAS;
        }
        return JSON.parse(stored);
    },

    saveIdea: (idea) => {
        const ideas = BusinessDataService.getIdeas();
        const index = ideas.findIndex(i => i.id === idea.id);
        
        if (index !== -1) {
            ideas[index] = idea;
        } else {
            ideas.push({ ...idea, id: Date.now().toString() });
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
        return ideas;
    },

    deleteIdea: (id) => {
        const ideas = BusinessDataService.getIdeas();
        const filtered = ideas.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return filtered;
    }
};
