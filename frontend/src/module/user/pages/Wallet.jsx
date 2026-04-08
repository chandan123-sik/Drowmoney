import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { CreditCard, Wallet as WalletIcon, IndianRupee, ArrowUpRight, ArrowDownLeft, History, Filter, AlertCircle, Sparkles } from 'lucide-react';
import UnlockModal from '../components/UnlockModal';

const Wallet = () => {
    const { userData, requestWithdrawal, addNotification } = useUser();
    const { wallet, isPaid } = userData;
    const [amount, setAmount] = useState('');
    const [isUnlockOpen, setIsUnlockOpen] = useState(false);
    const [filter, setFilter] = useState('All'); // 'All', 'Earning', 'Payout'

    const handleWithdraw = () => {
        if (!isPaid) {
            setIsUnlockOpen(true);
            return;
        }

        const val = parseFloat(amount);
        if (isNaN(val) || val < 500) {
            addNotification("Invalid Amount", "Minimum withdrawal is ₹500.", "warning");
            return;
        }

        if (val > wallet.balance) {
            addNotification("Insufficient Balance", "You don't have enough balance.", "warning");
            return;
        }

        const success = requestWithdrawal(val);
        if (success) {
            setAmount('');
            addNotification("Success", "Withdrawal requested successfully.", "success");
        }
    };

    const filteredTransactions = wallet.transactions.filter(tx => {
        if (filter === 'Earning') return tx.type === 'credit';
        if (filter === 'Payout') return tx.type === 'withdrawal';
        return true;
    });

    return (
        <div className="flex flex-col gap-6 p-4 animate-in fade-in duration-700 pb-8">
            <UnlockModal isOpen={isUnlockOpen} onClose={() => setIsUnlockOpen(false)} />

            {/* --- Premium FinTech Card Display --- */}
            <div className="relative rounded-2xl p-5 shadow-2xl overflow-hidden group bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 mt-2">
                {/* Decorative Gradients for Glassmorphism */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                    {/* Top Row: Brand & Chip */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 opacity-90">
                            <div className="w-7 h-5 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                                <Sparkles size={10} className="text-white" />
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-white/80 font-bold">Virtual</span>
                        </div>
                        <CreditCard size={20} className="text-white/60" />
                    </div>

                    {/* Middle Row: Balance */}
                    <div className="mt-1">
                        <p className="text-white/70 text-[9px] font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                            <WalletIcon size={12}/> Net Available Balance
                        </p>
                        <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-0.5 transition-transform group-hover:scale-[1.02]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                            <IndianRupee size={24} className="translate-y-0.5 opacity-80" /> 
                            {wallet.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </h2>
                    </div>

                    {/* Bottom Row: Detail */}
                    <div className="flex justify-between items-end border-t border-white/10 pt-3 mt-1">
                        <div>
                           <p className="text-[8px] uppercase tracking-[0.2em] text-white/50 font-black mb-0.5">Card Holder</p>
                           <p className="font-extrabold text-white text-xs tracking-widest uppercase">{userData.name || 'USER'}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[8px] uppercase tracking-[0.2em] text-white/50 font-black mb-0.5">Valid Thru</p>
                           <p className="font-extrabold text-white text-xs tracking-widest">12/30</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Smart Withdrawal Section --- */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                    <ArrowUpRight size={120} />
                </div>
                
                <div className="relative z-10">
                    <div className="mb-4">
                        <h3 className="text-base font-black text-slate-800 tracking-tight">Quick Withdrawal</h3>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">Transfer to linked bank</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="relative flex items-center">
                            <div className="absolute left-4 bg-slate-100 p-2 rounded-xl">
                                <IndianRupee size={16} className="text-slate-600" strokeWidth={2.5} />
                            </div>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Min. ₹500" 
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-4 pl-16 pr-4 text-base font-black text-slate-800 placeholder:text-slate-300 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <button 
                            onClick={handleWithdraw}
                            className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 
                                ${amount >= 500 && amount <= wallet.balance 
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-300 hover:bg-slate-800 scale-100' 
                                : 'bg-slate-100 text-slate-400'}`}
                        >
                            Withdraw Funds <ArrowUpRight size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] bg-slate-50 py-2.5 rounded-xl border border-slate-100 border-dashed">
                        <AlertCircle size={12} className="text-amber-500" /> Processing time: 12-24 Hrs
                    </div>
                </div>
            </div>

            {/* --- Categorized Ledger --- */}
            <div className="mt-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[13px] font-black uppercase text-slate-800 tracking-widest flex items-center gap-2">
                        <History size={16} className="text-sky-500" strokeWidth={2.5} /> Ledger
                    </h3>
                    
                    {/* Filters */}
                    <div className="flex bg-slate-100 p-1.5 rounded-xl">
                        {['All', 'Earning', 'Payout'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${filter === tab ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col gap-3">
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 rounded-3xl border border-slate-100 border-dashed">
                            <Filter size={24} className="mx-auto text-slate-300 mb-3" />
                            <h4 className="text-sm font-black text-slate-500">No Transactions</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Try changing the filter</p>
                        </div>
                    ) : (
                        filteredTransactions.map((tx, index) => (
                            <div key={tx.id} style={{ animationDelay: `${index * 50}ms` }} className="bg-white border hover:border-sky-100 border-slate-100/60 rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all flex items-center justify-between group animate-in slide-in-from-bottom duration-500 fill-mode-both relative overflow-hidden">
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                                        tx.type === 'credit' ? 'bg-emerald-50 text-emerald-500' : 
                                        tx.type === 'withdrawal' ? 'bg-rose-50 text-rose-500' : 'bg-sky-50 text-sky-500'
                                    }`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft size={20} strokeWidth={2.5} /> : <ArrowUpRight size={20} strokeWidth={2.5} />}
                                    </div>
                                    <div className="max-w-[130px]">
                                        <h4 className="text-sm font-black text-slate-800 truncate">{tx.title}</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{tx.date}</p>
                                    </div>
                                </div>

                                <div className="text-right relative z-10">
                                    <p className={`text-sm font-black tracking-tight ${tx.type === 'credit' ? 'text-emerald-500' : 'text-slate-800'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                    </p>
                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase inline-block mt-1 ${
                                        tx.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="h-6"></div>
        </div>
    );
};

export default Wallet;
