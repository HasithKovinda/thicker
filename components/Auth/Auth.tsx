"use client";
import { signIn, useSession } from "next-auth/react";
import NavLink from "../NavLink";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <>
      {session && session.user ? (
        <>
          <li>
            <span>{session.user.name}</span>
          </li>
          <li>
            <NavLink herf="/api/auth/signout">Sign out</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <button onClick={() => signIn()}>Login</button>
            {/* <NavLink herf="/api/auth/signin">Login</NavLink> */}
          </li>
          <li>
            <NavLink herf="/signUp">SignUp</NavLink>
          </li>
        </>
      )}
    </>
  );
}
