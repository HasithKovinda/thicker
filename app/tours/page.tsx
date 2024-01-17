import TourContent from "@/components/Tour/TourContent";
import TourCover from "@/components/Tour/TourCover";

export default async function page() {
  return (
    <main>
      <TourCover />
      <TourContent />
    </main>
  );
}
