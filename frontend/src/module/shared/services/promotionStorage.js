const PROMOTIONS_KEY = 'dromoney_brand_promotions';

export const promotionStorage = {
    // Save a new promotion request
    savePromotion: (data) => {
        const promotions = promotionStorage.getPromotions();
        const newPromotion = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            status: 'Pending',
            ...data
        };
        promotions.unshift(newPromotion);
        localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(promotions));
        return newPromotion;
    },

    // Get all promotion requests
    getPromotions: () => {
        const saved = localStorage.getItem(PROMOTIONS_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    // Delete a promotion request
    deletePromotion: (id) => {
        const promotions = promotionStorage.getPromotions();
        const updated = promotions.filter(p => p.id !== id);
        localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(updated));
    },

    // Update status or message
    updatePromotion: (id, updates) => {
        const promotions = promotionStorage.getPromotions();
        const updated = promotions.map(p => p.id === id ? { ...p, ...updates } : p);
        localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(updated));
    }
};
