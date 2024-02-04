"use client";

import styles from "./Table.module.css";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchBookings } from "@/lib/actions/booking/booking";
import Pagination from "@/components/Pagination/Pagination";
import TableRow from "./TableRow";
import Loading from "@/UI/Loading";
import { type UserModel } from "@/types/model";
import { BOOKING_PAGE_SIZE } from "@/util/constant";
import { useEffect } from "react";

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

  const pageCount = Math.ceil(data?.numberOfResults! / BOOKING_PAGE_SIZE);

  useEffect(() => {
    if (currentPage < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", currentPage + 1],
        queryFn: () => fetchBookings(currentPage + 1, queryData?.id!),
      });
    }

    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", currentPage - 1],
        queryFn: () => fetchBookings(currentPage - 1, queryData?.id!),
      });
    }
  }, [currentPage, pageCount, queryClient, queryData?.id]);

  if (isPending)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );

  if (!data?.bookings.length)
    return (
      <div className={styles["no-bookings"]}>
        <h2>
          No Bookings Found!. Please Hurry up and book a tour and enjoy your
          life with your lovers
        </h2>
        <Link href="/tours">Book Tour Now</Link>
      </div>
    );

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
          {data.bookings.map((booking, index) => {
            return (
              <TableRow
                userName={booking.fullName}
                key={index}
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
      <Pagination numberOfResults={data.numberOfResults} pageTypes="bookings" />
    </>
  );
}
