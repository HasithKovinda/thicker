import Review from "@/UI/Review/Reviews";
import Row from "@/UI/Row";
import CoverImage from "@/components/Tour Details/CoverImage";
import Info from "@/components/Tour Details/Info";

export default function page() {
  return (
    <main>
      <CoverImage />
      <Info />
      <Row />
      <Review title="Review For The Tour" />
    </main>
  );
}
