import React, { useState } from 'react';
import { 
    MessageSquare, AlertCircle, BookOpen, Star, 
    Trash2, Plus, Save, User, Clock, 
    CheckCircle2, ChevronDown, List, 
    MessageCircle, ExternalLink, ShieldAlert
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('feedback');

    // ── Dummy Feedback Data (Image 1) ──
    const [feedbacks, setFeedbacks] = useState([
        { id: 1, user: 'Rahul.S', stars: 5, message: 'App is amazing, very smooth!', time: '2h ago' },
        { id: 2, user: 'Priya_24', stars: 4, message: 'I wish the app had a Dark Mode option in settings.', time: '5h ago' },
        { id: 3, user: 'Arun_Dev', stars: 3, message: 'Sometime task verification takes too long.', time: '1d ago' },
    ]);

    // ── Dummy Problem Reports (Image 3) ──
    const [problemReports, setProblemReports] = useState([
        { id: 1, user: 'Sumit_88', type: 'Bug', message: 'Payout button is greyed out even if I have ₹500 balance.', time: '1h ago', status: 'Pending' },
        { id: 2, user: 'Aditi.M', type: 'UI', message: 'Navbar icons are overlapping on smaller screens.', time: '3h ago', status: 'Investigating' },
    ]);

    // ── Help Guide CMS Data (Image 2) ──
    const [guides, setGuides] = useState([
        { q: 'How to complete daily tasks?', a: 'Go to the Earn section, select a task, follow the instructions, and submit. Coins are credited instantly.' },
        { q: 'How to request for payout?', a: 'Visit the Wallet section, enter your UPI/Bank details, and click Withdraw. Processing takes 24-48 hours.' },
        { q: 'Setting up your affiliate link', a: 'Go to Profile, copy your unique link, and share it. You earn ₹200 on every successful referral sale.' }
    ]);

    // ── Handlers ──
    const addGuide = () => setGuides([...guides, { q: 'New Question?', a: 'New answer description here...' }]);
    const deleteGuide = (idx) => setGuides(guides.filter((_, i) => i !== idx));
    const updateGuide = (idx, field, val) => {
        const newGuides = [...guides];
        newGuides[idx][field] = val;
        setGuides(newGuides);
    };

    return (
        <div className="p-6 animate-in fade-in duration-700 bg-slate-50/50 min-h-screen">
            <PageHeader title="Interaction & Feedback" subtitle="Manage user feedbacks, technical reports, and help guides" />

            {/* Premium Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-10 mt-6 bg-white p-2 rounded-[28px] border border-slate-100 shadow-sm w-fit">
                {[
                    { id: 'feedback', label: 'User Feedbacks', icon: MessageSquare, color: 'text-sky-500' },
                    { id: 'problems', label: 'Problem Reports', icon: ShieldAlert, color: 'text-rose-500' },
                    { id: 'guides', label: 'Help Guide CMS', icon: BookOpen, color: 'text-indigo-500' },
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-8 py-3.5 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <tab.icon size={14} className={activeTab === tab.id ? 'text-white' : tab.color} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="animate-in slide-in-from-bottom-4 duration-500 pb-20">
                
                {/* ── TAB 1: USER FEEDBACKS ── */}
                {activeTab === 'feedback' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {feedbacks.map(f => (
                            <div key={f.id} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/10 transition-colors"></div>
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg"><User size={18} /></div>
                                        <div>
                                            <h4 className="text-[14px] font-black text-slate-800 tracking-tight leading-none uppercase">{f.user}</h4>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Submitted {f.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={13} className={i < f.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-50 relative z-10 min-h-[100px]">
                                    <p className="text-[13px] font-bold text-slate-600 leading-relaxed italic">"{f.message}"</p>
                                </div>
                                <button className="absolute top-6 right-6 w-9 h-9 bg-rose-50 text-rose-400 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-slate-100 hover:bg-rose-500 hover:text-white">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── TAB 2: PROBLEM REPORTS ── */}
                {activeTab === 'problems' && (
                    <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                        {problemReports.map(pr => (
                            <div key={pr.id} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row gap-8 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                {/* Header / User Info */}
                                <div className="flex flex-col gap-4 min-w-[200px] border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shadow-inner"><AlertCircle size={24} /></div>
                                        <div>
                                            <h4 className="text-[15px] font-black text-slate-800 tracking-tight uppercase">{pr.user}</h4>
                                            <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">{pr.type} Report</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Clock size={12} strokeWidth={3} />
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{pr.time} Report</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                                            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{pr.status}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Message Content */}
                                <div className="flex-1 space-y-4 pt-2">
                                    <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Issue Description</h5>
                                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 italic text-[14px] font-bold text-slate-600 leading-relaxed shadow-inner">
                                        {pr.message}
                                    </div>
                                    <div className="flex gap-3 justify-end pt-2">
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 text-[11px] font-black uppercase tracking-widest transition-all">Reject Claim</button>
                                        <button className="flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Mark as Resolved</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── TAB 3: HELP GUIDE CMS ── */}
                {activeTab === 'guides' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        {/* CMS List */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase flex items-center gap-3 ml-2"><List className="text-indigo-500" /> Help Guides List</h3>
                            {guides.map((guide, i) => (
                                <div key={i} className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 group relative overflow-hidden transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-100">
                                    <div className="flex items-start justify-between mb-8 pb-4 border-b border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center font-black">0{i + 1}</div>
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Instruction Card</span>
                                        </div>
                                        <button onClick={() => deleteGuide(i)} className="w-10 h-10 bg-rose-50 text-rose-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Question / Heading</label>
                                            <input value={guide.q} onChange={(e) => updateGuide(i, 'q', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[14px] font-black text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Answer / Instruction Body</label>
                                            <textarea value={guide.a} onChange={(e) => updateGuide(i, 'a', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-500 h-28 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm resize-none" />
                                        </div>
                                    </div>
                                    <button className="w-full mt-8 bg-[#0F172A] text-white py-4 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                                        <Save size={16} /> Sync {i + 1}
                                    </button>
                                </div>
                            ))}
                            <button onClick={addGuide} className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[44px] text-slate-400 font-extrabold text-[12px] uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-500 transition-all flex flex-col items-center gap-3">
                                <Plus size={24} /> Add New FAQ Guide Item
                            </button>
                        </div>

                        {/* User Panel Preview Replica */}
                        <div className="flex flex-col">
                            <div className="sticky top-6 bg-slate-900 rounded-[60px] p-12 overflow-hidden shadow-2xl relative">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-[22px] flex items-center justify-center border border-white/10 text-indigo-400 shadow-xl overflow-hidden relative">
                                            <BookOpen size={28} />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-indigo-500 rounded-full border-2 border-slate-900 translate-x-1 translate-y-1"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white tracking-tight uppercase">Help Guide</h3>
                                            <p className="text-[12px] font-bold text-white/30 uppercase tracking-widest mt-1">Basic Platform Usage</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {guides.map((g, i) => (
                                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 hover:bg-white/10 transition-all group/p cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[13px] font-black text-white/90 leading-tight group-hover/p:text-indigo-400 transition-colors">{g.q}</span>
                                                    <ChevronDown size={18} className="text-white/20 group-hover/p:text-white transition-all duration-300" />
                                                </div>
                                                <p className="text-[11px] font-bold text-white/40 mt-3 leading-relaxed border-t border-white/5 pt-3 group-hover/p:text-white/60">{g.a}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-4 opacity-40">
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Direct Guide Preview</span>
                                        <ExternalLink size={12} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
