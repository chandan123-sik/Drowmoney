import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

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
        }, 1000); // mock network delay
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
        }, 1000);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center mb-6">
                <div className="bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(14,165,233,1)]"></div>
                    <span className="text-[9px] font-bold text-sky-400 tracking-widest uppercase">Login to your account</span>
                </div>
            </div>

            <h1 className="text-[26px] font-black text-white text-center mb-2 tracking-tight">User Login</h1>
            <p className="text-slate-400 text-xs text-center mb-8 px-4 font-bold leading-relaxed">Enter your phone number to receive a one-time OTP and continue earning.</p>

            {/* Tabs */}
            <div className="flex gap-3 mb-8">
                <button className="flex-1 bg-sky-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)]">Login</button>
                <Link to="/user/auth/register" className="flex-1 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-bold py-2.5 rounded-xl text-center text-xs transition-all inline-flex items-center justify-center">Register</Link>
            </div>

            <form onSubmit={otpSent ? handleVerify : handleSendOTP} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                {!otpSent ? (
                    <div>
                        <label className="block text-[11px] font-black text-slate-300 mb-2.5">Phone Number</label>
                        <input 
                            type="tel" 
                            placeholder="Enter 10-digit number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full bg-slate-950 text-white font-bold px-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600 text-[13px] shadow-inner"
                            required
                        />
                    </div>
                ) : (
                    <div>
                        <label className="block text-[11px] font-black text-slate-300 mb-2.5 flex justify-between items-center">
                            Enter Secret OTP
                            <button type="button" onClick={() => setOtpSent(false)} className="text-sky-500 text-[9px] uppercase tracking-wider hover:text-sky-400 transition-colors">Wrong number?</button>
                        </label>
                        <input 
                            type="text" 
                            placeholder="XXXX"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            className="w-full bg-slate-950 text-white font-black tracking-[0.5em] text-center px-4 py-3.5 rounded-xl border border-sky-500/50 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-700 text-lg placeholder:tracking-normal placeholder:font-normal placeholder:text-sm shadow-[0_0_15px_rgba(14,165,233,0.1)]"
                            required
                        />
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={(!otpSent && phone.length < 10) || (otpSent && otp.length < 4) || loading}
                    className="w-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-slate-950 disabled:opacity-50 disabled:bg-slate-900 disabled:text-slate-600 font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (otpSent ? 'Verify Login' : 'Send OTP')}
                </button>
            </form>

            <p className="text-center text-[9px] text-slate-600 font-bold mt-8 uppercase tracking-widest">
                By continuing, you agree to our <br/><span className="text-slate-400 underline decoration-slate-700 underline-offset-4 cursor-pointer mt-1 inline-block">Terms & Conditions</span>
            </p>
        </div>
    );
};

export default Login;
