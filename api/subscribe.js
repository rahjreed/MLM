// Vercel Function: only a successful Kit response is reported as a saved signup.
// Configure KIT_API_KEY in Vercel Preview and Production environments before use.
const FORM_ID = "9018875";
const KIT_API = "https://api.kit.com/v4";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") return res.status(200).json({ ready: Boolean(process.env.KIT_API_KEY) });
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // A server-side API key avoids exposing credentials in browser JavaScript.
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Email signup temporarily unavailable" });

  const { email, name, consent, website, profile, travel_nights, travel_priority, booking_frustration } = req.body || {};
  // Honeypot for bots; legitimate UI does not populate this field.
  if (website) return res.status(400).json({ error: "Invalid submission" });
  const safeEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const safeName = typeof name === "string" ? name.trim() : "";
  if (consent !== true || safeName.length < 1 || safeName.length > 80 ||
    safeEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return res.status(400).json({ error: "Please provide a name, email, and consent" });
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
