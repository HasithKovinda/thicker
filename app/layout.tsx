import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Provider";

export const metadata: Metadata = {
  title: "Discover the World with Thicker Tours",
  description:
    "Explore exciting destinations and plan your next adventure with our immersive tours web application. Start your journey now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
