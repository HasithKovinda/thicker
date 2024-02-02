"use client";

import { signOut, useSession } from "next-auth/react";
import { FiBell } from "react-icons/fi";
import NavUser from "../../NavUser";
import styles from "./NavBar.module.css";
import { getUserSession } from "@/util/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserModel } from "@/types/model";
import Loading from "@/UI/Loading";
export default function NavBar() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);

  if (!queryData) return <Loading />;

  return (
    <nav className={styles.nav}>
      <div>
        <h2>Hello Welcome Back🙌,{queryData?.name}</h2>
        <p>Manage Your Profile and checkout your information</p>
      </div>

      <div className={styles["nav-heading"]}>
        <NavUser name={queryData?.name!} image={queryData?.photo} />
        <div className={styles.container}>
          <FiBell className={styles.notification} />
          <div className={styles.count}>
            <span>01</span>
          </div>
        </div>
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
