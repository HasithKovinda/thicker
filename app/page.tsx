import Tours from "@/components/Tour/Tours";
import About from "@/components/UI/About";
import Hero from "@/components/UI/Hero";
import NewLetter from "@/components/UI/NewLetter";
import Review from "@/components/UI/Review/Reviews";
import WhyUs from "@/components/UI/WhyUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tours />
      <WhyUs />
      <Review />
      <NewLetter />
    </main>
  );
}
