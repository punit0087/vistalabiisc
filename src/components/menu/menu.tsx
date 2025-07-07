"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // For Next.js 13+ with app directory

import logo from "@/assets/vista_logo1.svg";

export function NavigationMenuu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Close menu on path change
    closeMenu();
  }, [pathname]);

  return (
    <div className="fixed top-0 z-50 w-full flex items-center bg-black lg:flex lg:justify-between xl:flex xl:justify-between">
      <div className="sm:w-full sm:justify-between sm:flex md:w-full md:flex md:justify-between items-center">
        <a href="/">
          <Image src={logo} alt="Vista Logo" className="w-32 h-fit m-8 ml-8" />
        </a>
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden xl:hidden text-white mr-8"
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="w-6 sm:w-7 md:w-8 lg:w-9 xl:w-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Menu Content */}
      <div
        className={`fixed top-16 right-8 sm:w-[60vw] bg-black text-white text-[14px] sm:text-[18px] font-semibold ${
          isMenuOpen ? "block" : "hidden"
        } xl:flex xl:static xl:flex-row xl:items-center lg:flex lg:static lg:flex-row lg:items-center`}
      >
        <Link className="block m-4 sm:m-10" href="/" onClick={closeMenu}>
          Home
        </Link>
        <Link
          className="block m-4 sm:m-10"
          href="/publication"
          onClick={closeMenu}
        >
          Publications
        </Link>
        <Link className="block m-4 sm:m-10" href="/project" onClick={closeMenu}>
          Projects
        </Link>
        <Link
          className="block m-4 sm:m-10"
          href="/collaborators"
          onClick={closeMenu}
        >
          Collaborators
        </Link>
        <Link className="block m-4 sm:m-10" href="/team" onClick={closeMenu}>
          People
        </Link>
        <Link className="block m-4 sm:m-10" href="/gallery" onClick={closeMenu}>
          Gallery
        </Link>
        <Link
          className="block m-4 sm:m-10"
          href="/opportunities"
          onClick={closeMenu}
        >
          Opportunities
        </Link>
        <Link
          className="block m-4 sm:m-10"
          href="/contactus"
          onClick={closeMenu}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
