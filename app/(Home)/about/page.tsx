import BackgroundVideo from "@/UI/BackgroundVideo";
import AboutContent from "@/components/About/AboutContent";
import AboutFeature from "@/components/About/AboutFeature";
import TourGuide from "@/components/About/TourGuide";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About Thicker Tours",
  description:
    "Learn more about Thicker Tours - your go-to platform for discovering new destinations, planning unforgettable adventures, and making travel memories that last a lifetime.",
};

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
