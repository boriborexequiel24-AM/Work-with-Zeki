// Contact form → n8n webhook.
// The webhook URL and secret stay server-side (see .env.example).

type Payload = { name: string; email: string; message: string; trap: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: unknown): Payload | string {
  if (!body || typeof body !== "object") return "Invalid request.";
  const { name, email, message, hp_check } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || name.length > 100) return "Please enter your name.";
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200)
    return "Please enter a valid email.";
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 5000)
    return "Please write a message (at least 10 characters).";
  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    trap: typeof hp_check === "string" ? hp_check : "",
  };
}

// At most 5 messages per visitor in 10 minutes. The counts live in this server instance's
// memory, so it slows a flood down rather than stopping one that spreads over many
// addresses or instances. A Vercel Firewall rule on this path would be the hard limit.
const LIMIT = 5;
const WINDOW_MS = 10 * 60_000;
const recent = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  for (const [key, times] of recent) {
    const live = times.filter((t) => now - t < WINDOW_MS);
    if (live.length) recent.set(key, live);
    else recent.delete(key);
  }
  const times = recent.get(ip) ?? [];
  if (times.length >= LIMIT) return true;
  recent.set(ip, [...times, now]);
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = validate(body);
  if (typeof result === "string") {
    return Response.json({ ok: false, error: result }, { status: 400 });
  }

  // Honeypot: real visitors never see the hidden "hp_check" field. Logged without the
  // message, so a wrongly dropped one can at least be noticed.
  if (result.trap) {
    console.warn("[contact] dropped: honeypot filled in");
    return Response.json({ ok: true });
  }

  // Vercel sets x-real-ip itself, so a visitor can't fake it.
  if (tooMany(request.headers.get("x-real-ip") ?? "unknown")) {
    return Response.json(
      { ok: false, error: "That's a lot of messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const url = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!url) {
    console.error("[contact] N8N_CONTACT_WEBHOOK_URL is not set");
    return Response.json({ ok: false, error: "Form is not configured yet." }, { status: 503 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.N8N_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.N8N_WEBHOOK_SECRET;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: result.name,
        email: result.email,
        message: result.message,
        source: "portfolio",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] webhook failed:", err);
    return Response.json({ ok: false, error: "Couldn't send right now." }, { status: 502 });
  }
}
