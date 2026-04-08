import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, Sparkles, Headset, Building2, CheckCircle2, Shield, IndianRupee, Rocket } from 'lucide-react';

const InfoPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    const CONTENT_MAP = {
        'how-it-works': {
            title: 'How It Works',
            subtitle: 'Master the Dromoney Platform',
            icon: HelpCircle,
            color: 'text-sky-500',
            bg: 'bg-sky-50',
            sections: [
                {
                    title: '1. Register & Verify',
                    text: 'Create your account and complete a simple KYC to unlock all earning features safely.'
                },
                {
                    title: '2. Explore Opportunities',
                    text: 'Browse through affiliate projects, daily tasks, and exclusive business ideas tailored for you.'
                },
                {
                    title: '3. Start Earning',
                    text: 'Complete tasks or refer partners to accumulate coins and real cash in your dashboard.'
                },
                {
                    title: '4. Instant Payouts',
                    text: 'Withdraw your earnings directly to your bank account with our secure payment gateway.'
                }
            ]
        },
        'benefits': {
            title: 'User Benefits',
            subtitle: 'Why choose Dromoney?',
            icon: Sparkles,
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            sections: [
                {
                    title: 'Financial Freedom',
                    text: 'Access multiple income streams that you can manage from anywhere in the world.'
                },
                {
                    title: 'Skill Development',
                    text: 'Learn marketing and business strategies through our verified project frameworks.'
                },
                {
                    title: 'Safe & Secure',
                    text: 'Your data and earnings are protected by industry-leading security protocols.'
                },
                {
                    title: 'Community Support',
                    text: 'Join thousands of earners and get 24/7 assistance from our expert team.'
                }
            ]
        },
        'support': {
            title: 'Support Center',
            subtitle: 'We are here to help you 24/7',
            icon: Headset,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
            sections: [
                {
                    title: 'Direct Assistance',
                    text: 'Chat with our support executives for any technical or payment related queries.'
                },
                {
                    title: 'Knowledge Base',
                    text: 'Read our guides and FAQs to solve common issues instantly without waiting.'
                },
                {
                    title: 'Email Support',
                    text: 'For complex issues, reach us at support@dromoney.com for detailed resolutions.'
                }
            ]
        },
        'about': {
            title: 'About Dromoney',
            subtitle: 'Empowering Digital Earners',
            icon: Building2,
            color: 'text-[#1A1C30]',
            bg: 'bg-slate-100',
            sections: [
                {
                    title: 'Our Mission',
                    text: 'To provide a transparent and efficient platform where everyone can monetize their digital presence.'
                },
                {
                    title: 'The Platform',
                    text: 'Dromoney is India\'s fastest growing affiliate and task-based earning ecosystem.'
                },
                {
                    title: 'Transparency',
                    text: 'We believe in fairness. Every payout and task is tracked with 100% precision.'
                }
            ]
        },
        'privacy': {
            title: 'Privacy Policy',
            subtitle: 'Your data is safe with us',
            icon: Shield,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            sections: [
                {
                    title: 'Data Collection',
                    text: 'We only collect necessary information like your name and contact details to facilitate payments.'
                },
                {
                    title: 'No Third-Party Sharing',
                    text: 'We never sell your data to any third-party marketing companies or agencies.'
                },
                {
                    title: 'Secure Encryption',
                    text: 'All your sensitive interaction data is encrypted using SSL technology.'
                }
            ]
        },
        'refund': {
            title: 'Refund Policy',
            subtitle: 'Transparent transactions',
            icon: IndianRupee,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            sections: [
                {
                    title: 'Digital Services',
                    text: 'As per industry standards for digital services, subscription fees are generally non-refundable.'
                },
                {
                    title: 'Technical Issues',
                    text: 'In case of duplicate payments or technical glitches, refunds are processed within 7 working days.'
                }
            ]
        },
        'terms': {
            title: 'Terms & Conditions',
            subtitle: 'User Agreement',
            icon: Info,
            color: 'text-slate-700',
            bg: 'bg-slate-100',
            sections: [
                {
                    title: 'Account Usage',
                    text: 'One user is allowed to hold only one verified account on the platform.'
                },
                {
                    title: 'Earnings Flow',
                    text: 'Earnings are subject to verification of task completion and referral authenticity.'
                }
            ]
        },
        'guidelines': {
            title: 'Community Guidelines',
            subtitle: 'Rules for a better experience',
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            sections: [
                {
                    title: 'Fair Play',
                    text: 'Any attempt to cheat the system will lead to immediate account suspension.'
                },
                {
                    title: 'Respectful Interaction',
                    text: 'Treat fellow earners and support staff with respect in all communications.'
                }
            ]
        },
        'future-features': {
            title: 'Future Features',
            subtitle: 'Upcoming Opportunities',
            icon: Rocket,
            color: 'text-sky-600',
            bg: 'bg-sky-50',
            sections: [
                {
                    title: 'Dromoney Marketplace',
                    text: 'Buy and sell digital assets directly within our ecosystem using wallet balance.'
                },
                {
                    title: 'Global Payouts',
                    text: 'Expansion beyond local banking to support international earners through crypto and PayPal.'
                },
                {
                    title: 'Advanced AI Tools',
                    text: 'Get automated marketing kits generated for your affiliate links for 10x better results.'
                }
            ]
        }
    };

    const data = CONTENT_MAP[type] || CONTENT_MAP['about'];
    const Icon = data.icon;

    return (
        <div className="flex flex-col min-h-screen bg-white animate-in slide-in-from-right duration-500 pb-20">
            {/* Header */}
            <div className={`p-6 ${data.bg} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Icon size={120} />
                </div>
                
                <button 
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white/80 backdrop-blur rounded-xl flex items-center justify-center text-slate-800 shadow-sm mb-6 active:scale-95 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="relative z-10">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{data.title}</h1>
                    <p className={`text-[11px] font-black uppercase tracking-[0.2em] mt-1 ${data.color}`}>{data.subtitle}</p>
                </div>
            </div>

            {/* Content List */}
            <div className="flex-1 p-6 -mt-4 bg-white rounded-t-[2.5rem] relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                <div className="space-y-8 mt-4">
                    {data.sections.map((section, idx) => (
                        <div key={idx} className="flex gap-4 group">
                            <div className="mt-1">
                                <CheckCircle2 size={20} className={data.color} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-800 mb-1 group-hover:translate-x-1 transition-transform">{section.title}</h3>
                                <p className="text-xs font-bold text-slate-500 leading-relaxed">{section.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 border-dashed text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        Need more help? Our experts are just a click away in the support section.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
