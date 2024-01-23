"use client";

import { signOut, useSession } from "next-auth/react";
import NavUser from "../../NavUser";
import styles from "./NavBar.module.css";
import { getUserSession } from "@/util/actions";
import { useQuery } from "@tanstack/react-query";
export default function NavBar() {
  // const { data: session } = useSession();
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });
  return (
    <nav className={styles.nav}>
      <div>
        <h2>Hello Welcome Back🙌,{queryData?.name}</h2>
        <p>Manage Your Profile and checkout your information</p>
      </div>
      <div className={styles["nav-heading"]}>
        <NavUser name={queryData?.name!} image={queryData?.photo} />
        <button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/login" })
          }
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
