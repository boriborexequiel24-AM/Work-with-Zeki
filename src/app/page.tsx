import { AiApps } from "@/components/AiApps";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Hiring } from "@/components/Hiring";
import { Nav } from "@/components/Nav";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AiApps />
        <Tools />
        <Work />
        <Experience />
        <Hiring />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
