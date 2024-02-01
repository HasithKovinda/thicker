import React from "react";
import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";

type ErrorProps = {
  path: string;
  title: string;
  content: string;
};

export default function Error({ path, title, content }: ErrorProps) {
  return (
    <main className="not-found">
      <div>
        <img src={path} alt={title} className="error-img" />
      </div>
      <div className="content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      <div className="not-found-btn">
        <Link href="/">Go Back to home</Link>
        <BiChevronRight />
      </div>
    </main>
  );
}
