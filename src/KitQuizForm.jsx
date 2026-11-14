import React, { useEffect, useRef, useState } from "react";

export default function KitQuizForm({ formId, uid, scriptUrl, onAccepted }) {
  const hostRef = useRef(null);
  const consentRef = useRef(null);
  const acceptedRef = useRef(onAccepted);
  const [problem, setProblem] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    acceptedRef.current = onAccepted;
  }, [onAccepted]);

  useEffect(() => {
    const host = hostRef.current;
    const expectedAction = `https://app.kit.com/forms/${formId}/subscriptions`;
    const selector = `form[data-uid="${uid}"][data-sv-form="${formId}"][data-format="inline"]`;
    let submittedForm;
    let acceptedForm;

    function observeForm() {
      const form = host.querySelector(selector);
      if (!form) return;
      window.clearTimeout(loadTimeout);
      setReady(true);
      // Kit dispatches its completion event before adding its own success UI.
      if (form === acceptedForm && form.querySelector('[data-element="success"].formkit-alert-success')) {
        acceptedForm = undefined;
        acceptedRef.current();
      }
    }

    function verifySubmission(event) {
      const form = event.target;
      if (!form.matches(selector) || form.action !== expectedAction ||
        window.__sv_forms?.find((entry) => entry.element === form)?.settings?.after_subscribe?.action !== "message") {
        event.preventDefault();
        event.stopPropagation();
        setProblem("Email signup is temporarily unavailable. Your quiz answers are still here.");
        return;
      }
      if (!consentRef.current.reportValidity()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      setProblem("");
      acceptedForm = undefined;
      submittedForm = form;
    }

    // If Kit hasn't installed its listener, block a native browser POST.
    function preventNavigation(event) {
      event.preventDefault();
      submittedForm = undefined;
      setProblem("The email form is still loading. Please try again.");
    }

    function recordAcceptance(event) {
      if (submittedForm && event.target === submittedForm && event.detail?.uid === uid) {
        acceptedForm = submittedForm;
        submittedForm = undefined;
      }
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = uid;
    script.src = scriptUrl;
    const failed = () => setProblem("The email form could not load. Your quiz answers are still here.");
    const loadTimeout = window.setTimeout(failed, 12000);
    script.addEventListener("error", failed);
    host.addEventListener("submit", verifySubmission, true);
    host.addEventListener("submit", preventNavigation);
    host.addEventListener("ckjs:submission:complete", recordAcceptance);
    const observer = new MutationObserver(observeForm);
    observer.observe(host, { childList: true, subtree: true });
    host.append(script);

    return () => {
      window.clearTimeout(loadTimeout);
      script.removeEventListener("error", failed);
      observer.disconnect();
      host.removeEventListener("submit", verifySubmission, true);
      host.removeEventListener("submit", preventNavigation);
      host.removeEventListener("ckjs:submission:complete", recordAcceptance);
      host.replaceChildren();
    };
  }, [formId, scriptUrl, uid]);

  return <div className="mx-auto mt-7 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
    <label className="mb-4 flex items-start gap-3 text-sm leading-relaxed text-slate-700">
      <input ref={consentRef} type="checkbox" required className="mt-1 shrink-0"/>
      <span>I agree to receive emails from No Time to Share about vacation options and travel tips. I can unsubscribe at any time. See the <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="font-bold text-[#002F6C] underline">privacy notice</a>.</span>
    </label>
    {!ready && !problem && <p role="status" className="text-sm text-slate-600">Loading the email form…</p>}
    {problem && <p role="alert" className="mb-3 text-sm text-red-800">{problem}</p>}
    <div ref={hostRef} className="min-w-0 [&_input[type=email]]:!text-base"/>
  </div>;
}
