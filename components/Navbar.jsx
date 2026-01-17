import Link from "next/link";
import React from "react";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";
import SocialMedia from "./SocialMedia";

const Navbar = () => {
  return (
    <div className=" z-40 bgColor fixed inset-0 px-4 lg:px-10 h-20 w-full flex items-center justify-between mx-auto lg:max-w-8xl xl:max-w-7xl">
      <div className=" hidden md:flex gap-4">
        <SocialMedia />
      </div>
      <div className=" absolute left-1/2 -translate-x-1/2 font-bold text-4xl">
        <Link href="/">NextBlogX</Link>
      </div>
      <div className="md:hidden">
        <ThemeToggle />
      </div>
      <div className="flex gap-6 justify-between items-center font-medium text-xl sm:text-lg">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <Link className="hidden md:block" href="/">
          Home
        </Link>
        <Link className="hidden md:block" href="/about">
          About
        </Link>
        <Link className="hidden md:block" href="/contact">
          Contact
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
