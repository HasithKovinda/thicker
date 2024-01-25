import { fetchBookings } from "@/util/actions";
import styles from "./Table.module.css";
import TableRow from "./TableRow";

export default async function Table() {
  const data = await fetchBookings();
  if (!data) return <h1>No Bookings Found</h1>;
  return (
    <div className={styles.main}>
      <header className={styles["table-header"]}>
        <div>Tour Name</div>
        <div>Email Address</div>
        <div>Price</div>
        <div>booked date</div>
        <div>Invoice</div>
      </header>
      <section>
        {data.map((booking) => {
          return (
            <TableRow
              key={booking.id}
              name={booking.tourId.name}
              price={booking.price}
              email={booking.email}
              bookingDate={booking.bookingDate}
            />
          );
        })}
      </section>
    </div>
  );
}
