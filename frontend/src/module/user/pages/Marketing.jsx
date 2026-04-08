import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
    Users, Copy, Send, ChevronLeft, ArrowRight,
    History, CheckCircle2, DollarSign, Share2, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Marketing = () => {
    const navigate = useNavigate();
    const { userData } = useUser();
    const [copied, setCopied] = useState(false);

    const referralLink = `https://earningapp.com/join/${userData?.name?.split(' ')[0] || 'USER'}${userData?.id || '777'}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white animate-in zoom-in-95 duration-700 pb-20">
            {/* Minimal Header */}
            <div className="px-6 pt-12 pb-6 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-slate-800 active:scale-90 transition-all hover:bg-slate-100"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">SHARE <span className="text-sky-500">& EARN</span></h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 opacity-60">Affiliate Center</p>
                </div>
                <div className="w-12 h-12"></div>
            </div>

            <div className="px-6 space-y-8">
                {/* Main Invite Card (The 'WOW' Card) */}
                <div className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(15,118,110,0.15)] border border-slate-50 relative overflow-hidden group">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-60"></div>

                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-sky-200">
                                <Users size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none">Affiliate Invite</h3>
                                <p className="text-[11px] font-black text-emerald-500 uppercase tracking-widest mt-2 flex items-center gap-1">
                                    ₹200 Instant Reward <CheckCircle2 size={12} className="fill-emerald-50 text-emerald-500" />
                                </p>
                            </div>
                        </div>
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm shadow-emerald-50 animate-pulse">
                            Active
                        </div>
                    </div>

                    {/* Referral Link Box */}
                    <div className="bg-slate-50/70 rounded-3xl p-6 border-2 border-dashed border-slate-100 mb-10 group-hover:border-sky-300 transition-colors relative z-10">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-black text-slate-400 truncate pr-6 tracking-tight opacity-80">
                                {referralLink}
                            </p>
                            <button
                                onClick={handleCopy}
                                className={`px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95
                                    ${copied ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-white text-sky-600 shadow-slate-100'}`}
                            >
                                {copied ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                    </div>

                    {/* Invite Button */}
                    <button className="w-full bg-[#1A1C30] hover:bg-black active:scale-95 text-white font-black uppercase tracking-[0.2em] py-6 rounded-[1.75rem] flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 transition-all relative z-10">
                        <Send size={22} className="rotate-[-20deg]" />
                        INVITE & EARN NOW
                    </button>
                </div>

                {/* Simplified Bottom Section */}
                <div className="flex flex-col gap-6 pt-4">
                    {/* Small Stat Strip */}
                    <div className="bg-slate-50/50 rounded-full px-6 py-4 flex items-center justify-between border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                <Users size={16} className="text-sky-500" />
                            </div>
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Total Members</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">4 Participants</span>
                    </div>

                    {/* BIG VIEW HISTORY BUTTON */}
                    <button
                        onClick={() => navigate('/user/marketing-history')}
                        className="w-full bg-white border-2 border-slate-100 py-5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-95 transition-all group"
                    >
                        <History size={20} className="text-slate-400 group-hover:text-sky-500" />
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">VIEW HISTORY</span>
                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-emerald-500 translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </button>

                    {/* Total Earned Simplified */}
                    <div className="bg-emerald-500 rounded-[2.5rem] p-7 flex items-center justify-between shadow-2xl shadow-emerald-100 mt-2 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 text-white/5 -translate-y-4 translate-x-4">
                            <DollarSign size={100} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-emerald-100 text-[11px] font-black uppercase tracking-widest mb-1">TOTAL EARNINGS</p>
                            <p className="text-3xl font-black text-white tracking-tighter">₹800.00</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-[1.5rem] flex items-center justify-center border border-white/30 relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                            <DollarSign size={32} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketing;
