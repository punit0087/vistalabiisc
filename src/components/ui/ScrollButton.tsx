"use client";
import React, { useState, useEffect } from "react";

import Adown from "@/assets/arrow-down.svg";
import Aup from "@/assets/arrow-up.svg"; // Import the up arrow image
import Image from "next/image";

const ScrollButton: React.FC = () => {
  const [scrollDown, setScrollDown] = useState(true);

  const handleScroll = () => {
    if (scrollDown) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScrollChange = () => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
    const scrolledToTop = window.scrollY === 0;

    if (scrolledToBottom) {
      setScrollDown(false);
    } else if (scrolledToTop) {
      setScrollDown(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollChange);
    return () => {
      window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  return (
    <button
      onClick={handleScroll}
      className="fixed top-[93%] bg-none right-12 z-[99] text-sm items-center bg-zinc-900 border border-zinc-400 rounded-[50%] p-1"
    >
      <Image src={scrollDown ? Adown : Aup} alt="" className="w-8 h-8" />
    </button>
  );
};

export default ScrollButton;
