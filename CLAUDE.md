# Automations

## Overview
Portfolio demo project by Zeki (Exequiel). It shows prospective clients what automation work looks like in practice. The scope is still being defined and will grow over time.

## Migration
We're building a new portfolio site to replace the current one at https://workwithbori.cloud/.
All of its existing content (bio, experience, 14 projects, certs, pricing, contact) is captured in `docs/current-portfolio-content.md`. Use that file as the source of truth when migrating.

## Goals
- Build polished, working automations that are easy to demo to clients
- Keep everything clean, documented, and presentable, since this is client-facing
- Use real-world use cases that show business value (time saved, fewer errors, connected tools)

## Tech Stack (portfolio site)
- **Next.js 16** (App Router, `src/` dir, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS v4**: configured in `src/app/globals.css`, with no `tailwind.config` file
- Import alias: `@/*` → `src/*`
- Commands: `npm run dev` · `npm run build` · `npm run lint`
- This Next.js version may differ from what you remember. See `AGENTS.md` and check `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Tooling
- **n8n**: primary workflow automation platform
- **Integrations available**: Google Sheets, Google Docs, Google Drive, Slack
- **Platform**: Windows 11 (PowerShell / Git Bash)

## Conventions
- Give each workflow or automation its own clearly named folder
- Document every automation: what it does, its trigger, the services it connects, and its setup steps
- Never commit secrets, API keys, or credentials. Use environment variables or n8n credentials.
- Use sample or demo data only, never real client data

## Structure
- `src/app/`: single-page site (`page.tsx`), layout and metadata, and `globals.css` with the design tokens
- `src/components/`: one component per section (Hero, Services, Tools, Work, Experience, Pricing, Contact), plus shared pieces in `ui.tsx`
- `src/data/content.ts`: **all site copy lives here.** Edit content in this file, not in the components.

## Design
- Clean and simple with a techy touch. Two themes: **light** ("clean": off-white, white cards, teal-700 accent) and **dark** ("quiet": near-black, soft contrast, teal-300 accent). No gradients, glows or grid backgrounds.
- Theme is `data-theme` on `<html>`. The inline script in `layout.tsx` picks the saved choice or the system setting, and `ThemeToggle` switches and saves it.
- Techy touches come from Geist Mono labels, numbered section headers, and real workflow screenshots, not decoration.
- Fonts: Geist (sans) and Geist Mono (labels and meta text)
- Tailwind color tokens (defined per theme in `globals.css`): `bg`, `surface`, `surface-2`, `line`, `line-strong`, `fg`, `muted`, `subtle`, `accent`, `accent-soft`, `on-accent`, `danger`. Use tokens, never hard-coded colors, so both themes work.
- Images live in `public/images/` (projects, certs, profile, logo). Crop out browser bars before adding screenshots: they can leak the n8n server URL and bookmarks.

## Contact form → n8n
- The form POSTs to `src/app/api/contact/route.ts`, which validates the input, runs a honeypot check, and forwards to an n8n webhook.
- Env vars (see `.env.example`): `N8N_CONTACT_WEBHOOK_URL` and `N8N_WEBHOOK_SECRET`, which is sent as the `X-Webhook-Secret` header.
- The workflow export and setup steps are in `n8n/`. Store new n8n workflow exports there as well.
- Live on Zeki's self-hosted n8n. Instance URL and IDs are in `CLAUDE.local.md`, which is gitignored. **This repo is public: never commit the server address, workflow or credential IDs, or secrets.**
- **n8n MCP:** configured in `.mcp.json` and reads `N8N_API_URL` and `N8N_API_KEY` from Windows user env vars. Use it to build and manage workflows directly.
- The API route needs a Node server (e.g. Vercel). It won't work with a pure static export.
- Don't invent metrics. Every number on the site has to be backed by real work.
- `public/`: static assets
- `docs/`: reference material, including the content inventory from the old site
- `.claude/`: Claude Code project config

## Notes for Claude
- Prioritize clarity and presentation quality, because clients will see this work
- Ask before making large structural decisions about the project
