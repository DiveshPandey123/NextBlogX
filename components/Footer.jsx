import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <div className=" bottom-0 mt-5 lg:mt-0 pb-4 lg:py-5 flex flex-col gap-4 sm:flex-row items-center justify-between ">
      <div className="flex flex-1 gap-2 lg:gap-3 flex-col">
        <div className="flex gap-3 font-bold text-lg lg:text-2xl items-center">
          <Image
            src="/logo.png"
            alt="NextBlogX"
            width={50}
            height={50}
            className=" w-10 h-10 sm:w-12 sm:h-12 object-cover filter saturate-100 contrast-100"
          />
          <h1>NextBlogX</h1>
        </div>
        <p className="text-base lg:text-lg textColor">
          Stay connected with us! Explore more articles, discover new insights
          and join the conversation. Get the latest updates delivered straight
          to you.
          <br />
          <span className=" flex justify-center items-center mt-1 font-semibold lg:text-lg textColor">
            © NextBlogX {new Date().getFullYear()}. All rights reserved.
          </span>
        </p>
        <div className="flex justify-center ">
          <SocialMedia />
        </div>
      </div>
      <div className="flex flex-1 gap-10 md:gap-16 justify-center softText">
        <div className="flex flex-col items-center">
          <span className="font-bold textColor mb-1">Links</span>
          <Link href="">Home</Link>
          <Link href="about">About</Link>
          <Link href="blogs">Blogs</Link>
          <Link href="contact">Contact</Link>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold textColor mb-1">Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Food</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold textColor mb-1">Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">LinkedIn</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
