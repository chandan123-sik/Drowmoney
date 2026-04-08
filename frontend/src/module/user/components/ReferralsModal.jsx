import React from 'react';
import { X, Users, IndianRupee } from 'lucide-react';

const ReferralsModal = ({ isOpen, onClose, referralCount = 6 }) => {
    if (!isOpen) return null;

    // Dummy data for visual representation
    const friends = [
        { name: 'Amit Kumar', date: 'Today, 10:30 AM', bonus: 200 },
        { name: 'Neha Sharma', date: 'Yesterday', bonus: 200 },
        { name: 'Priya Singh', date: '2 Days ago', bonus: 200 },
        { name: 'Rahul V.', date: '3 Days ago', bonus: 200 },
        { name: 'Sanjay M.', date: 'Last Week', bonus: 200 },
        { name: 'Vikram Z.', date: 'Last Week', bonus: 200 }
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            
            <div className="relative bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
                
                <div className="p-5 bg-white border-b border-slate-100 flex justify-between items-center z-10 sticky top-0 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center border border-sky-100/50">
                            <Users size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-800 text-[16px] tracking-tight">My Referrals</h3>
                            <p className="text-[9px] uppercase tracking-widest text-sky-500 font-black">{referralCount} Successful Invites</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-95 transition-all outline-none border border-slate-100">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto bg-slate-50/80">
                    <div className="flex flex-col gap-3">
                        {friends.slice(0, referralCount).map((friend, i) => (
                            <div key={i} style={{ animationDelay: `${i * 50}ms` }} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex justify-between items-center animate-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                                <div className="flex items-center gap-3">
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm uppercase ${i % 2 === 0 ? 'bg-sky-50 text-sky-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                        {friend.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-black text-slate-800">{friend.name}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{friend.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg flex items-center gap-0.5 border border-emerald-100/50">
                                        +<IndianRupee size={10} />{friend.bonus}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-5 bg-white border-t border-slate-100 sticky bottom-0">
                    <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200">
                        Close List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReferralsModal;
