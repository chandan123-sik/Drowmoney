import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
    IndianRupee, Coins, Users, CreditCard, ChevronRight, Zap, 
    Wallet, Sparkles, Send, Trophy, Gift, Shield, Rocket, CheckCircle2
} from 'lucide-react';

const BANNERS = [
    {
        id: 1,
        tag: 'Affiliate Program',
        title: 'Earn ₹200 Per Sale',
        subtitle: 'Share your link & get instant commission on every referral',
        cta: 'Invite Now',
        path: '/user/profile',
        gradient: 'from-sky-500 to-sky-700',
        icon: Users,
        iconBg: 'bg-white/10',
    },
    {
        id: 2,
        tag: '3X Booster Active',
        title: 'Multiply Your Coins',
        subtitle: 'Upgrade to Monthly Booster and earn 3x coins on every task',
        cta: 'Upgrade Now',
        path: '/user/profile',
        gradient: 'from-indigo-500 to-indigo-700',
        icon: Zap,
        iconBg: 'bg-white/10',
    },
    {
        id: 3,
        tag: 'Live Contest',
        title: 'Win Up To ₹500',
        subtitle: 'Join the Mega Jackpot Night — limited seats, big rewards!',
        cta: 'Join Event',
        path: '/user/events',
        gradient: 'from-emerald-500 to-teal-600',
        icon: Trophy,
        iconBg: 'bg-white/10',
    },
];

const AdBanners = ({ navigate }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive(prev => (prev + 1) % BANNERS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const banner = BANNERS[active];
    const BannerIcon = banner.icon;

    return (
        <div className="relative">
            <div
                className={`bg-gradient-to-r ${banner.gradient} rounded-2xl p-4 shadow-lg relative overflow-hidden transition-all duration-500 group cursor-pointer`}
                onClick={() => navigate(banner.path)}
            >
                {/* Background Icon */}
                <div className="absolute -right-4 -bottom-4 opacity-10">
                    <BannerIcon size={110} />
                </div>

                <div className="relative z-10 text-white">
                    <span className="text-[8px] font-black uppercase tracking-[0.25em] bg-white/20 px-2 py-0.5 rounded-full">
                        {banner.tag}
                    </span>
                    <h2 className="text-xl font-black tracking-tight mt-2 leading-none">{banner.title}</h2>
                    <p className="text-[10px] font-bold text-white/70 mt-1 mb-3 leading-tight max-w-[65%]">{banner.subtitle}</p>
                    <div className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition-all active:scale-95">
                        <span className="text-[9px] font-black uppercase tracking-widest">{banner.cta}</span>
                        <ChevronRight size={12} />
                    </div>
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`rounded-full transition-all duration-300 ${i === active ? 'w-4 h-1.5 bg-sky-500' : 'w-1.5 h-1.5 bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// --- Custom Social Icons (SVG) to avoid library issues ---
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
);

const Home = () => {
    const { userData, simulateSale, addNotification } = useUser();
    const { earnings, coins, referrals, futureFund, boosterDaysLeft, isBoosterActive } = userData;
    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(referrals.link);
        addNotification("Copied!", "Link copied to clipboard.", "success");
    };

    return (
        <div className="flex flex-col animate-in fade-in duration-700 min-h-full">
            {/* Main Content Area */}
            <div className="flex flex-col gap-4 p-4 pb-2">
                {/* --- 3 Promotional Ad Banners (Auto-Scroll) --- */}
                <AdBanners navigate={navigate} />


                {/* --- Earnings StatCards --- */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-sky-300 transition-all">
                        <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest mb-1 leading-none">Today's Earnings</p>
                        <h2 className="text-2xl font-black text-sky-900 leading-none">₹{earnings.today}</h2>
                        <div className="absolute right-0 bottom-0 text-sky-900 opacity-5 translate-x-2 translate-y-2 group-hover:scale-110 transition-transform">
                            <IndianRupee size={56} />
                        </div>
                    </div>
                    <div className="bg-sky-600 rounded-2xl p-4 shadow-lg shadow-sky-200 relative overflow-hidden group">
                        <p className="text-[9px] font-black text-sky-100 uppercase tracking-widest mb-1 leading-none">Total Earnings</p>
                        <h2 className="text-2xl font-black text-white leading-none">₹{earnings.total}</h2>
                        <div className="absolute right-0 bottom-0 text-white opacity-10 translate-x-2 translate-y-2 group-hover:scale-110 transition-transform">
                            <CreditCard size={56} />
                        </div>
                    </div>
                </div>

                {/* --- Quick Actions Grid --- */}
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { icon: Send, label: 'Refer', color: 'bg-emerald-50 text-emerald-600', path: '/user/income' },
                        { icon: Coins, label: 'Earn', color: 'bg-amber-50 text-amber-600', path: '/user/earn' },
                        { icon: Wallet, label: 'Payout', color: 'bg-rose-50 text-rose-600', path: '/user/wallet' },
                        { icon: Sparkles, label: 'Events', color: 'bg-indigo-50 text-indigo-600', path: '/user/events' }
                    ].map((action, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(action.path)}
                            className="flex flex-col items-center gap-2 group transition-all"
                        >
                            <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:-translate-y-1 transition-all border border-white ring-4 ring-transparent hover:ring-sky-50`}>
                                <action.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tight text-slate-500 opacity-80">{action.label}</span>
                        </button>
                    ))}
                </div>

                {/* --- Coins Section --- */}
                <div className="bg-white border border-amber-100 rounded-2xl p-4 flex items-center justify-between group shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:rotate-12 transition-transform">
                            <Coins className="text-amber-500" size={26} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">My Coin Balance</p>
                            <div className="flex items-baseline gap-1.5">
                                <h3 className="text-2xl font-black text-slate-800 leading-none">{coins.total}</h3>
                                <span className="text-[10px] font-bold text-slate-400 uppercase italic">Coins</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/user/earn')}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-amber-100 flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                        Earn Coins <ChevronRight size={14} />
                    </button>
                </div>


                {/* --- Revenue Booster --- */}
                <div className="bg-sky-50 border border-sky-100/50 px-4 py-4 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-4 ring-white animate-in zoom-in duration-1000 ${isBoosterActive ? 'bg-sky-500 text-white' : 'bg-white text-sky-300'}`}>
                            <Zap size={28} className={isBoosterActive ? 'animate-pulse' : ''} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-700 uppercase leading-none tracking-tight">Boost Earnings 3X</h4>
                            <p className="text-[10px] font-bold text-sky-500 mt-1 uppercase tracking-widest">{isBoosterActive ? `${boosterDaysLeft} Days Remaining` : 'Increase Coin Value Now'}</p>
                        </div>
                    </div>
                    {!isBoosterActive && (
                        <button
                            onClick={() => navigate('/user/events')}
                            className="p-1.5 bg-white border border-sky-200 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all shadow-sm active:scale-90"
                        >
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>

                {/* --- Future Fund Preview Card --- */}
                <div 
                    onClick={() => navigate('/user/future-fund')}
                    className="bg-white border border-slate-50 rounded-2xl p-5 shadow-sm border-b-4 border-slate-100 cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">FUTURE FUND</h3>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Eligibility Tracking Active</p>
                        </div>
                        <div className="bg-sky-50 text-sky-600 font-black text-xs px-3 py-1.5 rounded-xl border border-sky-100 shadow-sm">
                            {futureFund.progress}%
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-full h-2.5 bg-slate-50 rounded-full mb-3 relative overflow-hidden border border-slate-100 p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-sky-600 rounded-full transition-all duration-1000 ease-out shadow-inner"
                                style={{ width: `${futureFund.progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-sky-500">
                            <span>Track Progress</span>
                            <ChevronRight size={14} />
                        </div>
                    </div>
                </div>

                {/* --- Lifetime Service Info --- */}
                <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                                <Rocket size={20} className="text-sky-400" />
                            </div>
                            <h3 className="text-lg font-black text-white tracking-tight uppercase">Lifetime Access</h3>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                            <p className="text-[13px] font-black text-sky-400 italic leading-none">👉 “₹499 buy course '' One Time</p>
                            <p className="text-[11px] font-bold text-white/70 mt-2 leading-tight">उसके बाद लाइफ टाइम सर्विस अनलॉक रहेगी ।</p>
                        </div>

                        <div className="space-y-3 pl-1">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">इसके बाद यूज़र:</p>
                            {[
                                "सभी earning features use कर सकता है",
                                "tasks complete कर सकता है",
                                "events में भाग ले सकता है"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 group/item">
                                    <div className="w-5 h-5 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/30">
                                        <CheckCircle2 size={10} className="text-sky-400" />
                                    </div>
                                    <span className="text-[12px] font-black text-white/90 tracking-tight leading-none">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Integrated Professional Footer (Connected to Navbar) --- */}
            <footer className="bg-white border-t border-slate-100 p-5 pt-6 pb-4 mt-auto">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-black/5">
                                <Shield size={18} className="text-sky-400" />
                            </div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight leading-none">Drowmoney</h2>
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 max-w-[150px] leading-tight mt-1">
                            India's most trusted affiliate and task-based earning platform.
                        </p>
                    </div>

                    <div className="flex gap-2.5">
                        <div className="w-9 h-9 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer active:scale-95 shadow-sm">
                            <InstagramIcon />
                        </div>
                        <div className="w-9 h-9 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer active:scale-95 shadow-sm">
                            <FacebookIcon />
                        </div>
                        <div className="w-9 h-9 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 hover:text-black hover:bg-slate-100 transition-all cursor-pointer active:scale-95 shadow-sm">
                            <XIcon />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 pt-6 border-t border-slate-50 mb-6">
                    <div className="flex flex-col gap-2.5">
                        <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 opacity-40">Policies</p>
                        <button onClick={() => navigate('/user/info/privacy')} className="text-[10px] font-black text-slate-400 hover:text-sky-500 text-left transition-colors uppercase tracking-tight leading-none italic">Privacy Policy</button>
                        <button onClick={() => navigate('/user/info/refund')} className="text-[10px] font-black text-slate-400 hover:text-sky-500 text-left transition-colors uppercase tracking-tight leading-none italic">Refund Policy</button>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 opacity-40">Company</p>
                        <button onClick={() => navigate('/user/info/terms')} className="text-[10px] font-black text-slate-400 hover:text-sky-500 text-left transition-colors uppercase tracking-tight leading-none italic">Terms & Conditions</button>
                        <button onClick={() => navigate('/user/info/guidelines')} className="text-[10px] font-black text-slate-400 hover:text-sky-500 text-left transition-colors uppercase tracking-tight leading-none italic">Guidelines</button>
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-50 text-center pb-1">
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">© 2026 Drowmoney • All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
