import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import PaymentModal from '../components/PaymentModal';
import {
    Share2, TrendingUp, CheckSquare, Trophy, Briefcase,
    Sparkles, ChevronRight, Lock, Loader2, ShieldCheck, Zap,
    UploadCloud, Fingerprint, Image as ImageIcon, CheckCircle2, Clock
} from 'lucide-react';

// ─── 6 Income Cards Config (Modern Fintech Design) ───────────────────────────
const INCOME_OPTIONS = [
    {
        id: 1,
        title: 'Earn ₹200 Per Referral',
        subtitle: 'Invite users and earn ₹200 on each purchase',
        icon: Share2,
        bg: 'bg-gradient-to-br from-blue-600 via-sky-500 to-emerald-400',
        cta: 'Invite & Earn',
        route: '/user/marketing',
        isHighlight: true
    },
    {
        id: 2,
        title: 'Future Fund',
        subtitle: 'Complete targets & earn bonus rewards',
        icon: TrendingUp,
        bg: 'bg-indigo-50',
        borderColor: 'border-indigo-100',
        cta: 'View Progress',
        route: '/user/future-fund',
        hasProgress: true
    },
    {
        id: 3,
        title: 'Earn Coins Daily',
        subtitle: 'Complete tasks and earn coins',
        icon: CheckSquare,
        bg: 'bg-orange-50',
        borderColor: 'border-orange-100',
        cta: 'Start Tasks',
        route: '/user/earn',
    },
    {
        id: 4,
        title: 'Win Real Cash',
        subtitle: 'Join events and win rewards',
        icon: Trophy,
        bg: 'bg-purple-50',
        borderColor: 'border-purple-100',
        cta: 'Join Now',
        route: '/user/events',
    },
    {
        id: 5,
        title: 'Start Your Business',
        subtitle: 'Explore free & premium ideas',
        icon: Briefcase,
        bg: 'bg-emerald-50',
        borderColor: 'border-emerald-100',
        cta: 'Explore',
        route: '/user/business-ideas',
    },
    {
        id: 6,
        title: 'Future Features',
        subtitle: 'Upcoming earning opportunities',
        icon: Sparkles,
        bg: 'bg-slate-100',
        borderColor: 'border-slate-200',
        cta: 'Discover',
        route: '/user/info/future-features',
        locked: false,
    },
];

const Income = () => {
    const navigate = useNavigate();
    const { userData, unlockPlatform } = useUser();
    const { isPaid } = userData;

    // --- State Management ---
    const [kycStatus, setKycStatus] = useState(() => localStorage.getItem('hk_kyc_status') || null);
    const [aadhaarNum, setAadhaarNum] = useState('');
    const [kycPhoto, setKycPhoto] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setKycPhoto(URL.createObjectURL(file));
        }
    };

    const handleKycSubmit = () => {
        if (!aadhaarNum || !kycPhoto) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setKycStatus('pending');
            localStorage.setItem('hk_kyc_status', 'pending');
        }, 1500);
    };

    // Helper for testing: Force approve KYC
    const forceApproveKyc = () => {
        setKycStatus('approved');
        localStorage.setItem('hk_kyc_status', 'approved');
    };

    const handlePaymentSuccess = () => {
        unlockPlatform();
        setIsPaymentOpen(false);
    };

    const handleCardClick = (route) => {
        if (route) navigate(route);
    };

    // ── LAYER 1: KYC Input (Redesigned for Full Page Feel) ──────────────────────
    if (kycStatus === null) {
        return (
            <div className="flex flex-col min-h-screen bg-white animate-in fade-in duration-700 pb-28">
                {/* Visual Header Background */}
                <div className="bg-gradient-to-b from-sky-50 to-white px-6 pt-10 pb-8 text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-100 border border-sky-50 relative">
                        <Fingerprint size={40} className="text-sky-500" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                            <ShieldCheck size={12} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Verify Your <span className="text-sky-500">Identity</span></h2>
                    <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Mandatory KYC for Income Access</p>
                </div>

                <div className="px-8 space-y-8 mt-4">
                    {/* Aadhaar Input */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Aadhaar Card Number</label>
                            <span className="text-[9px] font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">Secure 256-bit</span>
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors">
                                <ShieldCheck size={20} />
                            </div>
                            <input
                                type="text"
                                maxLength={12}
                                placeholder="0000 0000 0000"
                                value={aadhaarNum}
                                onChange={(e) => setAadhaarNum(e.target.value.replace(/\D/g, ''))}
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-4 text-sm font-black focus:bg-white focus:border-sky-500 focus:ring-0 transition-all placeholder:text-slate-300 tracking-[0.1em]"
                            />
                        </div>
                    </div>

                    {/* Photo Upload Area (Smaller as requested) */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest px-1">Upload Original Photo</label>
                        <div className="relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className={`w-full h-40 rounded-[2rem] border-2 border-dashed transition-all overflow-hidden relative flex flex-col items-center justify-center
                                ${kycPhoto ? 'border-sky-500 bg-white' : 'border-slate-200 bg-slate-50 group-hover:border-sky-300 group-hover:bg-sky-50/50'}`}>

                                {kycPhoto ? (
                                    <>
                                        <img src={kycPhoto} alt="KYC Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform">
                                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Document Selected</span>
                                            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[9px] font-bold">Tap to change</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                            <UploadCloud size={24} className="text-slate-300 group-hover:text-sky-500" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tap to Upload Document<br /><span className="text-[8px] opacity-60 font-medium lowercase">(jpeg, png up to 5mb)</span></p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleKycSubmit}
                            disabled={!aadhaarNum || !kycPhoto || loading}
                            className={`w-full py-5 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95
                                ${!aadhaarNum || !kycPhoto
                                    ? 'bg-slate-100 text-slate-300'
                                    : 'bg-sky-500 text-white shadow-sky-200 hover:bg-sky-600'}`}
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : 'Request Verification'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── LAYER 2: Pending Approval (With 10s Auto-Simulator) ─────────────────────
    const PendingLayer = () => {
        useEffect(() => {
            const timer = setTimeout(() => {
                forceApproveKyc();
            }, 10000); // 10 seconds auto-approval
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="flex flex-col items-center justify-center p-10 min-h-screen bg-white animate-in zoom-in-95 duration-700">
                <div className="relative w-32 h-32 mb-10">
                    <div className="absolute inset-0 bg-sky-50 rounded-[3rem] rotate-12 animate-pulse"></div>
                    <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl shadow-sky-100 border border-sky-50 flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                        <Clock size={52} className="text-sky-500 animate-spin-slow" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg rotate-12">
                        WAITING
                    </div>
                </div>

                <div className="text-center max-w-xs">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Analyzing <span className="text-sky-500">Data...</span></h2>
                    <p className="text-sm font-bold text-slate-400 mt-4 leading-relaxed">
                        "Your documents are in the secure admin queue. Verification usually finishes in <span className="text-sky-600 font-black">5 minutes</span>."
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-2">
                        <Loader2 size={20} className="text-sky-300 animate-spin" />
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Simulator: Auto-Approving in 10s</span>
                    </div>
                </div>
            </div>
        );
    };

    if (kycStatus === 'pending') return <PendingLayer />;

    // ── LAYER 3: Approved but not Paid ──────────────────────────────────────
    if (kycStatus === 'approved' && !isPaid) {
        return (
            <>
                {isPaymentOpen && (
                    <PaymentModal
                        isOpen={true}
                        onClose={() => setIsPaymentOpen(false)}
                        plan="Income Access"
                        amount={499}
                        onSuccess={handlePaymentSuccess}
                    />
                )}
                <div className="flex flex-col p-5 max-h-[90vh] bg-slate-50 animate-in fade-in duration-500 pb-20 justify-center">
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col relative scale-[0.95]">
                        <div className="bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-6 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 blur-2xl"></div>
                            <CheckCircle2 size={40} className="text-white mx-auto mb-3 drop-shadow-lg" />
                            <h2 className="text-white font-black text-xl tracking-tight">KYC Verified!</h2>
                            <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mt-1">Identity Confirmed</p>
                        </div>

                        <div className="p-6 text-center">
                            <p className="text-slate-400 text-[13px] font-bold mb-6 leading-relaxed">
                                "Congratulations! Your account is verified. To unlock 6+ income methods, purchase our premium access course today."
                            </p>

                            <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 mb-6 flex items-center justify-between">
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Enrollment Fee</p>
                                    <p className="text-2xl font-black text-sky-600 mt-1 leading-none">₹499</p>
                                </div>
                                <div className="bg-white px-3 py-1 rounded-lg border border-sky-100">
                                    <span className="text-[10px] font-black text-emerald-500 tracking-tighter">LIFE ACCESS</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsPaymentOpen(true)}
                                className="w-full bg-slate-900 hover:bg-black active:scale-95 text-white font-black uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-xl transition-all shadow-slate-100 text-xs"
                            >
                                <Zap size={16} fill="currentColor" className="text-sky-400" />
                                Buy Course & Unlock
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ── LAYER 4: Final Income Cards (Modern Mobile UI Redesign) ─────────────
    return (
        <div className="flex flex-col gap-5 p-5 bg-[#F8FAFC] animate-in fade-in duration-700">
            {/* Minimal Sub-Header */}
            <div className="flex items-center justify-between px-1">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Income Center</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-0.5">Verified Earning Systems</p>
                </div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    <TrendingUp size={20} className="text-blue-500" />
                </div>
            </div>

            {/* Main Referral Highlight Card (Full Width) */}
            <div
                onClick={() => handleCardClick(INCOME_OPTIONS[0].route)}
                className="w-full p-4 rounded-[1.25rem] bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-400 shadow-xl shadow-blue-100 flex flex-col relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer"
            >
                {/* Abstract Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000"></div>

                <div className="flex justify-between items-start relative z-10">
                    <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-2xl border border-white/30">
                        <Share2 size={20} className="text-white" />
                    </div>
                    <div className="bg-black/10 backdrop-blur rounded-full px-3 py-1 border border-white/20">
                        <span className="text-[9px] font-black text-white uppercase tracking-widest animate-pulse">Hot Deal</span>
                    </div>
                </div>

                <div className="mt-6 relative z-10">
                    <h3 className="text-lg font-black text-white tracking-tight leading-tight">{INCOME_OPTIONS[0].title}</h3>
                    <p className="text-[10px] font-bold text-white/80 mt-1 uppercase tracking-wide">{INCOME_OPTIONS[0].subtitle}</p>
                </div>

                <button className="mt-4 w-full bg-white text-blue-600 font-black text-[11px] py-3.5 rounded-xl uppercase tracking-[0.15em] shadow-lg shadow-black/5 active:bg-blue-50 transition-colors">
                    {INCOME_OPTIONS[0].cta}
                </button>
            </div>

            {/* 5-Card Grid (Other Features) */}
            <div className="grid grid-cols-2 gap-3">
                {INCOME_OPTIONS.slice(1).map((opt) => {
                    const Icon = opt.icon;
                    return (
                        <div
                            key={opt.id}
                            onClick={() => handleCardClick(opt.route)}
                            className={`${opt.bg} border ${opt.borderColor || 'border-slate-100'} rounded-[1.25rem] p-4 flex flex-col items-center text-center shadow-md shadow-slate-100/30 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden group`}
                        >
                            {/* Centered Top Icon */}
                            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-black/[0.03] group-hover:scale-110 transition-transform">
                                <Icon size={18} className="text-slate-800" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-center mb-3">
                                <h3 className="text-[11px] font-black text-slate-800 leading-tight mb-1">{opt.title}</h3>
                                <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase tracking-tight line-clamp-2">
                                    {opt.subtitle}
                                </p>
                            </div>

                            {/* Progress Bar for Future Fund */}
                            {opt.hasProgress && (
                                <div className="w-full h-1 bg-indigo-100 rounded-full mb-3 overflow-hidden">
                                    <div className="w-[45%] h-full bg-indigo-500 rounded-full animate-pulse shadow-sm"></div>
                                </div>
                            )}

                            {/* CTA Button */}
                            <button className={`w-full ${opt.locked ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 hover:bg-black text-white shadow-md shadow-slate-200'} text-[9px] font-bold py-2.5 rounded-xl uppercase tracking-widest relative z-10 transition-all active:scale-95`}>
                                {opt.locked ? 'Coming Soon' : opt.cta}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Refined Project Info Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm relative overflow-hidden group mb-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0 border border-sky-100">
                    <Briefcase size={20} className="text-sky-500" />
                </div>
                <div>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none">Drowmoney Projects</h4>
                    <p className="text-[9px] font-bold text-slate-400 leading-tight mt-1">
                        Access exclusive high-ticket affiliate projects and scale your monthly income with verified partners.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Income;

