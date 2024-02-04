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
              classType="normal"
              type="button"
              path="/login"
              onClick={() =>
                signOut({ callbackUrl: "http://localhost:3000/login" })
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
              classType="normal"
              type="button"
              path="/login"
              onClick={() => signIn()}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink classType="normal" type="link" path="/signUp">
              SignUp
            </NavLink>
          </li>
        </>
      )}
    </>
  );
}
