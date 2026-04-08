import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle2, Timer, Calendar, ShieldCheck, Sparkles, IndianRupee } from 'lucide-react';
import { useUser } from '../context/UserContext';

const FutureFund = () => {
    const navigate = useNavigate();
    const { userData, addNotification } = useUser();
    const { futureFund } = userData;
    const [viewState, setViewState] = React.useState('initial'); // initial, eligible, active

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (viewState === 'initial') {
                setViewState('eligible');
                addNotification("Eligibility Updated!", "Congratulations! You are now eligible for Future Fund.", "success");
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [viewState]);

    if (viewState === 'active') {
        return (
            <div className="flex flex-col min-h-screen bg-[#F1F5F9] animate-in slide-in-from-right duration-500 pb-20">
                {/* Header */}
                <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-4">
                    <button onClick={() => setViewState('eligible')} className="text-slate-600"><ChevronLeft size={24} /></button>
                    <h1 className="text-lg font-black text-slate-900 tracking-tight">Future Fund</h1>
                </div>

                <div className="p-4 space-y-4">
                    {/* Congratulations Banner */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🎉</span>
                            <div>
                                <h4 className="text-[13px] font-black text-slate-800 leading-tight">Congratulations!</h4>
                                <p className="text-[11px] font-bold text-slate-500">आप Future Fund के लिए eligible हो गए हैं</p>
                            </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Active</span>
                    </div>

                    {/* Today's Earning Box */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center">
                        <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2">Today's Future Fund Earning</p>
                        <h2 className="text-3xl font-black text-slate-900 mb-1">₹ 45.00</h2>
                        <p className="text-[11px] font-bold text-slate-500">आज इतना amount आपकी Future Fund में add हुआ है</p>
                    </div>

                    {/* Last 7 Days Earnings */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Last 7 Days Earnings</h4>
                        </div>
                        <div className="p-4 space-y-3">
                            {[
                                { day: 'Today', amount: '45' },
                                { day: 'Yesterday', amount: '38' },
                                { day: 'Day 3', amount: '52' },
                                { day: 'Day 4', amount: '40' },
                                { day: 'Day 5', amount: '35' },
                                { day: 'Day 6', amount: '28' },
                                { day: 'Day 7', amount: '42' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-[13px]">
                                    <span className="font-bold text-slate-500">{item.day}</span>
                                    <span className="font-black text-slate-800">₹ {item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total Future Fund */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex justify-between items-center">
                        <div>
                           <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest mb-1">Total Future Fund</h4>
                           <p className="text-[10px] font-bold text-slate-400">यह amount platform performance के हिसाब से रोज add होता है</p>
                        </div>
                        <h2 className="text-xl font-black text-slate-900 shrink-0">₹ 210</h2>
                    </div>

                    {/* Today Activity Progress */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="text-[12px] font-black text-slate-800 flex items-center gap-1.5">
                                <Timer size={14} className="text-slate-400" />
                                Today Activity
                            </h4>
                            <span className="text-[11px] font-black text-slate-400">45%</span>
                        </div>
                        <h3 className="text-[14px] font-black text-slate-800 mb-2">06:45 / 15:00 <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase">Minutes</span></h3>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-blue-500 w-[45%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 leading-none">🔥 8 मिनट और active रहें</p>
                    </div>
                </div>
            </div>
        );
    }

    const CRITERIA = [
        { 
            id: 1, 
            title: "Successful Sales", 
            target: "10-15 Sales", 
            current: futureFund.criteria.find(c => c.id === 1)?.current || 0,
            icon: ShieldCheck, 
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
        },
        { 
            id: 2, 
            title: "Daily Activity", 
            target: "15 Mins Daily", 
            current: "active",
            icon: Timer, 
            color: 'text-sky-500',
            bg: 'bg-sky-50'
        },
        { 
            id: 3, 
            title: "Active Days", 
            target: "7-10 Days", 
            current: futureFund.criteria.find(c => c.id === 2)?.current || 0,
            icon: Calendar, 
            color: 'text-indigo-500',
            bg: 'bg-indigo-50'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] animate-in slide-in-from-right duration-500 pb-6">
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 active:scale-95 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none text-uppercase">Future Fund</h1>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Long-term Growth Opportunity</p>
                </div>
            </div>

            <div className="flex-1 space-y-4">
                {/* Full Width Hero Card */}
                <div className="w-full bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-400 rounded-b-[2rem] p-5 text-white relative overflow-hidden shadow-xl shadow-indigo-100/50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-11 h-11 bg-white shadow-xl rounded-xl flex items-center justify-center mb-2 border border-white/20">
                            <TrendingUp size={22} className="text-indigo-600" />
                        </div>
                        <h2 className="text-lg font-black tracking-tight leading-none mb-1">Future Fund</h2>
                        <p className="text-[9px] font-bold text-indigo-100/80 uppercase tracking-widest leading-none">Monetization Program</p>
                        
                        <div className="mt-4 w-full max-w-[280px] bg-black/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 mx-auto">
                            <div className="flex justify-between items-center mb-1.5 px-1">
                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-100">Progress</span>
                                <span className="text-xs font-black">{futureFund.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden p-0.5 border border-white/10">
                                <div 
                                    className="h-full bg-white rounded-full transition-all duration-1000"
                                    style={{ width: `${futureFund.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-10 space-y-4">
                    {/* Description Section */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Sparkles size={14} className="text-amber-500" />
                            What is Future Fund?
                        </h3>
                        <p className="text-[12px] font-black text-slate-400 leading-relaxed italic border-l-3 border-indigo-500/20 pl-4">
                            "Future Fund is a long-term earning opportunity. Once activated, users become eligible for cash rewards derived from platform profits."
                        </p>
                    </div>

                    {/* Eligibility Criteria Cards */}
                    <div className="space-y-3">
                        {/* 1. Successful Sales */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                <h4 className="text-[14px] font-black text-slate-800">Successful Sales</h4>
                            </div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-[12px] font-bold text-slate-500">7 / 10 <span className="text-[10px] uppercase ml-1">Completed</span></span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[70%] rounded-full"></div>
                            </div>
                        </div>

                        {/* 2. Today's Activity */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Timer size={18} className="text-amber-500" />
                                <h4 className="text-[14px] font-black text-slate-800">Today's Activity</h4>
                            </div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-[12px] font-bold text-slate-500">12:30 / 15:00 <span className="text-[10px] uppercase ml-1">Minutes</span></span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-amber-500 w-[83%] rounded-full"></div>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 italic">✨ 3 मिनट और active रहें</p>
                        </div>

                        {/* 3. Active Days */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar size={18} className="text-blue-500" />
                                <h4 className="text-[14px] font-black text-slate-800">Active Days</h4>
                            </div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-[12px] font-bold text-slate-500">6 / 10 <span className="text-[10px] uppercase ml-1">Days</span></span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-3">
                            <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                                <span className="text-[12px] font-black">i</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-600 leading-tight">
                                App use करने पर time automatically count होगा.<br />
                                15 मिनट पूरा होने पर 1 दिन complete माना जाएगा
                            </p>
                        </div>

                        {/* Conditional Eligibility/Action Box */}
                        {viewState === 'initial' ? (
                            <div className="bg-rose-50/30 border-2 border-rose-100 rounded-xl p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-rose-500 mb-1">
                                    <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white">
                                        <span className="text-[10px]">✕</span>
                                    </div>
                                    <span className="text-[13px] font-black uppercase tracking-tight">Not Eligible Yet</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-1">Complete all 3 criteria to unlock Future Fund</p>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setViewState('active')}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-100 active:scale-95 transition-all text-sm tracking-tight flex items-center justify-center gap-2"
                            >
                                Move Forward <ChevronRight size={18} />
                            </button>
                        )}

                        {/* Secondary Action Button */}
                        <button 
                            onClick={() => navigate('/user/home')}
                            className="w-full bg-white border border-slate-200 text-slate-600 font-black py-3 text-[12px] rounded-xl active:scale-95 transition-all tracking-tight uppercase"
                        >
                            Continue Earning
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FutureFund;
