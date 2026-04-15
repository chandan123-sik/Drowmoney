import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, Sparkles, Coins, Star, Gift, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { eventStorage } from '../../shared/services/eventStorage';


const LuckyDrawView = () => {
    const navigate = useNavigate();
    const { userData, addCoins, addNotification } = useUser();
    const PRIZES = eventStorage.getPrizes();
    const [step, setStep] = useState(0);
    const [prizeIndex, setPrizeIndex] = useState(null);
    const [rotationDeg, setRotationDeg] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [tickets, setTickets] = useState(['🎫', '🎟️', '🎁', '⭐', '🏆', '💫', '🌟', '🎉']);
    const [flippedTicket, setFlippedTicket] = useState(null);
    const [revealed, setRevealed] = useState(false);

    const handleStartDraw = () => {
        setStep(1);
        const winner = Math.floor(Math.random() * PRIZES.length);
        setPrizeIndex(winner);
        
        // Spin the wheel
        setIsSpinning(true);
        const extraSpins = 5 * 360;
        const finalDeg = extraSpins + (360 - (winner * (360 / PRIZES.length)));
        setRotationDeg(finalDeg);
        
        setTimeout(() => {
            setIsSpinning(false);
        }, 4000);

        setTimeout(() => {
            setStep(2);
            const prize = PRIZES[winner];
            if (prize.coins > 0) {
                addCoins(prize.coins, `Lucky Draw Prize`);
            }
            addNotification('Lucky Draw Result!', `You won ${prize.label} in the Lucky Draw!`, 'success');
            const completed = JSON.parse(localStorage.getItem('dromoney_completed_events') || '[]');
            if (!completed.includes('lucky-draw')) {
                completed.push('lucky-draw');
                localStorage.setItem('dromoney_completed_events', JSON.stringify(completed));
                // Save participant record
                eventStorage.addParticipant('lucky-draw', {
                    name: userData?.name || 'User',
                    score: null,
                    result: `Won: ${prize.label}`,
                    prize: prize.label
                });
            }
        }, 4500);
    };

    const handleTicketReveal = (i) => {
        if (flippedTicket !== null || revealed) return;
        setFlippedTicket(i);
        setTimeout(() => setRevealed(true), 800);
    };

    const prize = prizeIndex !== null ? PRIZES[prizeIndex] : null;

    if (step === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex flex-col p-6 text-white">
                <header className="flex items-center gap-4 mb-6 pt-2">
                    <button onClick={() => navigate('/user/events')} className="p-2 bg-white/10 rounded-full backdrop-blur">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight uppercase">🎟️ Lucky Draw</h1>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10">
                    <div className="relative">
                        <div className="w-40 h-40 bg-white/10 rounded-[3rem] flex items-center justify-center border-4 border-white/20 backdrop-blur shadow-2xl animate-pulse">
                            <Gift size={80} className="text-amber-400" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-amber-400 p-3 rounded-full shadow-xl border-4 border-indigo-900 animate-spin-slow">
                            <Sparkles size={20} className="text-white fill-white" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl font-black leading-tight">Try Your Luck!</h2>
                        <p className="text-white/60 font-bold text-sm leading-relaxed max-w-xs">
                            Pick a ticket and reveal your prize. Win cash up to ₹1000 or bonus coins!
                        </p>
                    </div>

                    {/* Ticket Grid */}
                    <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
                        {tickets.map((emoji, i) => (
                            <button
                                key={i}
                                onClick={() => { if (step === 0) { handleTicketReveal(i); } }}
                                className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 border-2 ${
                                    flippedTicket === i
                                        ? 'bg-amber-400 border-amber-300 scale-110 shadow-2xl shadow-amber-500/50'
                                        : 'bg-white/10 border-white/20 backdrop-blur hover:bg-white/20 active:scale-95'
                                }`}
                            >
                                {flippedTicket === i && revealed ? '🎁' : emoji}
                            </button>
                        ))}
                    </div>

                    {revealed && (
                        <div className="bg-white/10 backdrop-blur p-5 rounded-3xl border border-white/20 text-center animate-in zoom-in duration-500">
                            <p className="text-[11px] font-black uppercase tracking-widest text-white/60 mb-2">Your Ticket Selected!</p>
                            <p className="text-4xl font-black text-amber-400">🎟️ Ready!</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleStartDraw}
                    disabled={!revealed}
                    className={`w-full py-5 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl transition-all mb-8 ${
                        revealed
                            ? 'bg-amber-400 text-indigo-900 active:scale-95 shadow-amber-500/50'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                >
                    {revealed ? '🎯 Start the Draw!' : 'Select a Ticket First'}
                </button>
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 text-white">
                <div className="text-center space-y-8">
                    <div className="relative">
                        <div
                            className="w-48 h-48 rounded-full border-8 border-amber-400 flex items-center justify-center text-8xl shadow-2xl shadow-amber-500/30"
                            style={{
                                transform: `rotate(${rotationDeg}deg)`,
                                transition: isSpinning ? 'transform 4s cubic-bezier(0.1,0.7,0.3,1)' : 'none',
                                background: 'conic-gradient(from 0deg, #7c3aed, #4f46e5, #0ea5e9, #10b981, #f59e0b, #ef4444, #8b5cf6, #06b6d4)'
                            }}
                        >
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-amber-400">
                                <Sparkles size={28} className="text-amber-500 fill-amber-500" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black animate-pulse">🎯 Drawing the Winner...</h2>
                        <p className="text-white/60 font-bold text-sm">The wheel is spinning. Good luck!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex flex-col p-6 text-white">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                    <div className="w-44 h-44 bg-amber-400/20 rounded-[3rem] flex items-center justify-center border-4 border-amber-400/60 shadow-2xl animate-in zoom-in duration-700">
                        <Trophy size={88} className="text-amber-400" />
                    </div>
                    <div className="absolute -top-3 -right-3">
                        <div className="bg-emerald-400 p-3 rounded-full border-4 border-indigo-900 shadow-xl animate-bounce">
                            <Star size={18} className="text-white fill-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50">Congratulations!</p>
                    <h2 className="text-4xl font-black leading-tight">You Won!</h2>
                </div>

                <div className={`w-full max-w-xs p-8 rounded-[3rem] border-2 text-center ${prize?.bg} ${prize?.color} border-current/20 animate-in zoom-in duration-500`}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-70">Your Prize</p>
                    <p className="text-6xl font-black mb-4">{prize?.label}</p>
                    {prize?.coins > 0 && (
                        <div className="flex items-center justify-center gap-2 bg-white/80 rounded-2xl p-3">
                            <Coins size={20} className="text-amber-500 fill-amber-500" />
                            <span className="text-[13px] font-black text-slate-700">+{prize.coins} Coins added to wallet</span>
                        </div>
                    )}
                    {prize?.cash > 0 && (
                        <div className="flex items-center justify-center gap-2 bg-white/80 rounded-2xl p-3">
                            <Trophy size={20} className="text-emerald-500" />
                            <span className="text-[13px] font-black text-slate-700">{prize.cash}₹ prize confirmed!</span>
                        </div>
                    )}
                </div>

                <div className="bg-white/10 backdrop-blur p-5 rounded-3xl border border-white/20 text-center w-full max-w-xs">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                        🎉 Your result has been saved. Cash prizes will be credited within 24 hours.
                    </p>
                </div>
            </div>

            <button
                onClick={() => navigate('/user/events')}
                className="w-full bg-white text-indigo-900 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all mb-8 flex items-center justify-center gap-3"
            >
                Back to Events <ArrowRight size={20} />
            </button>
        </div>
    );
};

export default LuckyDrawView;
