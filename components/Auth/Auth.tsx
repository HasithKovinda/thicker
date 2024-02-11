"use client";
import { useQuery } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { getUserSession } from "@/lib/actions/auth/auth";
import NavLink from "../NavLink";
import NavUser from "../NavUser";

export default function Auth() {
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
              activeclasstype="normal"
              type="button"
              path="/login"
              onClick={() =>
                signOut({ callbackUrl: process.env.NEXT_PUBLIC_LOGIN_URL })
              }
            >
              Sign out
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              activeclasstype="normal"
              type="button"
              path="/login"
              onClick={() => signIn()}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink activeclasstype="normal" type="link" path="/signUp">
              SignUp
            </NavLink>
          </li>
        </>
      )}
    </>
  );
}
