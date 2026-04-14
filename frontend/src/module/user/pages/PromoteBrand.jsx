import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Phone, Mail, Briefcase, Link, IndianRupee, Users, AlertTriangle, FileText, Rocket, CheckCircle2, ChevronDown, Plus, Clock, ExternalLink } from 'lucide-react';
import { promotionStorage } from '../../shared/services/promotionStorage';

const PromoteBrand = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [myPromotions, setMyPromotions] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        whatsapp: '',
        category: '',
        link: '',
        budget: '',
        usersRequired: '',
        description: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const costPerUser = 1;

    useEffect(() => {
        const promos = promotionStorage.getPromotions();
        setMyPromotions(promos);
        if (promos.length === 0) {
            setView('form');
        }
    }, [isSubmitted]);

    const categories = [
        'App Download',
        'Video Watch',
        'Instagram Follow',
        'YouTube Subscribe',
        'Website Visit',
        'Custom Task'
    ];

    const handleBudgetChange = (val) => {
        const budget = val === '' ? '' : Number(val);
        setFormData(prev => ({
            ...prev,
            budget: val,
            usersRequired: budget === '' ? '' : budget / costPerUser
        }));
    };

    const handleUsersChange = (val) => {
        const users = val === '' ? '' : Number(val);
        setFormData(prev => ({
            ...prev,
            usersRequired: val,
            budget: users === '' ? '' : users * costPerUser
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save to simulated backend
        promotionStorage.savePromotion(formData);

        setIsSubmitted(true);
        setView('list');
        // Reset form
        setFormData({ name: '', mobile: '', whatsapp: '', category: '', link: '', budget: '', usersRequired: '', description: '' });
        
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24 relative pt-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 py-4 fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-lg max-w-md mx-auto">
                <div className="flex items-center gap-4">
                    <button onClick={() => view === 'form' && myPromotions.length > 0 ? setView('list') : navigate('/user/home')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center gap-2">
                        <Rocket size={20} className="fill-white/20" />
                        <h1 className="text-lg font-black tracking-tight">
                            {view === 'form' ? 'Promotion Details' : 'My Brand Promotion'}
                        </h1>
                    </div>
                </div>
            </header>

            <div className="p-4 max-w-md mx-auto">
                
                {/* LIST VIEW: Show existing requests */}
                {view === 'list' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {isSubmitted && (
                             <div className="bg-emerald-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-200 animate-bounce">
                                <CheckCircle2 size={24} />
                                <span className="text-xs font-black uppercase tracking-widest">Promotion Form Submitted Successfully!</span>
                             </div>
                        )}

                        <div className="mb-2">
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Ad Requests History</h2>
                        </div>

                        {myPromotions.length === 0 ? (
                            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                                <Rocket size={40} className="text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold text-sm leading-relaxed">No requests found. Click the button below to promote your brand!</p>
                            </div>
                        ) : (
                            myPromotions.map((promo) => (
                                <div key={promo.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:border-sky-200 transition-all active:scale-[0.98]">
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center text-sky-500">
                                                    <Briefcase size={16} />
                                                </div>
                                                <h3 className="font-black text-slate-800 text-sm">{promo.category}</h3>
                                            </div>
                                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${
                                                promo.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                            }`}>
                                                {promo.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Budget</p>
                                                <p className="text-sm font-black text-slate-800">₹{promo.budget}</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Users</p>
                                                <p className="text-sm font-black text-slate-800">{promo.usersRequired}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-4">
                                            <span className="flex items-center gap-1"><Clock size={12}/> {promo.date}</span>
                                            <a href={promo.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-500 hover:underline">Link <ExternalLink size={10}/></a>
                                        </div>

                                        {promo.adminResponse && (
                                            <div className="mt-4 bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 size={12}/> Admin Response:</p>
                                                <p className="text-xs font-bold text-emerald-800 leading-relaxed italic">"{promo.adminResponse}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                
                {/* FORM VIEW: Original Promotion Form */}
                {view === 'form' && (
                    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Name</label>
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-slate-100 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input 
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 transition-all outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Mobile & WhatsApp Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Mobile Number</label>
                                <div className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-slate-100 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input required type="tel" placeholder="Mobile" className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 transition-all font-mono" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp/Email</label>
                                <div className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-slate-100 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input required type="text" placeholder="Contact" className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 transition-all" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                                </div>
                            </div>
                        </div>

                        {/* Task Category */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Task Category</label>
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-slate-100 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                    <Briefcase size={18} />
                                </div>
                                <select 
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-10 py-3.5 text-sm font-black text-slate-800 focus:outline-none focus:border-sky-500 appearance-none shadow-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                >
                                    <option value="" disabled>Select Task Type</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ChevronDown size={18} /></div>
                            </div>
                        </div>

                        {/* Task Link */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Task Link</label>
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-slate-100 text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                    <Link size={18} />
                                </div>
                                <input required type="url" placeholder="Paste link here" className="w-full bg-white border border-slate-200 rounded-xl pl-14 pr-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 transition-all" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} />
                            </div>
                        </div>

                        {/* Budget & Target */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Budget (₹)</label>
                                <div className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-100 text-slate-400 transition-colors"><IndianRupee size={15} /></div>
                                    <input required type="number" placeholder="Budget" className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-3 py-3 text-sm font-black text-slate-800 focus:outline-none focus:border-sky-500 transition-all" value={formData.budget} onChange={(e) => handleBudgetChange(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Users</label>
                                <div className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-100 text-slate-400 transition-colors"><Users size={15} /></div>
                                    <input required type="number" placeholder="Users" className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-3 py-3 text-sm font-black text-slate-800 focus:outline-none focus:border-sky-500 transition-all" value={formData.usersRequired} onChange={(e) => handleUsersChange(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
                            <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mb-2">Estimate: ₹{costPerUser}/User cost</p>
                            <div className="text-xl font-black text-slate-800 leading-none">₹{formData.budget || 0} = {formData.usersRequired || 0} Users</div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Description (Optional)</label>
                            <textarea rows="3" placeholder="Explain your promotion goal..." className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 transition-all resize-none shadow-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-[#FFB800] hover:bg-[#E5A600] text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg shadow-amber-200 active:scale-[0.98] transition-all text-sm mt-2">
                            Submit & Continue
                        </button>
                    </form>
                )}
            </div>

            {/* Floating Plus Button (Attractive Add Icon) */}
            {view === 'list' && (
                <button 
                    onClick={() => setView('form')}
                    className="fixed bottom-10 right-6 w-14 h-14 bg-sky-500 text-white rounded-full shadow-[0_8px_25px_rgba(14,165,233,0.4)] flex items-center justify-center active:scale-90 transition-all z-[100] border-4 border-white animate-in zoom-in-50 duration-500"
                >
                    <Plus size={30} strokeWidth={3} />
                </button>
            )}
        </div>
    );
};

export default PromoteBrand;
