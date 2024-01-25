"use client";

import { format } from "date-fns";
import styles from "./TableRow.module.css";
import { formatCurrency } from "@/util/helper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "@/components/PDF";

type TableRowProps = {
  name: string;
  price: number;
  email: string;
  bookingDate: Date;
  userName: string;
  imageUrl: string;
};

export default function TableRow({
  userName,
  imageUrl,
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
        <button>
          <PDFDownloadLink
            document={
              <Invoice
                name={userName}
                imageUrl={imageUrl}
                amount={price}
                bookDate={bookingDate}
                packageName={name}
              />
            }
            fileName="somename.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        </button>
        {/* <button>DownLoad</button> */}
      </div>
    </div>
  );
}
