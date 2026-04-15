import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, Trophy, Sparkles, Coins, ArrowRight, Brain, Clock, 
    RefreshCcw, Star, Zap, Heart, Ghost, Gem, Smile, Rocket, HelpCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { eventStorage } from '../../shared/services/eventStorage';

const ICON_MAP = {
    Trophy, Zap, Heart, Star, Ghost, Gem, Smile, Rocket
};

const MemoryMasterView = () => {
    const navigate = useNavigate();
    const { userData, addCoins, addNotification } = useUser();
    
    // Get config from storage
    const eventConfig = eventStorage.getEvents().find(e => e.id === 'memory-master');
    const PEEK_TIME = (eventConfig?.peekTime || 2.5) * 1000;
    const MAX_TIME = eventConfig?.maxTime || 60;
    const cardIcons = eventStorage.getCards();

    const [step, setStep] = useState(0); // 0: Intro, 1: Peek/Ready, 2: Playing, 3: Result
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [timeLeft, setTimeLeft] = useState(MAX_TIME);
    const [moves, setMoves] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    // ── Game Logic ────────────────────────────────

    const initializeGame = useCallback(() => {
        // Double the icons to create pairs
        const combined = [...cardIcons, ...cardIcons].map((item, idx) => ({
            ...item,
            uniqueId: idx,
            isFlipped: true // Start with cards revealed for peek
        }));
        
        // Shuffle
        const shuffled = combined.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setMatched([]);
        setFlipped([]);
        setMoves(0);
        setTimeLeft(MAX_TIME);
        setStep(1); // Start Peek phase

        // End Peek after delay
        setTimeout(() => {
            setCards(prev => prev.map(c => ({ ...c, isFlipped: false })));
            setStep(2); // Start Play phase
        }, PEEK_TIME);
    }, [cardIcons, PEEK_TIME, MAX_TIME]);

    useEffect(() => {
        let timer;
        if (step === 2 && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (step === 2 && timeLeft === 0) {
            handleFinish(false);
        }
        return () => clearInterval(timer);
    }, [step, timeLeft]);

    const handleCardClick = (cardIndex) => {
        if (isProcessing || step !== 2) return;
        if (flipped.includes(cardIndex) || matched.includes(cards[cardIndex].id)) return;

        const newFlipped = [...flipped, cardIndex];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setIsProcessing(true);
            setMoves(prev => prev + 1);
            
            const [first, second] = newFlipped;
            if (cards[first].id === cards[second].id) {
                // Match!
                setMatched(prev => [...prev, cards[first].id]);
                setFlipped([]);
                setIsProcessing(false);
                
                // Check Win
                if (matched.length + 1 === cardIcons.length) {
                    setTimeout(() => handleFinish(true), 500);
                }
            } else {
                // No Match
                setTimeout(() => {
                    setFlipped([]);
                    setIsProcessing(false);
                }, 800);
            }
        }
    };

    const handleFinish = (isWin) => {
        setStep(3);
        if (isWin) {
            const reward = Math.max(10, Math.floor((timeLeft / MAX_TIME) * 100));
            addCoins(reward, 'Memory Master Victory');
            addNotification('Memory Master Won!', `You completed the challenge with ${timeLeft}s left!`, 'success');
            
            // Save participation
            eventStorage.addParticipant('memory-master', {
                name: userData?.name || 'User',
                score: timeLeft,
                result: `${timeLeft}s remaining`,
                prize: `${reward} Coins`
            });

            // Mark completed in user storage
            const completed = JSON.parse(localStorage.getItem('dromoney_completed_events') || '[]');
            if (!completed.includes('memory-master')) {
                completed.push('memory-master');
                localStorage.setItem('dromoney_completed_events', JSON.stringify(completed));
            }
        }
    };

    // ── Components ────────────────────────────────

    const DynamicIcon = ({ name, ...props }) => {
        const IconComponent = ICON_MAP[name] || HelpCircle;
        return <IconComponent {...props} />;
    };

    if (step === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col p-6 text-white animate-in fade-in duration-500">
                <header className="flex items-center gap-4 mb-10 pt-2">
                    <button onClick={() => navigate('/user/events')} className="p-2 bg-white/10 rounded-full backdrop-blur transition-all active:scale-90">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight uppercase">🧩 Memory Master</h1>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center pt-10">
                    <div className="relative">
                        <div className="w-40 h-40 bg-white/10 rounded-[3rem] flex items-center justify-center border-4 border-indigo-400/30 backdrop-blur-xl shadow-[0_0_50px_rgba(129,140,248,0.2)]">
                            <Brain size={80} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute -top-4 -right-4 w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
                            <Trophy size={28} className="text-amber-900" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-4xl font-black leading-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">Train Your Brain,<br />Win Coins!</h2>
                        <p className="text-white/60 font-bold text-sm max-w-xs mx-auto leading-relaxed">
                            Match all 6 pairs of cards as fast as you can. Every second saved gives you more coins! 🧠✨
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Pairs</p>
                            <p className="text-2xl font-black text-indigo-400">6 Pairs</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Max Time</p>
                            <p className="text-2xl font-black text-rose-400">{MAX_TIME}s</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                     <div className="flex items-center gap-2 bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                        <Sparkles size={16} />
                        TIP: You will get 2.5 seconds to see all cards at the start. Watch closely!
                    </div>
                    <button
                        onClick={initializeGame}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-indigo-500/30 active:scale-[0.98] transition-all"
                    >
                        🚀 Enter Game
                    </button>
                    <div className="h-4" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060810] flex flex-col text-white pb-8 overflow-hidden select-none">
            {/* HUD */}
            <div className="p-6 flex items-center justify-between z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Status</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                        <span className="text-sm font-black uppercase">{step === 1 ? 'Remembering...' : 'Playing'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center min-w-[70px]">
                        <p className="text-[9px] font-black text-white/30 uppercase mb-0.5">Time</p>
                        <p className={`text-xl font-black ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center min-w-[70px]">
                        <p className="text-[9px] font-black text-white/30 uppercase mb-0.5">Pairs</p>
                        <p className="text-xl font-black text-indigo-400">{matched.length}/6</p>
                    </div>
                </div>
            </div>

            {/* Board */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className={`grid grid-cols-3 gap-3 w-full max-w-sm transition-opacity duration-500 ${step === 1 ? 'opacity-90' : 'opacity-100'}`}>
                    {cards.map((card, idx) => {
                        const isFlipped = flipped.includes(idx) || matched.includes(card.id) || step === 1;
                        return (
                            <div 
                                key={card.uniqueId} 
                                onClick={() => handleCardClick(idx)}
                                className="aspect-[4/5] relative preserve-3d transition-all duration-500 cursor-pointer group"
                                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                {/* Back of Card (Shown initially) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 flex items-center justify-center backface-hidden shadow-xl z-10 overflow-hidden">
                                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent" />
                                     <Brain size={24} className="text-white/10" />
                                </div>
                                
                                {/* Front of Card (Revealed) */}
                                <div className={`absolute inset-0 rounded-2xl border-2 flex items-center justify-center rotateY-180 backface-hidden shadow-2xl transition-all ${matched.includes(card.id) ? 'bg-indigo-500/20 border-indigo-500/50 grayscale-0' : 'bg-white border-white'}`}>
                                    <DynamicIcon 
                                        name={card.icon} 
                                        size={32} 
                                        className={`${matched.includes(card.id) ? 'text-indigo-400' : card.color} transition-all ${matched.includes(card.id) ? 'scale-110' : ''}`} 
                                    />
                                    {matched.includes(card.id) && (
                                        <div className="absolute -top-2 -right-2 bg-indigo-500 rounded-full p-1 shadow-lg">
                                            <Sparkles size={12} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Progress Bottom */}
            <div className="px-6 space-y-4">
                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${(matched.length / 6) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Efficiency: {moves > 0 ? Math.round((matched.length/moves)*100) : 0}%</p>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Moves: {moves}</p>
                </div>
            </div>

            {/* Result Overlay */}
            {step === 3 && (
                <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col p-8 items-center justify-center text-center animate-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-amber-400 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.5)] mb-8">
                        <Trophy size={48} className="text-amber-900" />
                    </div>
                    
                    <h2 className="text-4xl font-black mb-2">{timeLeft > 0 ? 'Brainy Victory! 🧠' : 'Time\'s Up!'}</h2>
                    <p className="text-white/50 font-bold mb-10">
                        {timeLeft > 0 
                            ? `Awesome! You cleared the board in ${MAX_TIME - timeLeft} seconds.` 
                            : 'So close! Try to be focus and faster next time.'
                        }
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-10">
                         <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10">
                            <p className="text-[9px] font-black text-white/40 uppercase mb-1">Remaining</p>
                            <p className="text-2xl font-black text-amber-400">{timeLeft}s</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10">
                            <p className="text-[9px] font-black text-white/40 uppercase mb-1">Prize</p>
                            <div className="flex items-center justify-center gap-1.5">
                                <Coins size={14} className="text-amber-400" />
                                <p className="text-2xl font-black text-white">+{Math.max(10, Math.floor((timeLeft / MAX_TIME) * 100))}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <button
                            onClick={() => navigate('/user/events')}
                            className="w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            Back to Events <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => setStep(0)}
                            className="w-full bg-white/5 text-white/60 py-4 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            <RefreshCcw size={16} /> Try Again
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotateY-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};

export default MemoryMasterView;
