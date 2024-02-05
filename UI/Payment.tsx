import Link from "next/link";
import styles from "./Payment.module.css";
export default function Payment() {
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h2>Congratulations 🎉 Your Purchased is successfully completed !</h2>
      </div>
      <div>
        <img
          src="/assert/card-payment.svg"
          alt="payment"
          className={styles.payment}
        />
      </div>
      <div className={styles.explore}>
        <p>
          You want explore more tours and enjoy your life with your family 👪
        </p>
        <Link href="/tours">Explore More &rarr;</Link>
      </div>
      <div className={styles.explore}>
        <p>You want view the booking information</p>
        <Link href="/dashboard/bookings">View Details</Link>
      </div>
    </main>
  );
}
