import { Agentic } from "@/components/Agentic";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Hiring } from "@/components/Hiring";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Agentic />
        <Services />
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
