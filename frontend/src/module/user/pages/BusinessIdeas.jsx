import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
    Briefcase, ChevronLeft, Sparkles, Star, 
    Gift, ArrowRight, CheckCircle2, TrendingUp,
    Globe, Rocket, ShoppingCart, Zap, Lock
} from 'lucide-react';

const BusinessIdeas = () => {
    const navigate = useNavigate();
    const { userData } = useUser();
    const { isPaid } = userData;
    const [activeTab, setActiveTab] = useState('free');

    const FREE_IDEAS = [
        {
            id: 1,
            title: "Affiliate Marketing",
            desc: "Start promoting digital products via social media without any investment.",
            potential: "₹10k - ₹30k / mo",
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            id: 2,
            title: "Content Writing",
            desc: "Freelance writing for blogs and companies. Use your language skills.",
            potential: "₹5k - ₹20k / mo",
            icon: Globe,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            id: 3,
            title: "Re-selling Business",
            desc: "Use platforms like Meesho or eBay to sell products on WhatsApp.",
            potential: "₹8k - ₹15k / mo",
            icon: ShoppingCart,
            color: "text-amber-500",
            bg: "bg-amber-50"
        }
    ];

    const PREMIUM_IDEAS = [
        {
            id: 1,
            title: "Premium SaaS Agency",
            desc: "Build and sell custom software solutions for local businesses.",
            potential: "₹50k - ₹2L+ / mo",
            icon: Rocket,
            color: "text-purple-500",
            bg: "bg-purple-50",
            locked: true
        },
        {
            id: 2,
            title: "Dropshipping Master",
            desc: "Setup a high-conversion Shopify store and run global ads.",
            potential: "₹1L - ₹5L+ / mo",
            icon: Zap,
            color: "text-sky-500",
            bg: "bg-sky-50",
            locked: true
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] animate-in fade-in duration-500 pb-24">
            {/* Header Section */}
            <div className="bg-white px-5 pt-8 pb-6 flex items-center justify-between sticky top-0 z-30 border-b border-slate-100">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-slate-100"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="text-center">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Business Hub</h2>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Start Your Journey Today</p>
                </div>
                <div className="w-10 h-10"></div>
            </div>

            <div className="px-5 mt-6">
                {/* Visual Tab Switcher */}
                <div className="bg-white p-1.5 rounded-2xl border border-slate-100 flex items-center shadow-sm">
                    <button 
                        onClick={() => setActiveTab('free')}
                        className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2
                            ${activeTab === 'free' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Gift size={14} />
                        Free Ideas
                    </button>
                    <button 
                        onClick={() => setActiveTab('premium')}
                        className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2
                            ${activeTab === 'premium' ? 'bg-[#1A1C30] text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Lock size={14} />
                        Premium Ideas
                    </button>
                </div>

                <div className="mt-8 space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'free' ? (
                        FREE_IDEAS.map((idea) => (
                            <div key={idea.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 ${idea.bg} rounded-2xl flex items-center justify-center ${idea.color} shadow-sm border border-black/5`}>
                                        <idea.icon size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-base font-bold text-slate-900">{idea.title}</h3>
                                            <div className="bg-emerald-100/50 px-2.5 py-1 rounded-lg border border-emerald-100">
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Active</span>
                                            </div>
                                        </div>
                                        <p className="text-[12px] font-medium text-slate-400 mt-1 lines-clamp-2">{idea.desc}</p>
                                        
                                        <div className="mt-4 flex items-center justify-between bg-slate-50/80 px-4 py-3 rounded-2xl border border-slate-100/50">
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Earning Potential</p>
                                                <p className="text-[13px] font-bold text-emerald-600">{idea.potential}</p>
                                            </div>
                                            <button className="bg-white text-slate-900 p-2 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-90 transition-all">
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="space-y-6">
                            {/* Premium Banner */}
                            {!isPaid && (
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-7 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center border border-white/30">
                                            <Sparkles size={20} className="text-white" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Premium Exclusive</span>
                                    </div>
                                    <h3 className="text-xl font-bold leading-snug">Upgrade to Access High-Ticket Frameworks</h3>
                                    <p className="text-[12px] font-medium text-indigo-100 mt-2 opacity-80 leading-relaxed">
                                        Our premium members get access to pre-built business models and 1-on-1 mentorship sessions.
                                    </p>
                                </div>
                            )}

                            {PREMIUM_IDEAS.map((idea) => (
                                <div key={idea.id} className={`bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden group ${!isPaid ? 'opacity-60 grayscale filter' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 ${idea.bg} rounded-2xl flex items-center justify-center ${idea.color} border border-black/5`}>
                                            <idea.icon size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-base font-bold text-slate-900">{idea.title}</h3>
                                                {!isPaid && <Lock size={16} className="text-slate-400" />}
                                            </div>
                                            <p className="text-[12px] font-medium text-slate-400 mt-1">{idea.desc}</p>
                                            
                                            {isPaid && (
                                                <div className="mt-4 flex items-center justify-between bg-indigo-50/50 px-4 py-3 rounded-2xl border border-indigo-100/50">
                                                    <div>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Earning Potential</p>
                                                        <p className="text-[13px] font-bold text-indigo-600">{idea.potential}</p>
                                                    </div>
                                                    <button className="bg-white text-indigo-600 p-2 rounded-xl border border-indigo-200 shadow-sm hover:bg-slate-50 active:scale-90 transition-all">
                                                        <ArrowRight size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!isPaid && (
                                <button
                                    onClick={() => navigate('/user/income')} 
                                    className="w-full bg-[#1A1C30] text-white py-5 rounded-[1.75rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 transition-all"
                                >
                                    Upgrade to Unlock Ideas
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="px-5 mt-8">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-slate-800 tracking-tight">Verified Strategies</p>
                        <p className="text-[11px] font-medium text-slate-400 leading-tight">All ideas are tested by our expert team for success.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessIdeas;
