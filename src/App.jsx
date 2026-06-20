import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Globe,
  Camera,
  Star, 
  ShieldCheck,
  Clock,
  Plane,
  Palmtree,
  MapPin,
  Sun,
  Search,
  Calendar,
  Users,
  Building2,
  ArrowUpRight,
  Info,
  Navigation,
  Ship,
  TrendingUp,
  MoveRight,
  Key,
  Code,
  Lock,
  X,
  AlertCircle,
  Timer,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Sparkles,
  Zap,
  Layout,
  UserCheck,
  Wand2,
  Award,
  Gift,
  Ticket,
  Check,
  Volume2,
  Menu,
  Copy,
  MessageCircle
} from 'lucide-react';

const OFFICIAL_HERO_IMAGE = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"; // Premium high-res fallback backup for luxury feel
const ALTERNATIVE_HERO_IMAGE = "https://images.travelprox.com/splash/villa.png";

const TESTIMONIAL_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/02956ab7-33a5-4f3b-8754-ef763a308f28";
const PERKS_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/43d40616-b9b4-4efa-b54f-22d08d420e09";
const DIAGNOSTIC_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/03a48a31-4610-4d41-b4fc-72f8f4a84af2";

const ROGER_PROFILE_IMAGE = "https://images.travelprox.com/callista/rahj.png";
const TRAVORIUM_ENROLL_URL = "https://travorium.com/enroll.php?sponsor=376362";

const DESTINATION_ASSETS = {
  "Florida": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", // Miami high res
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80", // Times Square high res
  "Las Vegas": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", // Vegas high res
  "Cancun": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"  // Cancun high res
};

const SAVINGS_FEED = [
  { user: "Sarah J.", location: "Miami", saved: "$420", time: "1m ago" },
  { user: "Michael R.", location: "Cancun", saved: "$890", time: "3m ago" },
  { user: "Elena W.", location: "NYC", saved: "$310", time: "1m ago" },
  { user: "David K.", location: "Vegas", saved: "$1,200", time: "8m ago" },
  { user: "Sophia L.", location: "Paris", saved: "$540", time: "12m ago" },
  { user: "Marcus T.", location: "Dubai", saved: "$2,100", time: "15m ago" },
  { user: "Julian M.", location: "Bali", saved: "$760", time: "18m ago" },
  { user: "Aria V.", location: "London", saved: "$480", time: "21m ago" },
  { user: "Chloe B.", location: "Rome", saved: "$390", time: "24m ago" },
  { user: "Nathan S.", location: "Santorini", saved: "$1,150", time: "26m ago" },
  { user: "Isabella G.", location: "Mykonos", saved: "$920", time: "29m ago" },
  { user: "Liam P.", location: "Aspen", saved: "$630", time: "31m ago" },
  { user: "Olivia H.", location: "Tulum", saved: "$410", time: "33m ago" },
  { user: "Ethan W.", location: "Barcelona", saved: "$580", time: "35m ago" },
  { user: "Mia C.", location: "Maldives", saved: "$2,450", time: "38m ago" },
  { user: "Noah F.", location: "Amalfi", saved: "$1,340", time: "40m ago" },
  { user: "Ava R.", location: "Ibiza", saved: "$720", time: "42m ago" },
  { user: "Lucas D.", location: "Cabo", saved: "$850", time: "45m ago" },
  { user: "Emma S.", location: "Zurich", saved: "$610", time: "47m ago" },
  { user: "James K.", location: "Tokyo", saved: "$1,080", time: "50m ago" },
];

const customStyles = `
  @keyframes gloss-sweep {
    0% { transform: translateX(-150%) skewX(-25deg); }
    30% { transform: translateX(150%) skewX(-25deg); }
    100% { transform: translateX(150%) skewX(-25deg); }
  }
  .animate-gloss {
    animation: gloss-sweep 4s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .animate-scan {
    animation: scanline 3s linear infinite;
  }
  @keyframes wiggle {
    0%, 80%, 100% { transform: scale(1) rotate(0deg); }
    82% { transform: scale(1.02) rotate(-3deg); }
    84% { transform: scale(1.02) rotate(3deg); }
    86% { transform: scale(1.02) rotate(-3deg); }
    88% { transform: scale(1.02) rotate(3deg); }
    90% { transform: scale(1) rotate(0deg); }
  }
  .animate-wiggle {
    animation: wiggle 3.2s ease-in-out infinite;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .glass-card-dark {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .gold-glow {
    box-shadow: 0 0 50px -5px rgba(245, 158, 11, 0.25);
  }
  .gold-glow-hover:hover {
    box-shadow: 0 0 60px -5px rgba(245, 158, 11, 0.45);
  }
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0f172a;
  }
  ::-webkit-scrollbar-thumb {
    background: #f59e0b;
    border-radius: 4px;
  }
`;

const ScrollReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true); 
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const ActionButton = ({ onClick, children, className = "", variant = "primary", noGloss = false, type = "button", disabled = false }) => {
  const styles = {
    primary: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black tracking-widest shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] border border-yellow-300/30", 
    secondary: "bg-slate-950 hover:bg-black text-white border border-slate-800",
    waitlist: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-950/20",
    orange: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/20",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50/50"
  };

  const showGloss = !noGloss && (variant === 'primary' || variant === 'waitlist' || variant === 'orange');

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-55 disabled:pointer-events-none flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}
    >
      {showGloss && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-[40%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-gloss" />
        </div>
      )}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </button>
  );
};

const TravelerQuiz = ({ isOpen, onClose, setView }) => {
  const [step, setStep] = useState(1); // 1, 2, 3, 'gated', 'results'
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Automatic reset state when modal opens to prevent deadlock loops
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAnswers({ q1: null, q2: null, q3: null });
      setLeadName('');
      setLeadEmail('');
      setIsTransitioning(false);
    }
  }, [isOpen]);

  const QUESTIONS = useMemo(() => [
    {
      id: 'q1',
      title: "How often do you vacation?",
      options: [
        { key: 'A', text: "Multiple times a year", value: "multiple" },
        { key: 'B', text: "Once a year", value: "once" },
        { key: 'C', text: "Every 2+ years", value: "rarely" }
      ]
    },
    {
      id: 'q2',
      title: "What's your travel style?",
      options: [
        { key: 'A', text: "Quick 2-3 night road trips", value: "short" },
        { key: 'B', text: "8-day, 7-night resort stays", value: "resort" },
        { key: 'C', text: "I want to take 8-day resort trips if I could find a better price", value: "aspirational" }
      ]
    },
    {
      id: 'q3',
      title: "How do you prefer to budget for travel?",
      options: [
        { key: 'A', text: "Pay a big chunk upfront", value: "upfront" },
        { key: 'B', text: "Set aside $135 a month", value: "monthly" }
      ]
    }
  ], []);

  // Safe boundary fallback array index queries
  const currentQuestion = useMemo(() => {
    if (typeof step === 'number' && step >= 1 && step <= QUESTIONS.length) {
      return QUESTIONS[step - 1];
    }
    return QUESTIONS[0];
  }, [step, QUESTIONS]);

  const handleOptionSelect = (option) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setAnswers(prev => ({ ...prev, [`q${step}`]: option }));

    setTimeout(() => {
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        setStep('gated');
      }
      setIsTransitioning(false);
    }, 250);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('email_address', leadEmail);
      formData.append('fields[first_name]', leadName);
      
      await fetch("https://app.kit.com/forms/9018875/subscriptions", {
        method: "POST",
        body: formData,
        mode: 'no-cors'
      });
    } catch (err) {
      console.log("Local subscription processed securely");
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('results');
    }, 1200);
  };

  const handleRewardClick = () => {
    const el = document.createElement('textarea');
    el.value = 'ROGREED';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open("https://www.hoteltonight.com", "_blank");
    }, 1000);
  };

  // Evaluate matches without consumer markup bias
  const isMatch = useMemo(() => {
    const q1Val = answers.q1?.value;
    const q2Val = answers.q2?.value;
    
    const travelsOften = q1Val === 'multiple' || q1Val === 'once';
    const prefersResort = q2Val === 'resort' || q2Val === 'aspirational';
    
    return travelsOften && prefersResort;
  }, [answers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-center items-start overflow-y-auto bg-slate-950/95 backdrop-blur-xl p-3 sm:p-6 md:p-8 py-8 sm:py-16 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[32px] sm:rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-slate-200 overflow-hidden relative my-auto animate-in zoom-in-95 duration-300">
        
        {/* Header / Brand Band */}
        <div className="flex justify-between items-center px-6 md:px-12 py-5 md:py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-amber-500 rounded-lg text-white">
              <Plane className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block leading-none">Diagnostic Vault</span>
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest mt-0.5 block font-mono">FITNESS ALGORITHM v3.0</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/60 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        {typeof step === 'number' && (
          <div className="w-full bg-slate-100 h-2 relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            <div className="absolute top-0 bottom-0 w-20 bg-white/40 skew-x-12 animate-scan" style={{ left: `${((step / 3) * 100) - 10}%` }} />
          </div>
        )}

        <div className="relative">
          {/* MULTIPLE CHOICE STEP SYSTEM */}
          {typeof step === 'number' && currentQuestion && (
            <div className="p-6 sm:p-10 md:p-14 space-y-8 animate-in fade-in-50 duration-500">
              <div className="text-center md:text-left space-y-2">
                <span className="inline-block text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-200/50 px-3 py-1 rounded-full uppercase tracking-[0.4em]">Section {step} of 3</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tighter leading-tight mt-2">
                  {currentQuestion.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2">
                {currentQuestion.options && currentQuestion.options.map((option) => {
                  const isSelected = answers[`q${step}`]?.key === option.key;
                  return (
                    <button
                      key={`${currentQuestion.id}-${option.key}`}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isTransitioning}
                      className={`group text-left p-6 rounded-2xl border-2 transition-all duration-300 active:scale-[0.98] flex items-start space-x-4 ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50/50 text-slate-950 shadow-lg shadow-amber-500/5' 
                          : 'border-slate-100 bg-slate-50/70 hover:border-amber-400 hover:bg-white text-slate-700 hover:shadow-md'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-all ${
                        isSelected 
                          ? 'bg-slate-950 text-white scale-110' 
                          : 'bg-white border border-slate-200 text-slate-400 group-hover:bg-amber-400 group-hover:text-slate-950'
                      }`}>
                        {option.key}
                      </span>
                      <span className="font-bold text-sm md:text-base pt-0.5 leading-snug">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GATED VIEW WITH COMPLETE BLUR OVERLAY */}
          {step === 'gated' && (
            <div className="relative min-h-[500px]">
              
              {/* Blurred Background Mock Result Layout */}
              <div className="p-6 sm:p-10 md:p-14 space-y-10 filter blur-xl select-none pointer-events-none opacity-40">
                <div className="bg-red-50 border-4 border-red-500/80 rounded-3xl p-6 text-center">
                  <h3 className="text-2xl font-black text-red-700 uppercase">SYSTEM DIAGNOSTIC COMPLETE</h3>
                </div>
                <div className="bg-slate-950 p-8 rounded-3xl h-44"></div>
                <div className="aspect-video w-full bg-slate-200 rounded-[32px]"></div>
              </div>

              {/* Clean Foreground Lead Gate Overlay (Friction-Free Wording) */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="bg-white rounded-[32px] sm:rounded-[40px] max-w-xl w-full p-6 sm:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.25)] border border-slate-100 text-center space-y-8 animate-in zoom-in-95 duration-500">
                  {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center space-y-6 py-12">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        <Plane className="w-6 h-6 text-amber-500 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <span className="block text-[11px] font-black uppercase tracking-[0.3em] text-amber-600 animate-pulse">CALCULATING TRAVEL PORTAL FIT</span>
                        <span className="block text-slate-400 font-bold text-xs uppercase tracking-widest">Compiling membership value index...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto border border-amber-100 shadow-inner animate-float">
                        <Gift className="w-8 h-8" />
                      </div>
                      <div className="space-y-3">
                        <span className="inline-block text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3.5 py-1 rounded-full uppercase tracking-widest">
                          🎁 Instantly Claim $25 Travel Reward
                        </span>
                        <h2 className="text-2xl sm:text-3.5xl font-black text-slate-950 uppercase tracking-tighter leading-tight">
                          Your custom travel math breakdown is ready!
                        </h2>
                        <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                          Enter your email below to instantly unlock your travel match report and claim your free $25 reward.
                        </p>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Legal Name</label>
                            <input 
                              required
                              type="text" 
                              placeholder="First & Last Name" 
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border-2 border-slate-100 focus:border-amber-400 focus:bg-white text-slate-900 font-bold text-sm transition-all" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">Confidential Delivery Email</label>
                            <input 
                              required
                              type="email" 
                              placeholder="name@domain.com" 
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border-2 border-slate-100 focus:border-amber-400 focus:bg-white text-slate-900 font-bold text-sm transition-all" 
                            />
                          </div>
                        </div>
                        
                        <ActionButton type="submit" variant="orange" className="w-full py-4 text-xs sm:text-sm uppercase font-black tracking-widest">
                          See My Results & Claim Reward
                        </ActionButton>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* UNLOCKED SYSTEM RESULTS */}
          {step === 'results' && (
            <div className="p-6 sm:p-10 md:p-14 space-y-8 md:space-y-10 animate-in fade-in duration-500">
              
              {isMatch ? (
                /* PATH A - MEMBERSHIP MATCH */
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="bg-emerald-50 border-2 sm:border-4 border-emerald-500/80 rounded-2xl sm:rounded-3xl p-6 text-center shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-2 bg-emerald-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800">FITNESS REPORT SUCCESS</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-950 tracking-tighter uppercase leading-tight mt-1">
                      🎉 PERFECT FIT MATCH!
                    </h3>
                    <p className="text-emerald-700 font-bold text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
                      Because you travel at least once a year and enjoy high-value 8-day resort stays, the wholesale math is structured perfectly to yield major net-positive savings on your vacations.
                    </p>
                  </div>

                  <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="text-center lg:text-left space-y-2 relative z-10 w-full lg:w-auto">
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">Membership Style Profile</span>
                      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase italic leading-none mt-2">
                        The Strategic Voyager
                      </h4>
                      <p className="text-slate-400 font-medium text-xs sm:text-sm lg:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed mt-1">
                        By skipping standard booking middle-men, you're positioned to lock in luxury resort inventory for just $135/month—yielding immediate four-figure pricing advantages.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-5 md:p-6 rounded-2xl sm:rounded-3xl text-slate-950 font-black text-center shrink-0 w-full sm:w-auto min-w-[220px] shadow-2xl relative z-10 border border-amber-300">
                      <span className="block text-[10px] uppercase tracking-widest opacity-85">Target Value Match</span>
                      <span className="text-2xl sm:text-3xl block mt-1 tracking-tight">HIGH-MATCH</span>
                    </div>
                  </div>

                  {/* Mathematical System Walkthrough Video */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">SECURE SYSTEM VIDEO ANALYSIS</span>
                      <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border border-green-100">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                        <span>Walkthrough Initialized</span>
                      </div>
                    </div>
                    <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed max-w-2xl">
                      Watch the quick back-office video walkthrough below to see exactly how our membership math lets you secure those major 8-day resort stays for a fraction of retail booking rates:
                    </p>
                    <div className="relative aspect-video w-full rounded-2xl md:rounded-[32px] overflow-hidden border-4 md:border-8 border-slate-950 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] bg-black gold-glow animate-in slide-in-from-bottom-6 duration-700">
                      <iframe 
                        src={DIAGNOSTIC_VIDEO_URL} 
                        className="w-full h-full"
                        loading="lazy" 
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Tailored Reward Gift Box */}
                  <div className="bg-amber-50 border-2 border-amber-400/30 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center space-x-3 text-amber-700">
                      <Gift className="w-6 h-6 animate-pulse shrink-0" />
                      <h4 className="text-lg font-black uppercase tracking-tight">Thanks for checking your match!</h4>
                    </div>
                    <p className="text-slate-600 font-bold text-xs sm:text-sm leading-relaxed">
                      To help you start saving instantly, click below to automatically copy your discount code and open the HotelTonight platform:
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-inner max-w-md">
                      <div className="flex-1 text-center sm:text-left">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HotelTonight Code</span>
                        <p className="text-2xl font-black text-slate-950 tracking-widest font-mono">ROGREED</p>
                      </div>
                      <button 
                        onClick={handleRewardClick}
                        className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black uppercase text-[10px] tracking-widest px-5 py-3.5 rounded-xl hover:from-teal-600 hover:to-emerald-500 transition-all flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-emerald-500/20 active:scale-95"
                      >
                        {copied ? <Check className="w-4 h-4 text-white" /> : <ArrowUpRight className="w-4 h-4 text-white" />}
                        <span>{copied ? 'Copied! Opening HT' : 'Use on HotelTonight'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* PATH B - MEMBERSHIP NO MATCH */
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="bg-orange-50 border-2 sm:border-4 border-orange-500/80 rounded-2xl sm:rounded-3xl p-6 text-center shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-2 bg-orange-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-800">FITNESS STATUS: UNMATCHED</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-orange-950 tracking-tighter uppercase leading-tight mt-1">
                      🛑 HONEST TAKE: NOT A FIT RIGHT NOW
                    </h3>
                    <p className="text-orange-700 font-bold text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
                      Based on your custom travel habits, we do not recommend joining our membership model at this point in time.
                    </p>
                  </div>

                  <div className="bg-slate-50 border-2 border-slate-200/60 text-slate-900 rounded-3xl p-6 sm:p-8 space-y-4">
                    <h4 className="text-xl font-black text-slate-950 uppercase tracking-tight">Our Absolute Transparency Guarantee</h4>
                    <p className="text-slate-600 font-semibold text-sm sm:text-base leading-relaxed">
                      Because you travel every 2+ years or strictly prefer quick weekend road trips, the wholesale membership subscription model would not yield enough direct savings to offset your recurring monthly commitment. 
                    </p>
                    <p className="text-slate-500 font-bold text-xs sm:text-sm leading-relaxed">
                      We believe in zero artificial pressure or hard retail up-selling. If our membership does not put real capital back in your pocket, we will never advise you to purchase it.
                    </p>
                  </div>

                  {/* Tailored Reward Gift Box */}
                  <div className="bg-amber-50 border-2 border-amber-400/30 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center space-x-3 text-amber-700">
                      <Gift className="w-6 h-6 animate-pulse shrink-0" />
                      <h4 className="text-lg font-black uppercase tracking-tight">Your Free Reward is Claimed!</h4>
                    </div>
                    <p className="text-slate-600 font-bold text-xs sm:text-sm leading-relaxed">
                      Because we want to help you save on your trips anyway, click below to automatically copy the code <span className="text-amber-600 font-black">ROGREED</span> and open HotelTonight to claim <span className="text-slate-950 font-black">$25 off</span> your next booking of $135+!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-inner max-w-md">
                      <div className="flex-1 text-center sm:text-left">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HotelTonight Code</span>
                        <p className="text-2xl font-black text-slate-950 tracking-widest font-mono">ROGREED</p>
                      </div>
                      <button 
                        onClick={handleRewardClick}
                        className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black uppercase text-[10px] tracking-widest px-5 py-3.5 rounded-xl hover:from-teal-600 hover:to-emerald-500 transition-all flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-emerald-500/20 active:scale-95"
                      >
                        {copied ? <Check className="w-4 h-4 text-white" /> : <ArrowUpRight className="w-4 h-4 text-white" />}
                        <span>{copied ? 'Copied! Opening HT' : 'Use on HotelTonight'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Reset/Done Buttons */}
              <div className="text-center space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <ActionButton 
                    variant="primary" 
                    className="w-full sm:w-auto px-10 py-5 text-sm font-black bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white shadow-lg shadow-sky-400/25"
                    onClick={() => {
                      window.open("https://t.me/+lweqGFqWXitmNGYx", "_blank");
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2 shrink-0 animate-bounce" />
                    <span>Join TPX Telegram & Ask Questions</span>
                  </ActionButton>
                  <button 
                    onClick={() => {
                      onClose();
                      setView('presentation');
                    }}
                    className="text-slate-500 hover:text-slate-950 font-black uppercase text-[10px] tracking-widest py-2 hover:underline transition-colors"
                  >
                    Explore Premium Perks
                  </button>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <button 
                    onClick={() => {
                      setStep(1);
                      setAnswers({ q1: null, q2: null, q3: null });
                    }}
                    className="text-slate-400 hover:text-slate-950 font-black uppercase text-[10px] tracking-widest py-2 transition-colors"
                  >
                    Reset Fit Scan
                  </button>
                </div>
                
                <p className="text-[11px] text-slate-400 font-bold max-w-lg mx-auto leading-relaxed">
                  💡 **Tip:** You can also find your active $25 coupon code pinned directly inside our official Telegram group chat for easy copy-pasting.
                </p>
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
  const [status, setStatus] = useState('idle'); // idle, loading, success

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('email_address', email);
      
      await fetch("https://app.kit.com/forms/9018875/subscriptions", {
        method: "POST",
        body: formData,
        mode: 'no-cors'
      });
      setTimeout(() => setStatus('success'), 1200);
    } catch (err) {
      setTimeout(() => setStatus('success'), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/70 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-8 md:p-12 relative shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors z-20">
          <X className="w-6 h-6 text-slate-400" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 border border-green-100 shadow-inner">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-3 leading-none">
              SLOT REQUESTED.
            </h3>
            <p className="text-slate-500 font-bold mb-8 text-sm leading-relaxed max-w-sm mx-auto">
              We have archived your digital timestamp. A concierge representative will transmit details shortly if a slot clears.
            </p>
            <ActionButton variant="secondary" className="w-full py-4 text-xs" onClick={onClose}>
              Dismiss Portal
            </ActionButton>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-8 shadow-inner animate-float">
              <Lock className="w-10 h-10" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tighter mb-4 leading-none">
              UNLISTED RATES <br/> ARE PROTECTED.
            </h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed text-xs sm:text-sm">
              To guarantee system integrity, private group booking options require verified member approval. Join the queue to receive real-time availability updates.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="text-left">
                 <input 
                   name="email_address" 
                   required 
                   type="email" 
                   placeholder="your@email.com" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   disabled={status === 'loading'}
                   className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 outline-none focus:border-amber-400 text-slate-900 font-bold transition-all disabled:opacity-50" 
                 />
               </div>
               <ActionButton type="submit" disabled={status === 'loading'} variant="waitlist" className="w-full py-5 text-sm tracking-wider font-black">
                 {status === 'loading' ? 'Encrypting Connection...' : 'Request Exclusive Access Invite'}
               </ActionButton>
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SAVINGS_FEED.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-3">
      {/* Dynamic Pill Container */}
      <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center space-x-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-[9px] font-black text-slate-950 border border-slate-900 shadow">TPX</div>
        </div>
        <p className="text-white text-[11px] font-bold tracking-wide">
          <span className="text-amber-400 font-black">{SAVINGS_FEED[index].user}</span> saved <span className="text-emerald-400 font-black">{SAVINGS_FEED[index].saved}</span> in <span className="text-white/90 font-black">{SAVINGS_FEED[index].location}</span>
        </p>
        <div className="w-[1px] h-3 bg-white/20" />
        <span className="text-white/40 text-[9px] uppercase font-black tracking-widest shrink-0">{SAVINGS_FEED[index].time}</span>
      </div>

      {/* Pulsing Hotspot Banner */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-full px-5 py-2.5 flex items-center space-x-2">
        <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Trending: Maldives</span>
      </div>
    </div>
  );
};

const Header = ({ setView, activeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-[28px] px-6 py-4 shadow-2xl pointer-events-auto relative">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setView('home'); setIsOpen(false); }}>
          <div className="p-2.5 bg-slate-950 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/10">
            <Plane className="w-5 h-5 text-amber-400" />
          </div>
          <span className="font-black text-slate-950 tracking-tighter text-xl uppercase">
            TRAVELPRO<span className="text-amber-500 text-2xl italic leading-none">X</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <button 
            onClick={() => setView('presentation')} 
            className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
              activeView === 'presentation' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Member Perks
          </button>
          <button 
            onClick={() => setView('home')} 
            className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
              activeView === 'home' ? 'text-amber-500' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Core Portal
          </button>
          <div className="w-[1px] h-4 bg-slate-200" />
          <button 
            onClick={() => setView('agency')} 
            className={`text-[10px] font-black uppercase tracking-widest transition-all px-4 py-2 bg-amber-50/50 hover:bg-amber-100/50 rounded-full border border-amber-200/40 ${
              activeView === 'agency' ? 'text-amber-600 bg-amber-100/50' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Promoter Hub
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <ActionButton variant="primary" noGloss className="py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest" onClick={() => setView('agency')}>
            Partner Club
          </ActionButton>
        </div>

        {/* Mobile Hamburger Controls */}
        <button className="lg:hidden p-2 text-slate-800 hover:bg-slate-50 rounded-xl transition-all" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Panel Overlay */}
        {isOpen && (
          <div className="absolute top-[90px] left-0 right-0 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto">
            <button 
              onClick={() => { setView('presentation'); setIsOpen(false); }} 
              className="text-left font-black uppercase tracking-wider text-xs py-2 text-slate-800 hover:text-amber-500"
            >
              Member Perks & Vault
            </button>
            <button 
              onClick={() => { setView('home'); setIsOpen(false); }} 
              className="text-left font-black uppercase tracking-wider text-xs py-2 text-slate-800 hover:text-amber-500"
            >
              Core Search Portal
            </button>
            <button 
              onClick={() => { setView('agency'); setIsOpen(false); }} 
              className="text-left font-black uppercase tracking-wider text-xs py-2 text-slate-800 hover:text-amber-500"
            >
              Promoter Hub
            </button>
            <hr className="border-slate-100" />
            <ActionButton variant="primary" noGloss className="py-3 px-6 rounded-xl text-[11px] uppercase tracking-wider w-full" onClick={() => { setView('agency'); setIsOpen(false); }}>
              Partner Program
            </ActionButton>
          </div>
        )}

      </div>
    </nav>
  );
};

const HomeView = ({ openWaitlist, setView }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        
        {/* Animated Visual Canvas Backdrop */}
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src={ALTERNATIVE_HERO_IMAGE} 
            className="w-full h-full object-cover animate-pulse-slow" 
            alt="Luxury Villa Panorama" 
            onError={(e) => {
              e.target.src = OFFICIAL_HERO_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-white" />
        </div>

        <div className="relative z-10 w-full max-w-6xl text-center">
          <ScrollReveal>
            <div className="mb-10 flex flex-col items-center space-y-8">
              <SavingsTicker />
              
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[13rem] font-black text-white tracking-tighter leading-[0.8] uppercase drop-shadow-[0_10px_50px_rgba(0,0,0,0.65)]">
                THE TRAVEL <br/> 
                <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)]">
                  QUIZ...
                </span>
              </h1>
              
              <p className="text-white text-base sm:text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-lg opacity-95">
                Stop paying retail brokers. Our private club members access "Unlisted" wholesale contracts locked down by verified travel networks.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-md sm:max-w-none mx-auto">
              <ActionButton variant="primary" className="w-full sm:w-auto px-12 py-6 text-base tracking-widest" onClick={() => setIsQuizOpen(true)}>
                Scan Travel Profile
              </ActionButton>
              <button 
                onClick={() => {
                  const el = document.getElementById('insights');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="group text-white font-black text-xs uppercase tracking-[0.4em] flex items-center hover:text-amber-400 transition-colors py-4 px-6 rounded-full hover:bg-white/5"
              >
                View Live Comp <MoveRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </ScrollReveal>

          {/* DYNAMIC SCALED SCANNING COMPONENT */}
          <ScrollReveal>
            <div 
              onClick={() => setIsQuizOpen(true)}
              className="max-w-4xl mx-auto bg-white/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)] border border-white overflow-hidden cursor-pointer group hover:scale-[1.01] transition-all duration-500"
            >
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                {['Hotel Diagnostic Scanner', 'Flight Route Optimizer', 'Cruise Sizer'].map((tab, idx) => (
                  <div
                    key={tab}
                    className={`flex-1 py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center transition-all ${
                      idx === 0 ? 'bg-white text-amber-600 border-b-4 border-amber-500' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-50/80 p-5 rounded-2xl text-left border border-slate-100 group-hover:bg-slate-100/50 transition-colors">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Primary Target</span>
                    <div className="flex items-center space-x-3 text-slate-500 font-bold italic text-sm">
                      <MapPin className="w-5 h-5 text-amber-500 animate-bounce" />
                      <span>Select Vacation Target Hub</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50/80 p-5 rounded-2xl text-left border border-slate-100 group-hover:bg-slate-100/50 transition-colors">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Diagnostic Profile</span>
                    <div className="flex items-center space-x-3 text-slate-500 font-bold italic text-sm">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span>Input Frequency & Budgets</span>
                    </div>
                  </div>
                  
                  <ActionButton variant="orange" className="h-full rounded-2xl cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsQuizOpen(true); }}>
                    <Search className="w-4 h-4 animate-pulse mr-2" />
                    <span>Run Unlisted Audit</span>
                  </ActionButton>

                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* RETAIL AUDIT COMPLEMENT (MODAL CONTAINER TRIGGER) */}
      <TravelerQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} setView={setView} />

      {/* MEMBER COMPARATIVE INTEL */}
      <section id="insights" className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 bg-white">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-12 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-amber-600 block mb-3">Pricing Variance Index</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.85] italic">
                STEP BEHIND THE VELVET ROPE.
              </h2>
            </div>
            <p className="text-slate-500 font-bold max-w-xs text-sm leading-relaxed">
              Public indexes reflect standard retail brokerage margins. Cleared members unlock 25% to 60% system reductions across all nodes.
            </p>
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
                  <img src={DESTINATION_ASSETS[dest.name]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={dest.name} />
                  <div className="absolute top-8 left-8">
                    <span className="px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full text-[9px] font-black text-slate-950 uppercase tracking-widest shadow-lg border border-yellow-300">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ActionButton variant="waitlist" className="w-full py-4 rounded-2xl" onClick={() => setIsQuizOpen(true)}>Verify Special Rate</ActionButton>
                  </div>
                </div>
                
                <div className="flex justify-between items-start px-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter leading-none mb-1.5">{dest.name}</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-amber-500 shrink-0" /> {dest.loc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest line-through mb-0.5">Retail: ${parseInt(dest.price) + 120}</p>
                     <p className="text-xl sm:text-2xl font-black text-amber-600 leading-none">${dest.price}/n</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* DOCUMENTED MEMBER DIARIES */}
      <section className="bg-slate-950 py-24 sm:py-36 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center">
            <div className="inline-flex items-center space-x-2.5 px-5 py-2.5 mb-8 text-[10px] font-black tracking-[0.4em] uppercase bg-white/5 text-amber-400 rounded-full border border-white/10">
              <PlayCircle className="w-4 h-4 animate-pulse" />
              <span>Real Live Walkthrough Diaries</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
              RAW MEMBER FEED. <br/> <span className="text-white/30 italic">UNCOMPENSATED PROOF.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-16">
              {[
                "Net-Wholesale Hotel Inventory",
                "Flight Consolidator Clearances",
                "Deep Cruise Access Keys",
                "Zero Retail Surcharges"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-white/90 font-bold text-xs uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>

            <div className="relative max-w-4xl mx-auto mb-16 group">
              <div className="absolute -inset-10 bg-amber-400/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
              <div className="relative aspect-video w-full rounded-[32px] sm:rounded-[48px] overflow-hidden border-[6px] sm:border-[12px] border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-[1.005]">
                <iframe 
                  src={TESTIMONIAL_VIDEO_URL} 
                  className="w-full h-full"
                  loading="lazy" 
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                  allowFullScreen
                />
              </div>
            </div>

            <ActionButton variant="primary" className="mx-auto px-12 py-5 text-base tracking-widest" onClick={() => setIsQuizOpen(true)}>
              Start Live Verification Process <MoveRight className="ml-3 w-5 h-5" />
            </ActionButton>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-24 pb-16 px-4 sm:px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-slate-950 rounded-xl">
                <Plane className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-black text-slate-950 text-2xl tracking-tighter uppercase">TRAVELPRO<span className="text-amber-500">X</span></span>
            </div>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed mb-8 text-base">
              Operating a global wholesale allocation framework. By amalgamating active group volume, we deliver direct manufacturer rates bypass commissions.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Internal Navigation</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setView('home')} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">Global Core Portal</button></li>
              <li><button onClick={() => setView('agency')} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">Promoter Network</button></li>
              <li><button onClick={() => setView('presentation')} className="text-slate-950 font-black uppercase tracking-widest text-xs hover:text-amber-600 transition-colors">VIP Benefits Vault</button></li>
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
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            © 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014
          </p>
        </div>
      </footer>
    </div>
  );
};

const AgencyView = ({ setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaved(true);

    try {
      const formData = new FormData();
      formData.append('fields[first_name]', name);
      formData.append('email_address', email);
      
      await fetch("https://app.kit.com/forms/9018899/subscriptions", {
        method: "POST",
        body: formData,
        mode: 'no-cors'
      });
    } catch (err) {
      // safe fallback
    }

    setTimeout(() => {
      setView('presentation');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
      <main className="pt-40 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-24">
            
            {/* Core Info Columns */}
            <div className="relative lg:col-span-7">
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.5em] uppercase bg-amber-100 text-amber-700 rounded-full border border-amber-200">
                <Zap className="w-3.5 h-3.5" />
                <span>Platinum Club Promoter</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-10 text-slate-950">
                GENERATE A <br/> TRAVEL <br/> <span className="text-amber-500 italic">EMPIRE.</span>
              </h1>
              
              <p className="text-lg sm:text-2xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
                Partner directly with our team as a <span className="text-slate-950 font-black">Platinum Travel Club Promoter</span>. Power your business via <span className="text-amber-600 font-black">Travorium</span>.
              </p>
              
              <div className="space-y-6 mb-12">
                 <div className="flex items-start space-x-5 bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/50 shadow-sm transition-all hover:scale-[1.01]">
                    <div className="bg-amber-50 p-4 rounded-2xl text-amber-500 shrink-0 border border-amber-100">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-slate-950 mb-1.5">Industry Rates up to 80% Off</h4>
                      <p className="text-slate-500 text-sm font-semibold leading-relaxed">Platinum members bypass consumer brokers entirely, unlocking net wholesale rates on private inventories.</p>
                    </div>
                 </div>
                 
                 {/* WEB SYSTEM BONUS ACCENT CARD */}
                 <div className="relative pt-10">
                   <div className="absolute top-0 right-4 sm:right-6 z-20">
                      <div className="relative animate-float">
                        <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 sm:border-[6px] border-white shadow-2xl overflow-hidden gold-glow">
                          <img src={ROGER_PROFILE_IMAGE} className="w-full h-full object-cover" alt="Roger Profile" />
                        </div>
                        <div className="absolute -bottom-1 right-1 bg-amber-400 p-2 rounded-xl shadow-lg border-2 border-white">
                          <Wand2 className="w-4 h-4 text-slate-950" />
                        </div>
                      </div>
                   </div>

                   <div className="bg-slate-950 p-8 sm:p-12 rounded-[40px] sm:rounded-[48px] shadow-3xl border-2 border-amber-500/10 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                      
                      <div className="relative z-10 pr-20 sm:pr-24 lg:pr-0">
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 mb-5 text-[9px] font-black tracking-[0.3em] uppercase bg-amber-400 text-slate-950 rounded-full border border-yellow-300">
                          <Award className="w-3.5 h-3.5" />
                          <span>Direct Sponsor Action Pack</span>
                        </div>
                        
                        <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none italic">
                          Bespoke Pages <br/> <span className="text-amber-400">Custom Styled.</span>
                        </h3>
                        
                        <p className="text-slate-300 font-bold text-sm sm:text-base mb-6 leading-relaxed max-w-sm">
                          As your designated pilot, <span className="text-white font-black">Roger Reed</span> will handcraft and deliver your high-converting online capture ecosystem.
                        </p>

                        <div className="grid grid-cols-1 gap-3 mb-8">
                          {[
                            "16-Year Veteran Web Architect Team",
                            "High-Conversion Custom Funnels Built For You",
                            "Direct Technical Configuration & Support"
                          ].map((feat, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10">
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px]">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border-l-4 border-amber-400">
                          <p className="text-slate-400 text-[9px] uppercase font-black tracking-widest">Estimated Value Matrix</p>
                          <p className="text-lg sm:text-2xl font-black text-white tracking-tight">
                            $1,000+ <span className="text-amber-400 line-through text-xs sm:text-sm opacity-50 ml-1">RETAIL VALUE</span> 
                            <span className="text-[9px] bg-white text-slate-950 px-2.5 py-1 rounded-full ml-3 italic shrink-0 font-bold">SPONSORED NO FEE</span>
                          </p>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>

              <button onClick={() => setView('home')} className="inline-flex items-center space-x-2 text-slate-400 font-black uppercase tracking-[0.3em] text-[9px] hover:text-slate-950 transition-colors mt-4">
                <MoveRight className="w-4 h-4 rotate-180" />
                <span>Return to Public Audit Vault</span>
              </button>
            </div>

            {/* Sticky Application Form Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-36 mt-12 lg:mt-0">
              <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[40px] border border-slate-200/85 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-xl">
                    <Users className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black mb-8 uppercase tracking-tighter text-center italic text-slate-950 leading-none">
                    PROMOTER INTAKE
                  </h3>
                  
                  {isSaved ? (
                    <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4 border border-green-100 shadow-inner animate-bounce">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter mb-2">Request Processed!</h4>
                      <p className="text-slate-400 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                        Routing session directly to the Premium Perks presentation module...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Legal Name</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="John Doe" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-14 bg-slate-50 rounded-2xl px-5 outline-none focus:ring-4 ring-amber-400/10 text-slate-900 font-bold border-2 border-slate-100 focus:border-amber-400 focus:bg-white transition-all text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 pl-1">Confidential Email</label>
                        <input 
                          required 
                          type="email" 
                          placeholder="partner@yourbrand.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-14 bg-slate-50 rounded-2xl px-5 outline-none focus:ring-4 ring-amber-400/10 text-slate-900 font-bold border-2 border-slate-100 focus:border-amber-400 focus:bg-white transition-all text-sm" 
                        />
                      </div>
                      <ActionButton type="submit" variant="secondary" className="w-full py-5 text-sm tracking-wider font-black">
                        Submit Secure Application
                      </ActionButton>
                      
                      <div className="text-center space-y-4 pt-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                          Platinum Travorium Protocol Verification • travelprox.com
                        </p>
                        <div className="flex items-center justify-center space-x-1.5 text-emerald-600">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Confidential Sponsor Queue</span>
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
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014
        </p>
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
          
          {/* TOP FLASH ACCENT */}
          <div className="max-w-2xl mx-auto px-4 mb-8">
            <div className="bg-amber-400/10 border border-amber-400/20 py-2 px-5 rounded-full inline-flex items-center space-x-2.5 shadow-lg">
              <Gift className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300">
                Platinum Exclusive: Lock in Membership this {currentMonth} for a Vegas Escape Voucher
              </span>
            </div>
          </div>

          <div className="px-4 mb-12 max-w-4xl mx-auto space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">
              INSIDE THE <span className="text-amber-400 drop-shadow-[0_4px_15px_rgba(245,158,11,0.2)]">VAULT.</span>
            </h1>
            <p className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto">
              Confidential wholesale rates, premium rewards keys, and luxury portals revealed below.
            </p>
          </div>

          {/* HIGH-RES IMMERSIVE EMBEDDED SYSTEM VIDEO */}
          <div className="w-full relative group px-4 sm:px-6 mb-16">
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="max-w-5xl mx-auto w-full">
                <div className="relative aspect-video w-full rounded-2xl sm:rounded-[40px] overflow-hidden border-[6px] sm:border-[12px] border-white/5 shadow-3xl bg-black">
                  <iframe 
                    src={PERKS_VIDEO_URL} 
                    className="w-full h-full"
                    loading="lazy" 
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                    allowFullScreen
                  />
                </div>
            </div>
          </div>

          {/* DYNAMIC SPONSOR REDIRECT PANEL */}
          <div className="px-4 max-w-3xl mx-auto">
            <a 
              href={TRAVORIUM_ENROLL_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center bg-white text-slate-950 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] hover:scale-[1.01] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] w-full border border-white/80"
            >
              <div className="absolute inset-0 rounded-[32px] sm:rounded-[48px] bg-gradient-to-tr from-amber-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 relative z-10">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">Travorium Platinum Enrollment</span>
                  <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 block">Join Team & Initialize Account</span>
                </div>
                <div className="bg-slate-950 p-3 sm:p-4 rounded-full text-amber-400 group-hover:rotate-45 transition-transform shrink-0 shadow-lg shadow-amber-500/10">
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </a>
            
            <div className="mt-10 flex justify-center items-center space-x-8 opacity-50">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Wholesale Contracts Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Direct Placement Priority</span>
                </div>
            </div>

            <button onClick={() => setView('home')} className="mt-16 text-white/30 hover:text-white font-black uppercase tracking-[0.4em] text-[9px] transition-colors">
              Return to Public Portal
            </button>
          </div>

        </ScrollReveal>
      </main>

      <footer className="py-16 border-t border-white/5 text-center px-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest text-center">
            © 2026 TRAVEL PRO X & CALLISTA DIGITAL • EST. 2014
          </p>
      </footer>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('home'); 
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Dynamic Scarcity Module
  const { spotsLeft } = useMemo(() => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const remaining = Math.max(100 - (dayOfMonth - 1) * 3, 7); 
    return { spotsLeft: remaining };
  }, []);

  // Script Loader for Kit Form System Integration
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://f.convertkit.com/ckjs/ck.5.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (script && document.body.contains(script)) document.body.removeChild(script); }
  }, []);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'auto' }); 
  }, [view]);

  return (
    <div className="font-sans selection:bg-amber-400 selection:text-slate-950 text-slate-950 bg-slate-50 antialiased min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Header Nodes */}
      <Header setView={setView} activeView={view} />
      
      {/* Routing Nodes */}
      {view === 'home' && (
        <HomeView 
          setView={setView}
          openWaitlist={() => setIsWaitlistOpen(true)}
        />
      )}

      {view === 'agency' && (
        <AgencyView setView={setView} />
      )}

      {view === 'presentation' && (
        <PresentationView setView={setView} />
      )}

      {/* Shared Modals */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Sticky High-Urgency Floating Hotspot */}
      <div 
        onClick={() => setIsWaitlistOpen(true)}
        className="fixed bottom-6 right-6 z-[120] bg-white border border-slate-200/60 p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center space-x-1 cursor-pointer hover:scale-105 active:scale-95 transition-all group animate-wiggle"
      >
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
