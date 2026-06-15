import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Globe, Camera, Star, ShieldCheck, Clock, Plane, Palmtree, MapPin, Sun, Search, Calendar, Users, 
  Building2, ArrowUpRight, Info, Navigation, Ship, TrendingUp, MoveRight, Key, Code, Lock, X, 
  AlertCircle, Timer, PlayCircle, CheckCircle2, ChevronRight, Flame, Sparkles, Zap, Layout, 
  UserCheck, Wand2, Award, Gift, Ticket, Check, Volume2, Menu 
} from 'lucide-react';

const C = {
  hero: "https://images.travelprox.com/splash/villa.png",
  altHero: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
  vTestimonial: "https://player.mediadelivery.net/embed/587199/02956ab7-33a5-4f3b-8754-ef763a308f28",
  vPerks: "https://player.mediadelivery.net/embed/587199/43d40616-b9b4-4efa-b54f-22d08d420e09",
  vDiag: "https://player.mediadelivery.net/embed/587199/03a48a31-4610-4d41-b4fc-72f8f4a84af2",
  roger: "https://images.travelprox.com/callista/rahj.png",
  enroll: "https://travorium.com/enroll.php?sponsor=376362",
  dests: {
    "Florida": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    "Las Vegas": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "Cancun": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  }
};

const SAVINGS_FEED = [
  { user: "Sarah J.", location: "Miami", saved: "$420", time: "1m ago" }, { user: "Michael R.", location: "Cancun", saved: "$890", time: "3m ago" },
  { user: "Elena W.", location: "NYC", saved: "$310", time: "1m ago" }, { user: "David K.", location: "Vegas", saved: "$1,200", time: "8m ago" },
  { user: "Sophia L.", location: "Paris", saved: "$540", time: "12m ago" }, { user: "Marcus T.", location: "Dubai", saved: "$2,100", time: "15m ago" },
  { user: "Julian M.", location: "Bali", saved: "$760", time: "18m ago" }, { user: "Aria V.", location: "London", saved: "$480", time: "21m ago" },
  { user: "Chloe B.", location: "Rome", saved: "$390", time: "24m ago" }, { user: "Nathan S.", location: "Santorini", saved: "$1,150", time: "26m ago" },
  { user: "Isabella G.", location: "Mykonos", saved: "$920", time: "29m ago" }, { user: "Liam P.", location: "Aspen", saved: "$630", time: "31m ago" },
  { user: "Olivia H.", location: "Tulum", saved: "$410", time: "33m ago" }, { user: "Ethan W.", location: "Barcelona", saved: "$580", time: "35m ago" },
  { user: "Mia C.", location: "Maldives", saved: "$2,450", time: "38m ago" }, { user: "Noah F.", location: "Amalfi", saved: "$1,340", time: "40m ago" },
  { user: "Ava R.", location: "Ibiza", saved: "$720", time: "42m ago" }, { user: "Lucas D.", location: "Cabo", saved: "$850", time: "45m ago" },
  { user: "Emma S.", location: "Zurich", saved: "$610", time: "47m ago" }, { user: "James K.", location: "Tokyo", saved: "$1,080", time: "50m ago" }
];

const customStyles = `
  @keyframes gloss-sweep { 0% { transform: translateX(-150%) skewX(-25deg); } 30%, 100% { transform: translateX(150%) skewX(-25deg); } }
  @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
  @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
  .animate-gloss { animation: gloss-sweep 4s ease-in-out infinite; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-scan { animation: scanline 3s linear infinite; }
  .glass-card { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); }
  .glass-card-dark { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
  .gold-glow { box-shadow: 0 0 50px -5px rgba(245, 158, 11, 0.25); }
  .gold-glow-hover:hover { box-shadow: 0 0 60px -5px rgba(245, 158, 11, 0.45); }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 4px; }
`;

const ScrollReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => ref.current && obs.unobserve(ref.current);
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>{children}</div>;
};

const ActionButton = ({ onClick, children, className = "", variant = "primary", noGloss = false, type = "button", disabled = false }) => {
  const styles = {
    primary: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black tracking-widest shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] border border-yellow-300/30", 
    secondary: "bg-slate-950 hover:bg-black text-white border border-slate-800",
    waitlist: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-950/20",
    orange: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50/50"
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`relative overflow-hidden px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-55 disabled:pointer-events-none flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}>
      {!noGloss && ['primary', 'waitlist', 'orange'].includes(variant) && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-[40%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-gloss" />
        </div>
      )}
      <span className="relative z-10 flex items-center justify-center space-x-2">{children}</span>
    </button>
  );
};

const TravelerQuiz = ({ isOpen, onClose, setView }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null, q4: null, q5: null, q6: null });
  const [lead, setLead] = useState({ name: '', email: '', loading: false });

  const partySize = answers.q1?.value || 2;
  const accommodationType = answers.q3?.value || 'hotel';
  const foodFrustration = answers.q4?.value === 'always' || answers.q5?.value === 'high';
  const mainFrustration = answers.q6?.value || 'cramped';

  const scenarioData = useMemo(() => {
    if (partySize >= 4 && (accommodationType === 'hotel' || accommodationType === 'suite')) {
      return {
        badge: "Room To Villa Transition Opportunity",
        color: "from-amber-500 to-yellow-600 text-slate-950 border-amber-500/20",
        persona: "The Suite-Squeezed Family",
        description: "You're spending standard retail rates on cramped, single-room hotels when those same dollars could secure a private 3-bedroom resort villa with zero added net cost.",
        fact: "Our unlisted booking pipelines offer 1,200+ sq ft premium club villas for equal or lower rates than standard mid-tier hotel rooms.",
        solution: "Unlock wholesale point-conversions to 3x your family's personal square footage.",
        metric: "Double the Space",
        metricLabel: "For Equal Budgets"
      };
    }
    if (foodFrustration && (mainFrustration === 'food' || accommodationType === 'hotel')) {
      return {
        badge: "Kitchen & Condo Arbitrage",
        color: "from-emerald-500 to-teal-600 text-white border-teal-500/20",
        persona: "The Gourmet-Prep Optimizer",
        description: "By upgrading to private resort condos with designer kitchen facilities for less than your current hotel room spend, you can enjoy home-cooked convenience while completely bypassing tourist dining rates.",
        fact: "Securing a premium resort condo with kitchen amenities actually lowers your overall vacation spend by 40% while doubling your room size.",
        solution: "Deploy owner-rate resort condos to bypass commercial hospitality markups.",
        metric: "40% Travel Savings",
        metricLabel: "Via In-Suite Dining"
      };
    }
    if (mainFrustration === 'stress' || mainFrustration === 'time') {
      return {
        badge: "Concierge Quality Priority",
        color: "from-purple-500 to-indigo-600 text-white border-indigo-500/20",
        persona: "The VIP Luxury Realist",
        description: "Stop spending hours navigating confusing travel portals. You can shift your existing retail budget to a streamlined wholesale platform that lands you in unlisted 5-star properties for standard resort rates.",
        fact: "Verified wholesale members unlock automated club-level resort upgrades while keeping overall budgets at or below standard retail room limits.",
        solution: "Transition to a managed, all-inclusive private club booking system.",
        metric: "5-Star Resorts",
        metricLabel: "At Standard Room Prices"
      };
    }
    // Default Scenario
    return {
      badge: "Private Contract Upgrade",
      color: "from-amber-400 to-yellow-500 text-slate-950 border-yellow-500/20",
      persona: "The Smart Luxury Strategist",
      description: "You appreciate luxury, but are currently booking retail hotel spaces. Redirecting your existing budget to direct wholesale club channels upgrades your stay from 4-star standard rooms to 5-star club villas.",
      fact: "Direct wholesale agreements drop room costs so low that travelers consistently upgrade to premium suites without spending a single dollar more.",
      solution: "Bypass public search engines and secure direct-to-developer booking slots.",
      metric: "Tier-5 Upgrade",
      metricLabel: "At $0 Net Cost Boost"
    };
  }, [partySize, accommodationType, foodFrustration, mainFrustration]);

  if (!isOpen) return null;

  const QUESTIONS = [
    { 
      id: 'q1', 
      title: "How many people usually travel with you?", 
      options: [
        { key: 'A', text: "Just Me / Solo", value: 1 }, 
        { key: 'B', text: "Couple (2 people)", value: 2 }, 
        { key: 'C', text: "Small Family (3-4 people)", value: 4 }, 
        { key: 'D', text: "Large Family / Group (5+ people)", value: 6 }
      ] 
    },
    { 
      id: 'q2', 
      title: "How many nights do you normally stay?", 
      options: [
        { key: 'A', text: "Quick Weekend (1-3 Nights)", value: 2 }, 
        { key: 'B', text: "Mid-week / Standard (4-5 Nights)", value: 4.5 }, 
        { key: 'C', text: "Full Vacation Week (6-7 Nights)", value: 6.5 }, 
        { key: 'D', text: "Extended Getaway (8+ Nights)", value: 10 }
      ] 
    },
    { 
      id: 'q3', 
      title: "Do you typically stay in:", 
      options: [
        { key: 'A', text: "Hotel Room", value: 'hotel' }, 
        { key: 'B', text: "Suite", value: 'suite' }, 
        { key: 'C', text: "Condo", value: 'condo' }, 
        { key: 'D', text: "Villa", value: 'villa' }
      ] 
    },
    { 
      id: 'q4', 
      title: "Do you usually eat out for every meal?", 
      options: [
        { key: 'A', text: "Yes, every single meal", value: 'always' }, 
        { key: 'B', text: "Most of the time", value: 'mostly' }, 
        { key: 'C', text: "Sometimes / Mix it up", value: 'mix' }, 
        { key: 'D', text: "Rarely / Prefer to prep food", value: 'rarely' }
      ] 
    },
    { 
      id: 'q5', 
      title: "Would a full kitchen save your family money?", 
      options: [
        { key: 'A', text: "Absolutely, food costs are a massive leak", value: 'high' }, 
        { key: 'B', text: "Probably, for breakfast & quick lunches", value: 'med' }, 
        { key: 'C', text: "Maybe a little, but not a dealbreaker", value: 'low' }, 
        { key: 'D', text: "No, we prefer dining out exclusively", value: 'none' }
      ] 
    },
    { 
      id: 'q6', 
      title: "What's your biggest travel frustration?", 
      options: [
        { key: 'A', text: "Cramped Rooms", value: 'cramped' }, 
        { key: 'B', text: "Food Costs", value: 'food' }, 
        { key: 'C', text: "Not Enough Time", value: 'time' }, 
        { key: 'D', text: "Expensive Attractions", value: 'attractions' },
        { key: 'E', text: "Stress & Coordination", value: 'stress' }
      ] 
    }
  ];

  const currentQuestion = QUESTIONS[step - 1];

  const handleSelect = (opt) => {
    setAnswers(p => ({ ...p, [`q${step}`]: opt }));
    setTimeout(() => setStep(step < 6 ? step + 1 : 'lead'), 250);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLead(p => ({ ...p, loading: true }));
    try {
      const fd = new FormData();
      fd.append('email_address', lead.email);
      fd.append('fields[first_name]', lead.name);
      await fetch("https://app.kit.com/forms/9018875/subscriptions", { method: "POST", body: fd, mode: 'no-cors' });
    } catch (_) {}
    setTimeout(() => {
      setLead(p => ({ ...p, loading: false }));
      setStep('results');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-center items-start overflow-y-auto bg-slate-950/90 backdrop-blur-xl p-3 sm:p-6 md:p-8 py-8 sm:py-16 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[32px] sm:rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-slate-200 overflow-hidden relative my-auto animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 md:py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-amber-500 rounded-lg text-white"><Plane className="w-4 h-4 animate-pulse" /></div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block leading-none">Diagnostic Vault</span>
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest mt-0.5 block">Wholesale Pricing Engine</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/60 rounded-full transition-colors"><X className="w-6 h-6 text-slate-500" /></button>
        </div>

        {typeof step === 'number' && (
          <div className="w-full bg-slate-100 h-2 relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }} />
            <div className="absolute top-0 bottom-0 w-20 bg-white/40 skew-x-12 animate-scan" style={{ left: `${((step / 6) * 100) - 10}%` }} />
          </div>
        )}

        <div className="p-6 sm:p-10 md:p-14">
          {typeof step === 'number' && (
            <div className="space-y-8 animate-in fade-in-50 duration-500">
              <div className="text-center md:text-left space-y-2">
                <span className="inline-block text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200/50 px-3 py-1 rounded-full uppercase tracking-[0.4em]">Section {step} of 6</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tighter leading-tight mt-2">{currentQuestion.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {currentQuestion.options.map((opt) => {
                  const sel = answers[`q${step}`]?.key === opt.key;
                  return (
                    <button key={`${currentQuestion.id}-${opt.key}`} onClick={() => handleSelect(opt)} className={`group text-left p-6 rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] flex items-start space-x-4 ${sel ? 'border-amber-500 bg-amber-50/50 text-slate-950 shadow-lg shadow-amber-500/5' : 'border-slate-100 bg-slate-50/70 hover:border-amber-400 hover:bg-white text-slate-700 hover:shadow-md'}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-all ${sel ? 'bg-slate-950 text-white scale-110' : 'bg-white border border-slate-200 text-slate-400 group-hover:bg-amber-400 group-hover:text-slate-950'}`}>{opt.key}</span>
                      <span className="font-bold text-sm md:text-base pt-0.5 leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 'lead' && (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-4 animate-in fade-in zoom-in-95 duration-500">
              {lead.loading ? (
                <div className="flex flex-col items-center justify-center space-y-6 py-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <Plane className="w-6 h-6 text-amber-500 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-amber-600 animate-pulse">ANALYZING VACATION PARAMETERS</span>
                    <span className="block text-slate-400 font-bold text-xs uppercase tracking-widest">Compiling wholesale markup variances...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto border border-amber-100 shadow-inner animate-float"><ShieldCheck className="w-10 h-10" /></div>
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none">DIAGNOSTIC SAVED.</h2>
                    <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-xl mx-auto">Where should we dispatch your custom wholesale analysis report? Save your email to immediately access your confidential system walkthrough.</p>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-6 text-left max-w-lg mx-auto">
                    <div className="space-y-4">
                      {[['Full Legal Name', 'First & Last Name', 'text', 'name'], ['Confidential Delivery Email', 'name@domain.com', 'email', 'email']].map(([label, ph, type, key]) => (
                        <div key={key} className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">{label}</label>
                          <input required type={type} placeholder={ph} value={lead[key]} onChange={(e) => setLead(p => ({ ...p, [key]: e.target.value }))} className="w-full h-14 bg-slate-50 rounded-2xl px-5 outline-none border-2 border-slate-100 focus:border-amber-400 focus:bg-white text-slate-900 font-bold transition-all" />
                        </div>
                      ))}
                    </div>
                    <ActionButton type="submit" variant="waitlist" className="w-full py-5 text-sm uppercase font-black tracking-widest">Generate Private Savings Matrix</ActionButton>
                  </form>
                </>
              )}
            </div>
          )}

          {step === 'results' && (
            <div className="space-y-8 md:space-y-10 py-2 animate-in zoom-in-95 duration-500">
              
              <div className="bg-amber-50 border-2 sm:border-4 border-amber-500 rounded-2xl sm:rounded-3xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-amber-600" />
                <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter uppercase leading-tight mb-2">
                  🚨 Based on your answers, you're likely paying hotel-room prices while sacrificing villa-level comfort.
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Target Upgrade Potential: <span className="text-amber-600 font-black">2x to 3x More Space & Comfort at Equal or Lower Net Cost</span>
                </p>
              </div>

              <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 w-full">
                  <div className="text-center lg:text-left space-y-3 relative z-10 w-full lg:w-auto">
                    <span className={`text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${scenarioData.color} px-3 py-1.5 rounded-full border border-white/10 shadow-lg`}>
                      Assigned Profile: {scenarioData.badge}
                    </span>
                    
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-400 tracking-tighter uppercase italic leading-none mt-4">
                      {scenarioData.persona}
                    </h4>
                    
                    <p className="text-slate-300 font-medium text-xs sm:text-sm lg:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed pt-1">
                      {scenarioData.description}
                    </p>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl mt-4 text-left">
                      <span className="block text-[9px] font-bold tracking-widest uppercase text-amber-400 mb-1">Empirical Reality Check</span>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{scenarioData.fact}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 md:p-6 rounded-2xl sm:rounded-3xl text-white font-black text-center shrink-0 w-full lg:w-auto min-w-[220px] shadow-2xl relative z-10 border border-emerald-400">
                    <span className="block text-[10px] uppercase tracking-widest opacity-85">Value Optimization Level</span>
                    <span className="text-2xl sm:text-3xl block mt-1 tracking-tight">{scenarioData.metric}</span>
                    <div className="w-full h-[1px] bg-white/20 my-3" />
                    <span className="block text-[10px] uppercase tracking-widest opacity-85">Accommodation Tier Gained</span>
                    <span className="block text-xs uppercase tracking-wider font-black mt-1 text-emerald-100">{scenarioData.metricLabel}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">SECURE BACK-OFFICE INVENTORY BROADCAST</span>
                  <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border border-green-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    <span>Live Session Connected</span>
                  </div>
                </div>
                <div className="relative aspect-video w-full rounded-2xl md:rounded-[32px] overflow-hidden border-4 md:border-8 border-slate-950 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] bg-black gold-glow">
                  <iframe src={C.vDiag} className="w-full h-full" loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
                <ActionButton variant="primary" className="w-full sm:w-auto px-10 py-5 text-sm font-black" onClick={() => window.location.href = "sms:+17658107271?&body=TPXLife"}>Text TPXLife to 765.810.7271 for more info</ActionButton>
                <button onClick={() => { onClose(); setView('presentation'); }} className="text-slate-500 hover:text-slate-950 font-black uppercase text-[10px] tracking-widest py-2 hover:underline transition-colors">Explore Premium Perks</button>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                <button onClick={() => { setStep(1); setAnswers({}); }} className="text-slate-400 hover:text-slate-950 font-black uppercase text-[10px] tracking-widest py-2 transition-colors">Reset Scan</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('email_address', email);
      await fetch("https://app.kit.com/forms/9018875/subscriptions", { method: "POST", body: fd, mode: 'no-cors' });
    } catch (_) {}
    setTimeout(() => setStatus('success'), 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/70 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-8 md:p-12 relative shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors z-20"><X className="w-6 h-6 text-slate-400" /></button>
        {status === 'success' ? (
          <div className="text-center py-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 border border-green-100 shadow-inner"><Check className="w-10 h-10 stroke-[3]" /></div>
            <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-3 leading-none">SLOT REQUESTED.</h3>
            <p className="text-slate-500 font-bold mb-8 text-sm leading-relaxed max-w-sm mx-auto">We have archived your digital timestamp. A concierge representative will transmit details shortly if an slot clears.</p>
            <ActionButton variant="secondary" className="w-full py-4 text-xs" onClick={onClose}>Dismiss Portal</ActionButton>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-8 shadow-inner animate-float"><Lock className="w-10 h-10" /></div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">UNLISTED RATES <br/> ARE PROTECTED.</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed text-xs sm:text-sm">To guarantee system integrity, private group booking options require verified member approval. Join the queue to receive real-time availability updates.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="email_address" required type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 outline-none focus:border-amber-400 text-slate-900 font-bold transition-all disabled:opacity-50" />
              <ActionButton type="submit" disabled={status === 'loading'} variant="waitlist" className="w-full py-5 text-sm tracking-wider font-black">{status === 'loading' ? 'Encrypting Connection...' : 'Request Exclusive Access Invite'}</ActionButton>
              <div className="flex items-center justify-center space-x-2 mt-6">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secured by Travel Pro X Vault</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const SavingsTicker = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % SAVINGS_FEED.length), 4500);
    return () => clearInterval(t);
  }, []);
  const active = SAVINGS_FEED[idx];
  return (
    <div className="flex flex-col md:flex-row items-center gap-3">
      <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center space-x-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
        <div className="flex -space-x-2"><div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-[9px] font-black text-slate-950 border border-slate-900 shadow">TPX</div></div>
        <p className="text-white text-[11px] font-bold tracking-wide"><span className="text-amber-400 font-black">{active.user}</span> saved <span className="text-emerald-400 font-black">{active.saved}</span> in <span className="text-white/90 font-black">{active.location}</span></p>
        <div className="w-[1px] h-3 bg-white/20" />
        <span className="text-white/40 text-[9px] uppercase font-black tracking-widest shrink-0">{active.time}</span>
      </div>
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-full px-5 py-2.5 flex items-center space-x-2">
        <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Trending: Maldives</span>
      </div>
    </div>
  );
};

const Header = ({ setView, activeView }) => {
  const [open, setOpen] = useState(false);
  const links = [{ id: 'presentation', label: 'Member Perks' }, { id: 'home', label: 'Core Portal' }, { id: 'agency', label: 'Promoter Hub', badge: true }];
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-[28px] px-6 py-4 shadow-2xl pointer-events-auto relative">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setView('home'); setOpen(false); }}>
          <div className="p-2.5 bg-slate-950 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/10"><Plane className="w-5 h-5 text-amber-400" /></div>
          <span className="font-black text-slate-950 tracking-tighter text-xl uppercase">TRAVELPRO<span className="text-amber-500 text-2xl italic leading-none">X</span></span>
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          {links.map(l => (
            <button key={l.id} onClick={() => setView(l.id)} className={`text-[10px] font-black uppercase tracking-widest transition-all ${l.badge ? 'px-4 py-2 bg-amber-50/50 hover:bg-amber-100/50 rounded-full border border-amber-200/40' : ''} ${activeView === l.id ? 'text-amber-500' : 'text-slate-500 hover:text-slate-950'}`}>{l.label}</button>
          ))}
        </div>
        <div className="hidden lg:block">
          <ActionButton variant="primary" noGloss className="py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest" onClick={() => setView('agency')}>Partner Club</ActionButton>
        </div>
        <button className="lg:hidden p-2 text-slate-800 hover:bg-slate-50 rounded-xl transition-all" onClick={() => setOpen(!open)}><Menu className="w-6 h-6" /></button>
        {open && (
          <div className="absolute top-[90px] left-0 right-0 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto">
            {links.map(l => <button key={l.id} onClick={() => { setView(l.id); setOpen(false); }} className="text-left font-black uppercase tracking-wider text-xs py-2 text-slate-800 hover:text-amber-500">{l.label}</button>)}
            <hr className="border-slate-100" />
            <ActionButton variant="primary" noGloss className="py-3 px-6 rounded-xl text-[11px] uppercase tracking-wider w-full" onClick={() => { setView('agency'); setOpen(false); }}>Partner Program</ActionButton>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomeView = ({ setView }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Visual Canvas Backdrop - Guaranteed Instant Load Original Villa Image */}
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src={C.hero} 
            className="w-full h-full object-cover" 
            alt="Luxury Villa Background" 
            fetchpriority="high"
            onError={(e) => e.target.src = C.altHero} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-white" />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl text-center">
          {/* Above-the-fold content rendered instantly with smooth entry CSS animations to prevent scroll observers blocking load */}
          <div className="mb-10 flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
            <SavingsTicker />
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[13rem] font-black text-white tracking-tighter leading-[0.8] uppercase drop-shadow-[0_10px_50px_rgba(0,0,0,0.65)]">
              THE TRAVEL <br/> 
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)]">QUIZ...</span>
            </h1>
            <p className="text-white text-base sm:text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-95">
              Stop paying retail brokers. Our private club members access "Unlisted" wholesale contracts locked down by verified travel networks.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-md sm:max-w-none mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 ease-out fill-mode-both">
            <ActionButton variant="primary" className="w-full sm:w-auto px-12 py-6 text-base tracking-widest" onClick={() => setQuizOpen(true)}>
              Scan Travel Profile
            </ActionButton>
            <button onClick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })} className="group text-white font-black text-xs uppercase tracking-[0.4em] flex items-center hover:text-amber-400 transition-colors py-4 px-6 rounded-full hover:bg-white/5">
              View Live Comp <MoveRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </button>
          </div>

          <ScrollReveal>
            <div onClick={() => setQuizOpen(true)} className="max-w-4xl mx-auto bg-white/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)] border border-white overflow-hidden cursor-pointer group hover:scale-[1.01] transition-all duration-500">
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                {['Hotel Diagnostic Scanner', 'Flight Route Optimizer', 'Cruise Sizer'].map((tab, idx) => (
                  <div key={tab} className={`flex-1 py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center transition-all ${idx === 0 ? 'bg-white text-amber-600 border-b-4 border-amber-500' : 'text-slate-400 group-hover:text-slate-600'}`}>{tab}</div>
                ))}
              </div>
              <div className="p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50/80 p-5 rounded-2xl text-left border border-slate-100 group-hover:bg-slate-100/50 transition-colors">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Primary Target</span>
                    <div className="flex items-center space-x-3 text-slate-500 font-bold italic text-sm"><MapPin className="w-5 h-5 text-amber-500 animate-bounce" /><span>Select Vacation Target Hub</span></div>
                  </div>
                  <div className="bg-slate-50/80 p-5 rounded-2xl text-left border border-slate-100 group-hover:bg-slate-100/50 transition-colors">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Diagnostic Profile</span>
                    <div className="flex items-center space-x-3 text-slate-500 font-bold italic text-sm"><Calendar className="w-5 h-5 text-orange-500" /><span>Input Frequency & Budgets</span></div>
                  </div>
                  <ActionButton variant="orange" className="h-full rounded-2xl cursor-pointer" onClick={() => setQuizOpen(true)}><Search className="w-4 h-4 animate-pulse mr-2" /><span>Run Unlisted Audit</span></ActionButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TravelerQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} setView={setView} />

      <section id="insights" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 bg-white">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-12 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-amber-600 block mb-3">Pricing Variance Index</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.85] italic">STEP BEHIND THE VELVET ROPE.</h2>
            </div>
            <p className="text-slate-500 font-bold max-w-xs text-sm leading-relaxed">Public indexes reflect standard retail brokerage margins. Cleared members unlock 25% to 60% system reductions across all nodes.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Florida", loc: "Miami Beach", price: "189", tag: "Beachfront VIP" },
            { name: "New York", loc: "Times Square Luxury", price: "245", tag: "Penthouse Suite" },
            { name: "Las Vegas", loc: "The Strip Premium", price: "99", tag: "High Roller" },
            { name: "Cancun", loc: "Tropical All-Inclusive", price: "220", tag: "Paradise Cove" }
          ].map((dest, i) => (
            <ScrollReveal key={i}>
              <div className="group cursor-pointer">
                <div className="relative h-[480px] sm:h-[520px] rounded-[48px] overflow-hidden mb-6 border-4 border-slate-50 shadow-2xl transition-all duration-700 hover:-translate-y-3">
                  <img src={C.dests[dest.name]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={dest.name} />
                  <div className="absolute top-8 left-8"><span className="px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full text-[9px] font-black text-slate-950 uppercase tracking-widest shadow-lg border border-yellow-300">{dest.tag}</span></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ActionButton variant="waitlist" className="w-full py-4 rounded-2xl" onClick={() => setQuizOpen(true)}>Verify Special Rate</ActionButton>
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter leading-none mb-1.5">{dest.name}</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-amber-500 shrink-0" /> {dest.loc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest line-through mb-0.5 font-bold">Retail: ${parseInt(dest.price) + 120}</p>
                    <p className="text-xl sm:text-2xl font-black text-amber-600 leading-none">${dest.price}/n</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-24 sm:py-36 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center">
            <div className="inline-flex items-center space-x-2.5 px-5 py-2.5 mb-8 text-[10px] font-black tracking-[0.4em] uppercase bg-white/5 text-amber-400 rounded-full border border-white/10">
              <PlayCircle className="w-4 h-4" /><span>Real Live Walkthrough Diaries</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">RAW MEMBER FEED. <br/> <span className="text-white/30 italic">UNCOMPENSATED PROOF.</span></h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16">
              {["Net-Wholesale Hotel Inventory", "Flight Consolidator Clearances", "Deep Cruise Access Keys", "Zero Retail Surcharges"].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-white/90 font-bold text-xs uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
            <div className="relative max-w-4xl mx-auto mb-16 group">
              <div className="absolute -inset-10 bg-amber-400/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
              <div className="relative aspect-video w-full rounded-[32px] sm:rounded-[48px] overflow-hidden border-[6px] sm:border-[12px] border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-[1.005]">
                <iframe src={C.vTestimonial} className="w-full h-full" loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen />
              </div>
            </div>
            <ActionButton variant="primary" className="mx-auto px-12 py-5 text-base tracking-widest" onClick={() => setQuizOpen(true)}>Start Live Verification Process <MoveRight className="ml-3 w-5 h-5" /></ActionButton>
          </ScrollReveal>
        </div>
      </section>

      <footer className="bg-white pt-24 pb-16 px-4 sm:px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-slate-950 rounded-xl"><Plane className="w-5 h-5 text-amber-400" /></div>
              <span className="font-black text-slate-950 text-2xl tracking-tighter uppercase">TRAVELPRO<span className="text-amber-500">X</span></span>
            </div>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed mb-8 text-base">Operating a global wholesale allocation framework. By amalgamating active group volume, we deliver direct manufacturer rates bypass commissions.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Internal Navigation</h4>
            <ul className="space-y-4">
              {[['home', 'Global Core Portal'], ['agency', 'Promoter Network'], ['presentation', 'VIP Benefits Vault']].map(([vid, label]) => (
                <li key={vid}><button onClick={() => setView(vid)} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Core Status</h4>
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100/50">
              <div className="flex items-center space-x-3 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Scanning Nodes Online</span>
              </div>
              <p className="text-[11px] font-bold text-slate-600 leading-snug">Global distribution network and travel APIs operational.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-slate-100 text-center md:text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014</p>
        </div>
      </footer>
    </div>
  );
};

const AgencyView = ({ setView }) => {
  const [lead, setLead] = useState({ name: '', email: '', saved: false });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLead(p => ({ ...p, saved: true }));
    try {
      const fd = new FormData();
      fd.append('fields[first_name]', lead.name);
      fd.append('email_address', lead.email);
      await fetch("https://app.kit.com/forms/9018899/subscriptions", { method: "POST", body: fd, mode: 'no-cors' });
    } catch (_) {}
    setTimeout(() => setView('presentation'), 1500);
  };
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
      <main className="pt-40 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-24">
            <div className="relative lg:col-span-7">
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.5em] uppercase bg-amber-100 text-amber-700 rounded-full border border-amber-200">
                <Zap className="w-3.5 h-3.5" /><span>Platinum Club Promoter</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-slate-950">GENERATE A <br/> TRAVEL <br/> <span className="text-amber-500 italic">EMPIRE.</span></h1>
              <p className="text-lg sm:text-2xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">Partner directly with our team as a <span className="text-slate-950 font-black">Platinum Travel Club Promoter</span>. Power your business via <span className="text-amber-600 font-black">Travorium</span>.</p>
              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-5 bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/50 shadow-sm transition-all hover:scale-[1.01]">
                  <div className="bg-amber-50 p-4 rounded-2xl text-amber-500 shrink-0 border border-amber-100"><Sparkles className="w-6 h-6 animate-pulse" /></div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-slate-950 mb-1.5">Industry Rates up to 80% Off</h4>
                    <p className="text-slate-500 text-sm font-semibold leading-relaxed">Platinum members bypass consumer brokers entirely, unlocking net wholesale rates on private inventories.</p>
                  </div>
                </div>
                <div className="relative pt-10">
                  <div className="absolute top-0 right-4 sm:right-6 z-20">
                    <div className="relative animate-float">
                      <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 sm:border-[6px] border-white shadow-2xl overflow-hidden gold-glow">
                        <img src={C.roger} className="w-full h-full object-cover" alt="Roger Reed" />
                      </div>
                      <div className="absolute -bottom-1 right-1 bg-amber-400 p-2 rounded-xl shadow-lg border-2 border-white"><Wand2 className="w-4 h-4 text-slate-950" /></div>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-8 sm:p-12 rounded-[40px] sm:rounded-[48px] shadow-3xl border-2 border-amber-500/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                    <div className="relative z-10 pr-20 sm:pr-24 lg:pr-0">
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 mb-5 text-[9px] font-black tracking-[0.3em] uppercase bg-amber-400 text-slate-950 rounded-full border border-yellow-300">
                        <Award className="w-3.5 h-3.5" /><span>Direct Sponsor Action Pack</span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none italic">Bespoke Pages <br/> <span className="text-amber-400">Custom Styled.</span></h3>
                      <p className="text-slate-300 font-bold text-sm sm:text-base mb-6 leading-relaxed max-w-sm">As your designated pilot, <span className="text-white font-black">Roger Reed</span> will handcraft and deliver your high-converting online capture ecosystem.</p>
                      <div className="grid grid-cols-1 gap-3 mb-8">
                        {["16-Year Veteran Web Architect Team", "High-Conversion Custom Funnels Built For You", "Direct Technical Configuration & Support"].map((feat, idx) => (
                          <div key={idx} className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px]">{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border-l-4 border-amber-400">
                        <p className="text-slate-400 text-[9px] uppercase font-black tracking-widest">Estimated Value Matrix</p>
                        <p className="text-lg sm:text-2xl font-black text-white tracking-tight">$1,000+ <span className="text-amber-400 line-through text-xs sm:text-sm opacity-50 ml-1">RETAIL VALUE</span> <span className="text-[9px] bg-white text-slate-950 px-2.5 py-1 rounded-full ml-3 italic shrink-0 font-bold">SPONSORED NO FEE</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => setView('home')} className="inline-flex items-center space-x-2 text-slate-400 font-black uppercase tracking-[0.3em] text-[9px] hover:text-slate-950 transition-colors mt-4">
                <MoveRight className="w-4 h-4 rotate-180" /><span>Return to Public Audit Vault</span>
              </button>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-36 mt-12 lg:mt-0">
              <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[40px] border border-slate-200/85 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-xl"><Users className="w-7 h-7" /></div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-8 uppercase tracking-tighter text-center italic text-slate-950 leading-none">PROMOTER INTAKE</h3>
                  {lead.saved ? (
                    <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4 border border-green-100 shadow-inner animate-bounce"><Check className="w-8 h-8 stroke-[3]" /></div>
                      <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter mb-2">Request Processed!</h4>
                      <p className="text-slate-400 text-xs font-semibold max-w-xs mx-auto leading-relaxed">Routing session directly to the Premium Perks presentation module...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {[['Full Legal Name', 'John Doe', 'text', 'name'], ['Confidential Email', 'partner@yourbrand.com', 'email', 'email']].map(([label, ph, type, k]) => (
                        <div key={k} className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">{label}</label>
                          <input required type={type} placeholder={ph} value={lead[k]} onChange={(e) => setLead(p => ({ ...p, [k]: e.target.value }))} className="w-full h-14 bg-slate-50 rounded-2xl px-5 outline-none focus:ring-4 ring-amber-400/10 text-slate-900 font-bold border-2 border-slate-100 focus:border-amber-400 focus:bg-white transition-all text-sm" />
                        </div>
                      ))}
                      <ActionButton type="submit" variant="secondary" className="w-full py-5 text-sm tracking-wider font-black">Submit Secure Application</ActionButton>
                      <div className="text-center space-y-4 pt-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Platinum Travorium Protocol Verification • travelprox.com</p>
                        <div className="flex items-center justify-center space-x-1.5 text-emerald-600">
                          <ShieldCheck className="w-4 h-4" /><span className="text-[9px] font-black uppercase tracking-widest">Confidential Sponsor Queue</span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>
      <footer className="py-16 border-t border-slate-200 text-center px-4 bg-white">
        <button onClick={() => setView('home')} className="mb-6 text-slate-400 hover:text-slate-950 transition-colors uppercase font-black text-[9px] tracking-[0.4em]">Return to Core Comparison Nodes</button>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014</p>
      </footer>
    </div>
  );
};

const PresentationView = ({ setView }) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  return (
    <div className="bg-slate-950 min-h-screen text-white overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      <main className="pt-32 pb-24">
        <ScrollReveal className="text-center">
          <div className="max-w-2xl mx-auto px-4 mb-8">
            <div className="bg-amber-400/10 border border-amber-400/20 py-2 px-5 rounded-full inline-flex items-center space-x-2.5 shadow-lg">
              <Gift className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300">Platinum Exclusive: Lock in Membership this {currentMonth} for an Vegas Escape Voucher</span>
            </div>
          </div>
          <div className="px-4 mb-12 max-w-4xl mx-auto space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">INSIDE THE <span className="text-amber-400 drop-shadow-[0_4px_15px_rgba(245,158,11,0.2)]">VAULT.</span></h1>
            <p className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">Confidential wholesale rates, premium rewards rewards keys, and luxury portals revealed below.</p>
          </div>
          <div className="w-full relative group px-4 sm:px-6 mb-16">
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="max-w-5xl mx-auto w-full">
              <div className="relative aspect-video w-full rounded-2xl sm:rounded-[40px] overflow-hidden border-[6px] sm:border-[12px] border-white/5 shadow-3xl bg-black">
                <iframe src={C.vPerks} className="w-full h-full" loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen />
              </div>
            </div>
          </div>
          <div className="px-4 max-w-3xl mx-auto">
            <a href={C.enroll} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center justify-center bg-white text-slate-950 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] hover:scale-[1.01] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] w-full border border-white/80">
              <div className="absolute inset-0 rounded-[32px] sm:rounded-[48px] bg-gradient-to-tr from-amber-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 relative z-10">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">Travorium Platinum Enrollment</span>
                  <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 block">Join Team & Initialize Account</span>
                </div>
                <div className="bg-slate-950 p-3 sm:p-4 rounded-full text-amber-400 group-hover:rotate-45 transition-transform shrink-0 shadow-lg shadow-amber-500/10"><ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" /></div>
              </div>
            </a>
            <div className="mt-10 flex justify-center items-center space-x-8 opacity-50">
              <div className="flex items-center space-x-2"><ShieldCheck className="w-4 h-4 text-amber-400" /><span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Wholesale Contracts Secured</span></div>
              <div className="flex items-center space-x-2"><UserCheck className="w-4 h-4 text-amber-400" /><span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Direct Placement Priority</span></div>
            </div>
            <button onClick={() => setView('home')} className="mt-16 text-white/30 hover:text-white font-black uppercase tracking-[0.4em] text-[9px] transition-colors">Return to Public Portal</button>
          </div>
        </ScrollReveal>
      </main>
      <footer className="py-16 border-t border-white/5 text-center px-4">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest text-center">© 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('home'); 
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const spotsLeft = useMemo(() => {
    return Math.max(100 - (new Date().getDate() - 1) * 3, 7);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.5.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [view]);

  return (
    <div className="font-sans selection:bg-amber-400 selection:text-slate-950 text-slate-950 bg-slate-50 antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <Header setView={setView} activeView={view} />
      
      {view === 'home' && <HomeView setView={setView} />}
      {view === 'agency' && <AgencyView setView={setView} />}
      {view === 'presentation' && <PresentationView setView={setView} />}

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      <div onClick={() => setIsWaitlistOpen(true)} className="fixed bottom-6 right-6 z-[120] bg-white border border-slate-200/60 p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 transition-all group">
        <div className="bg-slate-950 px-5 py-3 rounded-full flex items-center space-x-2.5 shadow-lg">
           <Timer className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
           <span className="text-[11px] font-black text-white uppercase tracking-widest">{spotsLeft} Vacancies Left</span>
        </div>
        <div className="px-3.5 py-3 hidden md:flex items-center space-x-1.5">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Seat</span>
           <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default App;
