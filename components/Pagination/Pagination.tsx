"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BOOKING_PAGE_SIZE, TOUR_PAGE_SIZE } from "@/util/constant";

type PaginationProps = {
  numberOfResults: number;
  pageTypes: "bookings" | "tour";
};

export default function Pagination({
  numberOfResults,
  pageTypes,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageSize =
    pageTypes === "bookings" ? BOOKING_PAGE_SIZE : TOUR_PAGE_SIZE;
  const pageCount = Math.ceil(numberOfResults / pageSize);

  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    params.set("page", next.toString());
    replace(`${pathName}?${params.toString()}`);
  }
  function handlePrevious() {
    const prv = currentPage === 1 ? currentPage : currentPage - 1;
    params.set("page", prv.toString());
    replace(`${pathName}?${params.toString()}`);
  }

  if (pageCount <= 1) return null;
  return (
    <section className={styles.pagination}>
      <div>
        Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? numberOfResults : currentPage * pageSize}
        </span>{" "}
        of <span>{numberOfResults}</span> results
      </div>
      <div className={styles.container}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          <BiChevronLeft /> <span>Previous</span>
        </button>
        <button onClick={handleNext} disabled={currentPage === pageCount}>
          <span>Next</span> <BiChevronRight />
        </button>
      </div>
    </section>
  );
}
