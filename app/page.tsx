import Tours from "@/components/Tour/Tours";
import About from "@/components/UI/About";
import Hero from "@/components/UI/Hero";
import WhyUs from "@/components/UI/WhyUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tours />
      <WhyUs />
    </main>
  );
}
