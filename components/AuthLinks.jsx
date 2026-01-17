"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";

const AuthLinks = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const isAuthenticated = status === "authenticated";

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link className="hidden md:block" href="/write">
            Write
          </Link>

          {/* Render image ONLY if user has uploaded one */}
          {session?.user?.image && (
            <Link href="/profile">
              <Image
                src={session.user.image}
                alt={session.user.name || "profile"}
                width={30}
                height={30}
                className="object-cover rounded-full"
              />
            </Link>
          )}
        </>
      ) : (
        <Link className="hidden md:block" href="/login">
          Login
        </Link>
      )}

      {/* Mobile menu icon */}
      <div className="cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
        <FaBars size={22} />
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden flex flex-col absolute top-20 left-0 h-[calc(100vh-80px)] w-full items-center justify-center gap-10 text-3xl bgColor"
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isAuthenticated ? (
            <Link href="/write">Write</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
