import React, { useState } from 'react';
import { 
    Sparkles, Zap, Rocket, Plus, Trash2, 
    Save, Layout, Palette, Type, 
    ChevronRight, ChevronLeft, Info, CheckCircle2,
    Trophy, Users, Target, MousePointer2, List
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const MarketingManager = () => {
    const [activeTab, setActiveTab] = useState('banners');

    // ── Banners Data ──
    const [banners, setBanners] = useState([
        { id: 1, tag: 'Affiliate Program', title: 'Earn ₹200 Per Sale', subtitle: 'Share your link & get instant commission', gradient: 'from-sky-500 to-sky-700' },
        { id: 2, tag: '3X Booster Active', title: 'Multiply Your Coins', subtitle: 'Upgrade and earn 3x coins on tasks', gradient: 'from-indigo-500 to-indigo-700' },
    ]);

    // ── Boosters Data (Image 1) ──
    const [boosters, setBoosters] = useState({
        support: {
            title: '₹11 Support Booster',
            subtitle: 'Boost participation & win more!',
            benefits: ['2X Winning Chance', 'Priority Event Support', 'Support Badge Profile']
        },
        task: {
            title: '₹49 Task Booster',
            subtitle: 'Increase coin value 3X now!',
            benefits: ['3X Coin Multiplier', 'Instant Task Approval', 'Withdrawal Priority']
        }
    });

    // ── Lifetime Access Data (Image 2) ──
    const [lifetime, setLifetime] = useState({
        title: 'Lifetime Access',
        priceTag: '👉 “₹499 buy course \'\' One Time',
        note: 'उसके बाद लाइफ टाइम सर्विस अनलॉक रहेगी ।',
        features: [
            'सभी earning features use कर सकता है',
            'tasks complete कर सकता है',
            'events में भाग ले सकता है'
        ]
    });

    // ── Future Features Data (Image 1 & 2) ──
    const [futureFeatures, setFutureFeatures] = useState([
        { title: 'Dromoney Marketplace', text: 'Buy and sell digital assets directly within our ecosystem using wallet balance.' },
        { title: 'Global Payouts', text: 'Expansion beyond local banking to support international earners through crypto and PayPal.' },
        { title: 'Advanced AI Tools', text: 'Get automated marketing kits generated for your affiliate links for 10x better results.' }
    ]);

    return (
        <div className="p-6 animate-in fade-in duration-700 bg-slate-50/50 min-h-screen">
            <PageHeader title="Marketing & Promos" subtitle="Manage banners, booster benefits, and visual promotions" />

            {/* Sub-navigation Tabs */}
            <div className="flex gap-2 mb-10 mt-6 bg-white p-2 rounded-[28px] border border-slate-100 shadow-sm w-fit">
                {[
                    { id: 'banners', label: 'Ad Banners', icon: Layout },
                    { id: 'boosters', label: 'Booster Packs', icon: Zap },
                    { id: 'lifetime', label: 'Lifetime Promo', icon: Rocket },
                    { id: 'future', label: 'Future Features', icon: Sparkles },
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-8 py-3.5 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#0F172A] text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <tab.icon size={14} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="animate-in slide-in-from-bottom-4 duration-500 pb-20">
                
                {/* ── NEW: FUTURE FEATURES CMS ── */}
                {activeTab === 'future' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        {/* Editor Side */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[44px] border border-slate-100 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center"><Sparkles size={24} /></div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Upcoming Features List</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add features seen in the DISCOVER page</p>
                                        </div>
                                    </div>
                                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2"><Save size={14} /> Global Sync</button>
                                </div>

                                <div className="space-y-6">
                                    {futureFeatures.map((feat, i) => (
                                        <div key={i} className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 space-y-4 relative group hover:bg-white hover:shadow-xl transition-all">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Opportunity Item 0{i + 1}</span>
                                                <button onClick={() => setFutureFeatures(futureFeatures.filter((_, idx) => idx !== i))} className="text-rose-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Feature Title</label>
                                                    <input value={feat.title} onChange={(e) => {
                                                        const nf = [...futureFeatures]; nf[i].title = e.target.value; setFutureFeatures(nf);
                                                    }} className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-[14px] font-black text-slate-800 outline-none focus:ring-2 focus:ring-sky-500" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Subtext</label>
                                                    <textarea value={feat.text} onChange={(e) => {
                                                        const nf = [...futureFeatures]; nf[i].text = e.target.value; setFutureFeatures(nf);
                                                    }} className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-500 h-20 outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => setFutureFeatures([...futureFeatures, { title: 'New Feature Header', text: 'Describe the upcoming opportunity here...' }])} className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] hover:border-sky-400 hover:text-sky-500 transition-all flex flex-col items-center gap-3">
                                        <Plus size={24} /> Add Future Feature Point
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Preview Side */}
                        <div className="space-y-12">
                            {/* Card 1: Income Page UI Replica (Image 1) */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2 italic">Income Center Card Preview <ChevronRight size={12} /></h4>
                                <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-inner flex justify-center">
                                    <div className="w-[280px] bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
                                        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-black/[0.03]">
                                            <Sparkles size={32} className="text-slate-800" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center mb-6">
                                            <h3 className="text-[16px] font-black text-slate-800 leading-tight mb-2 uppercase tracking-tight">Future Features</h3>
                                            <p className="text-[11px] font-bold text-slate-400 leading-tight uppercase tracking-[0.1em]">Upcoming earning opportunities</p>
                                        </div>
                                        <button className="w-full bg-slate-900 text-white text-[12px] font-black py-4 rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-slate-200">
                                            Discover
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Future Features Details UI (Image 2) */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-2 italic">Details Page Preview <ChevronRight size={12} /></h4>
                                <div className="bg-slate-900 rounded-[60px] p-10 relative overflow-hidden shadow-2xl scale-[0.98]">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute -left-10 top-0 opacity-10">
                                        <Rocket size={180} className="text-white" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-2">
                                             <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white"><ChevronLeft size={24} /></div>
                                        </div>
                                        <h2 className="text-2xl font-black text-white tracking-tight uppercase mt-6 leading-none">Future Features</h2>
                                        <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.25em] mt-2 mb-10">Upcoming Opportunities</p>

                                        <div className="bg-white rounded-[40px] p-8 space-y-8 shadow-2xl min-h-[400px]">
                                            {futureFeatures.map((f, i) => (
                                                <div key={i} className="flex gap-4 group">
                                                    <div className="mt-1">
                                                        <CheckCircle2 size={24} className="text-sky-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[15px] font-black text-slate-800 mb-1">{f.title}</h3>
                                                        <p className="text-[12px] font-bold text-slate-400 leading-relaxed italic">{f.text}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100 border-dashed text-center opacity-70">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                                    Need more help? Our experts are just a click away in the support section.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* ── TAB 1: AD BANNERS ── */}
                {activeTab === 'banners' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {banners.map((banner, idx) => (
                                <div key={banner.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 group relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-900 text-sky-400 rounded-xl flex items-center justify-center font-black">0{idx + 1}</div>
                                            <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Banner Config</h3>
                                        </div>
                                        <button onClick={() => setBanners(banners.filter(b => b.id !== banner.id))} className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Banner Tag</label>
                                                <input value={banner.tag} onChange={(e) => {
                                                    const newB = [...banners]; newB[idx].tag = e.target.value; setBanners(newB);
                                                }} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-[14px] font-bold text-slate-800 focus:ring-2 focus:ring-sky-500 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gradient Theme</label>
                                                <select value={banner.gradient} onChange={(e) => {
                                                    const newB = [...banners]; newB[idx].gradient = e.target.value; setBanners(newB);
                                                }} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-[14px] font-bold text-slate-800 outline-none">
                                                    <option value="from-sky-500 to-sky-700">Sky Professional</option>
                                                    <option value="from-indigo-500 to-indigo-700">Indigo Premium</option>
                                                    <option value="from-emerald-500 to-teal-600">Emerald Growth</option>
                                                    <option value="from-rose-500 to-orange-600">Orange Spark</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Heading</label>
                                            <input value={banner.title} onChange={(e) => {
                                                const newB = [...banners]; newB[idx].title = e.target.value; setBanners(newB);
                                            }} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-[15px] font-black text-slate-800 focus:ring-2 focus:ring-sky-500 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtitle / Description</label>
                                            <textarea value={banner.subtitle} onChange={(e) => {
                                                const newB = [...banners]; newB[idx].subtitle = e.target.value; setBanners(newB);
                                            }} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-500 h-24 outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
                                        </div>
                                    </div>
                                    
                                    <button className="w-full mt-8 bg-[#0F172A] text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                                        <Save size={16} /> Sync Banner
                                    </button>
                                </div>
                            ))}
                            <button onClick={() => setBanners([...banners, { id: Date.now(), tag: 'NEW CAMPAIGN', title: 'New Offer Title', subtitle: 'Describe your offer here...', gradient: 'from-sky-500 to-sky-700' }])} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[40px] text-slate-400 font-extrabold text-[12px] uppercase tracking-widest hover:border-sky-500 hover:text-sky-500 transition-all flex flex-col items-center gap-2">
                                <Plus size={24} /> Add New Promotional Banner
                            </button>
                        </div>

                        {/* Banner Preview Section */}
                        <div className="sticky top-6 max-h-[90vh] overflow-y-auto bg-[#0F172A] rounded-[48px] p-10 shadow-2xl shadow-slate-200 custom-scrollbar">
                             <div className="flex items-center gap-3 mb-10 sticky top-0 bg-[#0F172A] z-10 pb-4">
                                <div className="p-3 bg-white/5 rounded-2xl text-sky-400"><MousePointer2 size={24} /></div>
                                <h3 className="text-xl font-black text-white tracking-tight">User Dashboard Preview</h3>
                            </div>

                            <div className="space-y-6">
                                {banners.map((banner) => (
                                    <div key={banner.id} className={`bg-gradient-to-r ${banner.gradient} rounded-3xl p-6 relative overflow-hidden group shadow-lg shadow-black/20 scale-95 opacity-80 hover:scale-100 hover:opacity-100 transition-all duration-300 border border-white/5`}>
                                        <div className="relative z-10 text-white">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full border border-white/10">{banner.tag}</span>
                                            <h2 className="text-2xl font-black tracking-tight mt-3">{banner.title}</h2>
                                            <p className="text-[11px] font-bold text-white/70 mt-1 max-w-[80%]">{banner.subtitle}</p>
                                            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl mt-5 text-[10px] font-black uppercase tracking-widest">Upgrade Now <ChevronRight size={14} /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TAB 2: BOOSTER PACKS ── */}
                {activeTab === 'boosters' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {['support', 'task'].map((type) => {
                            const b = boosters[type];
                            return (
                                <div key={type} className="bg-white rounded-[44px] border border-slate-100 shadow-sm p-8 group">
                                    <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-50">
                                        <div className={`w-14 h-14 ${type === 'support' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'} rounded-2xl flex items-center justify-center`}><Zap size={32} /></div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-800 tracking-tight">{b.title}</h3>
                                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage Dropdown Benefits</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-heading Text</label>
                                            <input value={b.subtitle} onChange={(e) => {
                                                const nb = {...boosters}; nb[type].subtitle = e.target.value; setBoosters(nb);
                                            }} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[14px] font-black text-slate-800 outline-none" />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><List size={14} /> Benefit List (Image 1 Dropdown)</label>
                                            {b.benefits.map((text, idx) => (
                                                <div key={idx} className="flex gap-3">
                                                    <input value={text} onChange={(e) => {
                                                        const nb = {...boosters}; nb[type].benefits[idx] = e.target.value; setBoosters(nb);
                                                    }} className="flex-1 bg-white border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-sky-500 outline-none" />
                                                    <button onClick={() => {
                                                        const nb = {...boosters}; nb[type].benefits = b.benefits.filter((_, i) => i !== idx); setBoosters(nb);
                                                    }} className="w-11 h-11 bg-rose-50 text-rose-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            ))}
                                            <button onClick={() => {
                                                const nb = {...boosters}; nb[type].benefits.push('New Benefit Point'); setBoosters(nb);
                                            }} className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-sky-500 hover:border-sky-200 transition-all">+ Add New Point</button>
                                        </div>
                                    </div>

                                    <button className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
                                        <Save size={16} /> Update {b.title} Configuration
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── TAB 3: LIFETIME PROMO ── */}
                {activeTab === 'lifetime' && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        <div className="bg-white rounded-[44px] border border-slate-100 shadow-sm p-10 space-y-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><Rocket size={32} /></div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Lifetime Access CMS</h3>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage the core platform offer</p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Headline</label>
                                    <input value={lifetime.title} onChange={(e) => setLifetime({...lifetime, title: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[16px] font-black text-slate-800 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price Tag (Offer Text)</label>
                                    <input value={lifetime.priceTag} onChange={(e) => setLifetime({...lifetime, priceTag: e.target.value})} className="w-full bg-sky-50 border border-sky-100 rounded-2xl px-5 py-4 text-[14px] font-black text-sky-600 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subtitle Note (Hindi)</label>
                                    <input value={lifetime.note} onChange={(e) => setLifetime({...lifetime, note: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-500 outline-none" />
                                </div>

                                <div className="space-y-3 pt-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Feature List (Checkpoints)</label>
                                    {lifetime.features.map((item, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <input value={item} onChange={(e) => {
                                                const nf = [...lifetime.features]; nf[idx] = e.target.value; setLifetime({...lifetime, features: nf});
                                            }} className="flex-1 bg-white border border-slate-100 rounded-xl px-4 py-3.5 text-[13px] font-bold text-slate-800 shadow-sm outline-none" />
                                            <button onClick={() => {
                                                const nf = lifetime.features.filter((_, i) => i !== idx); setLifetime({...lifetime, features: nf});
                                            }} className="w-12 h-12 bg-rose-50 text-rose-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                                        </div>
                                    ))}
                                    <button onClick={() => setLifetime({...lifetime, features: [...lifetime.features, 'New Platform Feature']})} className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-indigo-500 transition-all">+ Add New Checkpoint</button>
                                </div>
                            </div>

                            <button className="w-full mt-4 bg-[#0F172A] text-white py-5 rounded-[24px] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3">
                                <Save size={20} /> Deploy Lifetime Promotion
                            </button>
                        </div>

                        {/* Real-time Preview Card (Image 2 Replica) */}
                        <div className="flex flex-col justify-center">
                            <div className="bg-slate-50 p-12 rounded-[60px] border border-slate-200 shadow-inner">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 text-center italic">Live Preview in App</p>
                                <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 rounded-[32px] p-8 shadow-2xl relative overflow-hidden ring-8 ring-white">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 text-sky-400">
                                                <Rocket size={24} />
                                            </div>
                                            <h3 className="text-xl font-black text-white tracking-tight uppercase">{lifetime.title}</h3>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                                            <p className="text-[15px] font-black text-sky-400 italic leading-none">{lifetime.priceTag}</p>
                                            <p className="text-[12px] font-bold text-white/70 mt-2 leading-tight">{lifetime.note}</p>
                                        </div>
                                        <div className="space-y-4 pl-1">
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Platform Access Benefits:</p>
                                            {lifetime.features.map((f, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/30 text-sky-400"><CheckCircle2 size={12} /></div>
                                                    <span className="text-[13px] font-black text-white/90">{f}</span>
                                                </div>
                                            ))}
                                        </div>
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

export default MarketingManager;
