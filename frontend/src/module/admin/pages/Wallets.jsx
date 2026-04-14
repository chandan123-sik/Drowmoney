import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import AdminStatCard from '../components/AdminStatCard';
import { Wallet, IndianRupee, Clock, AlertCircle } from 'lucide-react';

const withdrawals = [
    { id: 'W001', user: 'Ravi Patel', amount: '₹3,200', method: 'UPI', upiId: 'ravi@upi', date: '10 Apr', status: 'Pending' },
    { id: 'W002', user: 'Rahul Sharma', amount: '₹800', method: 'Bank', upiId: 'HDFC 4512', date: '09 Apr', status: 'Approved' },
    { id: 'W003', user: 'Neha Verma', amount: '₹600', method: 'UPI', upiId: 'neha@upi', date: '09 Apr', status: 'Pending' },
    { id: 'W004', user: 'Sunita Mehta', amount: '₹900', method: 'Bank', upiId: 'SBI 2341', date: '08 Apr', status: 'Rejected' },
    { id: 'W005', user: 'Karan Joshi', amount: '₹200', method: 'UPI', upiId: 'karan@upi', date: '07 Apr', status: 'Approved' },
];

const Wallets = () => {
    const [list, setList] = useState(withdrawals);
    const approve = id => setList(prev => prev.map(w => w.id === id ? { ...w, status: 'Approved' } : w));
    const reject = id => setList(prev => prev.map(w => w.id === id ? { ...w, status: 'Rejected' } : w));

    return (
        <div className="p-6 animate-in fade-in duration-500">
            <PageHeader title="Wallet & Withdrawals" subtitle="Review and process withdrawal requests" />

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <AdminStatCard label="Total Requested" value="₹5,700" change="5 requests" icon={Wallet} color="bg-slate-700" />
                <AdminStatCard label="Approved" value="₹1,000" change="2 payments" icon={IndianRupee} color="bg-emerald-500" />
                <AdminStatCard label="Pending" value="₹3,800" change="2 waiting" icon={Clock} color="bg-amber-500" />
                <AdminStatCard label="Rejected" value="₹900" change="1 rejected" icon={AlertCircle} color="bg-rose-500" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                {['ID', 'User', 'Amount', 'Method', 'Date', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="text-left px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {list.map(w => (
                                <tr key={w.id} className="hover:bg-slate-50/40 transition-colors">
                                    <td className="px-5 py-4 text-[12px] font-black text-sky-600">{w.id}</td>
                                    <td className="px-5 py-4 font-black text-slate-800 text-[13px]">{w.user}</td>
                                    <td className="px-5 py-4 font-black text-slate-900">{w.amount}</td>
                                    <td className="px-5 py-4">
                                        <p className="text-[12px] font-bold text-slate-600">{w.method}</p>
                                        <p className="text-[10px] font-medium text-slate-400">{w.upiId}</p>
                                    </td>
                                    <td className="px-5 py-4 text-[12px] font-bold text-slate-400">{w.date}</td>
                                    <td className="px-5 py-4"><StatusBadge status={w.status} /></td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-2">
                                            <button className="w-7 h-7 bg-sky-50 hover:bg-sky-100 text-sky-500 rounded-lg flex items-center justify-center transition-colors"><Eye size={13} /></button>
                                            {w.status === 'Pending' && (
                                                <>
                                                    <button onClick={() => approve(w.id)} className="w-7 h-7 bg-emerald-50 hover:bg-emerald-100 text-emerald-500 rounded-lg flex items-center justify-center transition-colors"><CheckCircle size={13} /></button>
                                                    <button onClick={() => reject(w.id)} className="w-7 h-7 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg flex items-center justify-center transition-colors"><XCircle size={13} /></button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Wallets;
