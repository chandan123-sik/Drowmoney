import React, { useState, useEffect } from 'react';
import { MonitorPlay, Plus, Trash2, Clock, Coins, X, Link as LinkIcon, Edit3, Image as ImageIcon, Video, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { adStorage } from '../../shared/services/adStorage';

const WatchAndEarnAdmin = () => {
    const [ads, setAds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        coins: '',
        duration: '',
        thumbnail: '',
        videoUrl: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        setAds(adStorage.getAds());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this ad?")) {
            adStorage.deleteAd(id);
            setAds(adStorage.getAds());
        }
    };

    const handleEdit = (ad) => {
        setFormData({
            title: ad.title,
            coins: ad.coins,
            duration: ad.duration,
            thumbnail: ad.thumbnail,
            videoUrl: ad.videoUrl
        });
        setEditId(ad.id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        setFormData({ title: '', coins: '', duration: '', thumbnail: '', videoUrl: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            adStorage.updateAd(editId, formData);
            alert("Ad updated successfully!");
        } else {
            adStorage.saveAd(formData);
            alert("Ad published successfully!");
        }
        setAds(adStorage.getAds());
        handleCloseModal();
    };

    return (
        <div className="p-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <PageHeader title="Watch & Earn Manager" subtitle="Create and manage video advertisements for users" />
                <button 
                    onClick={() => {
                        setEditId(null);
                        setFormData({ title: '', coins: '', duration: '', thumbnail: '', videoUrl: '' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                    <Plus size={20} strokeWidth={3} />
                    <span>Create New Ad</span>
                </button>
            </div>

            {/* Ads List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.map((ad) => (
                    <div key={ad.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all group relative">
                        <div className="h-40 relative">
                            <img src={ad.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80'} alt={ad.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 text-[10px] font-black text-white uppercase tracking-widest">
                                    {ad.duration}s Length
                                </div>
                                <div className="bg-amber-500 text-white font-black px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                                    <Coins size={12} className="fill-white/20" /> +{ad.coins}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-black text-slate-800 text-lg mb-2 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{ad.title}</h3>
                            <div className="space-y-2 mb-6">
                                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2 truncate whitespace-nowrap overflow-hidden">
                                    <Video size={14} className="text-slate-300" /> {ad.videoUrl}
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-emerald-500" /> Active on platform
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEdit(ad)}
                                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-black text-[11px] uppercase tracking-widest py-3 rounded-xl transition-all flex justify-center items-center gap-1.5"
                                >
                                    <Edit3 size={14} /> Edit Details
                                </button>
                                <button 
                                    onClick={() => handleDelete(ad.id)}
                                    className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-100"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Ad Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                    <MonitorPlay size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 uppercase tracking-tight">{editId ? 'Edit Video Ad' : 'Create Video Ad'}</h3>
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{editId ? 'Update ad details' : 'Setup new watch & earn task'}</p>
                                </div>
                            </div>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:bg-white p-2 rounded-full transition-colors shadow-sm"><X size={24}/></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ad Title / Name</label>
                                <input 
                                    required
                                    type="text"
                                    placeholder="Enter ad campaign name"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 transition-all outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coins Reward</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Coins size={16}/></div>
                                        <input 
                                            required
                                            type="number"
                                            placeholder="Example: 50"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                            value={formData.coins}
                                            onChange={(e) => setFormData({...formData, coins: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Watch Duration (Sec)</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Clock size={16}/></div>
                                        <input 
                                            required
                                            type="number"
                                            placeholder="Example: 30"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thumbnail Image URL</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><ImageIcon size={16}/></div>
                                    <input 
                                        required
                                        type="url"
                                        placeholder="https://..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                        value={formData.thumbnail}
                                        onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Video Source URL (.mp4)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><LinkIcon size={16}/></div>
                                    <input 
                                        required
                                        type="url"
                                        placeholder="https://.../video.mp4"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pl-12 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all text-sm mt-4"
                            >
                                {editId ? 'Save Changes' : 'Publish Ad Task'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchAndEarnAdmin;
