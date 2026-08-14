"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2 } from "lucide-react";

export default function HeroSection() {
  const scrollToNextSection = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home-content"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* HUD Grid Coordinates Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top-left Coordinate System */}
        <div className="absolute top-28 left-8 hidden lg:flex flex-col gap-1 font-mono text-[9px] text-cyan-400/40 tracking-widest uppercase">
          <span>SYS_LOC // INDIA</span>
          <span>LAT_GRID_24.89</span>
          <span className="flex items-center gap-1">
            SYS_STATUS: <span className="text-cyan-400 animate-pulse">ACTIVE</span>
          </span>
        </div>

        {/* Top-right Frame Counter */}
        <div className="absolute top-28 right-8 hidden lg:flex flex-col gap-1 font-mono text-[9px] text-slate-500 tracking-widest uppercase text-right">
          <span>DPR_SCALE // 1.5</span>
          <span>RENDER: GL_CORE</span>
        </div>

        {/* Diagonal wireframe line overlay */}
        <div className="absolute bottom-24 left-8 right-8 hidden lg:block">
          <div className="neon-line-cyan opacity-[0.25]" />
          <div className="flex justify-between font-mono text-[8px] text-slate-500 mt-2">
            <span>[ SYSTEM_DEPLOYED_2026 ]</span>
            <span>[ STABLE_BUILD_ALPHA_v1 ]</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-12rem)]">

          {/* LEFT CONTENT (Typography & Actions) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Technical Sub-Header Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="p-1.5 rounded-lg border border-cyan-400/10 bg-cyan-400/5">
                <Code2 className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">
                CREATIVE DEVELOPER / FULL STACK ENGINEER
              </span>
            </motion.div>

            {/* Giant Typographic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase font-syne"
            >
              HETA
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-glow-cyan">
                PATEL
              </span>
            </motion.h1>

            {/* Premium Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-lg text-slate-400 text-base sm:text-lg leading-relaxed font-sans font-light"
            >
              Building immersive digital experiences with code, AI and 3D.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 text-xs font-mono tracking-widest hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:text-white hover:scale-[1.03] transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.08)] cursor-pointer"
              >
                VIEW WORK
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] text-slate-300 text-xs font-mono tracking-widest hover:bg-white/[0.06] hover:border-white/20 hover:text-white hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              >
                CONTACT ME
              </button>
            </motion.div>
          </div>

          {/* RIGHT CONTENT (Blank spacer for background avatar) */}
          <div className="lg:col-span-5 h-[350px] lg:h-full pointer-events-none" />

        </div>
      </div>

      {/* Decorative Floating Square Dots */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Decorative Dot 1 */}
        <motion.div
          animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[8px] h-[8px] bg-purple-500/40 border border-purple-400/20"
          style={{ left: "12%", top: "20%" }}
        />

        {/* Decorative Dot 2 */}
        <motion.div
          animate={{ y: [0, -6, 0], x: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[6px] h-[6px] bg-slate-500/30"
          style={{ left: "45%", top: "15%" }}
        />

        {/* Decorative Dot 3 */}
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-[8px] h-[8px] bg-blue-500/40 border border-blue-400/20"
          style={{ left: "85%", top: "35%" }}
        />

        {/* Decorative Dot 4 */}
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute w-[10px] h-[10px] bg-cyan-500/40 border border-cyan-400/20"
          style={{ left: "25%", top: "75%" }}
        />

        {/* Decorative Dot 5 */}
        <motion.div
          animate={{ y: [0, 6, 0], x: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute w-[7px] h-[7px] bg-slate-600/30"
          style={{ left: "65%", top: "80%" }}
        />

        {/* Decorative Dot 6 */}
        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute w-[9px] h-[9px] bg-purple-600/40 border border-purple-400/20"
          style={{ left: "88%", top: "82%" }}
        />
      </div>

      {/* Floating Scroll Indicator - Small Square box shape */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={scrollToNextSection}
          data-cursor="scroll"
          className="pointer-events-auto w-7 h-7 rounded-lg border-2 border-cyan-400/40 flex items-center justify-center hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Scroll to About Section"
        >
          {/* Animated scrolling dot inside */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
              scale: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        </motion.button>
      </div>
    </section>
  );
}
