import About from "@/UI/About";
import Hero from "@/UI/Hero";
import NewLetter from "@/UI/NewLetter";
import Review from "@/components/Review/Reviews";
import WhyUs from "@/UI/WhyUs";
import Tours from "@/components/Tour/Tours";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tours />
      <WhyUs />
      <Review title="Top Reviews For Treker" />
      <NewLetter />
    </main>
  );
}
