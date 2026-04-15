import React, { useState, useEffect } from 'react';
import {
    Trophy, Plus, Play, Square, CheckCircle, Edit3, Trash2, Save,
    Users, Gift, Zap, ClipboardList, Award, Eye, ChevronDown, ChevronRight,
    ToggleLeft, ToggleRight, Star, Coins, X, AlertCircle, Check
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { eventStorage } from '../../shared/services/eventStorage';

const TAG_COLORS = {
    Quiz: 'bg-blue-50 text-blue-600 border-blue-100',
    Draw: 'bg-purple-50 text-purple-600 border-purple-100',
    Prediction: 'bg-amber-50 text-amber-600 border-amber-100',
    Task: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};

const STATUS_COLORS = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-100',
    Ended: 'bg-rose-50 text-rose-600 border-rose-100',
};

// ─── Sub-components ───────────────────────────────────────

const TabBtn = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
            active ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'text-slate-500 hover:bg-slate-50'
        }`}
    >
        <Icon size={14} />
        {label}
    </button>
);

const Toast = ({ msg, type }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-white text-[12px] font-black uppercase tracking-widest animate-in slide-in-from-bottom-4 duration-300 ${type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
        {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
        {msg}
    </div>
);

// ─── Tab 1: Events Overview ───────────────────────────────

const OverviewTab = ({ events, onUpdateEvent, onShowToast }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const startEdit = (event) => {
        setEditingId(event.id);
        setEditData({ ...event });
    };

    const saveEdit = () => {
        onUpdateEvent(editingId, editData);
        setEditingId(null);
        onShowToast('Event updated successfully!', 'success');
    };

    const toggleStatus = (event) => {
        const next = event.status === 'Active' ? 'Inactive' : 'Active';
        onUpdateEvent(event.id, { status: next });
        onShowToast(`Event "${event.title}" set to ${next}`, 'success');
    };

    const stats = (id) => eventStorage.getEventStats(id);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {events.map(event => {
                const s = stats(event.id);
                const isEditing = editingId === event.id;

                return (
                    <div key={event.id} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${TAG_COLORS[event.tag]}`}>
                                    <Trophy size={20} />
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            value={editData.title}
                                            onChange={e => setEditData(p => ({ ...p, title: e.target.value }))}
                                            className="text-[14px] font-black text-slate-800 border-b-2 border-sky-400 bg-transparent outline-none w-40"
                                        />
                                    ) : (
                                        <h3 className="font-black text-slate-800 text-[14px] leading-none">{event.title}</h3>
                                    )}
                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${TAG_COLORS[event.tag]}`}>
                                        {event.tag}
                                    </span>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${STATUS_COLORS[event.status] || STATUS_COLORS.Inactive}`}>
                                {event.status}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {[
                                { label: 'Entry', value: isEditing ? null : `${event.fee} Coins`, edit: <input type="number" value={editData.fee} onChange={e => setEditData(p => ({ ...p, fee: +e.target.value }))} className="w-14 border-b border-sky-300 text-center text-sm font-black outline-none bg-transparent" /> },
                                { label: 'Prize', value: isEditing ? null : event.prize, edit: <input value={editData.prize} onChange={e => setEditData(p => ({ ...p, prize: e.target.value }))} className="w-16 border-b border-sky-300 text-center text-sm font-black outline-none bg-transparent" /> },
                                { label: 'Joined', value: s.total },
                                { label: 'Awarded', value: s.awarded },
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-center">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    {(i === 0 || i === 1) && isEditing
                                        ? <div className="flex justify-center">{stat.edit}</div>
                                        : <p className="text-sm font-black text-slate-900">{stat.value}</p>
                                    }
                                </div>
                            ))}
                        </div>

                        {/* Start Time */}
                        <div className="mb-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Start Time</p>
                            {isEditing ? (
                                <input
                                    value={editData.startTime}
                                    onChange={e => setEditData(p => ({ ...p, startTime: e.target.value }))}
                                    className="text-sm font-black text-slate-700 border-b border-sky-300 outline-none bg-transparent w-full"
                                />
                            ) : (
                                <p className="text-sm font-black text-slate-700">{event.startTime}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button onClick={saveEdit} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-emerald-500 text-white active:scale-95 transition-all">
                                        <Save size={13} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-slate-100 text-slate-500">
                                        <X size={13} /> Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => startEdit(event)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-sky-50 text-sky-600 hover:bg-sky-100 transition-all">
                                        <Edit3 size={13} /> Edit
                                    </button>
                                    <button onClick={() => toggleStatus(event)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${event.status === 'Active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                        {event.status === 'Active' ? <><Square size={13} /> Stop</> : <><Play size={13} /> Activate</>}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// ─── Tab 2: Content Editor ───────────────────────────────

const ContentTab = ({ events, onShowToast }) => {
    const [selectedEventId, setSelectedEventId] = useState('quiz-daily');
    const [questions, setQuestions] = useState([]);
    const [prizes, setPrizes] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [goldReward, setGoldReward] = useState(40);
    const [taskTimeLimit, setTaskTimeLimit] = useState(60);

    useEffect(() => {
        setQuestions(eventStorage.getQuestions());
        setPrizes(eventStorage.getPrizes());
        setTasks(eventStorage.getTasks());
        const gpConf = eventStorage.getEvents().find(e => e.id === 'gold-prediction');
        const trConf = eventStorage.getEvents().find(e => e.id === 'task-race');
        setGoldReward(gpConf?.coinReward || 40);
        setTaskTimeLimit(trConf?.timeLimit || 60);
    }, []);

    const sel = events.find(e => e.id === selectedEventId);

    // ── Quiz ──
    const addQuestion = () => {
        const newQ = { id: Date.now(), question: 'New Question?', options: ['Option A', 'Option B', 'Option C', 'Option D'], answer: 0 };
        setQuestions(prev => [...prev, newQ]);
    };
    const updateQuestion = (idx, field, val) => {
        setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: val } : q));
    };
    const updateOption = (qIdx, oIdx, val) => {
        setQuestions(prev => prev.map((q, i) => i === qIdx ? { ...q, options: q.options.map((o, j) => j === oIdx ? val : o) } : q));
    };
    const deleteQuestion = (idx) => setQuestions(prev => prev.filter((_, i) => i !== idx));
    const saveQuestions = () => { eventStorage.updateQuestions(questions); onShowToast('Quiz questions saved!', 'success'); };

    // ── Draw ──
    const addPrize = () => setPrizes(prev => [...prev, { id: Date.now(), label: 'New Prize', coins: 0, cash: 0 }]);
    const updatePrize = (idx, field, val) => setPrizes(prev => prev.map((p, i) => i === idx ? { ...p, [field]: val } : p));
    const deletePrize = (idx) => setPrizes(prev => prev.filter((_, i) => i !== idx));
    const savePrizes = () => { eventStorage.updatePrizes(prizes); onShowToast('Lucky Draw prizes saved!', 'success'); };

    // ── Task Race ──
    const addTask = () => setTasks(prev => [...prev, { id: Date.now(), text: 'New Task', points: 10 }]);
    const updateTask = (idx, field, val) => setTasks(prev => prev.map((t, i) => i === idx ? { ...t, [field]: val } : t));
    const deleteTask = (idx) => setTasks(prev => prev.filter((_, i) => i !== idx));
    const saveTasks = () => {
        eventStorage.updateTasks(tasks);
        eventStorage.updateEvent('task-race', { timeLimit: +taskTimeLimit });
        onShowToast('Task Race updated!', 'success');
    };

    // ── Gold ──
    const saveGold = () => { eventStorage.updateEvent('gold-prediction', { coinReward: +goldReward }); onShowToast('Gold Prediction updated!', 'success'); };

    return (
        <div className="space-y-6">
            {/* Event Selector */}
            <div className="flex flex-wrap gap-2">
                {events.map(ev => (
                    <button key={ev.id} onClick={() => setSelectedEventId(ev.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${selectedEventId === ev.id ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
                        <span className={`w-2 h-2 rounded-full ${ev.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-300'}`}></span>
                        {ev.title}
                    </button>
                ))}
            </div>

            {/* Quiz Content */}
            {selectedEventId === 'quiz-daily' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[15px] font-black text-slate-800">Quiz Questions ({questions.length})</h3>
                        <div className="flex gap-2">
                            <button onClick={addQuestion} className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                                <Plus size={14} /> Add Question
                            </button>
                            <button onClick={saveQuestions} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md">
                                <Save size={14} /> Save All
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                        {questions.map((q, qIdx) => (
                            <div key={q.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{qIdx + 1}</span>
                                    <input
                                        value={q.question}
                                        onChange={e => updateQuestion(qIdx, 'question', e.target.value)}
                                        className="flex-1 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                                        placeholder="Question text..."
                                    />
                                    <button onClick={() => deleteQuestion(qIdx)} className="p-1.5 text-rose-400 hover:bg-rose-50 rounded-lg transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 ml-9">
                                    {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className={`flex items-center gap-2 bg-white border rounded-lg px-2 py-1.5 ${q.answer === oIdx ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200'}`}>
                                            <button
                                                onClick={() => updateQuestion(qIdx, 'answer', oIdx)}
                                                className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${q.answer === oIdx ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}
                                            />
                                            <input
                                                value={opt}
                                                onChange={e => updateOption(qIdx, oIdx, e.target.value)}
                                                className="text-[11px] font-bold text-slate-700 bg-transparent outline-none flex-1 min-w-0"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="ml-9 text-[9px] font-black text-emerald-600 uppercase tracking-widest">● filled = correct answer</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lucky Draw Content */}
            {selectedEventId === 'lucky-draw' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[15px] font-black text-slate-800">Draw Prizes ({prizes.length})</h3>
                        <div className="flex gap-2">
                            <button onClick={addPrize} className="flex items-center gap-1.5 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-purple-100 transition-all">
                                <Plus size={14} /> Add Prize
                            </button>
                            <button onClick={savePrizes} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-md">
                                <Save size={14} /> Save All
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {prizes.map((p, idx) => (
                            <div key={p.id} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                                <Gift size={16} className="text-purple-500 shrink-0" />
                                <input value={p.label} onChange={e => updatePrize(idx, 'label', e.target.value)} className="flex-1 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none" placeholder="Label (e.g. ₹500)" />
                                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5">
                                    <span className="text-[10px] text-slate-400 font-bold">Cash ₹</span>
                                    <input type="number" value={p.cash} onChange={e => updatePrize(idx, 'cash', +e.target.value)} className="w-14 text-sm font-bold text-slate-800 outline-none text-center" />
                                </div>
                                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5">
                                    <Coins size={12} className="text-amber-500" />
                                    <input type="number" value={p.coins} onChange={e => updatePrize(idx, 'coins', +e.target.value)} className="w-14 text-sm font-bold text-slate-800 outline-none text-center" />
                                </div>
                                <button onClick={() => deletePrize(idx)} className="p-1.5 text-rose-400 hover:bg-rose-50 rounded-lg transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gold Prediction Content */}
            {selectedEventId === 'gold-prediction' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="text-[15px] font-black text-slate-800 mb-6">Gold Prediction Settings</h3>
                    <div className="max-w-xs space-y-4">
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
                            <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Coin Reward (correct prediction)</label>
                            <input
                                type="number"
                                value={goldReward}
                                onChange={e => setGoldReward(e.target.value)}
                                className="w-full text-3xl font-black text-amber-700 bg-transparent outline-none border-b-2 border-amber-300"
                            />
                            <p className="text-[10px] font-bold text-amber-500">Coins awarded when user predicts correctly</p>
                        </div>
                        <button onClick={saveGold} className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md active:scale-95 transition-all">
                            <Save size={14} /> Save Settings
                        </button>
                    </div>
                </div>
            )}

            {/* Task Race Content */}
            {selectedEventId === 'task-race' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-black text-slate-800">Tasks ({tasks.length})</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Timer (sec)</span>
                                <input type="number" value={taskTimeLimit} onChange={e => setTaskTimeLimit(e.target.value)} className="w-14 text-sm font-black text-slate-800 outline-none text-center bg-transparent" />
                            </div>
                            <button onClick={addTask} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
                                <Plus size={14} /> Add Task
                            </button>
                            <button onClick={saveTasks} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-md">
                                <Save size={14} /> Save All
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {tasks.map((t, idx) => (
                            <div key={t.id} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                                <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                                <input value={t.text} onChange={e => updateTask(idx, 'text', e.target.value)} className="flex-1 text-sm font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none" placeholder="Task description..." />
                                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5">
                                    <Coins size={12} className="text-amber-500" />
                                    <input type="number" value={t.points} onChange={e => updateTask(idx, 'points', +e.target.value)} className="w-12 text-sm font-bold text-amber-700 outline-none text-center bg-transparent" />
                                </div>
                                <button onClick={() => deleteTask(idx)} className="p-1.5 text-rose-400 hover:bg-rose-50 rounded-lg transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Tab 3: Participants ──────────────────────────────────

const ParticipantsTab = ({ events, onShowToast }) => {
    const [selectedEventId, setSelectedEventId] = useState('quiz-daily');
    const [timeFilter, setTimeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [participants, setParticipants] = useState([]);
    const [awardNote, setAwardNote] = useState('');
    const [awardingId, setAwardingId] = useState(null);
    const [viewingParticipant, setViewingParticipant] = useState(null);

    useEffect(() => {
        setParticipants(eventStorage.getParticipants(selectedEventId));
    }, [selectedEventId]);

    const handleAward = (p) => {
        eventStorage.awardPrize(selectedEventId, p.id, awardNote || 'Prize Awarded by Admin');
        setParticipants(eventStorage.getParticipants(selectedEventId));
        setAwardingId(null);
        setAwardNote('');
        onShowToast(`Prize awarded to ${p.name}!`, 'success');
    };

    const filteredParticipants = participants.filter(p => {
        // Status filter (Winners)
        if (statusFilter === 'winner' && p.prizeStatus !== 'Awarded') return false;

        // Search filter
        if (searchQuery && !p.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        // Time filter
        if (timeFilter === 'all') return true;
        const now = Date.now();
        const pTimestamp = p.timestamp || 0;
        const ONE_DAY = 24 * 60 * 60 * 1000;

        if (timeFilter === 'today') {
            const startOfToday = new Date().setHours(0, 0, 0, 0);
            return pTimestamp >= startOfToday;
        }
        if (timeFilter === 'yesterday') {
            const startOfToday = new Date().setHours(0, 0, 0, 0);
            const startOfYesterday = startOfToday - ONE_DAY;
            return pTimestamp >= startOfYesterday && pTimestamp < startOfToday;
        }
        if (timeFilter === 'week') {
            return (now - pTimestamp) <= ONE_DAY * 7;
        }
        if (timeFilter === 'month') {
            return (now - pTimestamp) <= ONE_DAY * 30;
        }
        return true;
    });

    const stats = eventStorage.getEventStats(selectedEventId);

    return (
        <div className="space-y-6">
            {/* Event Selector */}
            <div className="flex flex-wrap gap-2">
                {events.map(ev => (
                    <button key={ev.id} onClick={() => { setSelectedEventId(ev.id); setAwardingId(null); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${selectedEventId === ev.id ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${ev.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-300'}`}></span>
                        {ev.title}
                    </button>
                ))}
            </div>

            {/* Filter Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 ml-1">Filter by:</span>
                    <select
                        value={timeFilter}
                        onChange={e => setTimeFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-black text-slate-700 outline-none focus:border-sky-400"
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="week">Past 7 Days</option>
                        <option value="month">Past 30 Days</option>
                    </select>

                    <button
                        onClick={() => setStatusFilter(statusFilter === 'all' ? 'winner' : 'all')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${statusFilter === 'winner' ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                        <Award size={14} className={statusFilter === 'winner' ? 'fill-amber-500' : ''} />
                        {statusFilter === 'winner' ? 'Showing Winners' : 'Filter Winners'}
                    </button>
                </div>

                <div className="relative w-full md:w-64">
                    <Eye size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 outline-none focus:border-sky-400 transition-all"
                    />
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Joined', value: stats.total, color: 'text-sky-600', bg: 'bg-sky-50', icon: Users },
                    { label: 'Prizes Awarded', value: stats.awarded, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle },
                    { label: 'Top Score', value: stats.topScore || '—', color: 'text-amber-600', bg: 'bg-amber-50', icon: Trophy },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex items-center justify-between border border-white shadow-sm`}>
                         <div className={`p-3 rounded-xl bg-white/50`}>
                            <s.icon size={20} className={s.color} />
                        </div>
                        <div className="text-right">
                            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Participants Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <h3 className="font-black text-slate-800 text-[14px]">
                            {statusFilter === 'winner' ? 'Event Winners' : 'Event Participants'}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => onShowToast('Excel report generated and downloading...', 'success')}
                            className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center gap-2"
                        >
                            <ClipboardList size={12} /> Export Excel
                        </button>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredParticipants.length} results</p>
                    </div>
                </div>

                {filteredParticipants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                        <div className="p-6 bg-slate-50 rounded-full mb-4">
                            <Users size={48} strokeWidth={1} />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-widest mb-1">No matching participants</p>
                        <p className="text-[9px] font-bold text-slate-400">Try changing your filters or searching</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {filteredParticipants.map(p => (
                            <div key={p.id}>
                                <div 
                                    onClick={() => setViewingParticipant(p)}
                                    className={`flex items-center p-4 hover:bg-slate-50 cursor-pointer transition-colors ${p.prizeStatus === 'Awarded' ? 'bg-emerald-50/10' : ''}`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm mr-4 shrink-0 shadow-sm ${p.prizeStatus === 'Awarded' ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-slate-400 to-slate-600'}`}>
                                        {p.prizeStatus === 'Awarded' ? <Award size={18} /> : (p.name || 'U')[0].toUpperCase()}
                                    </div>
                                    
                                    {/* Name & Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-black text-slate-800 text-[13px] truncate">{p.name || 'Anonymous User'}</p>
                                            {p.prizeStatus === 'Awarded' && (
                                                <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border border-amber-200">WINNER</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1.5">
                                                <Zap size={10} className="text-slate-400" />
                                                <span className="text-[10px] font-bold text-slate-500">{p.result || '—'}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-300">|</span>
                                            <div className="flex items-center gap-1.5">
                                                <Timer size={10} className="text-slate-400" />
                                                <span className="text-[10px] font-bold text-slate-500">{p.joinedAt}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prize & Status */}
                                    <div className="flex items-center gap-6 pr-2">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Prize Won</p>
                                            <p className="text-[13px] font-black text-amber-600">{p.prize || 'No Prize'}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${p.prizeStatus === 'Awarded' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                                {p.prizeStatus === 'Awarded' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                                                {p.prizeStatus}
                                            </span>
                                            {p.prizeStatus !== 'Awarded' && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setAwardingId(awardingId === p.id ? null : p.id); }}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-50 text-sky-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-sky-100 active:scale-95 transition-all border border-sky-100"
                                                >
                                                    <Award size={11} /> Give Prize
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Award Awarding UI */}
                                {awardingId === p.id && (
                                    <div className="mx-4 mb-4 bg-slate-50 border border-sky-200 rounded-2xl p-4 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Award Prize to {p.name}</p>
                                            <button onClick={() => setAwardingId(null)}>
                                                <X size={14} className="text-slate-400" />
                                            </button>
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                value={awardNote}
                                                onChange={e => setAwardNote(e.target.value)}
                                                placeholder="Add a congratulation note or transaction ID..."
                                                className="flex-1 text-[12px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-400"
                                            />
                                            <button
                                                onClick={() => handleAward(p)}
                                                className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-sky-200 active:scale-95 transition-all"
                                            >
                                                <CheckCircle size={16} /> Confirm
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Participant Detail Modal */}
            {viewingParticipant && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8 relative">
                            <button onClick={() => setViewingParticipant(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-sky-100">
                                    {viewingParticipant.name[0].toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{viewingParticipant.name}</h2>
                                    <p className="text-slate-400 font-bold text-sm">Joined {viewingParticipant.joinedAt}</p>
                                    {viewingParticipant.prizeStatus === 'Awarded' && (
                                        <span className="inline-block mt-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">Event Winner</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Event Performance</p>
                                    <p className="text-xl font-black text-slate-800 text-center">{viewingParticipant.result || 'No Result'}</p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 text-center">Reward Status</p>
                                    <p className="text-xl font-black text-amber-700 text-center">{viewingParticipant.prize || 'Claimable'}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Details</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                                        <span className="text-[11px] font-bold text-slate-400">Email Address</span>
                                        <span className="text-[11px] font-black text-slate-700">{viewingParticipant.name.toLowerCase().replace(/ /g, '')}@gmail.com</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                                        <span className="text-[11px] font-bold text-slate-400">Mobile Number</span>
                                        <span className="text-[11px] font-black text-slate-700">+91 98765 43210</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                                        <span className="text-[11px] font-bold text-slate-400">Registration Date</span>
                                        <span className="text-[11px] font-black text-slate-700">12 Feb 2026</span>
                                    </div>
                                </div>
                            </div>

                            {viewingParticipant.prizeStatus !== 'Awarded' ? (
                                <button
                                    onClick={() => { setAwardingId(viewingParticipant.id); setViewingParticipant(null); }}
                                    className="w-full mt-8 bg-sky-500 text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-sky-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Award size={18} /> Award Prize Now
                                </button>
                            ) : (
                                <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                                    <CheckCircle className="text-emerald-500" size={20} />
                                    <div>
                                        <p className="text-[11px] font-black text-emerald-800 uppercase">Prize Awarded</p>
                                        <p className="text-[10px] font-bold text-emerald-600">{viewingParticipant.prizeNote || 'Awarded by Administrator'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────

const EventsAdmin = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [events, setEvents] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        setEvents(eventStorage.getEvents());
    }, []);

    const handleUpdateEvent = (eventId, updates) => {
        const updated = eventStorage.updateEvent(eventId, updates);
        setEvents(updated);
    };

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="p-6 animate-in fade-in duration-500">
            {toast && <Toast msg={toast.msg} type={toast.type} />}

            <PageHeader title="Events & Contests" subtitle="Manage live events, content, and participants" />

            {/* Tabs */}
            <div className="flex gap-2 mb-8 mt-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-fit">
                <TabBtn active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Trophy} label="Events" />
                <TabBtn active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={Edit3} label="Content Editor" />
                <TabBtn active={activeTab === 'participants'} onClick={() => setActiveTab('participants')} icon={Users} label="Participants" />
            </div>

            {activeTab === 'overview' && (
                <OverviewTab events={events} onUpdateEvent={handleUpdateEvent} onShowToast={showToast} />
            )}
            {activeTab === 'content' && (
                <ContentTab events={events} onShowToast={showToast} />
            )}
            {activeTab === 'participants' && (
                <ParticipantsTab events={events} onShowToast={showToast} />
            )}
        </div>
    );
};

export default EventsAdmin;
