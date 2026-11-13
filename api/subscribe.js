// Vercel API endpoint keeps the visitor on No Time to Share after signup.
// Prefer authenticated Kit API when configured. Otherwise submit the legacy
// public Kit form server-to-server without following its configured redirect.
// The fallback needs a real end-to-end test before any production merge.
const FORM_ID = "9018875";
const KIT_API = "https://api.kit.com/v4";
const LEGACY_KIT_FORM = "https://app.kit.com/forms/" + FORM_ID + "/subscriptions";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") return res.status(200).json({ mode: process.env.KIT_API_KEY ? "authenticated" : "server_fallback", ready: true });
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Credentials never reach the browser. A legacy server-side fallback preserves
  // the old form's lead destination without sending visitors to its thank-you URL.
  const apiKey = process.env.KIT_API_KEY;
  const { email, name, consent, website, profile, travel_nights, travel_priority, booking_frustration } = req.body || {};
  // Honeypot for bots; legitimate UI does not populate this field.
  if (website) return res.status(400).json({ error: "Invalid submission" });
  const safeEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const safeName = typeof name === "string" ? name.trim() : "";
  if (consent !== true || safeName.length < 1 || safeName.length > 80 ||
    safeEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return res.status(400).json({ error: "Please provide a name, email, and consent" });
  }

  if (!apiKey) {
    try {
      // Same form ID as the original site. Never forward the redirect Location:
      // the old form might be configured with a TravelProX thank-you page.
      const payload = new URLSearchParams();
      payload.set("email_address", safeEmail);
      payload.set("fields[first_name]", safeName);
      payload.set("utf8", "✓");

      const upstream = await fetch(LEGACY_KIT_FORM, {
        method: "POST",
        redirect: "manual",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "text/html,application/xhtml+xml",
          "User-Agent": "NoTimeToShare-Subscription/1.0"
        },
        body: payload.toString(),
        signal: AbortSignal.timeout(10000)
      });

      // Only a standard form-success redirect counts as acceptance. HTML
      // responses are not counted: they might show errors or CAPTCHA prompts.
      if (upstream.status === 302 || upstream.status === 303) {
        return res.status(200).json({ ok: true, verification: "redirect_accepted" });
      }
      return res.status(502).json({
        error: "We couldn't verify your email signup. No results were unlocked."
      });
    } catch {
      return res.status(502).json({
        error: "We couldn't reach the email service. Please try again."
      });
    }
  }

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey
  };

  try {
    const subscriberResponse = await fetch(KIT_API + "/subscribers", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: safeEmail,
        first_name: safeName,
        fields: {
          travel_profile: typeof profile === "string" ? profile.slice(0, 80) : "",
          travel_nights: typeof travel_nights === "string" ? travel_nights.slice(0, 80) : "",
          travel_priority: typeof travel_priority === "string" ? travel_priority.slice(0, 100) : "",
          booking_frustration: typeof booking_frustration === "string" ? booking_frustration.slice(0, 100) : ""
        }
      })
    });
    if (!subscriberResponse.ok) throw new Error("Subscriber creation failed");
    const subscriberBody = await subscriberResponse.json();
    const subscriberId = subscriberBody?.subscriber?.id;
    if (!subscriberId) throw new Error("Kit did not return subscriber ID");

    const addToForm = await fetch(KIT_API + "/forms/" + FORM_ID + "/subscribers/" + encodeURIComponent(String(subscriberId)), {
      method: "POST",
      headers,
      body: JSON.stringify({ referrer: "https://www.notimetoshare.com/" })
    });
    if (!addToForm.ok) throw new Error("Subscriber form enrollment failed");

    return res.status(200).json({ ok: true });
  } catch {
    // Do not leak API details, the API key, or subscriber information.
    return res.status(502).json({ error: "We could not confirm your subscription. Please try again." });
  }
}
