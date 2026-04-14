const STORAGE_KEY = 'dromoney_system_settings';

const DEFAULT_SETTINGS = {
    // General
    appName: 'Dromoney',
    contactEmail: 'app@dromoney.com',
    maintenanceMode: false,
    
    // Payments
    adminUpiId: 'dromoney@upi',
    bankDetails: 'A/C No: 12345678, IFSC: SBIN0001234, Bank: State Bank of India',
    registrationFee: 499,
    
    // Earnings
    referralCommission: 200,
    coinRate: 0.10,
    minWithdrawal: 100,
    
    // Security
    adminEmail: 'dromoney@gmail.com',
    adminPassword: 'admin'
};

export const SettingsDataService = {
    getSettings: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
            return DEFAULT_SETTINGS;
        }
        return JSON.parse(stored);
    },

    saveSettings: (newSettings) => {
        const current = SettingsDataService.getSettings();
        const updated = { ...current, ...newSettings };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    }
};
