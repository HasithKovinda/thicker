"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import NavLink from "../NavLink";
import NavUser from "../NavUser";

export default function Auth() {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user ? (
        <>
          <li>
            <NavUser name={session.user.name} image={session.user?.photo} />
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
