import BackgroundVideo from "@/UI/BackgroundVideo";
import AboutContent from "@/components/About/AboutContent";
import AboutFeature from "@/components/About/AboutFeature";
import TourGuide from "@/components/About/TourGuide";

export default function about() {
  return (
    <div>
      <BackgroundVideo />
      <AboutContent />
      <AboutFeature />
      <TourGuide />
    </div>
  );
}
