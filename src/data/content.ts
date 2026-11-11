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
  availability: "Available for freelance & consulting",
};

export const stats = [
  { value: "14", label: "Automations shipped" },
  { value: "2", label: "International clients" },
  { value: "40+", label: "Tools integrated" },
  { value: "3", label: "Platform certifications" },
];

export const services = [
  {
    title: "Enterprise Workflow Automation",
    body: "Designing and deploying multi-step automations that orchestrate business processes across platforms.",
  },
  {
    title: "AI & LLM Integration",
    body: "Embedding OpenAI, Claude, and Gemini into real operations — classification, extraction, and generation with guardrails.",
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
    period: "Jan 2026 — Aug 2026",
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
      "Started with simple spreadsheet-driven automations and evolved them into a fully managed AI content system — producing UGC-style assets at scale, from brief to final delivery, without manual intervention.",
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

export type Project = {
  title: string;
  platform: Platform;
  category: string;
  summary: string;
  tools: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Lead Processing + Inbound Carrier Email Automation",
    platform: "n8n",
    category: "CRM Automation",
    summary:
      "Monitors carrier Gmail, AI-classifies claim data with OpenAI, parses PDF attachments, syncs JobNimbus contacts, jobs and tasks, and assigns leads via round-robin with dashboard logging.",
    tools: ["n8n", "JobNimbus", "OpenAI", "Gmail"],
    featured: true,
  },
  {
    title: "Auto-Supplement Engine",
    platform: "n8n",
    category: "AI Workflow",
    summary:
      "Retrieves claim files from Drive, classifies documents across multi-branch pipelines (photos, estimates, measurements), sends them to Claude, and auto-generates HTML supplement reports back to Drive and Gmail.",
    tools: ["n8n", "Anthropic Claude", "Google Drive", "Gmail"],
    featured: true,
  },
  {
    title: "Suit Limitation + Appraisal Compliance Tracker",
    platform: "n8n",
    category: "CRM Automation",
    summary:
      "Monitors active JobNimbus claims, calculates elapsed time with custom JS logic, and routes into 30/60/120-day escalations with CRM notes, email alerts, and a Google Sheets audit trail.",
    tools: ["n8n", "JobNimbus", "Gmail", "Google Sheets"],
    featured: true,
  },
  {
    title: "AI UGC Content Automation System",
    platform: "n8n",
    category: "Content Pipeline",
    summary:
      "Scheduled multi-model prompting, Nano Banana image generation, ElevenLabs voiceover, video generation, and approval routing with Cloudinary uploads.",
    tools: ["n8n", "ElevenLabs", "Nano Banana", "Cloudinary"],
    featured: true,
  },
  {
    title: "Carrier Follow-Up Sequence",
    platform: "n8n",
    category: "CRM Automation",
    summary:
      "Calculates days since last carrier activity and routes claims into 14- and 21-day escalation reminders with webhook-driven sheet sync.",
    tools: ["n8n", "JobNimbus", "Google Sheets", "Gmail"],
  },
  {
    title: "AI Image Generation with Nano Banana Pro",
    platform: "n8n",
    category: "AI Workflow",
    summary:
      "Multi-modal image generation supporting text-to-image, image-to-image, and multi-image composition via the Kie.ai API.",
    tools: ["n8n", "Kie.ai", "Webhook", "HTTP Request"],
  },
  {
    title: "Outbound Lead Qualifier with Vapi",
    platform: "n8n",
    category: "Voice / Calling",
    summary:
      "Form submissions trigger AI voice calls through Vapi; call outcomes are tracked and logged to Google Sheets.",
    tools: ["n8n", "Vapi", "Google Sheets", "Webhook"],
  },
  {
    title: "Facebook AI Agent",
    platform: "n8n",
    category: "AI Workflow",
    summary: "Webhook-driven Facebook Messenger agent backed by OpenRouter and Google Gemini.",
    tools: ["n8n", "OpenRouter", "Google Gemini", "Facebook"],
  },
  {
    title: "Inbox Intelligence Router",
    platform: "n8n",
    category: "Email Automation",
    summary: "AI text classifier that routes Gmail messages into separate downstream workflows based on intent.",
    tools: ["n8n", "Gmail", "Claude"],
  },
  {
    title: "Task Completion Accounting Workflow",
    platform: "Make",
    category: "Reporting",
    summary:
      "Completing an Asana task generates a Xero transaction-level report and attaches the CSV back to the task.",
    tools: ["Make", "Asana", "Xero", "Google Sheets"],
  },
  {
    title: "Auto Sort Gmail Attachments",
    platform: "Make",
    category: "Email Automation",
    summary: "AI classifies inbound Gmail attachments and files them into the correct Google Drive folders.",
    tools: ["Make", "Gmail", "Google Drive"],
  },
  {
    title: "Asana CRM Lead Engagement Automation",
    platform: "Zapier",
    category: "CRM Automation",
    summary:
      "30-step Zapier workflow that routes leads through follow-ups, quotes, approvals, and closures based on Asana task status.",
    tools: ["Zapier", "Asana", "Gmail", "Google Drive"],
  },
  {
    title: "AI Content Repurposing",
    platform: "Zapier",
    category: "Content Pipeline",
    summary: "Transcribes a single source video and republishes it as platform-tailored posts on Facebook and LinkedIn.",
    tools: ["Zapier", "Google Drive", "AI by Zapier", "LinkedIn"],
  },
  {
    title: "Lead Capture With Instant Follow-Up",
    platform: "GoHighLevel",
    category: "CRM Automation",
    summary:
      "Captures inbound leads and triggers instant SMS follow-up, scheduled calls, and tag-based response handling.",
    tools: ["GoHighLevel", "SMS", "Calls"],
  },
];

export const certifications = [
  { platform: "Zapier", title: "AI Automation with Zapier", date: "Oct 2025" },
  { platform: "Make", title: "AI Automation with Make.com", date: "Nov 2025" },
  { platform: "n8n", title: "AI Automation with n8n", date: "Dec 2025" },
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
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];
