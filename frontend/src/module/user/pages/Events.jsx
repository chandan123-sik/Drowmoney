import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
    ChevronLeft, ChevronRight, ChevronDown, Trophy, Timer, Users, Calendar,
    CircleHelp, Sparkles, Zap, Coins, Clock, Info, Lightbulb, Rocket, Award
} from 'lucide-react';
import UnlockModal from '../components/UnlockModal';
import PaymentModal from '../components/PaymentModal';

const EVENT_LIST = [
    {
        id: 1,
        title: "Daily Quiz",
        tag: "Quiz",
        fee: "10 Coins",
        prize: "₹500",
        startTime: "7:00 PM",
        participants: "12 Participants"
    },
    {
        id: 2,
        title: "Lucky Draw",
        tag: "Draw",
        fee: "15 Coins",
        prize: "₹1000",
        startTime: "8:00 PM",
        participants: "8 Participants"
    },
    {
        id: 3,
        title: "Gold Prediction",
        tag: "Prediction",
        fee: "20 Coins",
        prize: "₹2000",
        startTime: "6:00 PM",
        startDate: "Tomorrow",
        participants: "Coming Soon"
    },
    {
        id: 4,
        title: "Task Race",
        tag: "Task",
        fee: "25 Coins",
        prize: "₹1500",
        startTime: "7:00 PM",
        startDate: "Tomorrow",
        participants: "Coming Soon"
    }
];

const Events = () => {
    const { userData, joinEvent, joinedEvents, addNotification } = useUser();
    const [isUnlockOpen, setIsUnlockOpen] = useState(false);
    const [isBoosterExpanded, setIsBoosterExpanded] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const navigate = useNavigate();

    const handleBuyBooster = () => {
        setIsPaymentOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false);
        addNotification("Booster Activated!", "₹11 Event Support Booster successfully activated for 30 days.", "success");
        setIsBoosterExpanded(false);
    };

    const handleJoinEvent = (event) => {
        if (!userData.isPaid) {
            setIsUnlockOpen(true);
            return;
        }
        // Simulated joining logic
        joinEvent(event.id, parseInt(event.fee), event.title);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />

            {/* --- Header with Coin Balance --- */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-slate-600 active:scale-95 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-black text-slate-800 tracking-tight">Events</h1>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                        <Coins size={12} className="text-white" />
                    </div>
                    <span className="text-[14px] font-black text-amber-700">{userData.coins.total}</span>
                    <ChevronRight size={14} className="text-amber-400" />
                </div>
            </div>

            <div className="flex-1 p-4 space-y-4">
                {/* --- Trophy Banner Card --- */}
                <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100 rounded-2xl p-5 relative overflow-hidden group">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md animate-bounce duration-[3000ms]">
                            <Trophy size={32} className="text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-2">Join Events and Win Prizes!</h2>
                            <p className="text-[11px] font-bold text-slate-500/80 leading-tight">Use your coins to participate in events and win big!</p>
                        </div>
                    </div>
                </div>

                {/* --- Event List --- */}
                <div className="space-y-3">
                    {EVENT_LIST.map((event) => (
                        <div key={event.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative overflow-hidden hover:border-sky-300 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                    <h3 className="text-[15px] font-black text-slate-800 leading-none">{event.title}</h3>
                                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-widest">{event.tag}</span>
                                </div>
                                <button
                                    onClick={() => handleJoinEvent(event)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-[11px] font-black tracking-tight shadow-lg shadow-blue-50 active:scale-95 transition-all"
                                >
                                    Join Event
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-slate-400">Entry Fee:</span>
                                    <span className="text-[12px] font-black text-slate-800">{event.fee}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-slate-400">Prize:</span>
                                    <span className="text-[12px] font-black text-slate-800">{event.prize}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Clock size={12} className="text-sky-400" />
                                    <span className="text-[11px] font-bold">{event.startDate ? `${event.startTime} ${event.startDate}` : `Started | ${event.startTime}`}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Users size={12} className="text-emerald-400" />
                                    <span className="text-[11px] font-bold">{event.participants}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Expandable Support Booster Card --- */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                            <h4 className="text-[15px] font-black text-slate-800 tracking-tight leading-none mb-1">₹11 Support Booster</h4>
                            <p className="text-[10px] font-bold text-slate-500/80 leading-tight">Boost your participation and win more!</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsBoosterExpanded(!isBoosterExpanded)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isBoosterExpanded ? 'bg-amber-200 text-amber-900 rotate-180' : 'bg-white text-slate-400'}`}
                            >
                                <ChevronDown size={18} />
                            </button>
                            <button
                                onClick={handleBuyBooster}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[11px] font-black tracking-tight shadow-md active:scale-95 transition-all"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Expandable Benefits Info */}
                    {isBoosterExpanded && (
                        <div className="bg-white border-t border-amber-100 p-4 space-y-3 animate-in slide-in-from-top duration-300">
                            {/* 1. Winning Boost */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                                    <Zap size={16} className="text-yellow-500" fill="currentColor" />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black text-slate-800 leading-tight">60% Winning Boost</h4>
                                    <p className="text-[10px] font-bold text-slate-400 leading-none">जीतने के chances 60% तक बढ़ाएं</p>
                                </div>
                            </div>

                            {/* 2. Quiz Support */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                                    <Lightbulb size={16} className="text-yellow-500" fill="currentColor" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[12px] font-black text-slate-800 leading-tight">Quiz Support</h4>
                                    <p className="text-[10px] font-bold text-slate-400 leading-none mb-2">10 में से 6 सवालों में platform support मिलेगा</p>
                                    <div className="flex gap-1 overflow-x-auto no-scrollbar">
                                        {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                            <div key={n} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-black ${n === 5 ? 'bg-amber-400 text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                                                {n}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 3. Priority Entry */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                    <Rocket size={16} className="text-orange-500" fill="currentColor" />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black text-slate-800 leading-tight">Priority Participation</h4>
                                    <p className="text-[10px] font-bold text-slate-400 leading-none">Event में priority entry पाएं</p>
                                </div>
                            </div>

                            {/* 4. Support Badge */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Award size={16} className="text-blue-500" fill="currentColor" />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black text-slate-800 leading-tight">Support Badge</h4>
                                    <p className="text-[10px] font-bold text-slate-400 leading-none">तथा special support badge पाएं</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />
            <PaymentModal 
                isOpen={isPaymentOpen} 
                onClose={() => setIsPaymentOpen(false)} 
                amount={11} 
                plan="Event Support Booster" 
                onSuccess={handlePaymentSuccess} 
            />
            <div className="pb-8"></div>
        </div>
    );
};

export default Events;
