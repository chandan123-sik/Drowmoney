import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { taskStorage } from '../../shared/services/taskStorage';
import { ChevronLeft, CheckCircle2, Play, UploadCloud, Link as LinkIcon, Loader2, Image as ImageIcon } from 'lucide-react';

const TaskRunner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addCoins, userData } = useUser();
    
    // Safety check incase user not unlocking bypassed
    useEffect(() => {
        if (!userData.isPaid) {
            navigate(-1);
        }
    }, [userData.isPaid, navigate]);

    // Fetch dynamic task from storage once inside an effect
    const [task, setTask] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, running, verify, completed
    const [screenshotFile, setScreenshotFile] = useState(null);

    useEffect(() => {
        const allTasks = taskStorage.getTasks();
        const foundTask = allTasks.find(t => String(t.id) === String(id));
        setTask(foundTask);
        
        if (foundTask) {
             const tType = foundTask.type;
             const timerValue = Number(foundTask.config?.timer) || (tType === 'Video' ? 30 : 15);
             if (tType === 'Video' || tType === 'Web') {
                 setTimeLeft(timerValue);
             }
        }
    }, [id]);

    useEffect(() => {
        if (status === 'running' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (status === 'running' && timeLeft === 0) {
            setStatus('verify');
        }
    }, [status, timeLeft]);

    if (!task) return <div className="p-8 text-center text-white min-h-screen bg-slate-950 flex items-center justify-center font-bold uppercase tracking-widest"><Loader2 className="animate-spin mr-2" /> Loading Task...</div>;

    const startTask = () => {
        setStatus('running');
        
        // Open the external URL if it exists
        if ((task.type === 'Web' || task.type === 'Video') && task.config?.url) {
            window.open(task.config.url, '_blank', 'noopener,noreferrer');
        }
    };

    const submitTask = () => {
        setStatus('completed');
        addCoins(task.reward, task.title);
        // Persist completion state
        taskStorage.markComplete(task.id);
        setTimeout(() => navigate('/user/earn'), 2000);
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-200 flex flex-col sm:max-w-md sm:mx-auto relative z-[500] selection:bg-sky-500/30">
            {/* Nav Header */}
            <div className="px-4 py-4 flex items-center gap-4 bg-slate-900 border-b border-slate-800 sticky text-left top-0 z-10 w-full shadow-lg">
                <button onClick={() => navigate(-1)} className="p-2 bg-slate-950 rounded-full hover:bg-slate-800 transition-colors border border-slate-800">
                    <ChevronLeft size={20} className="text-white" />
                </button>
                <div className="flex-1 truncate">
                    <h1 className="text-base font-black text-white truncate">{task.title}</h1>
                    <p className="text-[9px] text-sky-400 font-bold uppercase tracking-widest leading-none mt-1">Live Task Mode</p>

                </div>
                <div className="bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 shadow-inner shrink-0">
                    <span className="font-black text-amber-400 text-xs">+{task.reward} Coin</span>
                </div>
            </div>

            {/* Content Body based on Task Type */}
            <div className="flex-1 p-5 flex flex-col">
                
                {/* VIDEO TASK */}
                {task.type === 'Video' && (
                    <div className="flex-1 flex flex-col">
                        <div className="w-full bg-slate-900 rounded-3xl overflow-hidden aspect-video relative border border-slate-800 shadow-2xl flex items-center justify-center group">
                            {/* Dummy Video Player UI Background */}
                            <div className="absolute inset-0 bg-slate-950 border-[6px] border-slate-900 rounded-3xl"></div>
                            
                            {status === 'idle' && (
                                <button onClick={startTask} className="z-10 w-16 h-16 bg-sky-500 hover:scale-110 active:scale-95 transition-transform rounded-full flex items-center justify-center pl-1 shadow-[0_0_25px_rgba(14,165,233,0.6)]">
                                    <Play size={28} className="text-slate-950" />
                                </button>
                            )}
                            
                            {status === 'running' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm z-10">
                                    <span className="text-slate-500 font-bold tracking-widest text-[10px] sm:text-xs px-8 text-center uppercase">[ Advertisement video is playing here on real app ]</span>
                                    <div className="absolute top-4 right-4 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800 backdrop-blur flex items-center gap-2 shadow-xl">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-[ping_2s_infinite]"></div>
                                        <span className="text-white font-black font-mono text-xs">00:{timeLeft.toString().padStart(2, '0')}</span>
                                    </div>
                                </div>
                            )}

                            {status === 'verify' && (
                                <div className="absolute inset-0 bg-sky-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 border-2 border-sky-500/50 rounded-3xl">
                                    <CheckCircle2 size={48} className="text-sky-400 mb-2 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                                    <span className="text-white font-black tracking-widest uppercase text-sm">Video Finished</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner">
                            <h3 className="text-xs font-black text-slate-300 mb-3 uppercase tracking-widest text-sky-400">Task Instructions</h3>
                            <ul className="text-xs text-slate-400 list-disc list-inside space-y-2 font-medium leading-relaxed marker:text-slate-600">
                                <li>Tap PLAY and do not close your screen during playback.</li>
                                <li>Watch the full 30s Sponsored Video without skipping.</li>
                                <li>Claim your guaranteed {task.reward} Coin reward instantly after end.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* WEB TASK */}
                {task.type === 'Web' && (
                    <div className="flex-1 flex flex-col">
                        <div className="w-full flex-1 min-h-[400px] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            {/* Browser Header Window */}
                            <div className="bg-slate-900/90 backdrop-blur px-4 py-3 border-b border-slate-800 flex items-center gap-4">
                                <div className="flex gap-1.5 opacity-50">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                                </div>
                                <div className="flex-1 bg-slate-950 rounded-lg px-3 py-1.5 flex items-center gap-2 border border-slate-800">
                                    <LinkIcon size={12} className="text-slate-500" />
                                    <span className="text-[10px] text-slate-400 font-medium truncate w-[150px]">https://sponsor-website.com/secure</span>
                                </div>
                            </div>
                            
                            {/* Mock Browser Body Canvas */}
                            <div className="flex-1 bg-white relative">
                                {status === 'idle' && (
                                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-10">
                                        <button onClick={startTask} className="px-8 py-3 bg-sky-500 hover:bg-sky-400 active:scale-95 font-black text-slate-950 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all uppercase tracking-widest text-[10px]">Open Sponsor Portal</button>
                                        <p className="text-[9px] text-slate-500 mt-4 font-bold uppercase tracking-widest">Opens in Safe Browser</p>
                                    </div>
                                )}
                                
                                {(status === 'running' || status === 'verify') && (
                                    <div className="absolute inset-0 flex flex-col p-8 items-center bg-slate-100/50 pointer-events-none">
                                        {/* Fake wireframe website layout */}
                                        <div className="w-full h-12 bg-slate-200 rounded mb-8"></div>
                                        <div className="w-3/4 h-6 bg-slate-200 rounded mb-4 self-start"></div>
                                        <div className="w-full h-3 bg-slate-200 rounded mb-2"></div>
                                        <div className="w-full h-3 bg-slate-200 rounded mb-2"></div>
                                        <div className="w-2/3 h-3 bg-slate-200 rounded mb-10 self-start"></div>
                                        <div className="w-full aspect-video bg-slate-200 rounded-xl flex items-center justify-center border-4 border-white shadow-sm mt-auto">
                                            <span className="text-slate-400 font-black uppercase text-xs tracking-widest">Sponsor Asset Area</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Verification Overlay floating */}
                            {(status === 'running') && (
                                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-xl p-4 border border-slate-700/50 rounded-2xl flex items-center gap-4 shadow-2xl">
                                    <div className="shrink-0 w-10 h-10 rounded-full border-[3px] border-sky-500/20 border-t-sky-500 animate-spin"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-white leading-none tracking-wide mb-1">Stay active on page...</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verifying tracker: <span className="text-sky-400">{timeLeft}s</span></p>
                                    </div>
                                </div>
                            )}

                             {(status === 'verify') && (
                                <div className="absolute bottom-6 left-6 right-6 bg-sky-900/90 backdrop-blur-xl p-4 border border-sky-500/30 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                                    <CheckCircle2 size={32} className="text-sky-400" />
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-white leading-none tracking-wide mb-1">Session Verified!</p>
                                        <p className="text-[10px] font-bold text-sky-200 uppercase tracking-widest">You can claim reward.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* PROOF TASK (Formerly Social) */}
                {task.type === 'Proof' && (
                    <div className="flex-1 flex flex-col gap-5 justify-center">
                       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
                            {/* Decorative blur blob */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-[40px] pointer-events-none"></div>

                            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 rounded-[1.5rem] mx-auto flex items-center justify-center mb-5 shadow-xl shadow-rose-500/20">
                               <Camera size={32} className="text-white" />
                            </div>
                            <h2 className="text-white font-black text-xl mb-2 tracking-tight">Proof Required</h2>
                            <p className="text-[11px] text-slate-400 font-bold mb-8 px-4 leading-relaxed tracking-wide">
                                {task.config?.instructions || "Complete the task manually and upload proof."}
                            </p>
                            
                            <button className="w-full bg-slate-950 border border-slate-800 text-white hover:text-sky-400 hover:border-sky-500/50 font-black uppercase tracking-widest py-4 rounded-xl hover:bg-slate-900 transition-all text-xs flex justify-center items-center gap-2" onClick={() => setStatus('verify')}>
                                Open in Instagram App <LinkIcon size={14} />
                            </button>
                       </div>

                       {status === 'verify' && (
                           <div className="bg-slate-900/50 border border-amber-500/30 rounded-3xl p-6 animate-in slide-in-from-bottom-4 shadow-[0_0_20px_rgba(245,158,11,0.05)] text-center relative overflow-hidden">
                               <h3 className="text-amber-400 font-black text-xs mb-1.5 uppercase tracking-widest">Step 2: Verification</h3>
                               <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase tracking-wider">Upload Screenshot of following account.</p>
                               
                               <div className="relative border-2 border-dashed border-slate-700/50 hover:border-amber-500/60 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-950/50 transition-colors cursor-pointer group h-32">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={(e) => setScreenshotFile(e.target.files[0])}
                                        required
                                    />
                                    {!screenshotFile ? (
                                        <>
                                            <UploadCloud size={24} className="text-slate-500 group-hover:text-amber-500 mb-2 transition-colors relative z-0" />
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-center mt-1 relative z-0">Upload Proof Screenshot</span>
                                        </>
                                    ) : (
                                        <div className="relative w-full h-full">
                                           <img src={URL.createObjectURL(screenshotFile)} alt="proof" className="w-full h-full object-cover rounded-lg opacity-50" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-0 shadow-xl">
                                                <ImageIcon size={28} className="text-emerald-500 drop-shadow-md" />
                                                <span className="text-[10px] text-emerald-400 font-black truncate max-w-[200px] uppercase tracking-widest bg-slate-950/80 px-2 py-1 rounded">{screenshotFile.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                           </div>
                       )}
                    </div>
                )}
                {/* QUIZ AND SPIN MOCKS */}
                {(task.type === 'Quiz' || task.type === 'Spin') && (
                     <div className="flex-1 flex items-center justify-center">
                         <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-2xl">
                              <h2 className="text-white font-black text-xl mb-2">{task.title} Simulation</h2>
                              <p className="text-xs text-slate-400 mb-6">{task.description}</p>
                              <button onClick={() => setStatus('verify')} className="bg-amber-500 text-slate-950 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-amber-400 active:scale-95 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                  {task.type === 'Quiz' ? 'Simulate Quiz Win' : 'Simulate Spin Win'}
                              </button>
                         </div>
                     </div>
                )}
            </div>

            {/* Bottom Action Footer fixed to bottom of this specific page */}
             <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
                <button 
                    onClick={submitTask}
                    disabled={status !== 'verify' || (task.type === 'Proof' && !screenshotFile) || status === 'completed'}
                    className="w-full bg-sky-500 hover:bg-sky-400 active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-900 disabled:text-slate-600 text-slate-950 font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] disabled:shadow-none flex justify-center items-center gap-2 text-[11px]"
                >
                    {status === 'completed' && <Loader2 className="animate-spin" size={16} />}
                    {status === 'idle' ? 'Follow instructions above' : 
                     status === 'running' ? 'Task in progress...' :
                     status === 'completed' ? 'Processing...' :
                     'Claim Final Reward'}
                </button>
             </div>
        </div>
    );
};

export default TaskRunner;
