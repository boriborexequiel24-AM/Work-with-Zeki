import { AiApps } from "@/components/AiApps";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Hiring } from "@/components/Hiring";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <AiApps />
        <Tools />
        <Work />
        <Experience />
        <Hiring />
        <Contact />
      </main>
      <Footer />
      <Reveal />
      <SmoothScroll />
    </>
  );
}
