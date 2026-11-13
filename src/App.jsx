import React, { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, ChevronLeft,
  ChevronRight, Compass, ExternalLink, Heart, Info, Mail, Menu, Plane,
  PlayCircle, Search, ShieldCheck, Sparkles, X
} from "lucide-react";

const LOGO_URL = "https://images.travelprox.com/notimetoshare/notimetosharelogo.jpg";
const HERO_IMAGE = "https://travorium.com/resort-on-top-2.jpg";
const ORLANDO_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/1f0a8468-ea19-477a-8d6c-c3dcaf68df9d";
const WELCOME_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/1d1b9589-cdc8-4408-a563-750df53f0e67";
const HOW_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/599f364c-36e1-4607-9993-b57e0c5906d1";
const SIGNUP_VIDEO_URL = "https://player.mediadelivery.net/embed/587199/eb1faa2b-68e5-4735-9fcb-978afd03f6a1";
const ENROLL_URL = "https://travorium.com/enroll.php?sponsor=376362";
const KIT_FORM_URL = "https://app.kit.com/forms/9018875/subscriptions";

const questions = [
  {
    title: "Who do you usually travel with?",
    context: "We'll tailor the comparison to the kind of trip you take.",
    options: ["Solo or with my partner", "Family or multiple generations", "A group of friends"]
  },
  {
    title: "What kind of place do you usually book?",
    context: "The best value depends on what you actually enjoy.",
    options: ["Simple, budget-friendly lodging", "Midrange hotels or vacation rentals", "Upscale resorts and premium stays"]
  },
  {
    title: "About how many nights do you travel each year?",
    context: "How often you travel matters when evaluating any membership fee.",
    options: ["1–4 nights", "5–7 nights", "8–14 nights", "15+ nights"]
  },
  {
    title: "What do you usually spend on lodging for a week?",
    context: "This is only to help frame your comparison—not a quote.",
    options: ["Under $1,000", "$1,000–$2,500", "$2,500–$5,000", "Over $5,000"]
  },
  {
    title: "What frustrates you most about planning vacations?",
    context: "This helps us suggest a smarter way to compare options.",
    options: ["Surprise fees at checkout", "Spending hours comparing prices", "Finding enough space for everyone", "Limited dates or cancellation flexibility"]
  },
  {
    title: "Which benefit matters most on your next trip?",
    context: "There are no right or wrong answers—just your priorities.",
    options: ["Keeping the total cost down", "Room for family and friends", "Comfortable resort experiences", "Freedom to book when I want"]
  }
];

const education = [
  {
    number: "01",
    title: "Know the long-term cost",
    detail: "A timeshare purchase can include financing, ongoing maintenance fees and special assessments. Look at total ownership cost—not just the presentation price."
  },
  {
    number: "02",
    title: "Compare the same vacation",
    detail: "Check the same dates, room type, included benefits, cancellation terms, taxes and fees. A lower headline rate alone doesn't prove savings."
  },
  {
    number: "03",
    title: "Keep your options open",
    detail: "Compare direct bookings and optional travel memberships against the way you really vacation. A membership is not automatically the right fit for everyone."
  }
];

function Button({ children, onClick, href, secondary = false, className = "", type = "button", disabled = false, target }) {
  const style = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 disabled:opacity-60 " +
    (secondary
      ? "border border-white/25 bg-white/10 text-white hover:bg-white/20 "
      : "bg-[#FFC000] text-[#002F6C] shadow-[0_8px_25px_rgba(255,192,0,.2)] hover:bg-[#FFCE38] ") + className;
  if (href) return <a className={style} href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>{children}</a>;
  return <button type={type} className={style} onClick={onClick} disabled={disabled}>{children}</button>;
}

function Brand() {
  const [logoError, setLogoError] = useState(false);
  return <a href="#home" className="flex items-center gap-3" aria-label="No Time to Share - home">
    {!logoError ? <img src={LOGO_URL} onError={() => setLogoError(true)} alt="" className="h-11 w-11 rounded-xl object-cover border border-white/20" /> : <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-[#002F6C] font-black">NTS</span>}
    <span className="leading-tight"><strong className="block text-sm tracking-wide text-white">NO TIME TO SHARE</strong><small className="block text-[10px] font-bold tracking-[.16em] text-[#FFE28C] uppercase">Smarter vacation decisions</small></span>
  </a>;
}

function QuizModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [signupState, setSignupState] = useState("idle");
  const [kitConfigured, setKitConfigured] = useState(false);
  const [detailVideosOpen, setDetailVideosOpen] = useState(false);
  const [resultsUnlocked, setResultsUnlocked] = useState(false);
  const [fallbackPending, setFallbackPending] = useState(false);

  useEffect(() => {
    function keydown(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [onClose]);

  useEffect(() => {
    fetch("/api/subscribe").then((r) => r.ok ? r.json() : null).then((v) => setKitConfigured(v?.ready === true)).catch(() => setKitConfigured(false));
  }, []);

  const finished = step >= questions.length;
  const nights = answers[2] ?? 0;
  const lodging = answers[1] ?? 0;
  const priority = answers[5] ?? 0;
  const isResortLover = (lodging === 2 || priority === 2) && (nights >= 1 || (answers[3] ?? 0) >= 2);
  const traveler = (nights === 0 && !isResortLover) ? {
    id: "explorer",
    label: "The Smart Explorer",
    detail: "You're a flexible traveler who should compare memberships carefully against booking only when you need a trip.",
    tip: "Start with a direct hotel quote and add the full annual cost of any travel membership before deciding.",
    color: "from-cyan-100 to-sky-50",
    badge: "Flexible & value-minded"
  } : isResortLover ? {
    id: "resort",
    label: "The Resort Enthusiast",
    detail: "You prioritize comfortable or upscale stays. Resort-focused memberships may be worth comparing, but only when actual travel dates and total costs line up.",
    tip: "For your next resort trip, compare identical room types, included amenities, cancellation terms and membership costs.",
    color: "from-amber-100 to-yellow-50",
    badge: "Resort & experience-focused"
  } : {
    id: "planner",
    label: "The Vacation Planner",
    detail: "You plan regular getaways and want a balance between comfort, flexibility and price.",
    tip: "Compare at least two trips over the next year and include enrollment, renewal and booking fees.",
    color: "from-indigo-100 to-blue-50",
    badge: "Practical & organized"
  };
  const ProfileIcon = traveler.id === "explorer" ? Compass : traveler.id === "resort" ? Sparkles : Plane;
  const frustrationTip = [
    "Pay special attention to resort fees, taxes, cleaning charges and mandatory add-ons.",
    "Compare a short list of like-for-like options instead of dozens of unrelated deals.",
    "Compare total occupancy and sleeping arrangements, not just the nightly room rate.",
    "Read the booking, change and refund terms before committing to any offer."
  ][answers[4] ?? 0];

  async function saveLead(e) {
    e.preventDefault();
    if (!consent || !name.trim() || !email.trim()) return;
    setSignupState("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), consent: true,
          profile: traveler.label,
          travel_nights: questions[2].options[answers[2]],
          travel_priority: questions[5].options[answers[5]],
          booking_frustration: questions[4].options[answers[4]]
        })
      });
      if (!response.ok) throw new Error("Signup unavailable");
      setSignupState("success");
      setResultsUnlocked(true);
    } catch {
      setSignupState("error");
    }
  }

  const selectOption = (index) => {
    setAnswers((prev) => ({ ...prev, [step]: index }));
    setStep((prev) => prev + 1);
  };

  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#00112A]/85 backdrop-blur-sm p-3 py-6 sm:p-8" role="dialog" aria-modal="true" aria-label="Vacation fit quiz">
    <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-[#002F6C] px-5 py-4 text-white sm:px-8">
        <div><small className="block text-[10px] font-bold uppercase tracking-[.2em] text-amber-300">No Time to Share</small><strong className="text-lg">Your Vacation Fit Check</strong></div>
        <button type="button" aria-label="Close quiz" className="rounded-full p-2 hover:bg-white/15" onClick={onClose}><X size={22}/></button>
      </div>
      {!finished ? <>
        <div className="h-1.5 bg-blue-100"><div className="h-full bg-[#FFC000] transition-all" style={{ width: Math.round((step / questions.length) * 100) + "%" }}/></div>
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#0052A4]">Question {step + 1} of {questions.length}</p>
          <h2 className="text-2xl font-black leading-tight text-[#002F6C] sm:text-3xl">{questions[step].title}</h2>
          <p className="mt-3 text-sm text-slate-600">{questions[step].context}</p>
          <div className="mt-8 space-y-3">
            {questions[step].options.map((option, index) => <button key={option} type="button" onClick={() => selectOption(index)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-500">
              <span>{option}</span><ChevronRight className="shrink-0 text-[#0052A4]" size={18}/>
            </button>)}
          </div>
          {step > 0 && <button type="button" className="mt-6 flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-[#002F6C]" onClick={() => setStep(step - 1)}><ChevronLeft size={16}/> Previous question</button>}
        </div>
      </> : !resultsUnlocked ? <div className="p-6 sm:p-10">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F1FF] text-[#002F6C]"><ShieldCheck size={30}/></div>
          <p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-[#0052A4]">All six questions complete</p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-[#002F6C] sm:text-3xl">Your Vacation Profile Is Ready!</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">You've told us how you like to travel. Enter your name and email to unlock your personalized travel snapshot, plus practical tips for comparing your next vacation.</p>
        </div>
        <form
          className="mx-auto mt-7 max-w-md space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
          onSubmit={kitConfigured ? saveLead : () => setFallbackPending(true)}
          action={!kitConfigured ? KIT_FORM_URL : undefined}
          method={!kitConfigured ? "POST" : undefined}
          target={!kitConfigured ? "_blank" : undefined}
        >
          <label className="block text-xs font-bold text-slate-700">Your first name
            <input name="fields[first_name]" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" required maxLength={80} placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:outline-2 focus:outline-blue-400"/>
          </label>
          <label className="block text-xs font-bold text-slate-700">Your email
            <input type="email" name="email_address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required maxLength={254} placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:outline-2 focus:outline-blue-400"/>
          </label>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-1"/>
            <span>I agree to receive follow-up emails from No Time to Share about my travel assessment, vacation options, and relevant tips. I can unsubscribe at any time. See the <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="font-bold text-[#002F6C] underline">privacy notice</a>.</span>
          </label>
          <button type="submit" disabled={!consent || signupState === "sending"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002F6C] px-5 py-4 text-sm font-extrabold text-white hover:bg-[#00448D] disabled:opacity-60">{signupState === "sending" ? "Saving your details…" : kitConfigured ? "Unlock My Vacation Results" : "Continue to Secure Signup" }<ArrowRight size={16}/></button>
          <p className="text-xs leading-relaxed text-slate-500">{kitConfigured ? "Your results will open once your signup is accepted by our email provider." : "The signup opens in a separate tab. Once the email form confirms your submission, return here to view your results."} No travel membership purchase is required.</p>
        </form>
        {signupState === "error" && <div role="alert" className="mx-auto mt-4 max-w-md rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">We couldn't confirm your signup. Please retry or use the external email signup form:
          <form method="POST" action={KIT_FORM_URL} target="_blank" onSubmit={() => setFallbackPending(true)}>
            <input type="hidden" name="email_address" value={email} readOnly/>
            <input type="hidden" name="fields[first_name]" value={name} readOnly/>
            <button type="submit" className="mt-2 inline-flex items-center gap-1 font-bold underline">Open email signup <ExternalLink size={13}/></button>
          </form>
        </div>}
        {fallbackPending && <div className="mx-auto mt-4 max-w-md rounded-xl border border-blue-200 bg-[#EAF2FF] p-4">
          <p className="text-sm font-semibold text-[#002F6C]">Finished signing up in the new tab?</p>
          <p className="mt-1 text-xs text-slate-600">We can't confirm the external form from this page. Continue only once the email signup page confirms your submission.</p>
          <button type="button" onClick={() => setResultsUnlocked(true)} className="mt-3 w-full rounded-lg border border-[#002F6C] bg-white px-3 py-3 text-sm font-bold text-[#002F6C]">My signup was confirmed — view results</button>
        </div>}
        <button type="button" className="mt-6 flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-[#002F6C]" onClick={() => setStep(questions.length - 1)}><ChevronLeft size={16}/> Back to last question</button>
      </div> : <div className="p-6 sm:p-9">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700"><CheckCircle2 size={15}/> Your results are ready</div>
        <div className={"mt-5 flex items-center gap-4 rounded-2xl bg-gradient-to-br p-5 " + traveler.color}>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white bg-white/80 text-[#002F6C] shadow-sm"><ProfileIcon size={46} strokeWidth={1.6}/></div>
          <div><p className="text-xs font-extrabold uppercase tracking-wide text-[#0052A4]">Your traveler type</p><h2 className="mt-1 text-2xl font-black text-[#002F6C]">{traveler.label}</h2><p className="mt-1 text-xs font-bold text-slate-600">{traveler.badge}</p></div>
        </div>
        <p className="mt-4 leading-relaxed text-slate-600">{traveler.detail}</p>
        <div className="mt-5 rounded-2xl border border-blue-100 bg-[#F1F6FF] p-5">
          <p className="text-xs font-black uppercase tracking-wider text-[#0052A4]">Your travel snapshot</p>
          <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-slate-500">Nights per year</dt><dd className="font-bold text-slate-800">{questions[2].options[answers[2]]}</dd></div>
            <div><dt className="text-slate-500">Preferred lodging</dt><dd className="font-bold text-slate-800">{questions[1].options[answers[1]]}</dd></div>
            <div><dt className="text-slate-500">Travel companions</dt><dd className="font-bold text-slate-800">{questions[0].options[answers[0]]}</dd></div>
            <div><dt className="text-slate-500">Typical weekly lodging budget</dt><dd className="font-bold text-slate-800">{questions[3].options[answers[3]]}</dd></div>
            <div><dt className="text-slate-500">Your biggest booking challenge</dt><dd className="font-bold text-slate-800">{questions[4].options[answers[4]]}</dd></div>
            <div><dt className="text-slate-500">Your top travel priority</dt><dd className="font-bold text-slate-800">{questions[5].options[answers[5]]}</dd></div>
          </dl>
        </div>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-4"><strong className="text-sm text-[#002F6C]">Your best next step</strong><p className="mt-1 text-sm text-slate-700">{traveler.tip}</p><p className="mt-2 text-sm text-slate-700">{frustrationTip}</p></div>
        <div className="mt-8 border-t border-slate-200 pt-7">
          <div className="flex items-center gap-2 text-[#002F6C]"><PlayCircle size={21}/><h3 className="text-xl font-black">See how the travel membership works</h3></div>
          <p className="mt-2 text-sm text-slate-600">One short introduction. You can explore more videos only if you're interested.</p>
          <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-slate-900"><iframe title="Introduction to Travorium" src={WELCOME_VIDEO_URL} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full border-0"/></div>
          <button type="button" onClick={() => setDetailVideosOpen(!detailVideosOpen)} aria-expanded={detailVideosOpen} className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-bold text-[#002F6C] hover:bg-slate-50">More details: how it works and how to join <ChevronDown size={18} className={detailVideosOpen ? "rotate-180" : ""}/></button>
          {detailVideosOpen && <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {[{ url: HOW_VIDEO_URL, title: "How the membership works" }, { url: SIGNUP_VIDEO_URL, title: "Joining walkthrough" }].map((video) => <div key={video.title}><h4 className="mb-2 text-xs font-bold text-slate-700">{video.title}</h4><div className="aspect-video overflow-hidden rounded-xl bg-slate-900"><iframe title={video.title} loading="lazy" src={video.url} allow="encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full border-0"/></div></div>)}
          </div>}
          <a href={ENROLL_URL} target="_blank" rel="sponsored noopener noreferrer" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#002F6C] px-5 py-4 text-center text-sm font-extrabold text-white hover:bg-[#00448D]">Explore current membership options <ArrowUpRight size={18}/></a>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">Optional paid membership. Review current plan pricing, recurring charges, booking terms and cancellation conditions on the provider's site before enrolling. We may earn compensation through the referral link. Savings are not guaranteed.</p>
        </div>
        <button type="button" onClick={onClose} className="mt-6 w-full py-2 text-sm font-bold text-slate-500 hover:text-[#002F6C]">Close my results</button>
      </div>}
    </div>
  </div>;
}

function ComparisonExample() {
  return <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-2xl shadow-blue-950/10">
    <div className="bg-[#002F6C] px-6 py-5 text-white sm:px-8">
      <div className="flex items-center gap-2"><Info size={18} className="text-amber-300"/><p className="text-xs font-black uppercase tracking-[.16em] text-amber-300">Simple example — not a real hotel offer</p></div>
      <h3 className="mt-2 text-2xl font-black">A lower booking price isn't the whole story.</h3>
      <p className="mt-2 text-sm leading-relaxed text-blue-100">Imagine two ways to book the same hotel for the same dates.</p>
    </div>
    <div className="space-y-5 p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Booking on a public site</p>
          <p className="mt-3 text-3xl font-black text-[#002F6C]">$1,500</p>
          <p className="mt-1 text-xs text-slate-500">Illustrative all-in total</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-[#EFF5FF] p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[#0052A4]">Booking through a membership</p>
          <p className="mt-3 text-3xl font-black text-[#002F6C]">$1,000</p>
          <p className="mt-1 text-xs text-slate-500">Illustrative hotel price before membership cost</p>
        </div>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-bold text-[#002F6C]">Now include the membership cost:</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-700">
          <span>$1,000 booking + $300 membership fees</span>
          <span className="text-xl font-black text-[#002F6C]">= $1,300</span>
        </div>
      </div>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Difference in this made-up example</p>
        <p className="mt-1 text-3xl font-black text-emerald-800">$200</p>
        <p className="mt-1 text-sm text-emerald-900">Not $500—the membership fees count, too.</p>
      </div>
      <p className="text-xs leading-relaxed text-slate-500"><strong>Important:</strong> These numbers are fictional and demonstrate the math only. Actual membership costs, resort availability, room types, taxes, credits, and booking restrictions can change the result. Sometimes the public rate is the better deal.</p>
    </div>
  </div>;
}

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [moreAboutOpen, setMoreAboutOpen] = useState(false);
  const startQuiz = () => { setQuizOpen(true); setMenuOpen(false); };
  return <div id="home" className="min-h-screen bg-[#F6F8FC] font-sans text-slate-800">
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#002F6C] shadow-lg" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-8">
        <Brand/>
        <div className="hidden items-center gap-7 lg:flex">
          <a href="#learn" className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-300">Timeshare truths</a>
          <a href="#orlando" className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-300">Our travel story</a>
          <a href="#compare" className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-300">Compare costs</a>
          <a href="#questions" className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-300">FAQ</a>
        </div>
        <div className="hidden sm:block"><Button onClick={startQuiz} className="!px-4 !py-3">Take the travel quiz <ArrowRight size={16}/></Button></div>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <div className="border-t border-white/10 bg-[#001D45] p-5 lg:hidden">
        <div className="flex flex-col gap-4 text-sm font-bold text-white">
          {[["Timeshare truths","#learn"],["Our travel story","#orlando"],["Compare costs","#compare"],["FAQ","#questions"]].map(([label, url]) => <a key={url} href={url} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button onClick={startQuiz} className="rounded-xl bg-[#FFC000] p-3 text-left font-extrabold text-[#002F6C]">Take the travel quiz</button>
        </div>
      </div>}
    </nav>

    <header className="relative overflow-hidden bg-gradient-to-br from-[#002F6C] via-[#001B41] to-[#00418F] text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url(" + HERO_IMAGE + ")" }}/>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-amber-300"><Sparkles size={14}/> Save the vacation. Question the pitch.</p>
          <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Love vacations.<span className="mt-2 block text-[#FFC000]">Not timeshare pressure.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">Learn what vacations really cost, avoid confusing travel offers, and explore options beyond traditional timeshare ownership. No high-pressure presentation required to get informed.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={startQuiz}>Take the 6-question travel quiz <ArrowRight size={17}/></Button>
            <Button href="#learn" secondary>Learn before you decide <ChevronRight size={17}/></Button>
          </div>
          <p className="mt-5 max-w-lg text-xs leading-relaxed text-blue-200">We explain vacation costs and may refer you to an optional paid travel membership. No purchase is required to take the quiz. Savings vary.</p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white p-4 text-slate-800 shadow-2xl sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#002F6C]"><PlayCircle size={18}/> A real Orlando vacation story</div><span className="text-[10px] font-bold text-emerald-700">Travel walkthrough</span></div>
          <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-slate-900"><iframe src={ORLANDO_VIDEO_URL} title="Orlando vacation walkthrough" loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full border-0"/></div>
          <h2 className="mt-4 text-lg font-black text-[#002F6C]">See the trip. Learn how to compare the cost.</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">We share an Orlando resort experience and encourage you to compare the complete cost of any offer—including fees, membership charges and booking conditions.</p>
        </div>
      </div>
    </header>

    <main>
      <section id="learn" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#0052A4]">Timeshare truths</p>
          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><h2 className="max-w-3xl text-3xl font-black leading-tight text-[#002F6C] sm:text-5xl">Before you commit to a vacation plan, know what you're paying for.</h2><p className="max-w-sm text-sm leading-relaxed text-slate-600">The right vacation decision starts with clear comparisons, not a dramatic discount claim.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{education.map((item) => <article key={item.number} className="rounded-3xl border border-slate-200 bg-[#F6F8FC] p-7 shadow-sm"><span className="inline-block rounded-xl bg-[#E8F1FF] px-3 py-2 text-sm font-black text-[#0052A4]">{item.number}</span><h3 className="mt-6 text-xl font-black text-[#002F6C]">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{item.detail}</p></article>)}</div>
        </div>
      </section>

      <section id="orlando" className="scroll-mt-24 bg-[#EAF2FD] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div><p className="text-xs font-black uppercase tracking-[.2em] text-[#0052A4]">Why we share our trips</p><h2 className="mt-3 text-3xl font-black leading-tight text-[#002F6C] sm:text-4xl">A better deal starts with a better comparison.</h2><p className="mt-5 max-w-xl leading-relaxed text-slate-600">Travel costs can look very different depending on dates, property, package and booking method. We use our own vacation experiences to start the conversation—but you should always check current rates for your trip.</p>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-slate-700">{["Same room and occupancy", "Taxes, resort fees and mandatory charges", "Refund and change conditions", "Membership costs over the comparison period"].map((v) => <li className="flex items-start gap-2" key={v}><CheckCircle2 className="mt-0.5 shrink-0 text-[#0052A4]" size={17}/>{v}</li>)}</ul>
            <a href="#compare" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#002F6C] underline underline-offset-4">Run your own price check <ArrowRight size={17}/></a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white bg-[#002F6C] shadow-xl">
            <div className="relative h-72 bg-cover bg-center sm:h-96" style={{ backgroundImage: "url(" + HERO_IMAGE + ")" }}><div className="absolute inset-0 bg-gradient-to-t from-[#001D45] to-[#002F6C]/10"/><div className="absolute bottom-7 left-7 right-7"><p className="text-xs font-bold uppercase tracking-wider text-amber-300">An invitation to compare</p><h3 className="mt-2 text-2xl font-black text-white">More vacation. More clarity. Less guesswork.</h3></div></div>
          </div>
        </div>
      </section>

      <section id="compare" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
          <div className="lg:pt-8">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#0052A4]">What makes a deal worth it?</p><h2 className="mt-3 text-3xl font-black leading-tight text-[#002F6C] sm:text-5xl">Here's why we compare the whole price.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">A lower advertised hotel price isn't automatically a better deal. This simple example shows why you should count membership charges and check the terms before making a decision.</p>
            <div className="mt-7 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5"><p className="font-extrabold text-[#002F6C]">An important difference</p><p className="mt-2 text-sm leading-relaxed text-slate-700">A timeshare generally involves a vacation-ownership arrangement. A travel club is a different product, often with recurring fees and its own booking rules. Neither automatically guarantees the lowest vacation price.</p></div>
            <div className="mt-8"><Button onClick={startQuiz}>Find your vacation fit <ArrowRight size={17}/></Button></div>
          </div>
          <ComparisonExample/>
        </div>
      </section>

      <section className="bg-[#002F6C] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-amber-300">Your next step</p><h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">Does a travel membership make sense for you?</h2><p className="mx-auto mt-5 max-w-2xl text-blue-100">Your answer depends on how frequently you travel, what you book, and what you're comfortable spending. Answer six simple questions and get a useful travel profile—before seeing any membership offer.</p>
          <div className="mt-8"><Button onClick={startQuiz} className="!px-8 !py-4">Take my travel fit quiz <ArrowRight size={18}/></Button></div>
          <p className="mt-4 text-xs text-blue-200">No obligation to join a travel membership. We'll ask for your email before displaying your personalized assessment.</p>
        </div>
      </section>

      <section id="questions" className="scroll-mt-24 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl"><p className="text-xs font-black uppercase tracking-[.2em] text-[#0052A4]">Good questions deserve clear answers</p><h2 className="mt-3 text-3xl font-black text-[#002F6C] sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 space-y-3">{[
            ["Is this a timeshare?", "No. This website provides travel education and introduces an optional travel membership referral. Review the membership agreement to understand its terms and fees; it is not the same thing as buying a timeshare."],
            ["Will I definitely save money?", "No. Availability, dates, property choices, fees and membership costs affect your total. Always compare the full cost with public and direct-booking options."],
            ["Do I have to provide my email to take the quiz?", "You can answer all six questions before entering any contact details. We ask for your name, email and permission to follow up before revealing your customized travel snapshot. A travel membership purchase is never required."],
            ["How much does membership cost?", "Membership may have enrollment and recurring charges depending on the current plan. Check the provider's pricing and terms before you choose whether to enroll."],
            ["Do you receive compensation if I sign up?", "We may receive referral compensation when you enroll through our Travorium link. That relationship does not change the cost-comparison advice we encourage you to follow."]
          ].map(([question, answer], index) => <div key={question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><button type="button" onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-[#002F6C]"><span>{question}</span><ChevronDown size={18} className={"shrink-0 transition-transform " + (faqOpen === index ? "rotate-180" : "")}/></button>{faqOpen === index && <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{answer}</p>}</div>)}</div>
        </div>
      </section>
    </main>

    <footer className="bg-[#001A3B] px-5 py-12 text-slate-300 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 sm:flex-row sm:items-center"><Brand/><div className="flex flex-wrap gap-5 text-sm font-semibold"><a className="hover:text-white" href="#learn">Timeshare education</a><a className="hover:text-white" href="#compare">Vacation comparison</a><a className="hover:text-white" href="/privacy.html">Privacy</a><a className="hover:text-white" href="/terms.html">Terms</a></div></div>
        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-slate-400">No Time to Share is an independent travel education and referral website. We may earn compensation through Travorium referrals. Membership fees and booking conditions apply. Hotel prices, availability and potential savings vary. This website does not sell or finance timeshares.</p>
        <p className="mt-5 text-xs text-slate-500">© {new Date().getFullYear()} No Time to Share. Travel well, decide wisely.</p>
      </div>
    </footer>
    {quizOpen && <QuizModal onClose={() => setQuizOpen(false)}/>}
  </div>;
}
