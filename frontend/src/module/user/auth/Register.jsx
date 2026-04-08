import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', referral: '', phone: '' });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSendOTP = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
        }, 1500); 
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (otp.length < 4) return;
        setLoading(true);
        setTimeout(() => {
            navigate('/user/auth/kyc');
        }, 1500); 
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center mb-6">
                <div className="bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(14,165,233,1)]"></div>
                    <span className="text-[9px] font-bold text-sky-400 tracking-widest uppercase">New to Platform?</span>
                </div>
            </div>

            <h1 className="text-[24px] font-black text-white text-center mb-2 tracking-tight">Create Account</h1>
            <p className="text-slate-400 text-[11px] text-center mb-8 px-2 font-bold leading-relaxed">Quick signup – just your basic details and phone number.</p>

            {/* Tabs */}
            <div className="flex gap-3 mb-8">
                <Link to="/user/auth/login" className="flex-1 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-bold py-2.5 rounded-xl text-center text-xs transition-all inline-flex items-center justify-center">Login</Link>
                <button className="flex-1 bg-sky-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)]">Register</button>
            </div>

            <form onSubmit={otpSent ? handleVerifyOTP : handleSendOTP} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                {!otpSent ? (
                    <>
                        <div>
                            <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-950 text-white font-bold px-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600 text-[13px] shadow-inner"
                                required
                            />
                            <p className="text-[8px] text-slate-500 mt-1.5 uppercase font-bold tracking-widest">Only alphabets (Matches PAN/Bank)</p>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-950 text-white font-bold px-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600 text-[13px] shadow-inner"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Have a referral code? <span className="text-sky-500 lowercase tracking-normal">(Optional)</span></label>
                            <input 
                                type="text" 
                                placeholder="e.g. RAHUL660"
                                value={formData.referral}
                                onChange={(e) => setFormData({...formData, referral: e.target.value.toUpperCase()})}
                                className="w-full bg-slate-950 text-white font-black tracking-widest uppercase px-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600 text-[13px] shadow-inner placeholder:tracking-normal placeholder:font-normal placeholder:normal-case"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="Enter 10-digit number"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                                className="w-full bg-slate-950 text-white font-bold px-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600 text-[13px] shadow-inner"
                                required
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="w-14 h-14 bg-sky-500/10 rounded-full flex items-center justify-center mb-4 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                            <span className="text-xl">📩</span>
                        </div>
                        <h3 className="text-white font-black text-[16px] mb-1">Verify your number</h3>
                        <p className="text-[10px] text-slate-400 font-bold mb-6 text-center leading-relaxed">
                            We've sent a 4-digit code to <br/><span className="text-sky-400 text-xs">+91 {formData.phone}</span>
                        </p>
                        
                        <div className="w-full">
                            <label className="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 flex justify-between items-center">
                                Enter Secret OTP
                                <button type="button" onClick={() => setOtpSent(false)} className="text-sky-500 text-[9px] uppercase tracking-wider hover:text-sky-400 transition-colors">Change number?</button>
                            </label>
                            <input 
                                type="text" 
                                placeholder="XXXX"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                className="w-full bg-slate-950 text-white font-black tracking-[0.5em] text-center px-4 py-4 rounded-xl border border-sky-500/50 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-700 text-[18px] placeholder:tracking-normal placeholder:font-normal placeholder:text-[13px] shadow-[0_0_15px_rgba(14,165,233,0.1)] mb-1"
                                required
                            />
                            <p className="text-center text-[9px] text-slate-500 font-bold mt-3">Didn't receive code? <span className="text-slate-300">Resend in 30s</span></p>
                        </div>
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={(!otpSent && (formData.phone.length < 10 || !formData.name)) || (otpSent && otp.length < 4) || loading}
                    className="w-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-slate-950 disabled:opacity-50 disabled:bg-slate-900 disabled:text-slate-600 font-black uppercase text-[11px] tracking-[0.2em] py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-1"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (otpSent ? 'Verify & Create Account' : 'Register & Send OTP')}
                </button>
            </form>

            <p className="text-center text-[9px] text-slate-600 font-bold mt-8 uppercase tracking-widest">
                By continuing, you agree to our <br/><span className="text-slate-400 underline decoration-slate-700 underline-offset-4 cursor-pointer mt-1 inline-block">Terms & Conditions</span>
            </p>
        </div>
    );
};

export default Register;
