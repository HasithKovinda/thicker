"use client";

import MyDoc from "@/components/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function about() {
  return (
    <div>
      <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
}
