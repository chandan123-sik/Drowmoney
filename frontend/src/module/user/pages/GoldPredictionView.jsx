import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, TrendingUp, TrendingDown, Trophy, Coins, ArrowRight, BarChart3, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { eventStorage } from '../../shared/services/eventStorage';

const GoldPredictionView = () => {
    const navigate = useNavigate();
    const { userData, addCoins, addNotification } = useUser();
    const eventConfig = eventStorage.getEvents().find(e => e.id === 'gold-prediction');
    const COIN_REWARD = eventConfig?.coinReward || 40;
    const [step, setStep] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const [goldStartPrice, setGoldStartPrice] = useState(6245.50);
    const [goldEndPrice, setGoldEndPrice] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        let timer;
        if (step === 1 && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
                // Animate gold price
                setGoldStartPrice(prev => {
                    const change = (Math.random() - 0.48) * 2;
                    return +(prev + change).toFixed(2);
                });
            }, 1000);
        } else if (step === 1 && timeLeft === 0) {
            // Determine result
            const finalPrice = goldStartPrice;
            setGoldEndPrice(finalPrice);
            const went = finalPrice > 6245.50 ? 'up' : 'down';
            const won = went === prediction;
            setIsCorrect(won);
            if (won) {
                addCoins(COIN_REWARD, 'Gold Prediction Prize');
                addNotification('Gold Prediction Won!', `Your prediction was correct! +${COIN_REWARD} Coins added.`, 'success');
            }
            const completed = JSON.parse(localStorage.getItem('dromoney_completed_events') || '[]');
            if (!completed.includes('gold-prediction')) {
                completed.push('gold-prediction');
                localStorage.setItem('dromoney_completed_events', JSON.stringify(completed));
                // Save participant record
                eventStorage.addParticipant('gold-prediction', {
                    name: userData?.name || 'User',
                    score: won ? 1 : 0,
                    result: won ? 'Correct Prediction' : 'Wrong Prediction',
                    prize: won ? `${COIN_REWARD} Coins` : 'No Prize'
                });
            }
            setStep(2);
        }
        return () => clearInterval(timer);
    }, [step, timeLeft]);

    const handlePredict = (dir) => {
        setPrediction(dir);
        setStep(1);
        setTimeLeft(10);
    };

    if (step === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-amber-900 via-yellow-900 to-slate-900 flex flex-col p-6 text-white">
                <header className="flex items-center gap-4 mb-6 pt-2">
                    <button onClick={() => navigate('/user/events')} className="p-2 bg-white/10 rounded-full backdrop-blur">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight uppercase">🥇 Gold Prediction</h1>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                    {/* Live Gold Price */}
                    <div className="bg-white/10 backdrop-blur rounded-[2rem] p-8 w-full border border-white/20 text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-300 mb-3">Current Gold Price (per gram)</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-5xl font-black text-amber-400">₹{goldStartPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <BarChart3 size={16} className="text-white/60" />
                            <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Live MCX Rate</p>
                        </div>
                    </div>

                    <div className="text-center space-y-3">
                        <h2 className="text-2xl font-black">Will gold price go UP or DOWN in the next 10 seconds?</h2>
                        <p className="text-white/60 font-bold text-sm">Predict correctly and win 40 Coins!</p>
                    </div>

                    {/* Prediction Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <button
                            onClick={() => handlePredict('up')}
                            className="flex flex-col items-center justify-center gap-3 p-8 bg-emerald-500/30 border-2 border-emerald-400/50 rounded-[2rem] text-white hover:bg-emerald-500/50 active:scale-95 transition-all backdrop-blur"
                        >
                            <TrendingUp size={48} className="text-emerald-400" />
                            <span className="text-xl font-black uppercase tracking-wider">UP ↑</span>
                            <span className="text-[11px] font-bold text-white/60">Gold will rise</span>
                        </button>
                        <button
                            onClick={() => handlePredict('down')}
                            className="flex flex-col items-center justify-center gap-3 p-8 bg-rose-500/30 border-2 border-rose-400/50 rounded-[2rem] text-white hover:bg-rose-500/50 active:scale-95 transition-all backdrop-blur"
                        >
                            <TrendingDown size={48} className="text-rose-400" />
                            <span className="text-xl font-black uppercase tracking-wider">DOWN ↓</span>
                            <span className="text-[11px] font-bold text-white/60">Gold will fall</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-amber-900 via-yellow-900 to-slate-900 flex flex-col items-center justify-center p-6 text-white space-y-10">
                <div className="text-center space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-300">Your Prediction:</p>
                    <div className={`flex items-center gap-3 text-4xl font-black ${prediction === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {prediction === 'up' ? <TrendingUp size={48} /> : <TrendingDown size={48} />}
                        {prediction === 'up' ? 'UP ↑' : 'DOWN ↓'}
                    </div>
                </div>

                {/* Live price changing */}
                <div className="bg-white/10 backdrop-blur rounded-[2rem] p-8 w-full border border-white/20 text-center">
                    <p className="text-[11px] font-black uppercase tracking-widest text-amber-300 mb-3">Live Gold Price</p>
                    <span className="text-5xl font-black text-amber-400 transition-all">₹{goldStartPrice.toFixed(2)}</span>
                </div>

                {/* Timer */}
                <div className="relative w-32 h-32">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeLeft / 10)}`}
                            strokeLinecap="round" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-amber-400">{timeLeft}</span>
                    </div>
                </div>

                <p className="text-white/60 font-bold text-sm animate-pulse">Watching gold price closely...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-900 via-yellow-900 to-slate-900 flex flex-col p-6 text-white">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className={`w-44 h-44 rounded-[3rem] flex items-center justify-center border-4 shadow-2xl animate-in zoom-in duration-700 ${isCorrect ? 'bg-emerald-500/30 border-emerald-400' : 'bg-rose-500/30 border-rose-400'}`}>
                    {isCorrect ? <Trophy size={88} className="text-emerald-400" /> : <AlertCircle size={88} className="text-rose-400" />}
                </div>

                <div className="space-y-3">
                    <h2 className="text-4xl font-black">{isCorrect ? '🎉 Correct!' : '😔 Wrong!'}</h2>
                    <p className="text-white/60 font-bold text-sm">
                        {isCorrect ? 'Great prediction! +40 Coins added to your wallet.' : 'Better luck next time! Try again tomorrow.'}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    <div className="bg-white/10 p-4 rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Your Bet</p>
                        <p className={`text-lg font-black ${prediction === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {prediction === 'up' ? '↑ UP' : '↓ DOWN'}
                        </p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Result</p>
                        <p className={`text-lg font-black ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isCorrect ? '✅ Correct' : '❌ Wrong'}
                        </p>
                    </div>
                </div>

                {isCorrect && (
                    <div className="bg-amber-400/20 border border-amber-400/40 p-5 rounded-3xl flex items-center gap-4 w-full max-w-xs">
                        <Coins size={28} className="text-amber-400 fill-amber-400 shrink-0" />
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300 mb-1">Prize Won</p>
                            <p className="text-2xl font-black text-amber-400">+40 Coins</p>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate('/user/events')}
                className="w-full bg-white text-amber-900 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all mb-8 flex items-center justify-center gap-3"
            >
                Back to Events <ArrowRight size={20} />
            </button>
        </div>
    );
};

export default GoldPredictionView;
