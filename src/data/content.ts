// Single source of truth for all site copy.
// Migrated from https://workwithbori.cloud/ (see docs/current-portfolio-content.md).

export const profile = {
  name: "Exequiel DC. Boribor",
  shortName: "Zeki Boribor",
  role: "Workflow & AI Automation Specialist",
  tagline:
    "I design enterprise workflow automations and AI integrations that turn complex business processes into streamlined, intelligent systems.",
  email: "boribor.exequiel24@gmail.com",
  linkedin: "https://www.linkedin.com/in/exequiel-boribor-98a832189",
  github: "https://github.com/boriborexequiel24-AM",
  availability: "Open to roles and contract work",
  photo: "/images/profile.png",
  logo: "/images/logo.png",
};

// Each section's heading, in page order.
export const sections = {
  hero: { before: "I build automations that", accent: "run the business", after: "for you." },
  aiApps: {
    eyebrow: "Built with Claude Code",
    title: "AI apps and agents, shipped as working software.",
    intro:
      "These are applications, not platform workflows. I design and write them with Claude Code, the source is public, and the demos are live for anyone to try.",
  },
  tools: {
    eyebrow: "Stack",
    title: "The tools I wire together.",
    intro: "Platform-agnostic: I pick the right tool for the job, then connect it to everything else.",
    workLink: "See workflows",
    experienceLink: "See experience",
  },
  work: {
    eyebrow: "Selected work",
    // Some covers show a workflow that is switched off, so don't say they all run in production.
    title: "Automations I've designed and built.",
    // The number of projects goes in front.
    intro: "workflows. Here's what each one does and the stack behind it.",
  },
  experience: { eyebrow: "Experience", title: "Where I've done the work." },
  hiring: {
    eyebrow: "Hiring",
    title: "Let's start with a conversation.",
    intro:
      "I'm open to a role on a team and to contract work. The fastest way to find out if I'm a fit is twenty minutes talking about the actual process.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a process that eats your team's time?",
    titleAccent: "Let's automate it.",
    intro:
      "I'm open to a role on a team and to contract work. Tell me about the role, or about the process you want fixed, and I'll reply within a day.",
  },
};

export const stats = [
  { value: "16", label: "Automations shipped" },
  { value: "2", label: "International clients" },
  { value: "40+", label: "Tools integrated" },
  { value: "3", label: "Platform certifications" },
];

// Published industry research, not results from my own clients.
// Not rendered right now: the "Why automate?" band was replaced by the AI apps
// section. Kept because every entry is sourced and hard to reassemble.
// Every entry must link to its source. Don't add a stat without one.
export const industryStats = [
  {
    value: "28%",
    label: "of the workweek goes to reading and answering email.",
    source: "McKinsey Global Institute, 2012",
    url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy",
  },
  {
    value: "7×",
    label: "more likely to reach a decision-maker when a lead gets a reply within an hour.",
    source: "Harvard Business Review, 2011",
    url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  },
  {
    value: "5.5 hrs",
    label: "a week the average sales rep spends typing data into their CRM.",
    source: "Introhive survey, via HubSpot",
    url: "https://blog.hubspot.com/sales/why-your-sales-reps-hate-crm-software",
  },
  {
    value: "4.9 hrs",
    label: "a week workers believe they'd save with better processes.",
    source: "Asana Anatomy of Work, 2023",
    url: "https://investors.asana.com/news-releases/news-release-details/asana-anatomy-work-global-index-2023-smart-collaboration-and",
  },
];

export const toolGroups = [
  { label: "Automation", tools: ["n8n", "Make", "Zapier", "Webhooks", "REST APIs"] },
  {
    label: "AI & Models",
    tools: ["OpenAI", "Anthropic Claude", "Google Gemini", "DeepSeek", "Perplexity", "OpenRouter"],
  },
  { label: "Media & Voice", tools: ["ElevenLabs", "Vapi", "Kie.ai", "Nano Banana", "Veo", "Cloudinary"] },
  {
    label: "CRM & Ops",
    tools: ["GoHighLevel", "JobNimbus", "ClickUp", "Asana", "Airtable", "Notion", "Supabase"],
  },
  {
    label: "Communication",
    tools: ["Gmail", "Slack", "Twilio", "WhatsApp", "Telegram", "Discord", "Facebook", "LinkedIn"],
  },
  { label: "Data & Finance", tools: ["Google Sheets", "Google Drive", "Xero", "Stripe", "PayPal"] },
  {
    label: "Code & Deploy",
    tools: ["Claude Code", "Next.js", "TypeScript", "Tailwind CSS", "Python", "Vercel", "GitHub"],
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  outcomes?: string[];
  projects?: string[];
  tools: string[];
};

export const experience: Experience[] = [
  {
    role: "CRM & AI Automation Specialist",
    org: "Insurance & Public Adjusting Operations",
    period: "Jan 2026 to Aug 2026",
    location: "Freelance · US-based client",
    summary:
      "Designed and deployed AI-assisted operational systems for insurance and public adjusting workflows using n8n, CRM integrations, and large language models.",
    highlights: [
      "Carrier email intake and classification",
      "Lead processing and CRM synchronization",
      "AI-assisted claim documentation workflows",
      "Deadline and compliance tracking systems",
      "Automated task creation and team notifications",
      "Google Drive and spreadsheet-based operational pipelines",
    ],
    projects: [
      "Lead Automated Processing + Inbound Carrier Email Automation",
      "Suit Limitation + Appraisal Compliance Tracker",
      "Carrier Follow-Up Reminder System",
      "Automated Google Drive Claim Folder System",
      "AI-Assisted Auto-Supplement Engine",
    ],
    tools: ["n8n", "JobNimbus", "OpenAI API", "Anthropic API", "Gmail", "Google Sheets"],
  },
  {
    role: "AI UGC Content Automation System",
    org: "Contract / Independent",
    period: "Contract",
    location: "Netherlands-based client",
    summary:
      "Started with simple spreadsheet-driven automations and evolved them into a fully managed AI content system. It now produces UGC-style assets at scale, from brief to final delivery, without manual intervention.",
    highlights: [
      "End-to-end content production system replacing fragmented manual workflows",
      "AI text, image, voice, and video generation in one pipeline with built-in quality controls",
      "Approval-based review steps so stakeholders sign off before anything goes live",
      "High-volume output that scaled without adding headcount",
    ],
    outcomes: ["Reduced manual effort", "Faster turnaround", "Higher reliability", "Scalable output"],
    tools: ["n8n", "OpenAI", "Kie.ai", "Nano Banana Pro", "ElevenLabs", "Veo", "Cloudinary", "Google Drive"],
  },
];

export type Platform = "n8n" | "Make" | "Zapier" | "GoHighLevel";

/**
 * Systems built with Claude Code: applications I design and write, not platform
 * workflows. They have public source and a demo anyone can use, so they go in
 * their own section. Two of them run on n8n, and `projects` shows that side of them.
 */
export type CodeProject = {
  title: string;
  /** Short line above the title, e.g. the business area it covers. */
  tagline: string;
  summary: string;
  /**
   * Screenshots in public/images/projects, shown as thumbnails in this order.
   * The first one is the cover. Crop out browser chrome before adding one:
   * an n8n canvas with the address bar still in it leaks the server URL.
   */
  shots: {
    src: string;
    caption: string;
    /**
     * "contain" fits the whole image in the frame instead of filling it.
     * Use it for n8n canvases, which are far wider than the frame and lose
     * most of the flow when cropped.
     */
    fit?: "contain";
  }[];
  stack: string[];
  /** Measured during the build. Never add a figure that wasn't. */
  facts: { value: string; label: string }[];
  liveUrl?: string;
  repoUrl?: string;
};

export const codeProjects: CodeProject[] = [
  {
    title: "AI Invoice Processing",
    tagline: "Accounts payable, end to end",
    summary:
      "An invoice PDF arrives by email or upload, AI reads it, 12 validation checks run, and a one-click approval in Slack posts it to Xero as a bill with the PDF attached. The dashboard, The Invoice Desk, marks up every invoice the way an accountant would with a red pen: each check leaves a plain-English note in the margin. It's public: try it with a sample invoice or your own PDF.",
    shots: [
      {
        src: "/images/projects/ai-invoice-processing.png",
        caption: "One invoice, read and marked up by the checks, field by field",
      },
      {
        src: "/images/projects/ai-invoice-processing-detail.png",
        caption: "A flagged invoice: the original PDF beside its 12 margin notes",
      },
      {
        src: "/images/projects/ai-invoice-processing-list.png",
        caption: "The ledger: every invoice, its status, and what the checks found",
      },
      {
        src: "/images/projects/ai-invoice-processing-flow-intake.png",
        caption:
          "Intake and extraction in n8n: fingerprint the file, read it with AI, run the checks, then ask Slack",
        fit: "contain",
      },
      {
        src: "/images/projects/ai-invoice-processing-flow-approval.png",
        caption:
          "Approval and posting: every Slack click is signature-checked, then the bill and its PDF go to Xero",
        fit: "contain",
      },
      {
        src: "/images/projects/ai-invoice-processing-flow-email.png",
        caption:
          "Email intake: a labelled Gmail message hands its PDF attachments straight to the pipeline",
        fit: "contain",
      },
      {
        src: "/images/projects/ai-invoice-processing-flow-cleanup.png",
        caption:
          "Housekeeping: demo uploads and their Slack messages are deleted after 24 hours",
        fit: "contain",
      },
    ],
    stack: ["n8n", "OpenAI", "Supabase", "Slack", "Xero", "Next.js"],
    // All four measured during the build, in the repo's own extraction eval.
    // The read time is the AI call itself: 3.4s across the eval set, 4.1s in n8n.
    // Don't take it from the live dashboard's average, which is a rolling 500
    // events with no time window and still has pre-fix runs in it. No time-saved
    // figure here either: the manual baseline is an industry rule of thumb.
    facts: [
      { value: "13 / 13", label: "test invoices read perfectly, every field" },
      { value: "12", label: "checks, each with a plain-English note" },
      { value: "~4s", label: "for the AI to read one invoice" },
      { value: "$0.0025", label: "in AI cost per invoice" },
    ],
    liveUrl: "https://ai-invoice-processing-six.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/ai-invoice-processing",
  },
  {
    title: "Lead Warden",
    tagline: "AI lead follow-up for home services",
    summary:
      "Every new lead for Copperline, a made-up Denver plumbing company, gets a reply in seconds, day or night. An AI agent reads the request and picks one next step from a fixed menu: offer visit times, book, ask a question or escalate an emergency. Rules check every message before it goes out, the owner approves any price in Slack, and quiet leads get followed up on day 1, 3 and 7, then closed on day 10. The demo is public: play the customer and chat with it.",
    shots: [
      {
        src: "/images/projects/lead-warden.png",
        caption: "The customer's side: a made-up Denver plumber that answers at 2am",
      },
      {
        src: "/images/projects/lead-warden-owner.png",
        caption: "The owner view: median time to first reply, bookings and follow-ups",
      },
      {
        src: "/images/projects/lead-warden-lead.png",
        caption: "One lead from start to close, with the reason for every decision",
      },
      {
        src: "/images/projects/lead-warden-flow-agent.png",
        caption:
          "The agent turn in n8n: read the lead with AI, pick the next step, check it against the rules, then reply by email or Slack",
        fit: "contain",
      },
      {
        src: "/images/projects/lead-warden-flow-email.png",
        caption:
          "Email intake: every minute, labelled Gmail messages are handed to the agent, then the label comes off",
        fit: "contain",
      },
      {
        src: "/images/projects/lead-warden-flow-approval.png",
        caption:
          "Price approval: every Slack click is signature-checked, then the approved price is emailed or handed off",
        fit: "contain",
      },
      {
        src: "/images/projects/lead-warden-flow-follow-ups.png",
        caption:
          "Follow-ups: quiet leads get a message written by AI on day 1, 3 and 7, then are closed on day 10",
        fit: "contain",
      },
      {
        src: "/images/projects/lead-warden-flow-owner-action.png",
        caption:
          "Demo owner action: a visitor approves a price on the page, and the Slack message updates to match",
        fit: "contain",
      },
      {
        src: "/images/projects/lead-warden-flow-cleanup.png",
        caption: "Housekeeping: visitor leads are deleted after 24 hours",
        fit: "contain",
      },
    ],
    stack: ["n8n", "OpenAI", "Supabase", "Slack", "Gmail", "Next.js"],
    // From the repo's agent eval (35 cases) and the live demo's owner view.
    facts: [
      { value: "~8s", label: "median first reply on the live demo" },
      { value: "35 / 35", label: "test cases, right next step every time" },
      { value: "~$0.003", label: "in AI cost per reply" },
      { value: "Day 1·3·7", label: "follow-ups, then closed on day 10" },
    ],
    liveUrl: "https://leadwarden.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/ai-lead-follow-up",
  },
  {
    title: "Kestrel Studio CRM",
    tagline: "A full CRM for a marketing agency",
    summary:
      "The CRM of Kestrel Studio, a made-up 12-person marketing agency. It follows the work from a first conversation to a signed retainer and its renewal. AI sums up a company's history, drafts the next follow-up, and answers questions about the pipeline through read-only lookups, with links to the records. Nothing is really sent. The demo is public, with no sign-up: play Maya, the Account Director, and change anything in your own private copy.",
    shots: [
      {
        src: "/images/projects/kestrel-crm.png",
        caption: "The pipeline: open deals by owner and stage, with totals and overdue next steps",
      },
      {
        src: "/images/projects/kestrel-crm-home.png",
        caption: "Home: what needs Maya today, and the retainers about to end",
      },
      {
        src: "/images/projects/kestrel-crm-deal.png",
        caption: "A deal open beside the board, with its next step, a draft box and an AI summary",
      },
      {
        src: "/images/projects/kestrel-crm-ask.png",
        caption: "Ask the pipeline: next month's renewals, with a link to each record",
      },
      {
        src: "/images/projects/kestrel-crm-phone.png",
        caption: "The pipeline on a phone, one stage at a time",
        fit: "contain",
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "OpenAI", "Vercel"],
    // From the repo's README. The cost is the average over the demo's first real calls;
    // a summary or a draft cost $0.001 or less.
    facts: [
      { value: "312", label: "tests, run against a local copy of the database" },
      { value: "~$0.003", label: "in AI cost per question" },
      { value: "5", label: "fixed read-only lookups the AI can call" },
      { value: "24 hrs", label: "until each visitor's private copy is cleared" },
    ],
    liveUrl: "https://kestrel-studio-crm.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/kestrel-studio-crm",
  },
];

export type Project = {
  title: string;
  platform: Platform;
  category: string;
  summary: string;
  tools: string[];
  /** Workflow screenshots in public/images/projects. The first one is the cover. */
  images: string[];
  /**
   * Zeki's own before/after estimate for this client. Only add one he has confirmed,
   * built from how often the task happened and how long it took by hand.
   * e.g. { saved: "~8 hrs/week", basis: "~20 emails/day × ~5 min each" }
   */
  estimate?: { saved: string; basis: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Lead Processing + Inbound Carrier Email Automation",
    images: ["/images/projects/lead-automated-processing.png"],
    platform: "n8n",
    category: "CRM Automation",
    summary:
      "Monitors carrier Gmail, AI-classifies claim data with OpenAI, parses PDF attachments, syncs JobNimbus contacts, jobs and tasks, and assigns leads via round-robin with dashboard logging.",
    tools: ["n8n", "JobNimbus", "OpenAI", "Gmail"],
    // From Zeki (2026-11-12): 20 emails/day normally, up to 40 when busy, 5-10 min each by hand.
    // Low end: 20 × 5 min × 5 days ≈ 8.3 hrs/week. High end: 40 × 10 min × 5 days ≈ 33 hrs/week.
    estimate: { saved: "8+ hrs/week", basis: "20 to 40 carrier emails/day × 5 to 10 min each" },
    featured: true,
  },
  {
    title: "Auto-Supplement Engine",
    images: ["/images/projects/auto-supplement-engine.png"],
    platform: "n8n",
    category: "AI Workflow",
    summary:
      "Retrieves claim files from Drive, classifies documents across multi-branch pipelines (photos, estimates, measurements), sends them to Claude, and auto-generates HTML supplement reports back to Drive and Gmail.",
    tools: ["n8n", "Anthropic Claude", "Google Drive", "Gmail"],
    featured: true,
  },
  {
    title: "Suit Limitation + Appraisal Compliance Tracker",
    images: ["/images/projects/suit-limitation-compliance-tracker.png"],
    platform: "n8n",
    category: "CRM Automation",
    summary:
      "Monitors active JobNimbus claims, calculates elapsed time with custom JS logic, and routes into 30/60/120-day escalations with CRM notes, email alerts, and a Google Sheets audit trail.",
    tools: ["n8n", "JobNimbus", "Gmail", "Google Sheets"],
    featured: true,
  },
  {
    title: "AI UGC Content Automation System",
    images: ["/images/projects/ai-ugc-content-automation.png"],
    platform: "n8n",
    category: "Content Pipeline",
    summary:
      "Scheduled multi-model prompting, Nano Banana image generation, ElevenLabs voiceover, video generation, and approval routing with Cloudinary uploads.",
    tools: ["n8n", "ElevenLabs", "Nano Banana", "Cloudinary"],
    featured: true,
  },
  {
    title: "Carrier Follow-Up Sequence",
    images: ["/images/projects/carrier-followup-sequence.png"],
    platform: "n8n",
    category: "CRM Automation",
    summary:
      "Calculates days since last carrier activity and routes claims into 14- and 21-day escalation reminders with webhook-driven sheet sync.",
    tools: ["n8n", "JobNimbus", "Google Sheets", "Gmail"],
  },
  // The n8n side of two projects in `codeProjects`. Each cover is that project's own
  // n8n screenshots, stacked on one canvas at the same zoom.
  {
    title: "AI Invoice Processing",
    images: ["/images/projects/ai-invoice-processing-n8n.png"],
    platform: "n8n",
    category: "AI Workflow",
    summary:
      "Four workflows take an invoice from Gmail or an upload to Xero: OpenAI reads the PDF, validation checks run, and a signature-checked Slack click approves it and posts the bill with its PDF attached.",
    tools: ["n8n", "OpenAI", "Slack", "Xero"],
  },
  {
    title: "Lead Warden: AI Lead Follow-Up",
    images: ["/images/projects/lead-warden-n8n.png"],
    platform: "n8n",
    category: "AI Workflow",
    summary:
      "Six workflows answer every new lead: AI reads the message, picks one next step and replies by email, the owner approves prices in Slack, and quiet leads get a follow-up on day 1, 3 and 7.",
    tools: ["n8n", "OpenAI", "Gmail", "Slack"],
  },
  {
    title: "AI Image Generation with Nano Banana Pro",
    images: ["/images/projects/ai-image-generation-nano-banana.png"],
    platform: "n8n",
    category: "AI Workflow",
    summary:
      "Multi-modal image generation supporting text-to-image, image-to-image, and multi-image composition via the Kie.ai API.",
    tools: ["n8n", "Kie.ai", "Webhook", "HTTP Request"],
  },
  {
    title: "Outbound Lead Qualifier with Vapi",
    images: ["/images/projects/outbound-lead-qualifier-vapi.png"],
    platform: "n8n",
    category: "Voice / Calling",
    summary:
      "Form submissions trigger AI voice calls through Vapi; call outcomes are tracked and logged to Google Sheets.",
    tools: ["n8n", "Vapi", "Google Sheets", "Webhook"],
  },
  {
    title: "Facebook AI Agent",
    images: ["/images/projects/facebook-ai-agent.png"],
    platform: "n8n",
    category: "AI Workflow",
    summary: "Webhook-driven Facebook Messenger agent backed by OpenRouter and Google Gemini.",
    tools: ["n8n", "OpenRouter", "Google Gemini", "Facebook"],
  },
  {
    title: "Inbox Intelligence Router",
    images: ["/images/projects/inbox-intelligence-router.png"],
    platform: "n8n",
    category: "Email Automation",
    summary: "AI text classifier that routes Gmail messages into separate downstream workflows based on intent.",
    tools: ["n8n", "Gmail", "Claude"],
  },
  {
    title: "Task Completion Accounting Workflow",
    images: ["/images/projects/task-completion-accounting-workflow.png"],
    platform: "Make",
    category: "Reporting",
    summary:
      "Completing an Asana task generates a Xero transaction-level report and attaches the CSV back to the task.",
    tools: ["Make", "Asana", "Xero", "Google Sheets"],
  },
  {
    title: "Auto Sort Gmail Attachments",
    images: ["/images/projects/auto-sort-gmail-attachments.png"],
    platform: "Make",
    category: "Email Automation",
    summary: "AI classifies inbound Gmail attachments and files them into the correct Google Drive folders.",
    tools: ["Make", "Gmail", "Google Drive"],
  },
  {
    title: "Asana CRM Lead Engagement Automation",
    images: ["/images/projects/asana-crm-lead-engagement.png"],
    platform: "Zapier",
    category: "CRM Automation",
    summary:
      "30-step Zapier workflow that routes leads through follow-ups, quotes, approvals, and closures based on Asana task status.",
    tools: ["Zapier", "Asana", "Gmail", "Google Drive"],
  },
  {
    title: "AI Content Repurposing",
    images: ["/images/projects/ai-content-repurposing.png"],
    platform: "Zapier",
    category: "Content Pipeline",
    summary: "Transcribes a single source video and republishes it as platform-tailored posts on Facebook and LinkedIn.",
    tools: ["Zapier", "Google Drive", "AI by Zapier", "LinkedIn"],
  },
  {
    title: "Lead Capture With Instant Follow-Up",
    images: ["/images/projects/lead-capture-part1.png", "/images/projects/lead-capture-part2.png"],
    platform: "GoHighLevel",
    category: "CRM Automation",
    summary:
      "Captures inbound leads and triggers instant SMS follow-up, scheduled calls, and tag-based response handling.",
    tools: ["GoHighLevel", "SMS", "Calls"],
  },
];

export const certifications = [
  { platform: "Zapier", title: "AI Automation with Zapier", date: "Oct 2025", image: "/images/certs/zapier.png" },
  { platform: "Make", title: "AI Automation with Make.com", date: "Nov 2025", image: "/images/certs/make.png" },
  { platform: "n8n", title: "AI Automation with n8n", date: "Dec 2025", image: "/images/certs/n8n.png" },
].map((c) => ({ ...c, issuer: "Technical Virtual Assistants PH" }));

// How I'm open to working. Deliberately no rates: what the work costs depends
// on what it is, and that comes out of the conversation, not a card on a page.
export const engagement = {
  intro: {
    title: "What a first conversation looks like",
    body: "About twenty minutes. You walk me through the role or the process you want fixed, I tell you how I'd approach it and whether I'm the right person for it. No deck, no pitch. If it's a fit we talk about scope and terms from there.",
    cta: "Start a conversation",
  },
  openTo: [
    {
      kind: "Employment",
      name: "A role on your team",
      blurb: "Full-time or part-time, remote. Automation, AI integration, or operations engineering.",
      points: [
        "Owns systems end to end, from design to handover",
        "Works inside the stack you already run",
        "Writes the documentation as it goes",
      ],
    },
    {
      kind: "Project work",
      name: "A scoped project",
      blurb: "One process, built properly and handed over. Scope agreed in writing before anything starts.",
      points: [
        "Scope and success criteria set up front",
        "Built, tested against real cases, documented",
        "Handover so your team can run it without me",
      ],
    },
    {
      kind: "Retainer",
      name: "Ongoing support",
      blurb: "Keeping live automations healthy once they're carrying real work.",
      points: [
        "Monitoring, fixes, and changes as the process changes",
        "Extensions to systems already in production",
        "A direct line, not a ticket queue",
      ],
    },
  ],
  // Plain facts. The client regions come from the roles in Experience.
  facts: [
    { label: "Working", value: "Remote, with US and EU clients" },
    { label: "Open to", value: "Full-time, part-time, or contract" },
    { label: "Reply", value: "Within one business day" },
  ],
};

export const nav = [
  { label: "AI Apps", href: "#ai-apps" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Hiring", href: "#hiring" },
  { label: "Contact", href: "#contact" },
];
