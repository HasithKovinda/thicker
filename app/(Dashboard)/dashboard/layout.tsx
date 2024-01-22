import DashBoardLayout from "@/components/Dashboard/Layout/DashBoardLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashBoardLayout>{children}</DashBoardLayout>
    </>
  );
}
