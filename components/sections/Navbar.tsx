"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChieftaincyCrown } from "@/components/ui/ChieftaincyCrown";

const HASH_SCROLL_MS = 120;

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "The Big Day", href: "/#event" },
  { label: "Her Story", href: "/#bio" },
  { label: "The Journey", href: "/#timeline" },
  { label: "Program", href: "/#program" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Sign the Register", href: "/#wishes" },
  { label: "Gallery", href: "/#gallery" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function handleHashNavClick(
    e: MouseEvent<HTMLAnchorElement>,
    elementId: string,
  ) {
    if (pathname !== "/") return;
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `/#${elementId}`);
    }, HASH_SCROLL_MS);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#3B1C08]/95 shadow-lg shadow-[#3B1C08]/30"
          : "bg-[#3B1C08]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Left — Brand */}
        <a
          href="/#home"
          className="flex items-center gap-2 text-[var(--color-linen)] no-underline"
        >
          <ChieftaincyCrown size={24} className="shrink-0" />
          <span
            className="text-sm font-medium tracking-wide lg:text-base"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Chief (Mrs) T.O. Ogundare
          </span>
        </a>

        {/* Right — Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={
                link.href === "/#wishes"
                  ? (e) => handleHashNavClick(e, "wishes")
                  : link.href === "/#event"
                    ? (e) => handleHashNavClick(e, "event")
                    : undefined
              }
              className={`text-sm no-underline transition-colors ${
                link.href === "/#wishes"
                  ? "rounded-full bg-[var(--color-crimson)] px-4 py-1.5 font-medium text-[var(--color-linen)] hover:bg-[#a83024]"
                  : "text-[var(--color-linen)]/70 hover:text-[var(--color-linen)]"
              }`}
              style={{ fontFamily: "var(--font-body), Georgia, serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="flex w-6 flex-col gap-[5px]">
            <span
              className={`block h-[2px] w-full bg-[var(--color-gold)] transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-[var(--color-gold)] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-[var(--color-gold)] transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-[#3B1C08] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-6 pt-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "/#wishes") {
                      handleHashNavClick(e, "wishes");
                    } else if (link.href === "/#event") {
                      handleHashNavClick(e, "event");
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`no-underline ${
                    link.href === "/#wishes"
                      ? "mt-1 rounded-full bg-[var(--color-crimson)] px-5 py-2.5 text-center text-sm font-medium text-[var(--color-linen)] transition-colors hover:bg-[#a83024]"
                      : "rounded-lg px-3 py-2.5 text-[var(--color-linen)] transition-colors hover:bg-[var(--color-linen)]/5"
                  }`}
                  style={{ fontFamily: "var(--font-body), Georgia, serif" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
