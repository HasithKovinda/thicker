"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./Pagination.module.css";

export default function Pagination() {
  return (
    <section className={styles.pagination}>
      <div>
        Showing <span>{1}</span> to <span>{5}</span> of <span>{20}</span>{" "}
        results
      </div>
      <div>
        <button>
          <BiChevronLeft /> <span>Previous</span>
        </button>
        <button>
          <BiChevronRight /> <span>Next</span>
        </button>
      </div>
    </section>
  );
}
