import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Exequiel Boribor | Workflow & AI Automation Specialist";
const description =
  "Workflow automations and AI apps built with n8n, Make, Zapier, Next.js and LLMs. Live demos you can try and public code you can read.";

// The preview picture is opengraph-image.png, next to this file.
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Zeki Boribor", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

// Runs before first paint so the page never flashes the wrong theme.
// Uses the visitor's saved choice, otherwise their system setting.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <a
          href="#main"
          className="sr-only rounded-lg bg-fg text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
