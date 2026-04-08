import React, { useState } from 'react';
import { X, MessageSquare, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

const FeedbackModal = ({ isOpen, onClose }) => {
    const { addNotification } = useUser();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            addNotification("Rating Required", "Please select a star rating first.", "warning");
            return;
        }

        setStatus('submitting');
        
        // Mock network delay
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setRating(0);
                setFeedback('');
                onClose();
            }, 1800);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={status === 'idle' ? onClose : undefined}></div>
            
            <div className="relative bg-white w-full max-w-[280px] sm:max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                {status === 'idle' && (
                    <>
                        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg tracking-tight">App Feedback</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Help us improve</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-95 transition-all shadow-sm border border-slate-100">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-5 text-center border-b border-slate-100 border-dashed">
                             <h3 className="text-[13px] font-black text-slate-800 mb-3 uppercase tracking-wider">Rate your experience</h3>
                             <div className="flex justify-center gap-1 sm:gap-2">
                                 {[1, 2, 3, 4, 5].map((star) => (
                                     <button 
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="transition-transform active:scale-90 p-1"
                                     >
                                         <Star 
                                            size={32} 
                                            className={`transition-all duration-300 ${
                                                (hoverRating || rating) >= star 
                                                ? 'text-amber-400 fill-amber-400 drop-shadow-md scale-110' 
                                                : 'text-slate-200 fill-slate-50'
                                            }`} 
                                         />
                                     </button>
                                 ))}
                             </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Any Suggestions?</p>
                            <textarea 
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="I wish the app had..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-700 placeholder:text-slate-300 resize-none h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
                            ></textarea>
                            
                            <button 
                                onClick={handleSubmit}
                                className={`w-full py-3.5 mt-3 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-xl active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 ${
                                    rating > 0 ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-slate-300 shadow-none hover:bg-slate-400'
                                }`}>
                                Submit Feedback
                            </button>
                        </div>
                    </>
                )}

                {(status === 'submitting' || status === 'success') && (
                    <div className="p-16 flex flex-col items-center justify-center text-center">
                        {status === 'submitting' ? (
                            <>
                                <Loader2 size={40} className="text-indigo-500 animate-spin mb-4" />
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">Sending...</h3>
                            </>
                        ) : (
                            <div className="animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-5 mx-auto">
                                     <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-black text-emerald-600 tracking-tight">Thank You!</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Feedback Received</p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default FeedbackModal;
