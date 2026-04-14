import React from 'react';

const AdminStatCard = ({ label, value, change, icon: Icon, color = 'bg-sky-500' }) => (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
            <Icon size={22} className="text-white" />
        </div>
        <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-slate-900 leading-tight mt-0.5">{value}</p>
            {change && <p className="text-[10px] font-bold text-slate-400 mt-0.5">{change}</p>}
        </div>
    </div>
);

export default AdminStatCard;
