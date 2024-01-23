import Content from "./Content";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import styles from "./DashBoardLayout.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.container}>
        <SideBar />
        <NavBar />
        <Content>{children}</Content>
      </main>
    </HydrationBoundary>
  );
}
