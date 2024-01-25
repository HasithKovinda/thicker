import Table from "./Table";
import styles from "./Booking.module.css";
import Pagination from "@/components/Pagination/Pagination";

export default async function Booking() {
  return (
    <main className={styles.bookings}>
      <div className={styles.heading}>
        <h2>See Your All The Bookings 💕 </h2>
        <p>
          Effortlessly track and download invoices for your bookings in one
          place. Your personalized travel hub ensures easy access to past and
          upcoming adventures.
        </p>
      </div>
      <Table />
      <Pagination numberOfResults={45} />
    </main>
  );
}
