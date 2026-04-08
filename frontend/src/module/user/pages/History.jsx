import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const { userData } = useUser();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 p-4 animate-in fade-in duration-700">
            {/* --- Section Title with Back Button --- */}
            <div className="flex items-center gap-3 mt-2">
                <button 
                    onClick={() => navigate(-1)} 
                    className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 transition-colors shadow-sm active:scale-95"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-black text-sky-900 tracking-tight flex items-center gap-2">
                        <Clock className="text-sky-500" size={20} /> History
                    </h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">All your earnings & spends</p>
                </div>
            </div>

            {/* --- Total Coins Summary Box --- */}
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-5 shadow-lg shadow-sky-200 relative overflow-hidden group mt-2">
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <p className="text-sky-100 text-[11px] font-bold uppercase tracking-widest opacity-90">Current Balance</p>
                        <h3 className="text-white text-3xl font-black mt-1">{userData.coins.total} <span className="text-lg text-sky-300">Coins</span></h3>
                    </div>
                </div>
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-x-4 -translate-y-4 blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
            </div>

            {/* --- Tasks List --- */}
            <div className="flex flex-col gap-3 mt-2">
                {(!userData.coins.history || userData.coins.history.length === 0) ? (
                    <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm">
                        <Clock className="mx-auto text-slate-300 mb-3" size={32} />
                        <h3 className="text-slate-500 font-bold">No history available</h3>
                        <p className="text-xs text-slate-400 mt-1">Complete tasks to view your earning history here.</p>
                    </div>
                ) : (
                    userData.coins.history.map((item, index) => (
                        <div key={item.id} style={{ animationDelay: `${index * 50}ms` }} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:border-sky-300 transition-colors flex items-center justify-between group relative overflow-hidden animate-in slide-in-from-bottom duration-500 fill-mode-both">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${item.type === 'credit' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                                    {item.type === 'credit' ? <span className="font-black text-xl">+</span> : <span className="font-black text-xl">-</span>}
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-800">{item.source}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 bg-slate-50 inline-block px-1.5 py-0.5 rounded uppercase tracking-tighter mt-1">{item.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`font-black text-sm px-2.5 py-1 rounded-lg ring-1 ${item.type === 'credit' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : 'bg-rose-50 text-rose-600 ring-rose-100'}`}>
                                    {item.type === 'credit' ? '+' : '-'}{item.amount} C
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="h-6"></div>
        </div>
    );
};

export default History;
