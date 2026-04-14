import React from 'react';
import { Users, ShieldCheck, Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';

const statCards = [
    { label: 'Total Users', value: '1,248', change: '+12 today', icon: Users, color: 'bg-sky-500', light: 'bg-sky-50 text-sky-600' },
    { label: 'KYC Pending', value: '34', change: '8 new today', icon: ShieldCheck, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-600' },
    { label: 'Withdrawals', value: '₹48,200', change: '14 requests', icon: Wallet, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Earnings', value: '₹3,24,500', change: 'Platform total', icon: TrendingUp, color: 'bg-indigo-500', light: 'bg-indigo-50 text-indigo-600' },
];

const recentUsers = [
    { name: 'Rahul Sharma', email: 'rahul@gmail.com', kyc: 'approved', paid: true, joined: '2 hrs ago' },
    { name: 'Priya Singh', email: 'priya@gmail.com', kyc: 'pending', paid: false, joined: '4 hrs ago' },
    { name: 'Amit Kumar', email: 'amit@gmail.com', kyc: 'approved', paid: true, joined: '6 hrs ago' },
    { name: 'Neha Verma', email: 'neha@gmail.com', kyc: 'pending', paid: false, joined: '1 day ago' },
    { name: 'Ravi Patel', email: 'ravi@gmail.com', kyc: 'approved', paid: true, joined: '1 day ago' },
];

const recentWithdrawals = [
    { name: 'Rahul Sharma', amount: '₹1,500', status: 'pending', date: '10 Apr' },
    { name: 'Amit Kumar', amount: '₹2,200', status: 'approved', date: '10 Apr' },
    { name: 'Ravi Patel', amount: '₹800', status: 'rejected', date: '09 Apr' },
    { name: 'Sunita Mehta', amount: '₹3,000', status: 'approved', date: '09 Apr' },
];

const Dashboard = () => {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-slate-400 font-medium mt-0.5">Welcome back, Admin. Here's what's happening.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                        <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                            <card.icon size={22} className="text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
                            <p className="text-xl font-black text-slate-900 leading-tight mt-0.5">{card.value}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">{card.change}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Users + Recent Withdrawals */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Recent Users */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Recent Users</h2>
                        <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentUsers.map((user, i) => (
                            <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-[13px] shrink-0">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${user.kyc === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                        {user.kyc}
                                    </span>
                                    <span className="text-[9px] font-bold text-slate-300">{user.joined}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Withdrawals */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Withdrawals</h2>
                        <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentWithdrawals.map((item, i) => (
                            <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.status === 'approved' ? 'bg-emerald-50 text-emerald-500' : item.status === 'pending' ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-500'}`}>
                                        {item.status === 'approved' ? <CheckCircle2 size={18} /> : item.status === 'pending' ? <Clock size={18} /> : <XCircle size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800 leading-none">{item.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-slate-900">{item.amount}</span>
                                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${item.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : item.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* KYC Queue Banner */}
            <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-sky-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-base tracking-tight">KYC Verification Queue</h3>
                        <p className="text-white/70 text-[11px] font-bold mt-0.5">34 users awaiting manual review</p>
                    </div>
                </div>
                <button className="bg-white text-sky-700 font-black text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-md hover:bg-sky-50 transition-colors active:scale-95">
                    Review Now
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
