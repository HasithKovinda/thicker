"use client";

import { fetchBookings } from "@/util/actions";
import styles from "./Table.module.css";
import TableRow from "./TableRow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Loading from "@/UI/Loading";
import { UserModel } from "@/types/model";
import Pagination from "@/components/Pagination/Pagination";
import { PAGE_SIZE } from "@/util/constant";

export default function Table() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const { data, isPending } = useQuery({
    queryKey: ["bookings", currentPage],
    queryFn: () => fetchBookings(currentPage, queryData?.id!),
  });

  const pageCount = Math.ceil(data?.numberOfResults! / PAGE_SIZE);

  if (currentPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", currentPage + 1],
      queryFn: () => fetchBookings(currentPage + 1, queryData?.id!),
    });
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", currentPage - 1],
      queryFn: () => fetchBookings(currentPage - 1, queryData?.id!),
    });

  if (isPending)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  if (!data) return <h1>No Bookings Found</h1>;

  return (
    <>
      <div className={styles.main}>
        <header className={styles["table-header"]}>
          <div>Tour Name</div>
          <div>Email Address</div>
          <div>Price</div>
          <div>booked date</div>
          <div>Invoice</div>
        </header>
        <section>
          {data.bookings.map((booking) => {
            return (
              <TableRow
                userName={booking.fullName}
                key={booking.id}
                name={booking.tourId.name}
                price={booking.price}
                email={booking.email}
                bookingDate={booking.bookingDate}
                imageUrl={booking.tourId.imageCover}
              />
            );
          })}
        </section>
      </div>
      <Pagination numberOfResults={data.numberOfResults} />
    </>
  );
}
