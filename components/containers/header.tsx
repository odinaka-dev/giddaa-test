"use client";

import { GiddaaImages } from "@/constant/image";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import ButtonComponent from "./button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Variants } from "framer-motion";

const HEADERDTA = [
  {
    linkName: "Tax Resources",
    link: "/",
    linkIcon: <ChevronRight size={16} />,
  },
  {
    linkName: "Tax Calculator",
    link: "/calculator",
    linkIcon: null,
  },
  {
    linkName: "Pricing",
    link: "/",
    linkIcon: null,
  },
  {
    linkName: "Success Stories",
    link: "/",
    linkIcon: null,
  },
];

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Animation variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <div className="bg-white py-4 fixed w-full z-1000 shadow-sm">
        <div className="max-w-[90%] sm:max-w-[90%] lg:max-w-250 xl:max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <Image
                src={GiddaaImages?.TaxLogo}
                alt="header_logo"
                width={120}
                height={40}
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,..."
                sizes="(max-width: 768px) 100vw, 120px"
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex justify-between gap-8 text-[14px]">
            {HEADERDTA.slice(0, 2).map((headerlinks, index) => (
              <Link
                href={headerlinks?.link}
                key={index}
                className="flex items-center gap-1 text-[#0A0A0A] hover:text-[#2C59C3] hover:font-bold cursor-pointer duration-300"
              >
                <span>{headerlinks?.linkName}</span>
                <span>{headerlinks?.linkIcon}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex justify-between gap-8 text-[14px]">
            {HEADERDTA.slice(2, 4).map((headerlinks, index) => (
              <Link
                href={headerlinks?.link}
                key={index}
                className="flex items-center gap-1 text-[#0A0A0A] hover:text-[#2C59C3] hover:font-bold cursor-pointer duration-300"
              >
                <span>{headerlinks?.linkName}</span>
                <span>{headerlinks?.linkIcon}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Call to action buttons - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href={"/"} className="underline font-bold text-[#4B4B4B]">
              <span>Login</span>
            </Link>
            <ButtonComponent />
          </div>

          {/* Mobile Menu Toggle - Visible only on mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#0A0A0A] hover:text-[#2C59C3] transition-colors z-1001"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* {isMenuOpen ? <X size={28} /> : <Menu size={28} />} */}
              {isMenuOpen ? (
                <X size={28} />
              ) : (
                <Image src={GiddaaImages?.menuIcon} alt="menu_icons" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-999 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col items-center justify-center h-full px-8 space-y-8">
              {/* Menu Links */}
              <nav className="flex flex-col items-center space-y-6 w-full text-[14px]">
                {HEADERDTA.map((headerlinks, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    className="w-full"
                  >
                    <Link
                      href={headerlinks?.link}
                      onClick={closeMenu}
                      className="flex items-center justify-start gap-2 text-[#0A0A0A] hover:text-[#2C59C3] text-[16px] font-medium cursor-pointer duration-300 py-3"
                    >
                      <span>{headerlinks?.linkName}</span>
                      <span>{headerlinks?.linkIcon}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <motion.div
                custom={HEADERDTA.length + 1}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
                className="w-full max-w-md"
              >
                <ButtonComponent />
              </motion.div>
              {/* Login Link */}
              <motion.div
                custom={HEADERDTA.length}
                variants={menuItemVariants}
                initial="closed"
                animate="open"
              >
                <Link
                  href={"/"}
                  onClick={closeMenu}
                  className="underline font-bold text-[#4B4B4B] text-[18px]"
                >
                  <span>Login</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
