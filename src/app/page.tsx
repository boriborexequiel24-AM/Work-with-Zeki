import { AiApps } from "@/components/AiApps";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Hiring } from "@/components/Hiring";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Work";
import { homeData } from "@/lib/structuredData";

export default function Home() {
  return (
    <>
      <JsonLd data={homeData} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <AiApps />
        <Tools />
        <Work />
        <Experience />
        <Hiring />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Reveal />
      <SmoothScroll />
    </>
  );
}
