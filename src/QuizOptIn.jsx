import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const KIT_FORM_URL = "https://app.kit.com/forms/9404800/subscriptions";
const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#002F6C] sm:text-sm";
const labelClass = "mb-1 block text-[10px] font-black uppercase tracking-wider text-[#002F6C]";

export default function QuizOptIn({ onAccepted, onSending }) {
  const pending = useRef(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;

    const data = new FormData(event.currentTarget);
    const name = data.get("fields[first_name]").trim();
    if (!name) {
      setMessage("Enter your name to continue.");
      event.currentTarget.elements.namedItem("fields[first_name]").focus();
      return;
    }
    if (data.get("consent") !== "yes") return;

    data.delete("consent");
    data.set("fields[first_name]", name);
    data.set("email_address", data.get("email_address").trim());
    data.set("ckjs_version", "6");
    data.set("host", window.location.origin + window.location.pathname);

    pending.current = true;
    setSending(true);
    onSending(true);
    setMessage("");
    let accepted = false;
    try {
      // Use the same public form endpoint and JSON response as Kit's inline form.
      const response = await fetch(KIT_FORM_URL, {
        method: "POST",
        headers: { Accept: "application/json", "X-CKJS-Version": "6" },
        body: data,
        redirect: "error",
        signal: AbortSignal.timeout(12000)
      });
      const result = await response.json();
      accepted = response.ok && result.status === "success";
      if (!accepted) {
        setMessage("Kit didn’t accept your signup. Check your email address and try again. Your quiz answers are still here.");
      }
    } catch {
      setMessage("We couldn’t confirm your signup. Your quiz answers are still here. Please try again.");
    } finally {
      pending.current = false;
      setSending(false);
      onSending(false);
    }
    if (accepted) onAccepted();
  }

  return <form onSubmit={submit} className="mx-auto mt-7 max-w-md space-y-3 text-left">
    <label className="block">
      <span className={labelClass}>First &amp; Last Name</span>
      <input name="fields[first_name]" autoComplete="name" required maxLength={80} placeholder="John Doe" className={inputClass}/>
    </label>
    <label className="block">
      <span className={labelClass}>Primary Email Address</span>
      <input name="email_address" type="email" autoComplete="email" required maxLength={254} placeholder="john@example.com" className={inputClass}/>
    </label>
    <label className="flex items-start gap-3 pt-1 text-sm leading-relaxed text-slate-700">
      <input name="consent" value="yes" type="checkbox" required className="mt-1 shrink-0 accent-[#002F6C]"/>
      <span>I agree to receive marketing emails from No Time to Share about vacation options and travel tips. I can unsubscribe at any time. Read the <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="font-bold text-[#002F6C] underline">privacy notice</a>.</span>
    </label>
    <button type="submit" disabled={sending} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC000] px-5 py-3.5 text-xs font-black uppercase tracking-wider text-[#002F6C] shadow-md transition hover:bg-[#FFB200] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002F6C] disabled:opacity-60">
      {sending ? "Submitting…" : "Show My Travel Results"} <ArrowUpRight aria-hidden="true" size={16}/>
    </button>
    {message && <p role="alert" className="text-sm text-red-800">{message}</p>}
  </form>;
}
