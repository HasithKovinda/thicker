import AboutContent from "@/components/About/AboutContent";
import AboutFeature from "@/components/About/AboutFeature";
import AboutHero from "@/components/About/AboutHero";
import TourGuide from "@/components/About/TourGuide";

export default function about() {
  return (
    <div>
      <AboutHero />
      <AboutContent />
      <AboutFeature />
      <TourGuide />
    </div>
  );
}
