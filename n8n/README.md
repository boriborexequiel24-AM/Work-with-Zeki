# n8n Workflows

## portfolio-contact-form.json
Receives contact form submissions from the portfolio site and emails them to me.

**Flow:** Webhook (POST, header auth) → Gmail notification (reply-to is set to the visitor) → Respond `{ "ok": true }`

The Next.js route `src/app/api/contact/route.ts` validates the input and filters bots with a honeypot field before anything reaches n8n.

### Security
- The webhook requires an `X-Webhook-Secret` header (n8n Header Auth credential). Requests without it are rejected with a 403.
- The secret and webhook URL live only in environment variables. They are never committed.

### Setup
1. In n8n, go to **Workflows → Import from File** and choose `portfolio-contact-form.json`.
2. **Contact Form Webhook** node: create a **Header Auth** credential.
   - Name: `X-Webhook-Secret`
   - Value: a long random string (`node -e "console.log(crypto.randomUUID())"`)
3. **Notify Me (Gmail)** node: attach your Gmail OAuth2 credential.
4. **Activate** the workflow, then copy the **Production URL** from the Webhook node.
5. In the project root, copy `.env.example` to `.env.local` and fill in:
   ```
   N8N_CONTACT_WEBHOOK_URL=<production URL>
   N8N_WEBHOOK_SECRET=<same value as the credential>
   ```
6. Restart `npm run dev`. On the hosting platform (e.g. Vercel), set the same two environment variables.

### Ideas to extend
- Append each lead to a Google Sheet (a simple CRM log)
- Send a Slack ping
- Use AI to classify the inquiry (budget, urgency, which service) before notifying
- Send the visitor an auto-reply
