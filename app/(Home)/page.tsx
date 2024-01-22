import About from "@/UI/About";
import Hero from "@/UI/Hero";
import NewLetter from "@/UI/NewLetter";
import WhyUs from "@/UI/WhyUs";
import Tours from "@/components/Tour/Tours";
import ReviewSection from "@/components/Review/ReviewSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Tours />
      <WhyUs />
      <ReviewSection />
      <NewLetter />
    </main>
  );
}
