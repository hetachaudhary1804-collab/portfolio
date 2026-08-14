"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Maps 0-1 scroll progress to vertical slide heights (0px to 160px)
  const indicatorY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-auto">
      <div className="relative h-[160px] w-[2px] bg-slate-800/80 rounded-full flex flex-col justify-between">

        {/* Sliding Dot Indicator */}
        <motion.div
          style={{ y: indicatorY }}
          className="absolute -left-[4px] w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] z-10"
        />

        {/* Static dots for each section */}
        {sections.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleDotClick(sec.id)}
              className="group relative -left-[3px] w-2 h-2 rounded-full bg-slate-600 focus:outline-none transition-colors duration-300 hover:bg-cyan-300 cursor-pointer"
              style={{ top: `${(idx / (sections.length - 1)) * 100}%` }}
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Tooltip Label */}
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-[#0b0825] border border-white/5 text-[10px] font-mono tracking-widest text-slate-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                {sec.label.toUpperCase()}
              </span>

              {/* Dot Pulse when active */}
              {isActive && (
                <span className="absolute -inset-1 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
