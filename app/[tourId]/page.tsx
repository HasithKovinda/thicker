import CoverImage from "@/components/Tour Details/CoverImage";
import Info from "@/components/Tour Details/Info";
import Review from "@/components/UI/Review/Reviews";
import Row from "@/components/UI/Row";
import { fetchAllTours } from "@/util/actions";

export default async function page() {
  await fetchAllTours();
  return (
    <main>
      <CoverImage />
      <Info />
      <Row />
      <Review title="Review For The Tour" />
    </main>
  );
}
