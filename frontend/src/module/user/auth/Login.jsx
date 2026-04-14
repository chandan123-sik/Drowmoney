import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Phone, ShieldCheck, Lock, ArrowRight, MessageSquare } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (phone.length < 10) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
        }, 1200);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (otp.length < 4) return;
        setLoading(true);
        setTimeout(() => {
            const kycStatus = localStorage.getItem('kycStatus');
            if (kycStatus === 'pending') {
                navigate('/user/auth/pending');
            } else {
                navigate('/user/home');
            }
        }, 1200);
    };

    return (
        <div className="flex flex-col min-h-[500px] animate-in fade-in zoom-in-95 duration-700">
            {/* Header: Platform Branding */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2.5 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full mb-6">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>
                    <span className="text-[10px] font-black text-sky-400 tracking-[0.2em] uppercase">Secure Login</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back!</h1>
                <p className="text-slate-400 text-[11px] font-bold tracking-wide uppercase opacity-70">Enter your credentials to access your dromoney</p>
            </div>

            {/* Auth Card: Modern Glassmorphism */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>

                {/* Tabs */}
                <div className="flex p-1.5 bg-slate-950/50 rounded-2xl border border-white/5 mb-8">
                    <button className="flex-1 py-3 bg-sky-500 text-slate-950 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-sky-500/20 active:scale-95">Login</button>
                    <Link to="/user/auth/register" className="flex-1 py-3 text-slate-400 font-black text-[11px] uppercase tracking-widest rounded-xl hover:text-white transition-all text-center flex items-center justify-center">Register</Link>
                </div>

                <form onSubmit={otpSent ? handleVerify : handleSendOTP} className="space-y-6 relative z-10">
                    {!otpSent ? (
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                <Phone size={12} className="text-sky-500" />
                                Mobile Number
                            </label>
                            <div className="relative group">
                                <input
                                    type="tel"
                                    placeholder="Enter your registered number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className="w-full bg-slate-950/50 text-white font-bold px-5 py-4 rounded-2xl border border-white/10 group-hover:border-sky-500/50 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all placeholder:text-slate-700 text-[14px] shadow-inner"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                    <ShieldCheck size={18} className="text-slate-800" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-4 flex items-center gap-4">
                                <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center text-sky-400">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase">OTP sent to</p>
                                    <p className="text-[13px] font-black text-white">+91 {phone}</p>
                                </div>
                                <button type="button" onClick={() => setOtpSent(false)} className="ml-auto text-[9px] font-black text-sky-500 uppercase hover:underline">Change</button>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Lock size={12} className="text-sky-500" />
                                    One-Time Password
                                </label>
                                <input
                                    type="text"
                                    placeholder="• • • •"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    className="w-full bg-slate-950/50 text-white font-black tracking-[0.8em] text-center px-5 py-5 rounded-2xl border border-sky-500/30 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all placeholder:text-slate-800 text-xl shadow-[0_0_20px_rgba(14,165,233,0.05)]"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={(!otpSent && phone.length < 10) || (otpSent && otp.length < 4) || loading}
                        className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 disabled:opacity-30 disabled:hover:bg-sky-500 font-black uppercase text-[12px] tracking-widest py-4.5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-sky-500/20 active:scale-95 group"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : (
                            <>
                                {otpSent ? 'Validate & Login' : 'Continue to Dashboard'}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Support/Footer info */}
            <div className="mt-12 text-center">
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.15em] mb-4">Secured by industry standard encryption</p>
                <div className="flex justify-center gap-8 items-center opacity-40 grayscale">
                    <div className="h-4 w-12 bg-slate-800 rounded"></div>
                    <div className="h-4 w-12 bg-slate-800 rounded"></div>
                    <div className="h-4 w-12 bg-slate-800 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
