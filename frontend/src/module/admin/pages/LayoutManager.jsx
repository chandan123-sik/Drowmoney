import React, { useState } from 'react';
import {
    Monitor, ShieldCheck, Save, Edit3,
    Zap, Star, Grid, Layout,
    Shield, RefreshCcw, BookOpen,
    CheckCircle2, Navigation, List,
    Plus, Trash2, Layers, AlignLeft,
    ExternalLink, FileText
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const LayoutManager = () => {
    const [activeTab, setActiveTab] = useState('navbar');

    // ── Navbar Content (Sections & Steps) ──
    const [navbarSections, setNavbarSections] = useState([
        {
            id: 1, label: 'Referral System', headline: 'EARN ₹200 REWARD',
            steps: [
                { title: 'SHARE YOUR LINK', desc: 'अपना referral link दोस्तों के साथ share करें।' },
                { title: 'EARN ₹200 INSTANT', desc: 'हर सफल registration पर आपको ₹200 का instant reward मिलेगा।' },
                { title: 'DIRECT WALLET CREDIT', desc: 'आपका reward amount सीधे आपके wallet में add कर दिया जायेगा।' }
            ]
        },
        {
            id: 2, label: 'Daily Tasks', headline: 'COLLECT REWARD COINS',
            steps: [
                { title: 'COMPLETE TASKS', desc: 'रोजाना simple tasks को पूरा करें और reward coins earn करें।' },
                { title: 'REDEEM FOR CASH', desc: 'इन coins को आप बाद में real cash में convert कर सकते हैं।' }
            ]
        },
        {
            id: 3, label: 'Future Fund', headline: 'PASSIVE INCOME SECURITY',
            steps: [
                { title: 'PLATFORM STAKE', desc: 'एक बार eligible होने पर, आपको platform के profits में हिस्सा मिलेगा।' },
                { title: 'MONTHLY PAYOUTS', desc: 'Profit share हर महीने आपके wallet में auto-credit होगा।' }
            ]
        },
        {
            id: 4, label: 'Events & Contests', headline: 'WIN BIG PRIZES',
            steps: [
                { title: 'WEEKLY CONTESTS', desc: 'हर हफ्ते नए Exciting Events live होते हैं, जो limited time के लिए होते हैं।' },
                { title: 'MEGA JACKPOTS', desc: 'Contests में भाग लेकर आप ₹500 तक का instant cash और exciting prizes जीत सकते हैं।' },
                { title: 'LEADERBOARD REWARDS', desc: 'Top earners को special bonuses और verification badges दिए जाते हैं।' }
            ]
        },
    ]);

    // ── Footer Management (Paths + Policy CMS Merged) ──
    const [footerPolicies, setFooterPolicies] = useState([
        {
            id: 1, label: 'Privacy Policy', path: '/user/info/privacy',
            content: "Dummy privacy policy text data for dynamic rendering in future...",
            icon: Shield, color: 'text-sky-500'
        },
        {
            id: 2, label: 'Refund Policy', path: '/user/info/refund',
            content: "Dummy refund policy text data for dynamic rendering in future...",
            icon: RefreshCcw, color: 'text-indigo-500'
        },
        {
            id: 3, label: 'Terms & Conditions', path: '/user/info/terms',
            content: "Dummy terms & conditions text data for dynamic rendering in future...",
            icon: ShieldCheck, color: 'text-amber-500'
        },
        {
            id: 4, label: 'User Guidelines', path: '/user/info/guidelines',
            content: "Dummy platform guidelines text data for dynamic rendering in future...",
            icon: BookOpen, color: 'text-emerald-500'
        },
    ]);

    // ── Handlers ──
    const addStep = (sIdx) => {
        const newSections = [...navbarSections];
        newSections[sIdx].steps.push({ title: 'NEW STEP', desc: 'Add instruction...' });
        setNavbarSections(newSections);
    };

    const deleteStep = (sIdx, stepIdx) => {
        const newSections = [...navbarSections];
        newSections[sIdx].steps.splice(stepIdx, 1);
        setNavbarSections(newSections);
    };

    return (
        <div className="p-6 animate-in fade-in duration-700 bg-slate-50/50 min-h-screen">
            <PageHeader title="Layout & Content CM" subtitle="Manage app sections, footer paths, and legal page content" />

            {/* Simplified Tab Navigation */}
            <div className="flex gap-2 mb-10 mt-6 bg-white p-2 rounded-[28px] border border-slate-100 shadow-sm w-fit mx-auto md:mx-0">
                <button
                    onClick={() => setActiveTab('navbar')}
                    className={`flex items-center gap-3 px-8 py-3.5 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === 'navbar' ? 'bg-[#0F172A] text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                    <Layers size={14} /> Section Content
                </button>
                <button
                    onClick={() => setActiveTab('footer')}
                    className={`flex items-center gap-3 px-8 py-3.5 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === 'footer' ? 'bg-[#0F172A] text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                    <Navigation size={14} /> Footer & Policies
                </button>
            </div>

            {/* TAB: SECTION CONTENT (NAVBAR) */}
            {activeTab === 'navbar' && (
                <div className="space-y-12 pb-24 animate-in slide-in-from-bottom-4 duration-500">
                    {navbarSections.map((section, sIdx) => (
                        <div key={section.id} className="bg-white rounded-[44px] border border-slate-100 shadow-sm p-8 group overflow-hidden">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-slate-900 text-sky-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">{section.id}</div>
                                    <div className="space-y-1">
                                        <input type="text" value={section.label} onChange={(e) => {
                                            const ns = [...navbarSections]; ns[sIdx].label = e.target.value; setNavbarSections(ns);
                                        }} className="text-xl font-black text-slate-800 uppercase tracking-tight bg-transparent border-none p-0 outline-none w-full" />
                                        <input type="text" value={section.headline} onChange={(e) => {
                                            const ns = [...navbarSections]; ns[sIdx].headline = e.target.value; setNavbarSections(ns);
                                        }} className="text-[12px] font-black text-sky-600 uppercase tracking-[0.2em] bg-transparent border-none p-0 outline-none w-full" />
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-black transition-all">
                                    <Save size={16} /> Update Section
                                </button>
                            </div>

                            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                                {section.steps.map((step, stepIdx) => (
                                    <div key={stepIdx} className="min-w-[340px] bg-slate-50/50 border border-slate-100 rounded-[36px] p-7 snap-center group/card transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-100 relative">
                                        <button onClick={() => deleteStep(sIdx, stepIdx)} className="absolute top-6 right-6 w-9 h-9 bg-white text-rose-500 rounded-xl flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all shadow-sm border border-slate-100">
                                            <Trash2 size={14} />
                                        </button>
                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Step {stepIdx + 1} Title</label>
                                                <input value={step.title} onChange={(e) => {
                                                    const ns = [...navbarSections]; ns[sIdx].steps[stepIdx].title = e.target.value; setNavbarSections(ns);
                                                }} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-[12px] font-black text-slate-800 outline-none focus:ring-2 focus:ring-sky-500 shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instructions (Hindi)</label>
                                                <textarea value={step.desc} onChange={(e) => {
                                                    const ns = [...navbarSections]; ns[sIdx].steps[stepIdx].desc = e.target.value; setNavbarSections(ns);
                                                }} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-[12px] font-bold text-slate-500 h-28 outline-none focus:ring-2 focus:ring-sky-500 resize-none shadow-sm" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addStep(sIdx)} className="min-w-[200px] bg-slate-50/30 border-2 border-dashed border-slate-200 rounded-[36px] flex flex-col items-center justify-center gap-3 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-slate-300 hover:text-sky-500 group/plus">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover/plus:scale-110 transition-transform"><Plus size={24} /></div>
                                    <span className="text-[11px] font-black uppercase tracking-widest">Add New Step</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB: FOOTER & POLICIES (MERGED) */}
            {activeTab === 'footer' && (
                <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 gap-6">
                        {footerPolicies.map((item, idx) => (
                            <div key={item.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-8 group">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                                    {/* Left: Metadata & Link */}
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-4 rounded-2xl bg-slate-50 ${item.color}`}><item.icon size={28} /></div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{item.label}</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Edit path and page content</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-slate-50/50 rounded-[28px] border border-slate-50 space-y-4">
                                            <div>
                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Link Display Label</label>
                                                <input value={item.label} onChange={(e) => {
                                                    const nf = [...footerPolicies]; nf[idx].label = e.target.value; setFooterPolicies(nf);
                                                }} className="w-full bg-white border border-slate-100 rounded-xl px-5 py-4 text-[13px] font-black text-slate-800 outline-none shadow-sm focus:ring-2 focus:ring-sky-500" />
                                            </div>
                                        </div>
                                        <button className="hidden lg:flex items-center gap-3 bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all w-full justify-center">
                                            <Save size={16} /> Update {item.label} Data
                                        </button>
                                    </div>

                                    {/* Right: Content Editor (The specific content that appears on click) */}
                                    <div className="flex-[1.5] space-y-3">
                                        <div className="flex items-center justify-between px-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> Page Content Editor</label>
                                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-widest">Live Preview</span>
                                        </div>
                                        <textarea
                                            value={item.content}
                                            onChange={(e) => {
                                                const nf = [...footerPolicies]; nf[idx].content = e.target.value; setFooterPolicies(nf);
                                            }}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 text-[13px] font-bold text-slate-700 h-[220px] outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all resize-none shadow-inner"
                                            placeholder={`Write full text for ${item.label}...`}
                                        />
                                        <button className="lg:hidden flex items-center gap-3 bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all w-full justify-center">
                                            <Save size={16} /> Update {item.label}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LayoutManager;
