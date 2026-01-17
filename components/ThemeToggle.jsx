"use client";
import Image from "next/image";
import React, {useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <div
      className={`relative px-1 w-11 h-6 cursor-pointer flex justify-between items-center rounded-3xl ${ theme === "dark" ? "bg-white" : "bg-[#0f172a]"}`}
    >
      <Image src="/moon.png" alt="moon" width={16} height={16}  onClick={()=>setTheme("dark")}/>
      <div
        className={`absolute rounded-full w-4 h-4 bgColor  ${ theme === "dark" ? " left-1" : "right-1" } `}
      ></div>
      <Image src="/sun.png" alt="sun" width={14} height={14} onClick={()=>setTheme("light")} />
    </div>
  );
};

export default ThemeToggle;
