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
  availability: "Available for freelance & consulting",
  photo: "/images/profile.png",
  logo: "/images/logo.png",
};

export const stats = [
  { value: "14", label: "Automations shipped" },
  { value: "2", label: "International clients" },
  { value: "40+", label: "Tools integrated" },
  { value: "3", label: "Platform certifications" },
];

// Published industry research, not results from my own clients.
// Not rendered right now: the "Why automate?" band was replaced by the Agentic
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

export const services = [
  {
    title: "Enterprise Workflow Automation",
    body: "Designing and deploying multi-step automations that orchestrate business processes across platforms.",
  },
  {
    title: "AI & LLM Integration",
    body: "Embedding OpenAI, Claude, and Gemini into real operations: classification, extraction, and generation with guardrails.",
  },
  {
    title: "CRM Integration & Data",
    body: "Keeping CRMs, spreadsheets, and inboxes in sync so data flows to the right place without manual entry.",
  },
  {
    title: "API & Systems Integration",
    body: "Connecting external services through REST APIs and webhooks when off-the-shelf connectors fall short.",
  },
];

export const differentiators = [
  {
    title: "Enterprise Automation",
    body: "Complex workflow orchestration across multiple platforms and systems.",
  },
  {
    title: "Advanced AI Integration",
    body: "Custom AI solutions tailored to specific business needs, not generic chatbots.",
  },
  {
    title: "Strategic AI Adoption",
    body: "Consulting and implementation that scales with the business.",
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
 * their own section rather than with the client automations in `projects`.
 */
export type CodeProject = {
  title: string;
  /** Short line above the title, e.g. the business area it covers. */
  tagline: string;
  summary: string;
  /**
   * Gallery screenshots in public/images/projects, shown in this order.
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
      "An invoice PDF arrives by email or upload, AI reads it, 12 validation checks run, and a one-click approval in Slack posts it to Xero as a bill with the PDF attached. Every invoice keeps a timeline from arrival to posted, and anything unusual is flagged in plain English. The dashboard is public: try it with a sample invoice or your own PDF.",
    shots: [
      {
        src: "/images/projects/ai-invoice-processing.png",
        caption: "The five steps, and a demo anyone can run",
      },
      {
        src: "/images/projects/ai-invoice-processing-detail.png",
        caption: "The original PDF beside what the AI read, with a confidence score on every field",
      },
      {
        src: "/images/projects/ai-invoice-processing-list.png",
        caption: "Every invoice, its status, and the plain-English reason it was flagged",
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
    // All four measured during the build (see the repo's extraction eval).
    // No time-saved figure here: the manual baseline is an industry rule of thumb.
    facts: [
      { value: "13 / 13", label: "test invoices read perfectly, every field" },
      { value: "12", label: "checks, each with a plain-English reason" },
      { value: "$0.0025", label: "in AI cost per invoice" },
      { value: "1", label: "human step: approve or reject" },
    ],
    liveUrl: "https://ai-invoice-processing-six.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/ai-invoice-processing",
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

export const pricing = [
  {
    name: "Quick Fix",
    price: "$30",
    unit: "per fix",
    blurb: "Fast fixes and patches for urgent issues.",
    features: ["Emergency support", "Bug fixes", "Minor adjustments", "Same-day response"],
    cta: "Get help",
  },
  {
    name: "Hourly",
    price: "$15",
    unit: "/ hour",
    blurb: "Pay-as-you-go for flexible needs.",
    features: ["Small tasks", "No long-term commitment", "Direct communication", "Quick turnaround"],
    cta: "Get started",
  },
  {
    name: "Project-Based",
    price: "Custom",
    unit: "scoped to you",
    blurb: "End-to-end automation systems built around your business.",
    features: [
      "Full project scope",
      "Dedicated development time",
      "Full documentation",
      "Post-launch support",
      "Custom integrations",
      "Scalable architecture",
    ],
    cta: "Let's talk",
    highlighted: true,
  },
  {
    name: "Maintenance",
    price: "$500",
    unit: "/ month",
    blurb: "Ongoing support and optimization.",
    features: ["Monthly retainer", "Priority support", "Regular updates", "Performance monitoring", "System optimization"],
    cta: "Subscribe",
  },
];

export const nav = [
  { label: "Agentic", href: "#agentic" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];
