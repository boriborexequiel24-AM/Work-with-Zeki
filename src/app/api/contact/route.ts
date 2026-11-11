// Contact form → n8n webhook.
// The webhook URL and secret stay server-side (see .env.example).

type Payload = { name: string; email: string; message: string; company?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: unknown): Payload | string {
  if (!body || typeof body !== "object") return "Invalid request.";
  const { name, email, message, company } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || name.length > 100) return "Please enter your name.";
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200)
    return "Please enter a valid email.";
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 5000)
    return "Please write a message (at least 10 characters).";
  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    company: typeof company === "string" ? company : "",
  };
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

  // Honeypot: real visitors never fill the hidden "company" field.
  if (result.company) return Response.json({ ok: true });

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
