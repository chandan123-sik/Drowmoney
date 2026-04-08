import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TASKS } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { Coins, Zap, ShieldCheck, Gamepad2, Gift, Lock, ChevronRight, Rocket, Play, ExternalLink, Hash } from 'lucide-react';
import UnlockModal from '../components/UnlockModal';

const Earn = () => {
    const { userData } = useUser();
    const { isBoosterActive, isPaid } = userData;
    const [isUnlockOpen, setIsUnlockOpen] = useState(false);
    const navigate = useNavigate();

    const handleTaskClick = (taskId) => {
        if (!isPaid) {
            setIsUnlockOpen(true);
            return;
        }

        navigate(`/user/task/${taskId}`);
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Play': return <Play size={20} className="text-sky-500" />;
            case 'ExternalLink': return <ExternalLink size={20} className="text-sky-500" />;
            case 'Hash': return <Hash size={20} className="text-sky-500" />;
            default: return <Play size={20} className="text-sky-500" />;
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 animate-in fade-in duration-700">
            <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />

            {/* --- 3x Booster Header Banner --- */}
            {isBoosterActive && (
                <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-5 shadow-lg shadow-sky-200 relative overflow-hidden group">
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h3 className="text-white text-lg font-black flex items-center gap-2">
                                <Rocket className="animate-bounce" size={24} /> 3X BOOSTER ACTIVE
                            </h3>
                            <p className="text-sky-100 text-[11px] font-bold uppercase tracking-widest mt-1 opacity-90">Earning 3 Coins Per Task!</p>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -translate-x-4 -translate-y-4 blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
                </div>
            )}

            {/* --- Section Title --- */}
            <div className="px-1 mt-2">
                <h2 className="text-xl font-black text-sky-900 tracking-tight">Available Tasks</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Complete to earn coins instantly</p>
            </div>

            {/* --- Tasks List --- */}
            <div className="flex flex-col gap-3">
                {TASKS.map((task) => (
                    <div 
                        key={task.id} 
                        onClick={() => handleTaskClick(task.id)}
                        className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:border-sky-300 transition-all active:scale-[0.98] flex items-center justify-between group relative overflow-hidden cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                {getIcon(task.icon)}
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-slate-800">{task.title}</h4>
                                <p className="text-[10px] font-bold text-slate-400 bg-slate-50 inline-block px-1.5 py-0.5 rounded uppercase tracking-tighter mt-1">{task.type}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="bg-amber-50 text-amber-600 font-black text-sm px-2.5 py-1 rounded-lg ring-1 ring-amber-100">
                                +{isBoosterActive ? task.reward * 3 : task.reward} C
                            </div>
                            <button
                                onClick={() => handleTaskClick(task.id)}
                                className={`h-10 rounded-xl px-4 flex items-center justify-center transition-all ${!isPaid ? 'bg-slate-100 text-slate-400' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-100 active:scale-95'
                                    }`}>
                                {!isPaid ? <Lock size={16} /> : <ChevronRight size={18} />}
                            </button>
                        </div>

                        {/* --- Locked Overlay for Preview --- */}
                        {!isPaid && (
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-0"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* --- Coins History Preview --- */}
            <div className="mt-4 px-1">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[11px] font-black uppercase text-slate-500 tracking-widest">Recent Credits</h3>
                    <Link to="/user/history" className="text-[10px] font-black text-sky-600 uppercase hover:underline">View History</Link>
                </div>

                <div className="space-y-2">
                    {userData.coins.history.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-sky-50 last:border-0 border-dashed animate-in slide-in-from-right duration-300">
                            <div>
                                <p className="text-xs font-bold text-slate-800">{item.source}</p>
                                <p className="text-[9px] font-bold text-slate-400">{item.date}</p>
                            </div>
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${item.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {item.type === 'credit' ? '+' : '-'}{item.amount} C
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-2"></div>
        </div>
    );
};

export default Earn;

