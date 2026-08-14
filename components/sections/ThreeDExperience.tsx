"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ThreeDExperience({ inspectMode }: { inspectMode?: boolean }) {
  const technicalLabels = ["WEBGL", "THREE.JS", "R3F", "INTERACTION", "MOTION"];

  const scrollToNextSection = () => {
    const el = document.getElementById("experience");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="three3d-content"
      className="relative min-h-screen py-32 flex items-center overflow-hidden bg-[#060814]"
    >
      {/* Dedicated background elements for ThreeD Experience Section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />
        <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
        <div className="absolute top-1/3 left-12 w-64 h-64 border border-cyan-400/[0.02] rounded-full" />

        {/* Floating Square Dots for ThreeD Experience */}
        {/* Decorative Dot 1 */}

        {/* Decorative Dot 1 */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[8px] h-[8px] bg-cyan-500/20"
          style={{ left: "75%", top: "20%" }}
        />

        {/* Decorative Dot 2 */}
        <motion.div
          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-[6px] h-[6px] bg-slate-500/20"
          style={{ left: "45%", top: "80%" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Cinematic Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-10 h-px bg-cyan-400" />
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                04 / WebGL Engine
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight uppercase font-syne"
            >
              BUILDING IN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-glow-cyan">
                THREE DIMENSIONS.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl font-sans font-light"
            >
              Creative coding isn't just about moving pixels; it's about forming responsive 3D environments that react to user agency. I merge procedural math, lighting, and interactivity to build immersive worlds in the browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {technicalLabels.map((label, index) => (
                <span
                  key={label}
                  className="px-4 py-2 rounded-md border border-white/5 bg-white/[0.02] text-slate-400 text-xs font-mono tracking-widest hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-300 cursor-default"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE: Interactive Explorer HUD Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="w-full max-w-[380px] h-[320px] relative pointer-events-auto"
              data-cursor="explore"
            >
              {/* Floating tech HUD card that instructs to hover the background shape */}
              <div className="absolute inset-0 rounded-3xl hud-panel p-8 flex flex-col justify-between border-cyan-400/10 hover:border-cyan-400/25 transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                {/* Tech brackets */}
                <div className="flex justify-between items-start text-cyan-400/40 font-mono text-[9px]">
                  <span>[ WEBGL_NODE_SYS ]</span>
                  <span>SYSTEM_ONLINE_</span>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl border border-cyan-400/15 bg-cyan-400/5 flex items-center justify-center text-cyan-400 font-bold font-mono group-hover:scale-110 transition-transform">
                    3D
                  </div>
                  <h3 className="text-white text-lg font-bold font-syne">Spatial Vector Engine</h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans font-light">
                    Hover your mouse on this card and surrounding areas to interact with the morphing 3D geometry floating in the digital system.
                  </p>
                </div>

                <div className="flex justify-between items-center text-slate-500 font-mono text-[9px] mt-4">
                  <span>DPR_DYN_AUTO</span>
                  <span className="text-cyan-400 animate-pulse">● INTERACT_ACTIVE</span>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute -inset-4 bg-cyan-500/5 rounded-[2rem] blur-2xl -z-10 opacity-30 group-hover:opacity-60 transition-opacity" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
