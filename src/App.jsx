import React, { useState } from 'react';
import { Play, CheckCircle2, Send, Loader2, User, Mail, Phone, ArrowRight, Zap, DoorOpen, Search, MousePointerClick, ExternalLink, Globe, XCircle } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success (Bridge Page)

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- BRIDGE PAGE (SUCCESS STATE) ---
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col">
        {/* Header/Nav for Bridge Page */}
        <div className="bg-slate-950 py-4 px-6 text-center border-b border-white/5">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Access Granted</span>
          </div>
        </div>

        {/* Bridge Hero - Outcome Driven */}
        <section className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.1] mb-6 uppercase">
            Now That You See How I Get Leads… <br/>
            <span className="text-indigo-600">Here’s What I’m Actually Building</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto italic">
            “The system you just saw is what brings people to me… <br className="hidden md:block"/> but this is what actually allows me to turn that into income and build something long-term.”
          </p>
        </section>

        {/* Bridge Video Section - Curiosity Driven */}
        <section className="px-6 pb-20 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center">
             
             {/* Relatable Authority Badge */}
             <div className="flex items-center gap-4 mb-8 bg-slate-900 px-5 py-3 rounded-2xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80" 
                alt="Alex" 
                className="w-10 h-10 rounded-full border border-indigo-400 object-cover"
              />
              <div className="text-left">
                <p className="text-white font-black text-xs tracking-tight uppercase leading-none mb-1">Alex — I’ll walk you through this</p>
                <p className="text-indigo-300 text-[9px] font-black uppercase tracking-widest opacity-80">Turning interest into income</p>
              </div>
            </div>

            <div className="w-full group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[1.5rem] md:rounded-[2.5rem] blur opacity-20 transition duration-1000"></div>
              <div className="relative aspect-video w-full bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  <div className="relative w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Play className="fill-current ml-1" size={32} />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white pointer-events-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={14} className="text-indigo-400" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Step 3: The Engine</p>
                  </div>
                  <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight">How I Actually Make Money With This.</h3>
                </div>
              </div>
            </div>

            {/* Bridge CTA Area */}
            <div className="mt-12 text-center w-full max-w-sm">
              <p className="mb-4 text-sm font-bold text-slate-600 italic">
                If this makes sense so far… this is the next step
              </p>
              <button 
                className="w-full group relative flex items-center justify-center px-8 py-6 font-black text-white transition-all duration-300 bg-indigo-600 rounded-2xl hover:bg-slate-950 shadow-[0_20px_40px_rgba(79,70,229,0.2)] uppercase tracking-widest"
                onClick={() => window.open('#', '_blank')}
              >
                Show Me How This Makes Money <ExternalLink className="ml-2" size={18} />
              </button>
              <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                This is what I personally use to build my business
              </p>
            </div>
          </div>
        </section>

        <footer className="py-12 bg-slate-50 text-center border-t border-slate-100 mt-auto">
          <button onClick={() => setStatus('idle')} className="text-xs font-black text-slate-300 uppercase tracking-widest hover:text-indigo-600 transition-colors">
            Back to Home
          </button>
        </footer>
      </div>
    );
  }

  // --- LANDING PAGE (IDLE/LOADING STATE) ---
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION - EMOTIONAL & DIRECT */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-6 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black tracking-[0.2em] uppercase mb-8">
            <Zap size={14} className="fill-current" />
            Limited Availability
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-8">
            Posting every day… <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 uppercase">
              and still nobody’s reaching out?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            This is how you get people reaching out to <span className="text-white">YOU</span> instead.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <a 
              href="#video"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] focus:outline-none uppercase tracking-wider"
            >
              Watch How I’m Building This
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="mt-2 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
              No more chasing people all day
            </span>
          </div>
        </div>
      </section>

      {/* 2. VIDEO & AUTHORITY SECTION - PROOF CENTERED */}
      <section id="video" className="px-6 -mt-20 md:-mt-32 pb-24 max-w-4xl mx-auto relative z-20">
        <div className="flex flex-col items-center">
          
          <div className="mb-4">
            <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.4em] mb-4">This is exactly what I’m doing right now</p>
          </div>

          <div className="flex items-center gap-4 mb-6 bg-slate-900/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-sm opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80" 
                alt="Alex" 
                className="relative w-12 h-12 rounded-full border-2 border-indigo-400 object-cover"
              />
            </div>
            <div>
              <p className="text-white font-black text-sm tracking-tight uppercase leading-none mb-1">Alex — I'll walk you through this</p>
              <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest opacity-80">Stop chasing. Start attracting.</p>
            </div>
          </div>

          <div className="w-full group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-video w-full bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="relative w-20 h-20 md:w-28 md:h-28 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Play className="fill-current ml-1.5" size={32} />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Current Proof</p>
                </div>
                <h3 className="text-xl md:text-3xl font-black leading-tight tracking-tight max-w-2xl uppercase">How I attract qualified <span className="text-indigo-400">leads</span> without sending a single cold message.</h3>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 py-3 px-6 bg-slate-50 border border-slate-100 rounded-full">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">
              People get responses within <span className="text-indigo-600">days</span> of doing this
            </p>
          </div>
        </div>
      </section>

      {/* 3. CLARITY SECTION - THE CONTRAST */}
      <section className="py-24 bg-slate-50 px-6 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter mb-6 uppercase">Why Most People Struggle To Get Leads</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Most people are stuck interrupting people all day… <span className="text-slate-950 font-bold underline decoration-indigo-400 decoration-4">instead</span> of putting themselves in front of people already looking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <XCircle size={24} />
              </div>
              <h4 className="text-xl font-black mb-4 uppercase tracking-tight">The Old Way</h4>
              <ul className="text-slate-600 space-y-3 font-medium">
                <li className="flex gap-2"><span>•</span> Posting every day hoping something sticks</li>
                <li className="flex gap-2"><span>•</span> Messaging people who don’t respond</li>
                <li className="flex gap-2"><span>•</span> Staying consistent… but nothing changes</li>
              </ul>
            </div>
            <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
              <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-black mb-4 uppercase tracking-tight text-white">The Attraction Way</h4>
              <ul className="text-indigo-50 space-y-3 font-medium">
                <li className="flex gap-2"><span>•</span> People come to you already interested</li>
                <li className="flex gap-2"><span>•</span> No chasing, no convincing</li>
                <li className="flex gap-2"><span>•</span> You just respond and close</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SYSTEM STEPS - SHORT & CONFIDENT */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter mb-4 uppercase leading-none">How the <br className="md:hidden" /> system works</h2>
        </div>
        <div className="max-w-4xl mx-auto grid gap-4">
          {[
            { text: "I post simple content that gets attention", icon: "01" },
            { text: "I send people to a page that explains everything", icon: "02" },
            { text: "The right people reach out already interested", icon: "03" },
            { text: "I don’t chase or convince anyone", icon: "04", highlight: true }
          ].map((item, index) => (
            <div key={index} className={`flex items-center justify-between p-6 md:p-8 rounded-[2rem] border transition-all duration-300 ${item.highlight ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' : 'bg-white border-slate-100 hover:border-indigo-200'}`}>
              <div className="flex items-center gap-6">
                <span className={`text-xl font-black ${item.highlight ? 'text-indigo-300' : 'text-slate-200'}`}>{item.icon}</span>
                <p className={`text-lg md:text-2xl font-black uppercase tracking-tight`}>{item.text}</p>
              </div>
              <MousePointerClick className={item.highlight ? 'text-white/40' : 'text-indigo-600/20'} size={24} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. OPT-IN SECTION - CRITICAL FOCUS */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl relative">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">Step 2: Access Now</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter mb-4 uppercase leading-[0.9]">Ready to stop chasing people?</h2>
              <p className="text-slate-500 font-medium text-lg italic underline decoration-indigo-100 underline-offset-8">Enter your info and I’ll personally show you how this works</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Best Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number (Required)</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-6 text-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full group relative flex items-center justify-center px-8 py-6 font-black text-white transition-all duration-300 bg-indigo-600 rounded-2xl hover:bg-slate-950 shadow-[0_20px_40px_rgba(79,70,229,0.2)] uppercase tracking-widest disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <>Show Me How To Get Leads Like This <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" /></>
                  )}
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Zap size={10} className="text-indigo-500 fill-current" />
                  This is exactly what I use to get people reaching out to me
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white text-center border-t border-slate-100">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Business Builder Systems © {new Date().getFullYear()} — Built for Serious Entrepreneurs
        </p>
      </footer>
    </div>
  );
};

export default App;
