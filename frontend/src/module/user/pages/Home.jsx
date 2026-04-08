import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Coins, Users, CreditCard, ChevronRight, Zap, Wallet, Sparkles, Send, Trophy, Gift } from 'lucide-react';

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

const Home = () => {
    const { userData, simulateSale, addNotification } = useUser();
    const { earnings, coins, referrals, futureFund, boosterDaysLeft, isBoosterActive } = userData;
    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(referrals.link);
        addNotification("Copied!", "Link copied to clipboard.", "success");
    };

    return (
        <div className="flex flex-col gap-4 p-4 animate-in fade-in duration-700 pb-2">

            {/* --- 3 Promotional Ad Banners (Auto-Scroll) --- */}
            <AdBanners navigate={navigate} />


            {/* --- Earnings StatCards (Renamed for Clarity) --- */}
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

            {/* --- Quick Actions Grid (UX Boost) --- */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { icon: Send, label: 'Refer', color: 'bg-emerald-50 text-emerald-600', path: '/user/profile' },
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

            {/* --- Professional Invite & Earn Card --- */}
            <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center"><Users size={20} /></div>
                        <div>
                            <h3 className="text-md font-black text-slate-800 tracking-tight leading-none">Affiliate Invite</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter italic">₹200 Instant Reward per sale</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 py-1 px-2.5 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                        <span className="text-emerald-700 font-black text-[8px] uppercase tracking-widest leading-none">Active</span>
                    </div>
                </div>

                <div className="bg-sky-50/50 border border-sky-100/50 rounded-2xl p-4 flex items-center justify-between gap-3 mb-6 relative z-10">
                    <p className="text-xs font-mono font-bold text-sky-800 truncate opacity-60 italic">{referrals.link}</p>
                    <button onClick={handleCopy} className="text-[10px] font-black text-sky-600 uppercase hover:underline whitespace-nowrap bg-white px-3 py-1.5 rounded-lg shadow-sm">Copy</button>
                </div>

                <button
                    onClick={simulateSale}
                    className="w-full bg-slate-900 hover:bg-black text-white rounded-2xl py-4 flex items-center justify-center gap-3 group transition-all active:scale-95 shadow-xl shadow-slate-100"
                >
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Invite & Earn Now</span>
                </button>
            </div>

            {/* --- Revenue Booster (Promotion Style) --- */}
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
                        onClick={() => navigate('/user/profile')}
                        className="p-1.5 bg-white border border-sky-200 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            {/* --- Future Fund (Gamified Target) --- */}
            <div className="bg-white border border-slate-50 rounded-2xl p-5 shadow-sm border-b-4 border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">FUTURE FUND</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[9px] font-black uppercase tracking-widest">Reward: ₹500 Bonus</div>
                        </div>
                    </div>
                    <div className="bg-sky-50 text-sky-600 w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black ring-4 ring-sky-50/50 relative overflow-hidden">
                        {futureFund.progress}%
                        <div className="absolute top-0 left-0 w-full h-[30%] bg-white/20 animate-in slide-in-from-top duration-1000"></div>
                    </div>
                </div>

                <div className="w-full h-3 bg-slate-50 rounded-full mb-8 relative overflow-hidden border border-slate-100 p-0.5">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-sky-600 rounded-full transition-all duration-1000 ease-out shadow-inner"
                        style={{ width: `${futureFund.progress}%` }}
                    ></div>
                </div>

                <div className="space-y-4">
                    {futureFund.criteria.map((item) => (
                        <div key={item.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ring-4 transition-all ${item.completed ? 'bg-emerald-500 ring-emerald-50' : 'bg-slate-200 ring-transparent group-hover:scale-110'}`}></div>
                                <span className={`text-[11px] font-black tracking-tight ${item.completed ? 'text-slate-800' : 'text-slate-400'}`}>{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded italic ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                    {item.current} / {item.target}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
