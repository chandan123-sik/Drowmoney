import React, { useState } from 'react';
import { Trophy, Plus, Play, Square, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const events = [
    { id: 1, title: 'Mega Jackpot Night', entryFee: '₹11', prize: '₹500', participants: 48, status: 'Active', ends: '12 Apr' },
    { id: 2, title: 'Weekend Bonanza', entryFee: '₹21', prize: '₹1,000', participants: 23, status: 'Active', ends: '13 Apr' },
    { id: 3, title: 'Spring Referral Sprint', entryFee: '₹0', prize: '₹200', participants: 102, status: 'Inactive', ends: '30 Mar' },
    { id: 4, title: 'April Lucky Draw', entryFee: '₹51', prize: '₹2,000', participants: 15, status: 'Pending', ends: '20 Apr' },
];

const Events = () => {
    const [eventList, setEventList] = useState(events);

    const toggleStatus = id => {
        setEventList(prev => prev.map(e => e.id === id
            ? { ...e, status: e.status === 'Active' ? 'Inactive' : 'Active' }
            : e
        ));
    };

    return (
        <div className="p-6 animate-in fade-in duration-500">
            <PageHeader title="Events & Contests" subtitle="Manage live and upcoming events" />

            <div className="flex justify-end mb-5">
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-black text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95">
                    <Plus size={15} /> Create Event
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {eventList.map(event => (
                    <div key={event.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
                                    <Trophy size={20} className="text-indigo-500" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 text-[14px] leading-none">{event.title}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">Ends: {event.ends}</p>
                                </div>
                            </div>
                            <StatusBadge status={event.status} />
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {[
                                { label: 'Entry Fee', value: event.entryFee },
                                { label: 'Prize', value: event.prize },
                                { label: 'Joined', value: event.participants },
                            ].map(stat => (
                                <div key={stat.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-base font-black text-slate-900 mt-0.5">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => toggleStatus(event.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${event.status === 'Active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                {event.status === 'Active' ? <><Square size={13} /> Stop</> : <><Play size={13} /> Start</>}
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all">
                                <CheckCircle size={13} /> Select Winner
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
