import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, Sparkles, Headset, Building2 } from 'lucide-react';
import { contentStorage } from '../../shared/services/contentStorage';

const InfoPageView = () => {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const [pageData, setPageData] = useState({ title: 'Loading...', content: '' });

    useEffect(() => {
        window.scrollTo(0, 0);
        const pages = contentStorage.getPages();
        if (pages[pageId]) {
            setPageData(pages[pageId]);
        } else {
            setPageData({ title: 'Page Not Found', content: 'The requested information is not available.' });
        }
    }, [pageId]);

    const getIcon = () => {
        switch(pageId) {
            case 'how-it-works': return <HelpCircle size={32} className="text-sky-500" />;
            case 'benefits': return <Sparkles size={32} className="text-amber-500" />;
            case 'support': return <Headset size={32} className="text-emerald-500" />;
            case 'about': return <Building2 size={32} className="text-indigo-500" />;
            default: return <Info size={32} className="text-slate-500" />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-4 sticky top-[57px] z-50">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-slate-600 active:scale-95 transition-transform"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase truncate">
                    {pageData.title}
                </h1>
            </div>

            <div className="flex-1 p-5 animate-in slide-in-from-bottom-4 duration-500 pb-8 mt-2">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-100/50">
                        {getIcon()}
                    </div>
                    
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight mb-8">
                        {pageData.title}
                    </h2>
                    
                    <div className="font-bold text-[13px] text-slate-500 leading-relaxed whitespace-pre-wrap space-y-4">
                        {pageData.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPageView;
