import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
    ChevronLeft, ChevronRight, ChevronDown, Trophy, Timer, Users, Calendar,
    CircleHelp, Sparkles, Zap, Coins, Clock, Info, Lightbulb, Rocket, Award, CheckCircle2, AlertCircle
} from 'lucide-react';
import UnlockModal from '../components/UnlockModal';
import PaymentModal from '../components/PaymentModal';
import { eventStorage } from '../../shared/services/eventStorage';

const Events = () => {
    const { userData, addCoins, addNotification } = useUser();
    const [isUnlockOpen, setIsUnlockOpen] = useState(false);
    const [isBoosterExpanded, setIsBoosterExpanded] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [toast, setToast] = useState(null);
    const [eventList, setEventList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('dromoney_joined_events') || '[]');
        setJoinedEvents(saved);
        // Load events from admin-managed storage
        const allEvents = eventStorage.getEvents();
        setEventList(allEvents.filter(e => e.status === 'Active'));
    }, []);

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleBuyBooster = () => {
        setIsPaymentOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false);
        addNotification("Booster Activated!", "₹11 Event Support Booster successfully activated for 30 days.", "success");
        setIsBoosterExpanded(false);
    };

    const navigateToEvent = (event) => {
        switch (event.tag) {
            case 'Quiz': navigate(`/user/quiz/${event.id}`); break;
            case 'Draw': navigate(`/user/lucky-draw/${event.id}`); break;
            case 'Prediction': navigate(`/user/gold-prediction/${event.id}`); break;
            case 'Task': navigate(`/user/task-race/${event.id}`); break;
            default: break;
        }
    };

    const handleJoinEvent = (event) => {
        if (!userData.isPaid) {
            setIsUnlockOpen(true);
            return;
        }

        // If already joined, just navigate
        if (joinedEvents.includes(event.id)) {
            navigateToEvent(event);
            return;
        }

        if (userData.coins.total < event.fee) {
            showToast("Not enough coins to join!", "error");
            return;
        }

        // Deduct coins
        addCoins(-event.fee, `Event Entry: ${event.title}`);
        
        // Save joined status
        const newJoined = [...joinedEvents, event.id];
        setJoinedEvents(newJoined);
        localStorage.setItem('dromoney_joined_events', JSON.stringify(newJoined));

        showToast(`Successfully joined ${event.title}!`, "success");
        setTimeout(() => navigateToEvent(event), 900);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
            <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />
            
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-[57px] z-40">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/user/home')}
                        className="text-slate-600 active:scale-95 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-black text-slate-800 tracking-tight">Events</h1>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    <Coins size={16} className="text-amber-500 fill-amber-500" />
                    <span className="text-[14px] font-black text-amber-700">{userData.coins.total}</span>
                    <ChevronRight size={14} className="text-amber-400 rotate-180" />
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Trophy Banner */}
                <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-white">
                            <Trophy size={32} className="text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 leading-tight">Join Events and Win Prizes!</h2>
                            <p className="text-[11px] font-bold text-slate-500 mt-1">Use your coins to participate in events and win big!</p>
                        </div>
                    </div>
                </div>

                {/* Event Cards */}
                <div className="space-y-4">
                    {eventList.map((event) => {
                        const isJoined = joinedEvents.includes(event.id);
                        const isComingSoon = event.status !== 'Active';

                        return (
                            <div key={event.id} className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1.5">
                                        <h3 className="text-lg font-black text-slate-800 leading-none tracking-tight">{event.title}</h3>
                                        <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-widest">{event.tag}</span>
                                    </div>
                                    <button
                                        onClick={() => handleJoinEvent(event)}
                                        disabled={isComingSoon}
                                        className={`px-6 py-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all shadow-lg active:scale-95 ${
                                            isJoined 
                                            ? 'bg-emerald-500 text-white shadow-emerald-100' 
                                            : isComingSoon
                                            ? 'bg-slate-100 text-slate-400 opacity-60'
                                            : 'bg-blue-600 text-white shadow-blue-100'
                                        }`}
                                    >
                                        {isJoined ? "Joined" : isComingSoon ? "Soon" : "Join Event"}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-y-4">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Entry Fee:</p>
                                        <p className="text-sm font-black text-slate-800">{event.fee} Coins</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Prize:</p>
                                        <p className="text-sm font-black text-emerald-600">{event.prize}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Clock size={14} className="text-sky-400" />
                                        <span className="text-[11px] font-bold">
                                            {isComingSoon ? event.startTime : `Started | ${event.startTime}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Users size={14} className="text-emerald-400" />
                                        <span className="text-[11px] font-bold">
                                            {isComingSoon ? "Coming Soon" : `${event.participants} Participants`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Support Booster */}
                <div className="bg-amber-50 border border-amber-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-5 flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">₹11 Support Booster</h4>
                            <p className="text-[10px] font-bold text-slate-500 leading-tight">Boost your participation and win more!</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <button
                                onClick={() => setIsBoosterExpanded(!isBoosterExpanded)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isBoosterExpanded ? 'bg-amber-200 text-amber-900 rotate-180' : 'bg-white text-slate-400 border border-amber-100'}`}
                            >
                                <ChevronDown size={18} />
                            </button>
                            <button
                                onClick={handleBuyBooster}
                                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[11px] font-black tracking-widest uppercase shadow-md active:scale-95 transition-all"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {isBoosterExpanded && (
                        <div className="bg-white border-t border-amber-100 p-5 space-y-4 animate-in slide-in-from-top-4 duration-300">
                            {[
                                { icon: <Zap size={16} />, title: "60% Winning Boost", desc: "जीतने के chances 60% तक बढ़ाएं", color: "yellow" },
                                { icon: <Lightbulb size={16} />, title: "Quiz Support", desc: "10 में से 6 सवालों में platform support मिलेगा", color: "yellow" },
                                { icon: <Rocket size={16} />, title: "Priority Participation", desc: "Event में priority entry पाएं", color: "orange" },
                                { icon: <Award size={16} />, title: "Support Badge", desc: "Special support badge पाएं", color: "blue" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-${item.color}-500`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-800 leading-tight">{item.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 leading-none mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Toast */}
            {toast && (
                <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-xs p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100] ${
                    toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                    {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <p className="text-[11px] font-black uppercase tracking-widest">{toast.message}</p>
                </div>
            )}

            <PaymentModal 
                isOpen={isPaymentOpen} 
                onClose={() => setIsPaymentOpen(false)} 
                amount={11} 
                plan="Event Support Booster" 
                onSuccess={handlePaymentSuccess} 
            />
        </div>
    );
};

export default Events;
