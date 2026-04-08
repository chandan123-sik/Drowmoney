import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { EVENTS } from '../data/mockData';
import { Trophy, Users, Timer, Sparkles, ChevronRight, Zap } from 'lucide-react';
import UnlockModal from '../components/UnlockModal';

const FEATURED_ADS = [
    { id: 1, title: "MEGA JACKPOT", subtitle: "NIGHT", reward: "₹500.00", fee: "100 C", tag: "HOT EVENT", bg: "bg-sky-500" },
    { id: 2, title: "DOUBLE", subtitle: "COIN FEST", reward: "2X COINS", fee: "FREE", tag: "SPECIAL", bg: "bg-indigo-500" },
    { id: 3, title: "CHAMPION", subtitle: "TOURNEY", reward: "₹1000", fee: "150 C", tag: "NEW SERIES", bg: "bg-emerald-500" }
];

const Events = () => {
    const { userData, joinEvent, joinedEvents } = useUser();
    const [isUnlockOpen, setIsUnlockOpen] = useState(false);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentAdIndex((prev) => (prev + 1) % FEATURED_ADS.length);
        }, 3000); // Switches ad every 3 seconds
        return () => clearInterval(timer);
    }, []);

    const handleJoinEvent = (event) => {
        if (!userData.isPaid) {
            setIsUnlockOpen(true);
            return;
        }

        if (joinedEvents.includes(event.id)) {
            navigate(`/user/contest/${event.id}`);
            return;
        }

        joinEvent(event.id, event.fee, event.title);
    };

    return (
        <div className="flex flex-col gap-5 p-4 animate-in fade-in duration-700">
            <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />

            {/* --- Featured Event Hero Banner Slider --- */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-sky-100 h-[155px] group">
                {FEATURED_ADS.map((ad, index) => (
                    <div 
                        key={ad.id}
                        className={`absolute inset-0 w-full h-full p-5 transition-opacity duration-1000 ease-in-out ${ad.bg} ${index === currentAdIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="relative z-10 text-white">
                            <div className="flex items-center gap-2 mb-2">
                               <Sparkles size={16} className="text-white/80 animate-pulse" />
                               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90">{ad.tag}</span>
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter mb-4 leading-none">{ad.title}<br />{ad.subtitle}</h2>
                            
                            <div className="flex gap-4">
                                <div>
                                   <p className="text-[9px] opacity-70 uppercase font-bold">Reward</p>
                                   <p className="font-extrabold text-white text-md leading-tight">Reward {ad.reward}</p>
                                </div>
                                <div className="w-px h-8 bg-white/20"></div>
                                <div>
                                   <p className="text-[9px] opacity-70 uppercase font-bold">Entry Fee</p>
                                   <p className="font-extrabold text-white text-md leading-tight">Entry {ad.fee}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Auto Switch Indicator Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {FEATURED_ADS.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentAdIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>

            {/* --- Events Category Title --- */}
            <div className="px-1">
                <h3 className="text-md font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Zap size={18} className="text-sky-500" /> Current Contests
                </h3>
            </div>

            {/* --- List of Contests --- */}
            <div className="flex flex-col gap-3">
                {EVENTS.map((event) => {
                    const isJoined = joinedEvents.includes(event.id);
                    return (
                        <div key={event.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:border-sky-300 transition-all group">
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="text-[13px] font-black text-slate-800 mb-0.5">{event.title}</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                                                <Users size={10} className="text-sky-400" /> {event.participants}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tight ${
                                        isJoined ? 'bg-emerald-500 text-white' : 'bg-sky-500 text-white'
                                    }`}>
                                        {isJoined ? 'Joined' : event.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-left">
                                            <p className="text-[9px] font-bold text-slate-300 uppercase leading-none">Entry</p>
                                            <p className="text-[11px] font-black text-slate-800">{event.fee} C</p>
                                        </div>
                                        <div className="w-px h-4 bg-slate-100"></div>
                                        <div className="text-left">
                                            <p className="text-[9px] font-bold text-slate-300 uppercase leading-none">Reward</p>
                                            <p className="text-[11px] font-black text-sky-600">{event.reward}</p>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => handleJoinEvent(event)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center gap-1 active:scale-95 ${
                                            isJoined 
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                            : 'bg-sky-500 text-white shadow-lg shadow-sky-50'
                                        }`}
                                    >
                                        {isJoined ? (
                                            <div className="flex items-center gap-1">
                                                <span>ENTER CONTEST</span>
                                                <ChevronRight size={14} className="animate-pulse" />
                                            </div>
                                        ) : 'Join'}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="h-1 w-full bg-sky-100">
                                <div className={`h-full bg-sky-500 ${isJoined ? 'w-full' : 'w-2/3'}`}></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="h-2"></div>
        </div>
    );
};

export default Events;
