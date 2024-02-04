"use client";
import Content from "./Content";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import styles from "./DashBoardLayout.module.css";
import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/lib/actions/auth/auth";
import Loading from "@/UI/Loading";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });
  if (isFetching)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  return (
    <main className={styles.container}>
      <SideBar />
      <NavBar />
      <Content>{children}</Content>
    </main>
  );
}
