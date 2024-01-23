"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import NavLink from "../NavLink";
import NavUser from "../NavUser";
import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "@/util/actions";

export default function Auth() {
  // const { data: session } = useSession();
  const { data: queryData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserSession(),
  });
  return (
    <>
      {queryData ? (
        <>
          <li>
            <NavUser name={queryData.name} image={queryData.photo} />
          </li>
          <li>
            <NavLink
              type="button"
              path="/login"
              onClick={() =>
                signOut({ callbackUrl: "http://localhost:3000/login" })
              }
            >
              Sign out
            </NavLink>
            {/* <NavLink herf="/api/auth/signout">Sign out</NavLink> */}
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink type="button" path="/login" onClick={() => signIn()}>
              Login
            </NavLink>
            {/* <NavLink type="link" link="/api/auth/signin">
              Login
            </NavLink> */}
          </li>
          <li>
            <NavLink type="link" path="/signUp">
              SignUp
            </NavLink>
          </li>
        </>
      )}
    </>
  );
}
