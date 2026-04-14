import React, { useState } from 'react';
import { Send, Bell, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const history = [
    { title: 'Special Offer!', message: '₹200 → ₹250 referral bonus this week only!', sent: '09 Apr, 3:00 PM', recipients: '1,248' },
    { title: 'New Event Live', message: 'Mega Jackpot Night is now live. Join now!', sent: '08 Apr, 6:00 PM', recipients: '1,248' },
    { title: 'System Update', message: 'Platform maintenance on 7 Apr 11 PM - 1 AM.', sent: '07 Apr, 9:00 AM', recipients: '1,248' },
];

const Notifications = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        if (!title || !message) return;
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setTitle('');
        setMessage('');
    };

    return (
        <div className="p-6 animate-in fade-in duration-500">
            <PageHeader title="Notifications" subtitle="Broadcast messages to all platform users" />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Compose */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <Bell size={16} className="text-sky-500" /> Compose Message
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. Special Weekend Offer!"
                                className="mt-2 w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message</label>
                            <textarea value={message} onChange={e => setMessage(e.target.value)}
                                placeholder="Write your broadcast message here..."
                                rows={4}
                                className="mt-2 w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-xl border border-sky-100">
                            <Users size={16} className="text-sky-500 shrink-0" />
                            <p className="text-[12px] font-bold text-sky-700">Will be sent to <span className="font-black">1,248 users</span></p>
                        </div>
                        <button onClick={handleSend}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all active:scale-95 shadow-md ${sent ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-100'}`}>
                            {sent ? '✓ Sent Successfully!' : <><Send size={15} /> Send Broadcast</>}
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-50">
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Broadcast History</h2>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {history.map((n, i) => (
                            <div key={i} className="p-5 hover:bg-slate-50/40 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-black text-slate-800 text-[13px] leading-none">{n.title}</h3>
                                    <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 shrink-0 ml-3">{n.sent}</span>
                                </div>
                                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{n.message}</p>
                                <p className="text-[10px] font-black text-sky-500 mt-2">→ {n.recipients} recipients</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
