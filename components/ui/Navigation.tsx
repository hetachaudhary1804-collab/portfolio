"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "STACK", href: "#skills" },
  { label: "WORK", href: "#projects" },
  { label: "JOURNEY", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation({
  inspectMode = false,
  setInspectMode,
}: {
  inspectMode?: boolean;
  setInspectMode?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const homeEl = document.getElementById("home");

      if (homeEl && window.scrollY < homeEl.offsetHeight / 2) {
        setActiveSection("home");
        return;
      }

      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Floating Pill Nav Bar for Desktop */}
      <header className="fixed top-6 left-0 right-0 z-50 pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center gap-6 px-6 py-3 rounded-full border transition-all duration-500 ${scrolled
              ? "hud-panel-accent border-cyan-400/20 bg-black/60 shadow-[0_10px_35px_rgba(0,240,255,0.05)]"
              : "border-white/5 bg-white/[0.02]"
            }`}
        >
          {/* Logo / Name */}
          <button
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-xs font-black tracking-[0.25em] text-white hover:text-cyan-400 transition-colors mr-4 flex items-center gap-2 cursor-pointer bg-transparent border-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            HETA
          </button>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-[10px] font-mono font-bold tracking-widest relative py-1 px-2 transition-colors cursor-pointer bg-transparent border-0 ${isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  {item.label}

                  {isActive && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[1px] bg-cyan-400"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3D Inspect Mode Toggle */}
          {setInspectMode && (
            <button
              onClick={() => setInspectMode((prev) => !prev)}
              className={`hidden md:flex items-center gap-2 text-[9px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-full border transition-all duration-300 ml-2 hover:scale-105 active:scale-95 cursor-pointer ${inspectMode
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                  : "border-purple-400/30 bg-purple-500/5 text-purple-300 hover:border-cyan-400/50 hover:text-cyan-300"
                }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${inspectMode ? "bg-cyan-400 animate-ping" : "bg-purple-400"
                  }`}
              />
              3D_INSPECT
            </button>
          )}

          {/* Toggle for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden rounded-2xl border border-cyan-400/10 bg-[#04020c]/95 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-4 text-center">
              <button
                onClick={(e) => handleNavClick(e, "#home")}
                className={`text-xs font-mono font-bold py-2 border-b border-white/5 transition-all cursor-pointer bg-transparent border-0 w-full text-center ${activeSection === "home" ? "text-cyan-400" : "text-slate-400"
                  }`}
              >
                HOME
              </button>

              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <button
                    key={item.label}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-xs font-mono font-bold py-2 border-b border-white/5 last:border-b-0 transition-all cursor-pointer bg-transparent border-0 w-full text-center ${isActive ? "text-cyan-400" : "text-slate-400"
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile 3D Inspect Toggle */}
              {setInspectMode && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setInspectMode((prev) => !prev);
                  }}
                  className={`text-xs font-mono font-bold py-3 mt-2 rounded-xl border flex items-center justify-center gap-2 transition-all ${inspectMode
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/5 bg-white/[0.02] text-slate-400"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${inspectMode ? "bg-cyan-400 animate-ping" : "bg-slate-500"
                      }`}
                  />
                  3D_INSPECT_MODE
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
