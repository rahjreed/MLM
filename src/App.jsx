import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Zap, 
  Play, 
  X,
  Send,
  Navigation,
  Lock,
  Timer,
  Eye,
  Home,
  Coffee,
  Utensils,
  CheckCircle,
  ChevronLeft
} from 'lucide-react';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isBridgeVideoPlaying, setIsBridgeVideoPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [liveViewers, setLiveViewers] = useState(212);
  const [showBridge, setShowBridge] = useState(false);
  const [showJotForm, setShowJotForm] = useState(false);
  
  // Selection state for chatbot
  const [selections, setSelections] = useState({
    destination: '',
    timeframe: ''
  });

  // Live social proof simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChoice = (field, value) => {
    setSelections(prev => ({ ...prev, [field]: value }));
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatStep(prev => prev + 1);
    }, 1000);
  };

  const handleContinueToBridge = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowBridge(true);
    }, 1200);
  };

  const openChat = () => {
    setIsChatOpen(true);
    if (chatStep === 0) {
      setChatStep(1);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatStep(0);
    setShowBridge(false);
    setShowJotForm(false);
    setIsBridgeVideoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* LIVE SAVINGS TICKER */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden whitespace-nowrap sticky top-0 z-[60] font-black text-[10px] uppercase tracking-tighter border-b border-white/10">
        <div className="inline-block animate-marquee">
          <span className="mx-6">✅ $1,402 SAVED BY @SARAH_J</span>
          <span className="mx-6">✅ $890 SAVED BY @MARCUS_TRAVELS</span>
          <span className="mx-6">✅ $2,100 SAVED BY @THE_MILLERS</span>
          <span className="mx-6">✅ $450 SAVED BY @JASON_K</span>
        </div>
        <div className="absolute top-0 inline-block animate-marquee2">
          <span className="mx-6">✅ $1,402 SAVED BY @SARAH_J</span>
          <span className="mx-6">✅ $890 SAVED BY @MARCUS_TRAVELS</span>
          <span className="mx-6">✅ $2,100 SAVED BY @THE_MILLERS</span>
          <span className="mx-6">✅ $450 SAVED BY @JASON_K</span>
        </div>
      </div>

      {/* Floating Social Proof */}
      <div className="fixed bottom-6 left-6 z-40 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <Eye className="w-3 h-3 text-white/50" />
        <span>{liveViewers} people checking private rates</span>
      </div>

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-6 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-4 py-1 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">
            <Lock className="w-3 h-3 fill-current" />
            <span>Invitation Only: Hidden Rate Portal</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter uppercase">
            Stop Seeing The <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 italic">
              Wrong Price.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 font-medium max-w-sm mx-auto leading-tight">
            The prices you see on booking sites aren’t deals… they’re just the public version.
          </p>
        </div>
      </section>

      {/* 2. Video Section */}
      <section className="py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Takes 3–5 minutes. Most people skip this.
          </p>
          
          <div className="relative group aspect-video rounded-3xl bg-slate-900 border-4 border-white/5 overflow-hidden shadow-[0_0_80px_-20px_rgba(59,130,246,0.6)]">
            {!isVideoPlaying ? (
              <div 
                className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center cursor-pointer p-8"
                style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80')" }}
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="bg-blue-500 text-white w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all mb-4">
                  <Play className="w-8 h-8 md:w-12 md:h-12 fill-current translate-x-1" />
                </div>
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                    Watch This Before You <br className="hidden md:block" /> Book Anything
                  </h2>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                <iframe 
                  src="https://player.mediadelivery.net/play/587199/346df526-ca9c-4e32-805a-131e54de1fdd?autoplay=true" 
                  loading="lazy" 
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }} 
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                  allowFullScreen={true}
                ></iframe>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center space-y-6">
            <p className="text-xs font-bold text-blue-400/80 uppercase tracking-widest">
              Skipping this could cost you hundreds
            </p>
            
            <div className="space-y-2">
              <button 
                onClick={openChat}
                className="w-full max-w-sm mx-auto bg-white text-black font-black py-5 rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-xl"
              >
                Check My Dates <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Only takes 30 seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-12 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-md mx-auto space-y-6">
          <p className="text-center text-xs font-medium text-slate-400 italic px-6 pb-2">
            "I thought this was fake at first too, then I saw the difference..."
          </p>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-5 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0 border border-white/5">
               <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mexico Luxury Resort</p>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 line-through">Public: $420/nt</span>
                <span className="text-xl font-black italic text-blue-400">Real: $195/nt</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl flex items-center gap-4 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0 border border-white/5">
               <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Orlando Suites</p>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 line-through">Public: $285/nt</span>
                <span className="text-xl font-black italic text-blue-400">Real: $112/nt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Ready to <br />Check Your Dates?</h2>
            <p className="text-slate-400 font-medium">Takes 30 seconds. See your real price.</p>
          </div>
          
          <button 
            onClick={openChat}
            className="w-full bg-blue-500 text-white font-black py-6 rounded-[2rem] text-2xl hover:scale-[1.02] transition-all shadow-[0_20px_50px_-12px_rgba(59,130,246,0.5)] flex items-center justify-center gap-3 active:scale-95 animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            Check My Dates <ArrowRight className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Interactive Chatbot Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-end md:justify-center p-4">
          <button onClick={closeChat} className="absolute top-6 right-6 p-3 bg-white/10 rounded-full z-[110]">
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-md bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[85vh] md:h-[75vh] relative text-left">
            
            {/* JOTFORM FINAL STEP */}
            {showJotForm ? (
              <div className="absolute inset-0 z-50 bg-[#0a0a0a] flex flex-col animate-in fade-in zoom-in-95 duration-300">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                   <button onClick={() => setShowJotForm(false)} className="p-2 hover:bg-white/5 rounded-full">
                     <ChevronLeft className="w-5 h-5 text-slate-400" />
                   </button>
                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-black text-white">
                    <Navigation className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase italic text-white/90">Maya Assistant</p>
                    <p className="text-[8px] text-blue-400 font-bold uppercase tracking-wider">Final Step: Customization</p>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <iframe 
                    id="JotFormIFrame-019df64622dd7a838187d0280ecd1cc763c3"
                    title="Maya: Travel Inquiry Assistant" 
                    allowtransparency="true"
                    allow="geolocation; microphone; camera; fullscreen"
                    src="https://agent.jotform.com/019df64622dd7a838187d0280ecd1cc763c3?embedMode=iframe&autofocus=0&background=1&shadow=1"
                    frameBorder="0" 
                    style={{ width: '100%', height: '100%', border: 'none' }} 
                    scrolling="no"
                  ></iframe>
                </div>
              </div>
            ) : showBridge ? (
              /* THE BRIDGE PAGE (SCOTTSDALE 2025) */
              <div className="absolute inset-0 z-40 bg-[#0a0a0a] flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-500 overflow-y-auto">
                <div className="flex-1 p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Sneak Peak: Live Proof</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic leading-none">Scottsdale 2025</h2>
                    <p className="text-slate-400 text-sm font-medium italic">"I can't believe this was our life for a week..."</p>
                  </div>

                  {/* Bridge Proof Video Container */}
                  <div className="relative aspect-[4/5] rounded-3xl bg-slate-900 border border-white/10 overflow-hidden group">
                    {!isBridgeVideoPlaying ? (
                      <div 
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => setIsBridgeVideoPlaying(true)}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80" 
                          className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" 
                          alt="Scottsdale Resort"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                            <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 space-y-1 text-left">
                          <p className="text-2xl font-black text-white italic tracking-tighter">TOTAL: &lt;$100</p>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">8 Days / 7 Nights</p>
                        </div>
                      </div>
                    ) : (
                      <iframe 
                        src="https://player.mediadelivery.net/play/587199/02956ab7-33a5-4f3b-8754-ef763a308f28?autoplay=true" 
                        loading="lazy" 
                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }} 
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                        allowFullScreen={true}
                      ></iframe>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                      <Home className="w-5 h-5 text-blue-400" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Luxury Villa</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                      <Utensils className="w-5 h-5 text-blue-400" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Full Kitchen</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                      <Coffee className="w-5 h-5 text-blue-400" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Living Room</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Dining Room</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    This is what happens when you skip the public booking sites. We want to find this for you too.
                  </p>
                </div>

                <div className="p-6 bg-black border-t border-white/5 shrink-0">
                  <button 
                    className="w-full bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_40px_-12px_rgba(59,130,246,0.6)]"
                    onClick={() => setShowJotForm(true)}
                  >
                    Find My Trip Options <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Chatbot Flow */
              <>
                <div className="p-5 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-black text-white">
                    <Navigation className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase italic text-white/90">Rate Assistant</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Connected to Private Pool</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {chatStep >= 1 && (
                    <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none max-w-[90%] text-sm font-medium animate-in fade-in slide-in-from-left-4">
                      Let's check the hidden rates for your trip. ✈️ <br /><br />Where are you thinking of going?
                    </div>
                  )}
                  
                  {chatStep >= 2 && selections.destination && (
                    <div className="bg-blue-500 text-white p-4 rounded-3xl rounded-tr-none ml-auto max-w-[80%] text-sm font-black italic animate-in fade-in slide-in-from-right-4">
                       {selections.destination}
                    </div>
                  )}

                  {chatStep >= 2 && (
                    <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none max-w-[90%] text-sm font-medium animate-in fade-in slide-in-from-left-4">
                      Excellent choice. Those areas have high markups we can bypass. <br /><br />What time of year are you planning to go?
                    </div>
                  )}

                  {chatStep >= 3 && selections.timeframe && (
                    <div className="bg-blue-500 text-white p-4 rounded-3xl rounded-tr-none ml-auto max-w-[80%] text-sm font-black italic animate-in fade-in slide-in-from-right-4">
                       {selections.timeframe}
                    </div>
                  )}

                  {chatStep >= 3 && (
                    <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none max-w-[90%] text-sm font-medium animate-in fade-in slide-in-from-left-4">
                      Checking current inventory... Matches found. 🏷️ <br /><br />We found rates up to 48% lower than public sites. Ready to see the proof?
                    </div>
                  )}

                  {isTyping && (
                    <div className="flex gap-1 p-2">
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-white/5 bg-black/50">
                  {chatStep === 1 && !isTyping && (
                    <div className="grid grid-cols-2 gap-3">
                      {['Vegas', 'Orlando', 'Hawaii', 'International'].map((dest) => (
                        <button 
                          key={dest}
                          onClick={() => handleChoice('destination', dest)}
                          className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95"
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  )}

                  {chatStep === 2 && !isTyping && (
                    <div className="grid grid-cols-2 gap-3">
                      {['Spring', 'Summer', 'Winter', 'Fall'].map((season) => (
                        <button 
                          key={season}
                          onClick={() => handleChoice('timeframe', season)}
                          className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95"
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  )}

                  {chatStep >= 3 && !isTyping && (
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={handleContinueToBridge}
                        className="w-full bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                      >
                        See Live Proof <ArrowRight className="w-6 h-6" />
                      </button>
                      <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest underline underline-offset-4">Only takes 30 seconds</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/5">
        <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em] italic mb-4">Invite Only • Private Rate Portal</p>
        <div className="flex justify-center gap-6 opacity-20 grayscale">
          <Star fill="currentColor" className="w-4 h-4" />
          <Star fill="currentColor" className="w-4 h-4" />
          <Star fill="currentColor" className="w-4 h-4" />
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 35s linear infinite;
        }
      ` }} />
    </div>
  );
};

export default App;
