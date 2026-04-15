import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, CheckCircle2, Circle, ArrowRight, Zap, Clock, Coins } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { eventStorage } from '../../shared/services/eventStorage';


const TaskRaceView = () => {
    const navigate = useNavigate();
    const { userData, addCoins, addNotification } = useUser();
    const RACE_TASKS = eventStorage.getTasks();
    const eventConfig = eventStorage.getEvents().find(e => e.id === 'task-race');
    const TIME_LIMIT = eventConfig?.timeLimit || 60;
    const [step, setStep] = useState(0);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let timer;
        if (step === 1 && timeLeft > 0 && !isFinished) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (step === 1 && (timeLeft === 0 || isFinished)) {
            handleFinish();
        }
        return () => clearInterval(timer);
    }, [step, timeLeft, isFinished]);

    const handleToggleTask = (taskId) => {
        setCompletedTasks(prev => {
            if (prev.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            }
            const newCompleted = [...prev, taskId];
            if (newCompleted.length === RACE_TASKS.length) {
                setTimeout(() => setIsFinished(true), 300);
            }
            return newCompleted;
        });
    };

    const handleFinish = () => {
        if (step === 2) return;
        const totalPoints = completedTasks.reduce((sum, id) => {
            const task = RACE_TASKS.find(t => t.id === id);
            return sum + (task?.points || 0);
        }, 0);
        addCoins(totalPoints, 'Task Race Prize');
        addNotification('Task Race Complete!', `You earned ${totalPoints} Coins from the Task Race!`, 'success');
        const completed = JSON.parse(localStorage.getItem('dromoney_completed_events') || '[]');
        if (!completed.includes('task-race')) {
            completed.push('task-race');
            localStorage.setItem('dromoney_completed_events', JSON.stringify(completed));
            // Save participant record
            eventStorage.addParticipant('task-race', {
                name: userData?.name || 'User',
                score: completedTasks.length,
                result: `${completedTasks.length}/${RACE_TASKS.length} Tasks`,
                prize: `${totalPoints} Coins`
            });
        }
        setStep(2);
    };

    const totalPoints = completedTasks.reduce((sum, id) => {
        const task = RACE_TASKS.find(t => t.id === id);
        return sum + (task?.points || 0);
    }, 0);

    const progress = (completedTasks.length / RACE_TASKS.length) * 100;

    if (step === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 flex flex-col p-6 text-white">
                <header className="flex items-center gap-4 mb-6 pt-2">
                    <button onClick={() => navigate('/user/events')} className="p-2 bg-white/10 rounded-full backdrop-blur">
                        <ChevronLeft size={24} className="text-white" />
                    </button>
                    <h1 className="text-xl font-black tracking-tight uppercase">🏁 Task Race</h1>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center">
                    <div className="w-40 h-40 bg-white/10 rounded-[3rem] flex items-center justify-center border-4 border-white/20 backdrop-blur shadow-2xl">
                        <Zap size={80} className="text-emerald-400" />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl font-black leading-tight">Complete Tasks,<br />Win Coins!</h2>
                        <p className="text-white/60 font-bold text-sm max-w-xs mx-auto leading-relaxed">
                            Complete as many tasks as possible within 60 seconds. Each task gives you coins! 🏆
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                        <div className="bg-white/10 p-4 rounded-2xl text-center border border-white/20">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Tasks</p>
                            <p className="text-2xl font-black text-emerald-400">{RACE_TASKS.length}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl text-center border border-white/20">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Time</p>
                            <p className="text-2xl font-black text-amber-400">{TIME_LIMIT}s</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl text-center border border-white/20">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Max</p>
                            <p className="text-2xl font-black text-sky-400">100</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setStep(1)}
                    className="w-full bg-emerald-400 text-emerald-900 py-5 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all mb-8"
                >
                    🏁 Start Race!
                </button>
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="min-h-screen bg-[#0f1117] flex flex-col text-white pb-8">
                {/* Sticky Header with Timer */}
                <div className="sticky top-0 z-10 bg-[#0f1117] border-b border-white/10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap size={20} className="text-emerald-400" />
                        <span className="font-black text-emerald-400 uppercase tracking-widest text-sm">Task Race</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-500/30">
                            <Coins size={14} className="text-amber-400 fill-amber-400" />
                            <span className="text-[13px] font-black text-amber-400">{totalPoints}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${timeLeft < 10 ? 'bg-rose-500/20 border-rose-500/30' : 'bg-white/10 border-white/20'}`}>
                            <Clock size={14} className={timeLeft < 10 ? 'text-rose-400 animate-pulse' : 'text-white/60'} />
                            <span className={`text-[13px] font-black ${timeLeft < 10 ? 'text-rose-400' : 'text-white'}`}>{timeLeft}s</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white/10">
                    <div
                        className="h-full bg-emerald-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-4 space-y-3 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 text-center mb-4">
                        Tap tasks to check them off — {completedTasks.length}/{RACE_TASKS.length} done
                    </p>
                    {RACE_TASKS.map((task) => {
                        const done = completedTasks.includes(task.id);
                        return (
                            <button
                                key={task.id}
                                onClick={() => handleToggleTask(task.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-98 text-left ${
                                    done
                                        ? 'bg-emerald-500/20 border-emerald-500/40'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {done
                                    ? <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                                    : <Circle size={24} className="text-white/30 shrink-0" />
                                }
                                <div className="flex-1">
                                    <p className={`text-sm font-black ${done ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>
                                        {task.text}
                                    </p>
                                </div>
                                <span className={`text-[11px] font-black px-2 py-1 rounded-lg ${done ? 'bg-emerald-400 text-emerald-900' : 'bg-white/10 text-white/50'}`}>
                                    +{task.points}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="px-4">
                    <button
                        onClick={handleFinish}
                        disabled={completedTasks.length === 0}
                        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                            completedTasks.length > 0
                                ? 'bg-emerald-500 text-white active:scale-95 shadow-xl shadow-emerald-500/30'
                                : 'bg-white/10 text-white/30'
                        }`}
                    >
                        {completedTasks.length === RACE_TASKS.length ? '🏆 Finish Race!' : `Claim ${totalPoints} Coins`}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 flex flex-col p-6 text-white">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                    <div className="w-44 h-44 bg-emerald-500/30 rounded-[3rem] flex items-center justify-center border-4 border-emerald-400 shadow-2xl animate-in zoom-in duration-700">
                        <Trophy size={88} className="text-emerald-400" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-4xl font-black">Race Complete! 🏁</h2>
                    <p className="text-white/60 font-bold text-sm">
                        You completed {completedTasks.length}/{RACE_TASKS.length} tasks!
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur p-8 rounded-[3rem] border border-white/20 w-full max-w-xs space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Tasks Completed</p>
                    <div className="text-5xl font-black text-emerald-400">{completedTasks.length}/{RACE_TASKS.length}</div>
                    <div className="w-full h-px bg-white/20" />
                    <div className="flex items-center justify-center gap-3">
                        <Coins size={24} className="text-amber-400 fill-amber-400" />
                        <span className="text-2xl font-black text-amber-400">+{totalPoints} Coins</span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/user/events')}
                className="w-full bg-white text-emerald-900 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all mb-8 flex items-center justify-center gap-3"
            >
                Back to Events <ArrowRight size={20} />
            </button>
        </div>
    );
};

export default TaskRaceView;
