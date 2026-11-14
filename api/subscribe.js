const KIT_API = "https://api.kit.com/v4";

async function kitPost(path, apiKey, body) {
  const response = await fetch(KIT_API + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey
    },
    body: JSON.stringify(body),
    redirect: "error",
    signal: AbortSignal.timeout(4000)
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Kit did not accept the request");
  }
  return (await response.json()).subscriber;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, consent, website } = req.body || {};
  const safeEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const safeName = typeof name === "string" ? name.trim() : "";
  if (website || consent !== true || safeName.length < 1 || safeName.length > 80 ||
    safeEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return res.status(400).json({ error: "Please provide a valid first name, email address, and consent." });
  }

  const apiKey = process.env.KIT_API_KEY?.trim();
  const formId = process.env.KIT_FORM_ID?.trim();
  if (!apiKey || !/^\d+$/.test(formId ?? "")) {
    return res.status(503).json({ error: "Email signup is temporarily unavailable. Please try again later." });
  }

  try {
    const subscriber = await kitPost("/subscribers", apiKey, {
      email_address: safeEmail,
      first_name: safeName,
      state: "inactive"
    });
    if (!subscriber?.id || subscriber.email_address?.toLowerCase() !== safeEmail) {
      throw new Error("Kit did not identify the subscriber");
    }

    const enrolled = await kitPost(
      "/forms/" + formId + "/subscribers/" + encodeURIComponent(String(subscriber.id)),
      apiKey,
      { referrer: "https://www.notimetoshare.com/" }
    );
    if (enrolled?.id !== subscriber.id) {
      throw new Error("Kit did not confirm form enrollment");
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({
      error: "We couldn't confirm your signup. Your answers are still here. Please try again."
    });
  }
}
