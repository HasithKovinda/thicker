import Content from "./Content";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import styles from "./DashBoardLayout.module.css";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
      <SideBar />
      <NavBar />
      <Content>{children}</Content>
    </main>
  );
}
