import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col pt-10 px-4 pb-8 sm:items-center sm:justify-center selection:bg-sky-500/30">
            {/* Background ambient glow matching the reference image */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-64 bg-sky-500/10 blur-[100px] pointer-events-none"></div>

            <div className="relative w-full max-w-sm mx-auto sm:bg-slate-900/50 sm:p-8 sm:border sm:border-slate-800/50 sm:rounded-3xl sm:backdrop-blur-xl">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
