import React, { useState, useEffect } from 'react';
import { X, Smartphone, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, plan, amount, onSuccess }) => {
    const [status, setStatus] = useState('idle'); // idle, processing, success

    // Reset status when modal opens
    useEffect(() => {
        if (isOpen) setStatus('idle');
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePay = () => {
        setStatus('processing');
        
        // Simulate network/payment delay (2 seconds)
        setTimeout(() => {
            setStatus('success');
            
            // Wait 1.5s for user to see success, then trigger callback
            setTimeout(() => {
                onSuccess();
            }, 1000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={status === 'idle' ? onClose : undefined}></div>
            
            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-[280px] sm:max-w-xs rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                
                {status === 'idle' && (
                    <>
                        <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Checkout</h3>
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold max-w-[120px] truncate">{plan}</p>
                            </div>
                            <button onClick={onClose} className="p-2 mb-2 bg-white rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 shadow-sm border border-slate-100 transition-all active:scale-95">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-6 text-center border-b border-slate-100 border-dashed bg-gradient-to-b from-slate-50 to-white">
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Amount</p>
                             <h2 className="text-4xl font-black text-slate-800 flex items-center justify-center">
                                 <span className="text-xl text-slate-400 font-bold mr-1 translate-y-0.5">₹</span>{amount}.00
                             </h2>
                        </div>

                        <div className="p-5 flex flex-col gap-3">
                            <button onClick={handlePay} className="w-full flex items-center justify-between p-4 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 transition-colors group shadow-sm active:scale-[0.98]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                        <Smartphone className="text-sky-500" size={18} />
                                    </div>
                                    <span className="font-extrabold text-sky-900 text-[13px]">Pay via UPI</span>
                                </div>
                                <span className="text-[10px] font-black uppercase text-sky-500 tracking-widest group-hover:translate-x-1 transition-transform">Proceed</span>
                            </button>

                            <button onClick={handlePay} className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors group shadow-sm active:scale-[0.98]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                                        <CreditCard className="text-slate-500" size={18} />
                                    </div>
                                    <span className="font-bold text-slate-600 text-[13px]">Card / Netbanking</span>
                                </div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select</span>
                            </button>
                        </div>
                        
                        <div className="bg-emerald-50 py-2.5 flex items-center justify-center gap-1.5 border-t border-emerald-100">
                             <ShieldCheck size={14} className="text-emerald-500" />
                             <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">Secure Dummy Gateway</span>
                        </div>
                    </>
                )}

                {status === 'processing' && (
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-sky-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Smartphone size={20} className="text-sky-500 animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-800 mt-5 tracking-tight">Processing...</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Please don't refresh</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-5 animate-in zoom-in slide-in-from-bottom-2 duration-300 shadow-inner">
                             <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-lg font-black text-emerald-600 tracking-tight">Payment Successful</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">Power up activated!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
