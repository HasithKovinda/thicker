"use client";

import styles from "./NavBar.module.css";
import { signOut } from "next-auth/react";
import { FiBell } from "react-icons/fi";
import NavUser from "../../NavUser";
import Loading from "@/UI/Loading";
import { fetchQuery } from "@/lib/actions/query/query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { type UserModel } from "@/types/model";

export default function NavBar() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<UserModel>(["user"]);
  const { data } = useQuery({
    queryKey: ["queries"],
    queryFn: () => fetchQuery(queryData?.id!),
  });
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
            <span>{data ? (data < 10 ? `0${data}` : data) : "0"}</span>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: process.env.LOGIN_URL })}>
          Sign out
        </button>
      </div>
    </nav>
  );
}
