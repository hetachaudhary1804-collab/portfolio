"use client";

import React from "react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-transparent py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Copyright */}
        <p className="text-xs text-slate-500 font-mono">
          &copy; 2026 Heta Patel. All rights reserved.
        </p>

        {/* Center/Right Side: Info & Quick Up Scroll */}
        <div className="flex items-center gap-6">
          <p className="text-xs text-slate-500 font-mono">
            Built with Next.js + Three.js
          </p>
          <button
            onClick={handleScrollToTop}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors focus:outline-none cursor-pointer"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
