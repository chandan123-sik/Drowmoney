import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Pause, RefreshCw, Coins, CheckCircle2, AlertTriangle, FastForward, ShieldCheck, MonitorPlay } from 'lucide-react';
import { useUser } from '../context/UserContext';

import { adStorage } from '../../shared/services/adStorage';

const AdPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addCoins } = useUser();
    const [ad, setAd] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const found = adStorage.getAdById(id);
        if (found) {
            setAd(found);
            setTimeLeft(found.duration);
            // Check if already watched today
            const watched = JSON.parse(localStorage.getItem('dromoney_watched_ads') || '[]');
            if (watched.includes(found.id)) {
                setIsCompleted(true);
            }
        } else {
            setError("Ad not found");
        }
    }, [id]);

    useEffect(() => {
        let timer;
        if (isPlaying && timeLeft > 0 && !isCompleted) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isCompleted && ad) {
            handleComplete();
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, isCompleted]);

    const handlePlayPause = () => {
        if (!isPlaying) {
            videoRef.current?.play().catch(e => {
                // Autoplay might be blocked
                console.log("Play blocked, user must interact");
            });
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    };

    const handleComplete = () => {
        setIsPlaying(false);
        setIsCompleted(true);
        
        // Save to reward system
        addCoins(ad.coins, `Watch & Earn: ${ad.title}`);
        
        // Persist completion
        const watched = JSON.parse(localStorage.getItem('dromoney_watched_ads') || '[]');
        if (!watched.includes(ad.id)) {
            watched.push(ad.id);
            localStorage.setItem('dromoney_watched_ads', JSON.stringify(watched));
        }
    };

    if (error) return <div className="p-10 text-center font-black text-rose-500">{error}</div>;
    if (!ad) return null;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col pt-0">
            {/* Immersive Header */}
            <header className="px-4 py-4 flex items-center justify-between z-50 absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent">
                <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all">
                    <ChevronLeft size={24} />
                </button>
                <div className="bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Coins size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">Reward: {ad.coins} Coins</span>
                </div>
            </header>

            {/* Video Player Section */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <video 
                    ref={videoRef}
                    src={ad.videoUrl} 
                    className="w-full h-auto max-h-screen object-contain"
                    playsInline
                    onEnded={handleComplete}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />

                {/* Overlays */}
                {!isPlaying && !isCompleted && (
                    <button 
                        onClick={handlePlayPause}
                        className="absolute w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl animate-pulse group active:scale-90 transition-all"
                    >
                        <Play size={40} className="fill-white" />
                    </button>
                )}

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                    <div 
                        className="h-full bg-indigo-500 transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        style={{ width: `${((ad.duration - timeLeft) / ad.duration) * 100}%` }}
                    ></div>
                </div>

                {/* Timer Countdown */}
                {!isCompleted && (
                    <div className="absolute top-20 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                        <div className="flex flex-col items-center">
                            <span className="text-[20px] font-black text-white leading-none">{timeLeft}</span>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Seconds</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls / Reward Card */}
            <div className="bg-white rounded-t-[2.5rem] p-6 pb-10">
                {!isCompleted ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <MonitorPlay size={20} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black text-slate-800 tracking-tight">{ad.title}</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sponsored Advertisement</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                <RefreshCw size={12} className={isPlaying ? 'animate-spin' : ''} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Watching</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shadow-inner">
                                <Coins size={24} className="text-amber-600 fill-amber-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">Total Earnings</p>
                                <p className="text-sm font-black text-slate-800">Earn <span className="text-indigo-600">+{ad.coins} coins</span> after {ad.duration}s</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-indigo-600 tracking-tighter">₹{(ad.coins * 0.1).toFixed(1)}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Est. Value</p>
                            </div>
                        </div>

                        <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl flex items-start gap-3">
                            <ShieldCheck size={18} className="text-sky-500 shrink-0 mt-0.5" />
                            <p className="text-[9px] font-bold text-sky-700 leading-relaxed uppercase tracking-tight">
                                Do not close the app while watching. Reward will be added only after full timer completion for verification.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="py-2 text-center space-y-4 animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10 border-4 border-white">
                            <CheckCircle2 size={40} className="text-emerald-500" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reward Claimed!</h2>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Coins successfully added to wallet</p>
                        </div>
                        
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between max-w-xs mx-auto">
                            <div className="text-left">
                                <p className="text-[10px] font-black text-emerald-600 uppercase">Received</p>
                                <p className="text-xl font-black text-emerald-800 tracking-tighter">+{ad.coins} <span className="text-sm">Coins</span></p>
                            </div>
                            <button onClick={() => navigate('/user/watch')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all active:scale-95">
                                Next Ad
                            </button>
                        </div>

                        <button 
                            onClick={() => navigate('/user/watch')}
                            className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest pt-4 hover:text-indigo-600 transition-colors"
                        >
                            Return to list
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdPlayer;
