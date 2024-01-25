"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/util/constant";

type PaginationProps = {
  numberOfResults: number;
};

export default function Pagination({ numberOfResults }: PaginationProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(numberOfResults / PAGE_SIZE);

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
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount
            ? numberOfResults
            : currentPage * PAGE_SIZE}
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
