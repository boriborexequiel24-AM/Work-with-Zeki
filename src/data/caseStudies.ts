// The text of the case study pages (/work/<slug>). Like content.ts, every claim and number
// has to be backed: the demo projects by their public READMEs, the client work by the facts
// already in content.ts and the n8n screenshot. No client names (NDA).

export type CaseStudy = {
  slug: string;
  kind: "Demo project" | "Client work";
  title: string;
  /** The search result's title, at most about 60 characters. */
  metaTitle: string;
  /** The search result's text, at most about 155 characters. */
  description: string;
  intro: string;
  facts: { value: string; label: string }[];
  /** Original size, so the page doesn't jump while it loads. */
  cover: Picture;
  sections: {
    title: string;
    body?: string[];
    list?: string[];
    /** The list is a sequence. */
    ordered?: boolean;
    image?: Picture;
  }[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  published: string;
};

type Picture = { src: string; alt: string; caption: string; width: number; height: number };

const img = "/images/projects/";

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-invoice-processing",
    kind: "Demo project",
    title: "AI invoice processing with n8n, OpenAI and Xero",
    metaTitle: "AI Invoice Processing: n8n, OpenAI, Slack and Xero",
    description:
      "How I automated accounts payable in n8n: AI reads each invoice PDF, 12 checks run, someone approves in Slack, and the bill goes to Xero. Live demo.",
    intro:
      "An invoice PDF goes in and a bill in the accounting system comes out. Email it or upload it: AI reads it, the system checks it, a person approves it in Slack, and it gets posted to Xero with the PDF attached.",
    facts: [
      { value: "13 / 13", label: "test invoices read perfectly, every field" },
      { value: "12", label: "checks, each explained in plain English" },
      { value: "~4s", label: "for the AI to read one invoice" },
      { value: "$0.0025", label: "in AI cost per invoice" },
    ],
    cover: {
      src: `${img}ai-invoice-processing-detail.png`,
      alt: "The Invoice Desk dashboard: an invoice PDF beside notes from its 12 checks",
      caption: "A flagged invoice: the original PDF beside what each of the 12 checks found.",
      width: 2560,
      height: 2200,
    },
    sections: [
      {
        title: "The problem",
        body: [
          "Someone has to open every invoice, retype it and check the numbers before it can be paid. It's slow, and the mistakes that matter are easy to miss: the same invoice sent twice, a total that doesn't add up, a purchase order that's already closed.",
        ],
      },
      {
        title: "How it works",
        ordered: true,
        list: [
          "Invoices arrive in a watched Gmail label or through an upload on the dashboard. Both go through one webhook, and a file it has already seen is skipped.",
          "OpenAI reads the vendor, invoice number, dates, line items and totals, and gives a confidence score for each field.",
          "A database function runs 12 checks. Line items have to add up, the invoice can't be a duplicate, the vendor has to be known, and the purchase order has to exist, be open and match.",
          "Slack gets a message with the total, due date, status and any problems, plus Approve and Reject buttons. A flagged invoice needs an extra confirmation.",
          "An approved invoice becomes a bill in Xero with the PDF attached, and every step is logged.",
        ],
        image: {
          src: `${img}ai-invoice-processing-n8n.png`,
          alt: "The four n8n workflows behind AI Invoice Processing",
          caption: "The four n8n workflows: intake and extraction, approval and posting, email intake, and cleanup.",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "Why the checks aren't AI",
        body: [
          "The AI only reads. Deciding whether an invoice is right is done by fixed rules, so the same invoice always gets the same answer and every flag comes with a reason someone can check. For example: \"Total 1,560.00 is 30% over PO PO-1007 (1,200.00).\"",
          "If the AI is unsure about a field, the invoice goes to review instead of straight to approval. Nothing is posted without a person clicking Approve.",
        ],
      },
      {
        title: "What keeps it safe",
        list: [
          "Slack clicks are checked against Slack's signature, so they can't be faked, and a second click on a decided invoice changes nothing.",
          "If Xero refuses a bill, the approval is kept, the reason is saved and the team gets an alert.",
          "The browser never sees an API key, and PDFs open through short-lived signed links.",
          "The public demo has daily limits, and uploads are deleted after 24 hours and never reach Xero.",
        ],
      },
      {
        title: "How I tested it",
        body: [
          "I wrote 13 test invoices that cover clean cases and the problems accounts payable teams see: duplicates, wrong math, missing or exceeded purchase orders, unknown vendors, a blurry scan, a two-page invoice and one in euros.",
          "Four OpenAI models were scored against an answer key. All four read every invoice correctly, so I picked the one with the steadiest confidence scores. The most expensive model cost about six times more for no gain in accuracy.",
          "Every sample also goes through the live n8n workflow, and seven approval scenarios run with signed Slack clicks, including a forged request and a bill Xero rejects.",
        ],
      },
    ],
    stack: ["n8n", "OpenAI", "Supabase", "Slack", "Xero", "Gmail", "Next.js"],
    liveUrl: "https://ai-invoice-processing-six.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/ai-invoice-processing",
    published: "2026-11-25",
  },
  {
    slug: "ai-lead-follow-up",
    kind: "Demo project",
    title: "An AI lead follow-up agent for home services",
    metaTitle: "AI Lead Follow-Up Agent for Home Services in n8n",
    description:
      "Lead Warden answers new leads in about 8 seconds, offers visit times, books and follows up. Built in n8n with OpenAI, Slack and Gmail. Live demo.",
    intro:
      "Lead Warden answers every new lead in seconds and keeps following up until the lead books, says no or goes quiet. The owner only steps in for prices, emergencies and anything the agent shouldn't answer alone.",
    facts: [
      { value: "~8s", label: "median first reply on the live demo" },
      { value: "35 / 35", label: "test cases, right next step every time" },
      { value: "~$0.003", label: "in AI cost per reply" },
      { value: "Day 1·3·7", label: "follow-ups, then closed on day 10" },
    ],
    cover: {
      src: `${img}lead-warden-lead.png`,
      alt: "Lead Warden's owner view: one lead with the reason for every decision",
      caption: "One lead from start to close, with the reason for every decision.",
      width: 2560,
      height: 1600,
    },
    sections: [
      {
        title: "The problem",
        body: [
          "A lead that arrives after hours or goes quiet is easy to lose, and nobody has time to chase them all. But a business can't let an AI send whatever it likes to customers either. It could make up a visit time or a price.",
          "So I built the demo around a made-up plumbing company in Denver, Copperline Plumbing & Air, to show both halves: fast replies, and limits on what the AI can do.",
        ],
      },
      {
        title: "How it works",
        ordered: true,
        list: [
          "A lead comes in through the website form or by email, and the agent replies in the same thread.",
          "AI reads the kind of job, how urgent it is, whether they want a price, the zip code, the language, and what's still missing.",
          "The agent picks one next step from a fixed menu: offer visit times, book, ask a question, answer from the FAQ, draft a price, escalate an emergency, decline, hand off to a person, or close.",
          "Rules in the database check the choice before anything is sent. If it breaks one, the lead goes to a person with the reason.",
          "Quiet leads get a new message on day 1, 3 and 7, written for that lead, and are closed on day 10.",
        ],
        image: {
          src: `${img}lead-warden-n8n.png`,
          alt: "The six n8n workflows behind Lead Warden",
          caption: "The six n8n workflows: the agent, email intake, price approval, follow-ups, the owner's actions and cleanup.",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "The rules the AI can't break",
        list: [
          "Only real, open visit times can be offered.",
          "No price goes out unless the owner approved it in Slack and it's within the price sheet.",
          "Every emergency reply carries the emergency line.",
          "\"Please stop emailing me\" stops everything at once.",
          "The service area is a list of zip codes, not the AI's opinion.",
        ],
      },
      {
        title: "How I tested it",
        body: [
          "35 labelled cases check that the agent picks the right next step: single leads, whole conversations and follow-ups. They include a gas smell, a price hidden in a long email, an attempt to talk the agent into a discount, and a reply in Spanish. The model in use gets all 35 right.",
          "Testing found real bugs, and each one became a test: a made-up visit time, a wrong weekday in a Spanish follow-up, a second booking when a lead picked another time, and a booked customer being chased after asking about the warranty.",
          "Another 68 checks run against the rules directly.",
        ],
      },
      {
        title: "Try it",
        body: [
          "On the live demo you play the customer. A day lasts a minute, so the whole follow-up sequence plays out in about ten minutes, and you can open the reason behind every message.",
        ],
      },
    ],
    stack: ["n8n", "OpenAI", "Supabase", "Slack", "Gmail", "Next.js"],
    liveUrl: "https://leadwarden.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/ai-lead-follow-up",
    published: "2026-11-25",
  },
  {
    slug: "custom-crm-with-ai",
    kind: "Demo project",
    title: "A custom CRM with AI built in, for a marketing agency",
    metaTitle: "Custom CRM with AI for a Marketing Agency: Next.js",
    description:
      "A custom agency CRM built with Next.js, Supabase and OpenAI. AI sums up accounts, drafts follow-ups and answers pipeline questions. Open demo, no sign-up.",
    intro:
      "The CRM of Kestrel Studio, a made-up 12-person marketing agency. It follows the work from a first conversation to a signed retainer and its renewal, and the AI works inside the screens people already use.",
    facts: [
      { value: "312", label: "tests, run against a local copy of the database" },
      { value: "~$0.003", label: "in AI cost per question" },
      { value: "5", label: "fixed read-only lookups the AI can call" },
      { value: "24 hrs", label: "until each visitor's private copy is cleared" },
    ],
    cover: {
      src: `${img}kestrel-crm.png`,
      alt: "Kestrel Studio CRM: the pipeline, with open deals by owner and stage",
      caption: "The pipeline: open deals by owner and stage, with totals and overdue next steps.",
      width: 1800,
      height: 1125,
    },
    sections: [
      {
        title: "Why a custom CRM",
        body: [
          "Agencies sell retainers: a monthly fee that has to be won, kept and renewed. This is one company's own tool, with its own stages and words, instead of a general CRM bent into shape.",
        ],
      },
      {
        title: "What the AI does",
        list: [
          "Summarize tells a company's story in three lines, and is marked out of date when something new is logged.",
          "Draft follow-up writes the next email for a deal. You can edit it and log it as sent. Nothing is really sent.",
          "Ask the pipeline answers questions such as \"What renews next month?\" with links to the records.",
        ],
        image: {
          src: `${img}kestrel-crm-ask.png`,
          alt: "Ask the pipeline answering a question about next month's renewals",
          caption: "Ask the pipeline: next month's renewals, with a link to each record.",
          width: 1800,
          height: 1125,
        },
      },
      {
        title: "Keeping the answers honest",
        body: [
          "The model can only call five fixed, read-only lookups, each through the visitor's own sign-in. It names records by short names like \"D1\", and the app puts in the real name and link, so a link can only lead to a record a lookup found. Each answer says what was looked up.",
          "The real AI got some answers wrong, and those became tests. Asked what renews next month, it looked 31 days ahead and missed a retainer. Its lookups now take exact dates.",
        ],
      },
      {
        title: "A public demo with real sign-in",
        body: [
          "Opening the demo creates an anonymous user and a private copy of the sample data. Row-level security in the database keeps each visitor to their own rows, even against direct API calls, and an hourly job clears copies after 24 hours.",
          "The business rules live in the database too. Winning a deal is one function that accepts the proposal and starts or extends the retainer together, so the two can't disagree.",
        ],
      },
      {
        title: "How I tested it",
        body: [
          "312 tests act as real anonymous users against a local copy of the database, with its real rules and sign-in. The first ones written were the two failures that would hurt most: one visitor seeing another's data, and the AI limits not holding.",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "OpenAI", "Vercel"],
    liveUrl: "https://kestrel-studio-crm.vercel.app",
    repoUrl: "https://github.com/boriborexequiel24-AM/kestrel-studio-crm",
    published: "2026-11-25",
  },
  {
    slug: "insurance-email-automation",
    kind: "Client work",
    title: "Insurance lead and carrier email automation in n8n",
    metaTitle: "Insurance Email Automation with n8n and JobNimbus",
    description:
      "How I automated a US public adjusting team's carrier inbox with n8n, OpenAI and JobNimbus: 20 to 40 emails a day sorted, logged and assigned.",
    intro:
      "Leads and carrier emails for a US insurance and public adjusting company came into one inbox. I built the n8n workflow that reads each carrier email, updates JobNimbus and gives new leads to the sales reps. The client's name is withheld under NDA.",
    facts: [
      { value: "20 to 40", label: "carrier emails a day in the inbox" },
      { value: "5 to 10 min", label: "to handle each one by hand" },
      { value: "8+ hrs/week", label: "saved, my estimate from the low end" },
    ],
    cover: {
      src: `${img}lead-processing-carrier-email.png`,
      alt: "The n8n workflow for lead processing and inbound carrier email",
      caption: "The whole workflow in n8n: lead intake along the top, carrier email along the bottom.",
      width: 1715,
      height: 900,
    },
    sections: [
      {
        title: "The problem",
        body: [
          "The inbox got 20 to 40 carrier emails a day. Each one took 5 to 10 minutes to read, enter in the CRM and pass to a rep.",
        ],
      },
      {
        title: "How new leads are handled",
        ordered: true,
        list: [
          "Gmail is watched for new mail, and the workflow works out what type of email it is.",
          "If a lead comes as a spreadsheet, it's parsed. If it's in the email itself, the address and appointment time are read from the text and put in one format.",
          "JobNimbus is searched before anything is created, so a contact that already exists isn't added twice.",
          "The lead goes to the next sales rep in turn, and the contact and job are created in JobNimbus.",
          "The rep gets an email, and the assignment is added to a Google Sheets dashboard.",
        ],
      },
      {
        title: "How carrier emails are handled",
        ordered: true,
        list: [
          "Text is pulled out of any PDF attachment, so it's read together with the email.",
          "OpenAI classifies the email, and the message gets a Gmail label.",
          "The matching record is found in JobNimbus, a note and a task are added for the right team, and they get an email.",
          "Anything unclear is sent to a person instead of being guessed at.",
          "Emails that need chasing are passed on to a separate follow-up workflow.",
        ],
      },
      {
        title: "The result",
        body: [
          "No missed leads, no manual CRM entry, and leads split evenly across reps.",
          "Even at the low end, 20 emails a day at 5 minutes each over a 5-day week is about 8 hours. That's my own estimate from how often the work happened and how long it took by hand, not a figure from the client.",
        ],
      },
      {
        title: "What I built around it",
        body: [
          "The same client also got a tracker that raises claims at the 30, 60 and 120 day marks, reminders on day 14 and 21 when a carrier goes quiet, claim folders created in Google Drive, and an engine that sends a claim's files to Claude and saves the supplement report.",
        ],
      },
    ],
    stack: ["n8n", "JobNimbus", "OpenAI", "Gmail", "Google Sheets"],
    published: "2026-11-25",
  },
];
