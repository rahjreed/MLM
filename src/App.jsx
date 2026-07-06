import React, { useState, useEffect, useRef, useMemo } from 'react';

const BRAND_LOGO_URL = "https://images.travelprox.com/notimetoshare/notimetosharelogo.jpg";
const HERO_BACKGROUND_IMAGE = "https://travorium.com/resort-on-top-2.jpg";

// Video Asset Links
const ORLANDO_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/1f0a8468-ea19-477a-8d6c-c3dcaf68df9d";
const WELCOME_TRAVORIUM_URL = "https://player.mediadelivery.net/embed/587199/1d1b9589-cdc8-4408-a563-750df53f0e67";
const HOW_IT_WORKS_URL = "https://player.mediadelivery.net/embed/587199/599f364c-36e1-4607-9993-b57e0c5906d1";
const HOW_TO_SIGN_UP_URL = "https://player.mediadelivery.net/embed/587199/eb1faa2b-68e5-4735-9fcb-978afd03f6a1";

const TRAVORIUM_ENROLL_URL = "https://travorium.com/enroll.php?sponsor=376362";

// Audited hotel data tables
const COMPARATIVE_DATA = {
  "Cancun": {
    name: "Secrets The Vine Cancun - All Inclusive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    roomType: "Deluxe Ocean View Double (All-Inclusive)",
    dates: "Oct 12 - Oct 19 (7 Nights, 2 Adults)",
    retailPrice: 3420,
    wholesalePrice: 1680,
    retailSource: "Expedia.com",
    savingsPct: "51%",
    perks: ["Free Premium Drinks", "No Extra Resort Fees", "All Meals Included", "Private Balcony with Beach View"]
  },
  "Florida": {
    name: "1 Hotel South Beach, Miami",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    roomType: "King Bed Retreat Studio",
    dates: "Nov 04 - Nov 11 (7 Nights, 2 Adults)",
    retailPrice: 5120,
    wholesalePrice: 2490,
    retailSource: "Booking.com",
    savingsPct: "51%",
    perks: ["Perfect Ocean View", "Free Welcome Drink", "Valet Parking Discount", "Rooftop Pool Access"]
  },
  "New York": {
    name: "The Plaza Hotel, Fifth Avenue",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    roomType: "Plaza King Luxury Suite",
    dates: "Dec 08 - Dec 13 (5 Nights, 2 Adults)",
    retailPrice: 6200,
    wholesalePrice: 3100,
    retailSource: "Hotels.com",
    savingsPct: "50%",
    perks: ["Personal Butler Service", "Free Hot Breakfast", "Free Spa Cash Credit", "Late Checkout Included"]
  },
  "Las Vegas": {
    name: "The Venetian Resort Las Vegas",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    roomType: "Luxury King Suite (Strip View)",
    dates: "Sep 18 - Sep 23 (5 Nights, 2 Adults)",
    retailPrice: 1980,
    wholesalePrice: 820,
    retailSource: "Priceline.com",
    savingsPct: "58%",
    perks: ["No Resort Fees", "Free Room Upgrade If Available", "Free Valet Parking", "$100 Free Spa Cash"]
  }
};

const SAVINGS_FEED = [
  { user: "Sarah J.", location: "Miami", saved: "$420", time: "1m ago" },
  { user: "Michael R.", location: "Cancun", saved: "$890", time: "3m ago" },
  { user: "Elena W.", location: "NYC", saved: "$310", time: "5m ago" },
  { user: "David K.", location: "Vegas", saved: "$1,200", time: "8m ago" },
  { user: "Sophia L.", location: "Paris", saved: "$540", time: "12m ago" },
  { user: "Marcus T.", location: "Dubai", saved: "$2,100", time: "15m ago" },
  { user: "Julian M.", location: "Bali", saved: "$760", time: "18m ago" },
  { user: "Aria V.", location: "London", saved: "$480", time: "21m ago" }
];

const customStyles = `
  @keyframes gloss-sweep {
    0% { transform: translateX(-150%) skewX(-25deg); }
    30% { transform: translateX(150%) skewX(-25deg); }
    100% { transform: translateX(150%) skewX(-25deg); }
  }
  .animate-gloss {
    animation: gloss-sweep 4.5s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(0.5deg); }
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
  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 47, 108, 0.08);
    box-shadow: 0 10px 30px -5px rgba(0, 47, 108, 0.08);
  }
  .glow-blue {
    box-shadow: 0 0 40px -5px rgba(0, 47, 108, 0.12);
  }
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 35s linear infinite;
  }
`;

const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    flame: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    shieldCheck: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    alertTriangle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    moveRight: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    alertCircle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    mapPin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    checkCircle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrowUpRight: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    ),
    chevronRight: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    copy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    plane: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M21 16V8a2 2 0 0 0-2-2h-3.5l-4-4H9.5l1.5 4H7.5L5.5 4H3.5l1 4h-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2l-1 4h2l2-2h3.5l-1.5 4h2l4-4H19a2 2 0 0 0 2-2z" />
      </svg>
    ),
    play: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    )
  };
  return icons[name] || null;
};

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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const ActionButton = ({ onClick, children, className = "", variant = "primary", noGloss = false, type = "button", disabled = false }) => {
  const styles = {
    primary: "bg-gradient-to-r from-[#FFC000] via-[#FFD043] to-[#FFB200] hover:from-[#FFB200] hover:to-[#FFA000] text-[#002F6C] font-black tracking-wider shadow-[0_4px_25px_rgba(255,192,0,0.35)] border border-[#FFE28C]/30", 
    secondary: "bg-[#002F6C] hover:bg-[#001D45] text-white shadow-lg shadow-[#002f6c]/15 border border-[#002F6C]/10",
    accent: "bg-[#FF5A5F] hover:bg-[#E04B50] text-white shadow-lg shadow-[#FF5A5F]/20",
    outline: "bg-transparent border-2 border-[#002F6C] text-[#002F6C] hover:bg-[#002F6C]/5 hover:text-[#001D45]"
  };

  const showGloss = !noGloss && (variant === 'primary' || variant === 'accent');

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2 ${styles[variant]} ${className}`}
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

const TravelerQuiz = ({ isOpen, onClose, setVideoModal }) => {
  const [step, setStep] = useState(1); // 1, 2, 3, 4, 'gated', 'results'
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null, q4: null });
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeVideoStep, setActiveVideoStep] = useState(1); // 1, 2, or 3 sequence stepper

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setShowMoreInfo(false);
      setAnswers({ q1: null, q2: null, q3: null, q4: null });
      setLeadName('');
      setLeadEmail('');
      setIsTransitioning(false);
      setActiveVideoStep(1); // Reset step sequence
    }
  }, [isOpen]);

  const QUESTIONS = useMemo(() => [
    {
      id: 'q1',
      title: "Who do you usually go on vacation with?",
      subtitle: "Travel Group (Helps us find the right room sizes)",
      options: [
        { key: 'A', text: "Just myself, or as a couple.", score: 1 },
        { key: 'B', text: "With kids, parents, or grandparents.", score: 3 },
        { key: 'C', text: "With a group of friends or cousins.", score: 2 }
      ]
    },
    {
      id: 'q2',
      title: "What is your must-have standard for a hotel?",
      subtitle: "Hotel Quality (Helps us match your style)",
      options: [
        { key: 'A', text: "Just a clean, cheap bed. Basic road motels are totally fine.", score: 0, isQualifyOut: true },
        { key: 'B', text: "Normal middle-tier hotels or standard house rentals.", score: 1 },
        { key: 'C', text: "Elite 4- and 5-star luxury resorts with pools and great views.", score: 3 }
      ]
    },
    {
      id: 'q3',
      title: "How many total nights does your house spend on vacation each year?",
      subtitle: "Yearly Travel Volume (Helps calculate bulk discounts)",
      options: [
        { key: 'A', text: "1 to 4 nights (Just quick weekend trips).", score: 0 },
        { key: 'B', text: "5 to 7 nights (About one solid week-long vacation).", score: 2 },
        { key: 'C', text: "8 to 14 nights (One big trip plus a few small getaways).", score: 3 },
        { key: 'D', text: "15 nights or more (We are on the road very often).", score: 4 }
      ]
    },
    {
      id: 'q4',
      title: "On a normal 1-week trip, how much do you spend on rooms alone?",
      subtitle: "Current Lodging Budget (Helps map markup relief)",
      options: [
        { key: 'A', text: "Less than $1,000", score: 0 },
        { key: 'B', text: "$1,000 to $2,500", score: 1 },
        { key: 'C', text: "$2,500 to $5,000", score: 3 },
        { key: 'D', text: "Over $5,000", score: 4 }
      ]
    }
  ], []);

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
      if (step < 4) {
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

  const handleRewardCopyAction = () => {
    const el = document.createElement('textarea');
    el.value = 'ROGREED';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open("https://t.me/+lweqGFqWXitmNGYx", "_blank");
    }, 1000);
  };

  const evaluationResult = useMemo(() => {
    const scoreQ1 = answers.q1?.score || 0;
    const scoreQ2 = answers.q2?.score || 0;
    const scoreQ3 = answers.q3?.score || 0;
    const scoreQ4 = answers.q4?.score || 0;

    const totalPoints = scoreQ1 + scoreQ2 + scoreQ3 + scoreQ4;
    const isInstantQualifyOut = answers.q2?.isQualifyOut === true;

    let path = 'A'; 
    if (isInstantQualifyOut) {
      path = 'A';
    } else if (totalPoints >= 8) {
      path = 'B'; 
    } else if (totalPoints >= 5 && totalPoints <= 7) {
      path = 'C'; 
    }

    return { totalPoints, path, isInstantQualifyOut };
  }, [answers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-center items-start overflow-y-auto bg-slate-900/60 backdrop-blur-md p-3 sm:p-6 md:p-8 py-8 sm:py-16 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative my-auto animate-in zoom-in-95 duration-300">
        
        {/* Header Band */}
        <div className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-slate-100 bg-[#EBF3FF]/60">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-1.5 bg-[#002F6C] rounded-lg text-white">
              <Icon name="shieldCheck" className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#002F6C]/80 block leading-none">Eligibility Check</span>
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest mt-0.5 block font-mono">RATE MATCHING SYSTEM</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/60 rounded-full transition-colors">
            <Icon name="x" className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Progress bar */}
        {typeof step === 'number' && (
          <div className="w-full bg-slate-100 h-2 relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#002F6C] to-[#0052C2] transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
            <div className="absolute top-0 bottom-0 w-20 bg-white/40 skew-x-12 animate-scan" style={{ left: `${((step / 4) * 100) - 10}%` }} />
          </div>
        )}

        <div className="relative text-left font-sans text-slate-800">
          {/* Multiple choice section */}
          {typeof step === 'number' && currentQuestion && (
            <div className="p-6 sm:p-10 md:p-12 space-y-8 animate-in fade-in duration-300">
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black text-[#002F6C] bg-[#EBF3FF] border border-[#002F6C]/20 px-3 py-1 rounded-full uppercase tracking-[0.3em]">Section {step} of 4</span>
                <span className="block text-[11px] font-bold text-[#002F6C]/70 uppercase tracking-widest mt-1">{currentQuestion.subtitle}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mt-1">
                  {currentQuestion.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[`q${step}`]?.key === option.key;
                  return (
                    <button
                      key={`${currentQuestion.id}-${option.key}`}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isTransitioning}
                      className={`group text-left p-5 rounded-2xl border-2 transition-all duration-300 active:scale-[0.99] flex items-start space-x-4 ${
                        isSelected 
                          ? 'border-[#002F6C] bg-[#EBF3FF]/40 text-slate-900 shadow-sm' 
                          : 'border-slate-100 bg-slate-50/70 hover:border-[#002F6C]/30 hover:bg-white text-slate-700 hover:shadow-sm'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-all ${
                        isSelected 
                          ? 'bg-[#002F6C] text-white' 
                          : 'bg-white border border-slate-200 text-slate-400 group-hover:bg-[#002F6C] group-hover:text-white'
                      }`}>
                        {option.key}
                      </span>
                      <span className="font-bold text-sm md:text-base leading-snug">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gated Lead Capture layout */}
          {step === 'gated' && (
            <div className="relative min-h-[450px]">
              <div className="p-8 space-y-8 filter blur-lg select-none pointer-events-none opacity-20">
                <div className="bg-red-50 border-4 border-red-500/80 rounded-3xl p-6 text-center">
                  <h3 className="text-2xl font-black text-red-700">PROFILE CHECK SYSTEM DONE</h3>
                </div>
                <div className="bg-slate-950 p-8 rounded-3xl h-44"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-6">
                  {isSubmitting ? (
                    <div className="flex flex-col items-center justify-center space-y-6 py-12">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-[#002F6C] border-t-transparent rounded-full animate-spin" />
                        <Icon name="plane" className="w-6 h-6 text-[#002F6C] absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#002F6C] animate-pulse">GENERATING WHOLESALE CONTRACT TOKEN</span>
                        <span className="block text-slate-400 font-bold text-xs uppercase tracking-widest">Cross-referencing active rates databases...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-[#EBF3FF] rounded-2xl flex items-center justify-center text-[#002F6C] mx-auto border border-[#002F6C]/10">
                        <Icon name="gift" className="w-7 h-7" />
                      </div>
                      <div className="space-y-2">
                        <span className="inline-block text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
                          🎁 Guaranteed $25 Reward Unlocked
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                          See Your Rate Matching Score
                        </h3>
                        <p className="text-slate-500 font-medium text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                          Enter your details below to calculate your customized wholesale savings score and claim your $25 HotelTonight reward voucher code.
                        </p>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-3 max-w-md mx-auto text-left">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-[#002F6C] tracking-wider mb-1">First & Last Name</label>
                          <input 
                            type="text" 
                            required 
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            placeholder="John Doe" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002F6C] font-semibold text-sm bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-[#002F6C] tracking-wider mb-1">Primary Email Address</label>
                          <input 
                            type="email" 
                            required 
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            placeholder="john@example.com" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002F6C] font-semibold text-sm bg-slate-50"
                          />
                        </div>
                        <ActionButton type="submit" variant="primary" className="w-full py-3.5 text-xs mt-2 text-[#002F6C]">
                          <span>Show Me My Score & $25 Gift</span>
                          <Icon name="arrowUpRight" className="w-4 h-4" />
                        </ActionButton>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quiz results layouts */}
          {step === 'results' && (
            <div className="p-6 sm:p-10 md:p-12 space-y-6">
              {evaluationResult.path === 'A' ? (
                /* Celebration Denial State (They Still Won!) */
                <div className="space-y-6 max-w-lg mx-auto text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-200 shadow-md animate-bounce">
                    <Icon name="gift" className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600 block">🎉 GOOD NEWS — YOU STILL WON!</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">Your $25 Reward Is Ready</h3>
                    <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                      Your answers show you don't travel quite enough yet to need our full wholesale club rates. But don't worry! As a thank you for your time, we are still giving you a free $25 HotelTonight gift voucher!
                    </p>
                  </div>

                  {/* Redesigned Prominent Voucher Claim Box */}
                  <div className="bg-gradient-to-br from-[#EBF3FF] via-[#F3F8FF] to-emerald-50/40 border-2 border-emerald-400 rounded-3xl p-6 text-left space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-xl" />
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-black uppercase text-[#002F6C] block leading-none">FREE REWARD COMPLETED</span>
                        <span className="text-sm font-black text-slate-800">HotelTonight $25 Voucher</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-black animate-pulse">ACTIVE</span>
                    </div>
                    
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      Copy the custom voucher below and apply it inside your booking settings for an instant $25 credit on your next trip!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <div className="bg-white border-2 border-slate-200 px-4 py-3 rounded-2xl font-mono text-base font-black text-slate-800 tracking-wider flex-grow flex items-center justify-between">
                        <span>ROGREED</span>
                        <button onClick={handleRewardCopyAction} className="text-slate-400 hover:text-[#002F6C] transition-colors">
                          {copied ? <Icon name="check" className="w-5 h-5 text-emerald-500" /> : <Icon name="copy" className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      <button 
                        onClick={handleRewardCopyAction} 
                        className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs uppercase tracking-widest px-6 py-4 rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center justify-center space-x-2 shrink-0 border border-emerald-400/20"
                      >
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gloss" />
                        </div>
                        <span className="relative z-10 flex items-center space-x-1.5">
                          <span>{copied ? "Copied!" : "Claim My $25 Gift"}</span>
                          <Icon name="arrowUpRight" className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <button onClick={onClose} className="text-xs font-bold text-slate-400 hover:text-slate-600 underline block mx-auto pt-2">
                    Close Profile Session
                  </button>
                </div>
              ) : (
                /* Verified Success State (Match Path) */
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-md">
                      <Icon name="checkCircle" className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#002F6C] block">SYSTEM VERIFIED - 100% ACCESS APPROVED</span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Direct Wholesaler Passport Active</h3>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                    <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed text-center">
                      Welcome, <strong className="text-slate-900">{leadName}</strong>! Check out our direct validation videos below in order, using our **Step-by-Step guide**.
                    </p>

                    {/* Step wizard nav indicator */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      {[
                        { num: 1, label: "Step 1: Welcome" },
                        { num: 2, label: "Step 2: Sourcing" },
                        { num: 3, label: "Step 3: Signup Walkthrough" }
                      ].map((stepObj) => (
                        <button
                          key={stepObj.num}
                          type="button"
                          onClick={() => setActiveVideoStep(stepObj.num)}
                          className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider pb-1 transition-all ${
                            activeVideoStep === stepObj.num
                              ? "border-b-2 border-[#002F6C] text-[#002F6C]"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {stepObj.label}
                        </button>
                      ))}
                    </div>

                    {/* Single Frame wrapper to completely bypass multiple overlay playback constraints */}
                    <div className="space-y-3">
                      
                      {activeVideoStep === 1 && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <span className="text-[10px] font-black text-[#002F6C] uppercase tracking-wider block">Video 1: Welcome to Travorium</span>
                          <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-950 relative shadow-sm">
                            <iframe 
                              src={WELCOME_TRAVORIUM_URL} 
                              className="w-full h-full absolute inset-0 border-0"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => setActiveVideoStep(2)}
                              className="bg-[#002F6C] hover:bg-[#001D45] text-white text-[11px] font-black uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center space-x-1"
                            >
                              <span>Next Video: How It Works</span>
                              <Icon name="moveRight" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {activeVideoStep === 2 && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <span className="text-[10px] font-black text-[#002F6C] uppercase tracking-wider block">Video 2: How Sourcing Works</span>
                          <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-950 relative shadow-sm">
                            <iframe 
                              src={HOW_IT_WORKS_URL} 
                              className="w-full h-full absolute inset-0 border-0"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setActiveVideoStep(1)}
                              className="text-slate-500 hover:text-slate-700 text-[11px] font-black uppercase tracking-wider py-2"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveVideoStep(3)}
                              className="bg-[#002F6C] hover:bg-[#001D45] text-white text-[11px] font-black uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center space-x-1"
                            >
                              <span>Next Video: How To Join</span>
                              <Icon name="moveRight" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {activeVideoStep === 3 && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <span className="text-[10px] font-black text-[#002F6C] uppercase tracking-wider block">Video 3: Walkthrough On Joining</span>
                          <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-950 relative shadow-sm">
                            <iframe 
                              src={HOW_TO_SIGN_UP_URL} 
                              className="w-full h-full absolute inset-0 border-0"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            />
                          </div>
                          <div className="flex justify-start">
                            <button
                              type="button"
                              onClick={() => setActiveVideoStep(2)}
                              className="text-slate-500 hover:text-slate-700 text-[11px] font-black uppercase tracking-wider py-2"
                            >
                              Back to Step 2
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Action Split paths configured exactly to your specifications */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-1 font-sans">
                    <a 
                      href={TRAVORIUM_ENROLL_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-grow bg-[#002F6C] hover:bg-[#001D45] text-white text-center font-black py-4 px-5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all active:scale-95"
                    >
                      <span>Complete Registration</span>
                      <Icon name="arrowUpRight" className="w-4 h-4" />
                    </a>
                    
                    <button 
                      onClick={handleRewardCopyAction}
                      className="flex-grow bg-[#FFC000] hover:bg-[#FFB200] text-[#002F6C] font-black text-xs py-4 px-5 rounded-xl transition-all border border-[#002F6C]/10 flex items-center justify-center space-x-1.5 shadow-md animate-pulse"
                    >
                      <Icon name="gift" className="w-4 h-4 shrink-0" />
                      <span>Join My Telegram Group and Claim $25 Gift</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("Cancun");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: "" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = customStyles;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  // Scroll listener to activate minimized header transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeCompare = useMemo(() => {
    return COMPARATIVE_DATA[selectedDestination];
  }, [selectedDestination]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#FFC000] selection:text-[#002F6C] antialiased overflow-x-hidden">
      
      {/* Brand Nav Header matching the "No Time To Share" Blue & Gold Logo */}
      {}
      <nav className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#001D45]/95 backdrop-blur-md py-2 shadow-lg' 
          : 'bg-[#002F6C] py-4 shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`}>
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src={BRAND_LOGO_URL} 
                alt="No Time To Share Logo" 
                className={`transition-all duration-300 object-cover border border-white/20 shadow-md ${scrolled ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-xl'}`}
                onError={(e) => { e.currentTarget.src = HERO_BACKGROUND_IMAGE; }}
              />
              <div className="flex flex-col text-left">
                <span className={`font-black tracking-wider text-white transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm'}`}>NO TIME TO SHARE</span>
                <span className={`font-black uppercase tracking-[0.3em] text-[#FFE28C] leading-none mt-0.5 transition-all duration-300 ${scrolled ? 'text-[8px]' : 'text-[9px]'}`}>Wholesale Travel Vault</span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#rates-mismatch" className="text-xs font-black uppercase text-white/95 hover:text-[#FFC000] tracking-wider transition-colors">Market Surcharges</a>
              <a href="#diagnostic-portal" className="text-xs font-black uppercase text-[#FFC000] tracking-wider transition-colors font-semibold bg-white/10 px-3.5 py-1.5 rounded-full">Take Eligibility Scan</a>
              <a href="#private-directory" className="text-xs font-black uppercase text-white/95 hover:text-[#FFC000] tracking-wider transition-colors">Direct Sourcing</a>
              <a href="#comparisons" className="text-xs font-black uppercase text-white/95 hover:text-[#FFC000] tracking-wider transition-colors">Audited Comparisons</a>
            </div>

            {/* Main Action Call */}
            <div className="hidden md:block">
              <ActionButton 
                onClick={() => setQuizOpen(true)}
                variant="primary" 
                className={`transition-all duration-300 text-xs rounded-xl text-[#002F6C] ${scrolled ? 'px-4 py-2' : 'px-6 py-2.5'}`}
              >
                <span>See If You Qualify</span>
                <Icon name="zap" className="w-3.5 h-3.5 shrink-0" />
              </ActionButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2 text-white hover:bg-white/10 rounded-lg focus:outline-none"
              >
                <Icon name="menu" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-[#001D45] border-b border-white/10 space-y-3 animate-in slide-in-from-top-4 duration-200 text-left">
            <a href="#rates-mismatch" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-white hover:text-yellow-200">Market Surcharges</a>
            <a href="#diagnostic-portal" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-white hover:text-yellow-200">Eligibility Scan</a>
            <a href="#private-directory" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-white hover:text-yellow-200">Direct Sourcing</a>
            <a href="#comparisons" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wider text-white hover:text-yellow-200">Audited Comparisons</a>
            <ActionButton 
              onClick={() => { setQuizOpen(true); setMobileMenuOpen(false); }}
              variant="primary" 
              className="w-full py-3 text-xs mt-4 text-[#002F6C]"
            >
              <span>Take the 1-Minute Quiz</span>
            </ActionButton>
          </div>
        )}
      </nav>

      {/* Hero Section: Sourcing & Pricing Leak Exposure */}
      {}
      <section id="rates-mismatch" className="relative py-20 md:py-28 bg-[#002F6C] overflow-hidden border-b border-slate-100">
        {/* Underlay textured background image */}
        <div className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none z-0" style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }} />
        {/* Soft, deep Royal Blue overlay for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#002F6C] via-[#001D45] to-[#003C8A] opacity-90 z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
                <Icon name="info" className="w-4 h-4 text-[#FFC000]" />
                <span className="text-[10px] sm:text-xs font-black text-[#FFE28C] tracking-widest uppercase font-mono font-bold">HIGH COST OF RETAIL TRAVEL</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]">
                  Are You Paying Double For Vacations <br />
                  <span className="bg-gradient-to-r from-[#FFC000] via-[#FFE28C] to-white bg-clip-text text-transparent">Without Realizing It?</span>
                </h1>
              </div>

              {/* Elegant Inline Orlando Video proof right after headline */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xl relative overflow-hidden group text-left my-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#EBF3FF] rounded-full filter blur-xl" />
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[10px] font-black text-[#002F6C] tracking-widest font-mono uppercase">Direct Proof: Orlando Trip</span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-black uppercase tracking-wider">Verified Stay</span>
                </div>
                <div className="space-y-3 pt-3">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-slate-950 border border-slate-200">
                    <iframe 
                      src={ORLANDO_VIDEO_URL} 
                      className="w-full h-full absolute inset-0 border-0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                  </div>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    Watch how we paid <strong className="text-[#002F6C]">just over $300</strong> for an 8-day stay in a massive 1,300 sq. ft. resort villa!
                  </p>
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base md:text-lg font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Most people pay twice as much for the exact same hotel rooms, suites, and resorts. We use a private member travel marketplace that's unavailable on public booking sites. This lets you skip normal markups and get direct, real prices.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ActionButton 
                  onClick={() => {
                    const el = document.getElementById("diagnostic-portal");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="primary" 
                  className="w-full sm:w-auto text-xs px-8 py-4"
                >
                  <span>See How We Do It</span>
                  <Icon name="moveRight" className="w-4 h-4 shrink-0 text-[#002F6C]" />
                </ActionButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl relative overflow-hidden group text-left">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#EBF3FF] rounded-full filter blur-xl" />
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-[10px] font-black text-[#002F6C] tracking-widest font-mono uppercase">Private Sourcing</span>
                  <Icon name="lock" className="w-5 h-5 text-[#002F6C]" />
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                    Standard sites are legally forced to hide low prices from the public. Our private system bypasses these rules entirely, letting you book standard resort suites at direct wholesale cost.
                  </p>

                  <div className="p-4 bg-[#EBF3FF] rounded-xl border border-[#002F6C]/10 text-left space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#002F6C] block leading-none">Market Legitimacy File</span>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      We connect your search parameters directly into real-time vacation inventories with no extra retail markups.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ticker integration within the evaluation scanner panel */}
      {}
      <section id="diagnostic-portal" className="py-20 bg-[#F5F7FA] relative z-10 overflow-hidden border-b border-slate-150">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EBF3FF] rounded-full filter blur-[120px] pointer-events-none" />
        
        {/* Real-time social proof ticker feed placed cleanly in the middle of the evaluation section */}
        <div className="max-w-7xl mx-auto mb-12 relative z-10">
          <div className="bg-white border-y border-slate-150 py-4 overflow-hidden relative shadow-sm rounded-3xl max-w-6xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex whitespace-nowrap animate-marquee">
              {[...SAVINGS_FEED, ...SAVINGS_FEED].map((item, idx) => (
                <div 
                  key={`marquee-item-${idx}`} 
                  className="inline-flex items-center space-x-3 mx-8 bg-[#F5F7FA] border border-slate-100 px-4 py-2 rounded-xl"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">{item.user}</span>
                  <span className="text-xs text-slate-400">saved</span>
                  <span className="text-xs font-black text-emerald-600">{item.saved}</span>
                  <span className="text-xs text-slate-400">in</span>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{item.location}</span>
                  <span className="text-[9px] text-slate-400 font-mono italic">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#EBF3FF] border border-[#002F6C]/10 px-4 py-2 rounded-full mx-auto shadow-sm">
              <Icon name="zap" className="w-4 h-4 text-[#002F6C] animate-bounce" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#002F6C] font-mono">PORTAL REGISTRATION ENTRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-5xl font-black uppercase tracking-tighter text-[#002F6C] leading-none">
              Find out how much money you're wasting on travel
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-semibold">
              See if you're overpaying for travel and unlock a $25 travel credit if you qualify. Take our short check to find out.
            </p>
          </div>

          {/* Sourcing Parameters overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left font-sans">
            <div className="p-4 bg-white border border-slate-150 rounded-2xl space-y-1 shadow-sm">
              <span className="block text-[#002F6C] font-black text-sm tracking-widest font-mono">01. PROFILE</span>
              <span className="block text-slate-800 text-xs font-bold uppercase leading-tight">Verify Volume Compatibility</span>
              <p className="text-[10px] text-slate-500 leading-normal">Ensures your vacation style fits direct private marketplace connections.</p>
            </div>
            <div className="p-4 bg-white border border-slate-150 rounded-2xl space-y-1 shadow-sm">
              <span className="block text-[#002F6C] font-black text-sm tracking-widest font-mono">02. REWARD</span>
              <span className="block text-slate-800 text-xs font-bold uppercase leading-tight">Secure $25 Code</span>
              <p className="text-[10px] text-slate-500 leading-normal">Every travel profile checked receives a guaranteed HotelTonight voucher code on request.</p>
            </div>
            <div className="p-4 bg-white border border-slate-150 rounded-2xl space-y-1 shadow-sm">
              <span className="block text-[#002F6C] font-black text-sm tracking-widest font-mono">03. GATEWAY</span>
              <span className="block text-slate-800 text-xs font-bold uppercase leading-tight">Sponsor Registration</span>
              <p className="text-[10px] text-slate-500 leading-normal">Direct fast-track registration route unlocked with sponsor credentials.</p>
            </div>
          </div>

          <div>
            <ActionButton 
              onClick={() => setQuizOpen(true)}
              variant="primary" 
              className="mx-auto text-xs px-12 py-5 font-bold uppercase tracking-wider shadow-lg text-[#002F6C]"
            >
              <span>Start the 1-Minute Quiz</span>
              <Icon name="zap" className="w-4 h-4 shrink-0" />
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Sourcing Features Details */}
      <section id="private-directory" className="py-20 md:py-32 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal className="glow-blue">
                <div className="bg-white rounded-3xl p-6 border border-[#002F6C]/10 shadow-xl relative overflow-hidden text-left">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-[#EBF3FF] rounded-full filter blur-xl" />
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-[10px] font-black text-[#002F6C] tracking-widest font-mono uppercase">Direct Partner API</span>
                    <Icon name="lock" className="w-5 h-5 text-[#002F6C] shrink-0" />
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 flex items-center justify-between rounded-xl">
                      <div>
                        <span className="text-[9px] font-black uppercase text-slate-400 block leading-none">Access Node Connection</span>
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1 block">STABLE & SECURED</span>
                      </div>
                      <Icon name="globe" className="w-5 h-5 text-emerald-500 shrink-0" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Wholesaler Sourced Net Rate</span>
                        <span className="text-slate-800 font-mono">$100 / night</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#002F6C] h-full w-[35%]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>Distribution Surcharges</span>
                        <span className="text-emerald-600 font-black">$0.00 / night</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-slate-200 h-full w-0" />
                      </div>
                    </div>

                    <div className="p-4 bg-[#EBF3FF] rounded-xl border border-[#002F6C]/10">
                      <span className="text-[9px] font-black uppercase text-[#002F6C] block leading-none">Private Member Cost</span>
                      <span className="text-2xl font-black text-[#002F6C] font-mono block mt-1">$100 / night</span>
                      <span className="text-[10px] text-slate-600 font-semibold leading-relaxed block mt-1">
                        Direct transaction pipeline with no added retail margin layers.
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left order-1 lg:order-2">
              <ScrollReveal>
                <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full shadow-sm">
                  <Icon name="sparkles" className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-black text-emerald-600 tracking-widest uppercase font-mono">DIRECT DATABASE SOURCE</span>
                </div>
              </ScrollReveal>

              <ScrollReveal className="space-y-4">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#002F6C] leading-[0.95]">
                  Private Resort Sourcing <br />
                  <span className="bg-gradient-to-r from-[#002F6C] to-[#0052C2] bg-clip-text text-transparent">Direct-to-Consumer</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Bypass standard booking pages entirely. This direct pipeline passes raw costs straight to verified profiles, letting you get travel for up to 70% less.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  We integrate closed-loop rate channels. Because these settings are held under secure private directory classifications, we can pass raw costs straight to verified users without inflating any base-rate costs.
                </p>
              </ScrollReveal>

              <ScrollReveal className="pt-2">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start space-x-3 text-left max-w-xl mx-auto lg:mx-0 shadow-sm">
                  <Icon name="shieldCheck" className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                    <strong className="text-slate-800">The Sourcing System:</strong> Closed-portal validation permits hotels to offload excess rooms quietly. You get full property benefits without incurring booking markup fees.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ActionButton 
                  onClick={() => {
                    const el = document.getElementById("comparisons");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="primary" 
                  className="w-full sm:w-auto text-xs px-10 py-4 text-[#002F6C]"
                >
                  <span>Show Me Real Prices</span>
                  <Icon name="moveRight" className="w-4 h-4 shrink-0" />
                </ActionButton>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Comparisons Table */}
      <section id="comparisons" className="py-20 md:py-32 bg-white border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full mx-auto shadow-sm">
              <Icon name="checkCircle" className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] sm:text-xs font-black text-emerald-600 tracking-widest uppercase font-mono">ACTIVE DIRECTORY COMPARISON</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#002F6C] leading-tight">
              Identical Properties. Identical Dates. <br />Different Price Universes.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              We audited actual rates live on public booking sites against our private directory for identical guest dates and suite configurations.
            </p>
            
            {/* Interactive Location Tab selector */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl max-w-md mx-auto mt-6 shadow-sm">
              {Object.keys(COMPARATIVE_DATA).map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    selectedDestination === dest 
                      ? 'bg-[#002F6C] text-white shadow-md' 
                      : 'text-[#002F6C] hover:text-[#001D45] font-bold'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Hotel Detail Showcase */}
              <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-slate-100 relative group min-h-[350px] lg:min-h-auto shadow-md">
                <img 
                  src={activeCompare.image} 
                  alt={activeCompare.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
                  <div className="flex items-center space-x-2 bg-[#FFC000] border border-[#FFE28C] w-max px-3 py-1 rounded-full text-[#002F6C] text-[9px] font-black uppercase tracking-widest font-mono">
                    <Icon name="mapPin" className="w-3 h-3 shrink-0" />
                    <span>AUDITED RATE FILE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-none">{activeCompare.name}</h3>
                  <p className="text-slate-200 text-xs font-bold leading-relaxed">{activeCompare.roomType}</p>
                  <p className="text-slate-300 text-[11px] font-mono leading-none pt-1">{activeCompare.dates}</p>
                </div>
              </div>

              {/* Side-by-Side Sourcing Table */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-lg">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Retail Booking */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-slate-300 rounded-bl-xl" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">Retail Sourcing</span>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-tight block">{activeCompare.retailSource}</span>
                    </div>
                    <div className="pt-6">
                      <span className="text-3xl font-black text-slate-400 font-mono tracking-tight block line-through">${activeCompare.retailPrice.toLocaleString()}</span>
                      <span className="text-[10px] font-semibold text-slate-500 block leading-none mt-1">Full checkout retail amount</span>
                    </div>
                  </div>

                  {/* Private Wholesale */}
                  <div className="bg-[#EBF3FF] p-5 rounded-2xl border border-[#002F6C]/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#FFC000] rounded-bl-xl" />
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#002F6C] block">Private Marketplace Sourced</span>
                      <span className="text-xs font-black text-[#002F6C] uppercase tracking-tight block">No Time To Share Directory</span>
                    </div>
                    <div className="pt-6">
                      <span className="text-3xl font-black text-[#002F6C] font-mono tracking-tight block animate-pulse">${activeCompare.wholesalePrice.toLocaleString()}</span>
                      <span className="text-[10px] font-black text-emerald-600 block leading-none mt-1">Save {activeCompare.savingsPct} on this stay!</span>
                    </div>
                  </div>
                </div>

                {/* Exclusive inclusions checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-black text-[#002F6C] uppercase tracking-widest block font-mono">Wholesale Package Advantages</span>
                  <div className="grid grid-cols-2 gap-2">
                    {activeCompare.perks.map((perk, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                        <Icon name="check" className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrative connection */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    Because this reservation bypasses retail booking algorithms entirely, you save <strong className="text-emerald-600">${(activeCompare.retailPrice - activeCompare.wholesalePrice).toLocaleString()}</strong> on the exact same room, dates, and benefits.
                  </p>
                  
                  <ActionButton 
                    onClick={() => {
                      const el = document.getElementById("diagnostic-portal");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    variant="primary" 
                    className="w-full text-xs py-4 text-[#002F6C]"
                  >
                    <span>See If You Can Get Cheap Rates</span>
                    <Icon name="arrowUpRight" className="w-4 h-4 shrink-0" />
                  </ActionButton>
                </div>

              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Global Footer */}
      {}
      <footer className="bg-[#001D45] py-12 relative z-10 text-slate-400 text-left border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-8 gap-6">
            
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src={BRAND_LOGO_URL} 
                alt="No Time To Share" 
                className="h-8 w-8 rounded-lg object-cover filter brightness-90 shadow-md"
                onError={(e) => { e.currentTarget.src = HERO_BACKGROUND_IMAGE; }}
              />
              <div>
                <span className="text-xs font-black text-white tracking-widest uppercase block">NO TIME TO SHARE</span>
                <span className="text-[9px] font-semibold text-slate-300 block leading-none">Private Sourcing Travel Broker</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
              <a href="#rates-mismatch" className="hover:text-[#FFC000] transition-colors">Market Surcharges</a>
              <a href="#diagnostic-portal" className="hover:text-[#FFC000] transition-colors">Take Eligibility Scan</a>
              <a href="#private-directory" className="hover:text-[#FFC000] transition-colors">Direct Sourcing</a>
              <a href="#comparisons" className="hover:text-[#FFC000] transition-colors">Audited Comparisons</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400">
            <p className="text-center md:text-left leading-relaxed">
              © {new Date().getFullYear()} No Time To Share. Developed in cooperative partnership with Travorium. All rates are secured in compliance with private member club API provisions.
            </p>
            <div className="flex space-x-4 shrink-0">
              <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-200 cursor-pointer">Privacy Protocol</span>
            </div>
          </div>
        </div>
      </footer>

      {/* THE DIAGNOSTIC MODAL */}
      <TravelerQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} setVideoModal={setVideoModal} />

      {/* Video Modal Overlay structure used for results validation display */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden relative shadow-[0_0_50px_rgba(255,192,0,0.3)]">
            
            {/* Header overlay for high premium trust visual */}
            <div className="bg-slate-950/80 border-b border-slate-850 px-6 py-4 flex items-center justify-between text-left">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-[#FFC000] uppercase tracking-[0.25em] font-mono leading-none">
                  Live Sourcing Verification Playback
                </span>
              </div>
              <button 
                onClick={() => setVideoModal({ isOpen: false, url: "" })}
                className="p-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-full transition-colors focus:outline-none"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            {/* Video container Frame */}
            <div className="aspect-video w-full bg-slate-950">
              <iframe 
                src={videoModal.url} 
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
