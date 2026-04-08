import React, { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_USER, NOTIFICATIONS } from '../data/mockData';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(MOCK_USER);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [joinedEvents, setJoinedEvents] = useState([]);

    // --- Actions ---

    // 1. Platform Unlock Simulation
    const unlockPlatform = () => {
        setUserData(prev => ({ ...prev, isPaid: true }));
        addNotification("Platform Unlocked!", "You have successfully unlocked full access. Start earning!", "success");
    };

    // 2. Add Coins (including booster logic)
    const addCoins = (baseAmount, source) => {
        const factor = userData.isBoosterActive ? 3 : 1;
        const totalAwarded = baseAmount * factor;

        setUserData(prev => ({
            ...prev,
            coins: {
                ...prev.coins,
                total: prev.coins.total + totalAwarded,
                history: [
                    { id: Date.now(), type: 'credit', amount: totalAwarded, source, date: new Date().toLocaleDateString() },
                    ...prev.coins.history
                ]
            }
        }));
        addNotification("Coins Added!", `+${totalAwarded} coins earned from ${source}.`, "info");
    };

    // 3. Deduct Coins (Event Entry etc.)
    const deductCoins = (amount, source) => {
        if (userData.coins.total < amount) return false;

        setUserData(prev => ({
            ...prev,
            coins: {
                ...prev.coins,
                total: prev.coins.total - amount,
                history: [
                    { id: Date.now(), type: 'debit', amount, source, date: new Date().toLocaleDateString() },
                    ...prev.coins.history
                ]
            }
        }));
        return true;
    };

    // 4. Global Join Event (Persistently)
    const joinEvent = (eventId, fee, title) => {
        if (joinedEvents.includes(eventId)) return;
        
        const success = deductCoins(fee, `Event Entry: ${title}`);
        if (success) {
            setJoinedEvents(prev => [...prev, eventId]);
            addNotification("Event Joined!", `Registration successful for ${title}.`, "success");
            return true;
        }
        return false;
    };

    // 5. Upgrade/Buy Booster
    const upgradeBooster = (type, cost) => {
        setUserData(prev => ({
            ...prev,
            isBoosterActive: true,
            boosterDaysLeft: type === 'monthly' ? 30 : prev.boosterDaysLeft
        }));
        addNotification("Booster Active!", "Your 3x coin multiplier is now running.", "success");
    };

    // 6. Simulate Affiliate Sale (Affects Future Fund & Wallet)
    const simulateSale = () => {
        setUserData(prev => {
            const nextCriteria = prev.futureFund.criteria.map(c => 
                c.id === 1 ? { ...c, current: Math.min(c.target, c.current + 1), completed: (c.current + 1 >= c.target) } : c
            );
            
            // Calculate new progress based on cumulative criteria targets
            const totalTarget = nextCriteria.reduce((sum, c) => sum + c.target, 0);
            const currentTotal = nextCriteria.reduce((sum, c) => sum + c.current, 0);
            const newProgress = Math.floor((currentTotal / totalTarget) * 100);

            // Important: Sale adds to BOTH lifetime Total earnings AND current wallet balance
            return {
                ...prev,
                earnings: { ...prev.earnings, total: prev.earnings.total + 200, today: prev.earnings.today + 200 },
                wallet: { ...prev.wallet, balance: prev.wallet.balance + 200 },
                futureFund: { ...prev.futureFund, progress: newProgress, criteria: nextCriteria }
            };
        });
        addNotification("New Sale!", "₹200 added to your wallet successfully.", "success");
    };

    // 7. Withdrawal Request
    const requestWithdrawal = (amount) => {
        if (userData.wallet.balance < amount) return false;
        setUserData(prev => ({
            ...prev,
            wallet: {
                ...prev.wallet,
                balance: prev.wallet.balance - amount,
                transactions: [
                    { id: Date.now(), type: 'withdrawal', amount, title: 'Bank Payout', status: 'Pending', date: new Date().toLocaleDateString() },
                    ...prev.wallet.transactions
                ]
            }
        }));
        addNotification("Withdrawal Pending", `Your payout of ₹${amount} is being reviewed.`, "warning");
        return true;
    };

    // 8. Add/Clear Notifications
    const addNotification = (title, message, type) => {
        setNotifications(prev => [{ id: Date.now(), title, message, time: "Just now", type }, ...prev]);
    };
    const clearNotifications = () => setNotifications([]);

    const value = useMemo(() => ({
        userData,
        notifications,
        joinedEvents,
        unlockPlatform,
        addCoins,
        deductCoins,
        joinEvent,
        upgradeBooster,
        simulateSale,
        requestWithdrawal,
        addNotification,
        clearNotifications
    }), [userData, notifications, joinedEvents]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
