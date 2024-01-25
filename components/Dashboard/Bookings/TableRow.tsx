import { format } from "date-fns";
import styles from "./TableRow.module.css";
import { formatCurrency } from "@/util/helper";

type TableRowProps = {
  name: string;
  price: number;
  email: string;
  bookingDate: Date;
};

export default function TableRow({
  name,
  price,
  email,
  bookingDate,
}: TableRowProps) {
  const date = format(new Date(bookingDate), "yyyy-MM-dd");
  return (
    <div className={styles["table-row"]}>
      <div>{name}</div>
      <div>{email}</div>
      <div>{formatCurrency(price)}</div>
      <div>{date}</div>
      <div>
        <button>DownLoad</button>
      </div>
    </div>
  );
}
