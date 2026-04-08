import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Wallet, User, Bell, X, CheckCircle2, AlertCircle, Info, Rocket } from 'lucide-react';
import { useUser } from './context/UserContext';

const UserLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const { userData, notifications, clearNotifications } = useUser();

    const navItems = [
        { path: '/user/home', label: 'Home', icon: Home },
        { path: '/user/income', label: 'Income', icon: TrendingUp },
        { path: '/user/wallet', label: 'Wallet', icon: Wallet },
        { path: '/user/profile', label: 'Profile', icon: User },
    ];

    const getNotifIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="text-emerald-500" size={18} />;
            case 'warning': return <AlertCircle className="text-amber-500" size={18} />;
            case 'info': return <Info className="text-sky-500" size={18} />;
            default: return <Bell className="text-sky-500" size={18} />;
        }
    };

    return (
        <div className="min-h-screen bg-sky-50 pt-16 pb-20 text-sky-900 font-sans overflow-x-hidden">
            {/* --- New Dromoney Fixed Top Header --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-sky-100 px-4 py-2.5 flex items-center justify-between shadow-sm max-w-md mx-auto">
                {/* Left Side: Logo & Brand */}
                <div className="flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer" onClick={() => navigate('/user/home')}>
                    <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                        <Rocket size={20} className="text-white fill-white/20 -rotate-45" />
                    </div>
                    <h1 className="text-xl font-black text-[#1A1C30] tracking-tight">Dromoney</h1>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-2.5">
                    {/* Bell Icon */}
                    <button
                        onClick={() => setIsNotifOpen(true)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors relative"
                    >
                        <Bell size={22} strokeWidth={2.5} />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {/* Auth CTA Button */}
                    <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-3 py-2 rounded-xl text-[10px] font-bold shadow-lg shadow-blue-100 transition-all">
                        Sign Up / Log In
                    </button>
                </div>
            </header>

            {/* --- Notification Drawer (Right Side) --- */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isNotifOpen ? 'visible' : 'invisible disabled'}`}>
                {/* Backdrop Blur */}
                <div
                    onClick={() => setIsNotifOpen(false)}
                    className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isNotifOpen ? 'opacity-100' : 'opacity-0'}`}
                ></div>

                {/* Drawer Body */}
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isNotifOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4 border-b border-sky-50 flex items-center justify-between bg-sky-50/30">
                        <div className="flex items-center gap-2">
                            <Bell className="text-sky-600" size={20} />
                            <h2 className="font-black text-slate-800 text-lg uppercase tracking-tight">Notifications</h2>
                        </div>
                        <button
                            onClick={() => setIsNotifOpen(false)}
                            className="p-2 hover:bg-sky-100 rounded-full transition-colors text-slate-400"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="flex gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100/50 hover:bg-sky-50 transition-colors group">
                                <div className="mt-1">{getNotifIcon(notif.type)}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-black text-slate-800 group-hover:text-sky-700 transition-colors">{notif.title}</h4>
                                        <span className="text-[9px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded shadow-sm">{notif.time}</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500 leading-relaxed">{notif.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-sky-50 text-center">
                        <button
                            onClick={clearNotifications}
                            className="text-[10px] font-black text-sky-600 uppercase tracking-widest hover:underline px-4 py-2"
                        >
                            Clear all notifications
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Dynamic Content Rendering Area (Pages) --- */}
            <main className="max-w-md mx-auto">
                <Outlet />
            </main>

            {/* --- Premium Bottom Navigation Bar --- */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-sky-100 px-2 py-2 flex items-center justify-around shadow-[0_-4px_10px_rgba(14,165,233,0.06)] z-50 rounded-t-2xl">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all duration-300 ${isActive
                                ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 scale-105'
                                : 'text-slate-400 hover:text-sky-500'
                                }`}
                        >
                            <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                {item.label}
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default UserLayout;
