import React from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Landmark } from 'lucide-react';

const KycModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            
            <div className="relative bg-white w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-5 bg-emerald-50 border-b border-emerald-100 flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-emerald-800 text-lg tracking-tight">KYC Verified</h3>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-emerald-600 font-bold">Account is 100% secure</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/50 rounded-full text-emerald-600 hover:bg-white transition-colors active:scale-95 shadow-sm">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-2">
                    <div className="p-4 flex items-center justify-between border-b border-slate-50 group hover:bg-slate-50 transition-colors rounded-xl mx-1 mt-1">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                                <FileText className="text-slate-400" size={16} />
                            </div>
                            <span className="font-black text-slate-700 text-[13px]">Aadhaar Card</span>
                        </div>
                        <CheckCircle2 size={18} className="text-emerald-500" strokeWidth={2.5} />
                    </div>
                    
                    <div className="p-4 flex items-center justify-between border-b border-slate-50 group hover:bg-slate-50 transition-colors rounded-xl mx-1">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                                <FileText className="text-slate-400" size={16} />
                            </div>
                            <span className="font-black text-slate-700 text-[13px]">PAN Card</span>
                        </div>
                        <CheckCircle2 size={18} className="text-emerald-500" strokeWidth={2.5} />
                    </div>
                    
                    <div className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors rounded-xl mx-1 mb-1">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">
                                <Landmark className="text-slate-400" size={16} />
                            </div>
                            <span className="font-black text-slate-700 text-[13px]">Bank Verification</span>
                        </div>
                        <CheckCircle2 size={18} className="text-emerald-500" strokeWidth={2.5} />
                    </div>
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-100">
                    <button onClick={onClose} className="w-full py-3.5 bg-emerald-500 text-white font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2">
                        Great, Continue <ShieldCheck size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KycModal;
