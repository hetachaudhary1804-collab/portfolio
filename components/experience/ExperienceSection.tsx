"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  role: string;
  desc: string;
  details: string[];
  accent: "cyan" | "purple";
}

const milestones: Milestone[] = [
  {
    year: "2024",
    title: "LEARNING & BUILDING",
    role: "Core Fundamentals",
    desc: "Established a robust coding foundation, constructing software components, handling databases, and deploying scripts.",
    details: ["Learned HTML/CSS/JS fundamentals", "Engineered initial database schemas in SQL", "Built modular command line scripts"],
    accent: "purple",
  },
  {
    year: "2025",
    title: "PROFESSIONAL DEVELOPMENT",
    role: "Full Stack Exploration",
    desc: "Advanced into MVC architectures and enterprise workflows, integrating RESTful APIs and optimizing backend business code.",
    details: ["Integrated complex REST APIs", "Programmed responsive React layouts", "Optimized queries and schemas in MySQL"],
    accent: "cyan",
  },
  {
    year: "2026",
    title: "CREATIVE DEVELOPER",
    role: "Immersive & Intelligent Spaces",
    desc: "Merging visual graphics with AI models to design high-performance, cinematic, and responsive digital interfaces.",
    details: ["Created R3F WebGL canvas scenes", "Engineered vector and AI API wrappers", "Deployed Next.js apps with clean design"],
    accent: "purple",
  },
];

export default function ExperienceSection({ inspectMode }: { inspectMode?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    const el = document.getElementById("ai");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="experience-content"
      className="relative min-h-screen py-32 flex flex-col justify-center overflow-hidden bg-[#070A10]"
    >
      {/* Dedicated background elements for Experience Section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[150px]" />
        <div className="absolute inset-0 cyber-grid opacity-[0.03]" />

        {/* Floating Square Dots for Experience */}
        {/* Decorative Dot 1 */}

        {/* Decorative Dot 1 */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[8px] h-[8px] bg-cyan-500/20"
          style={{ left: "20%", top: "25%" }}
        />

        {/* Decorative Dot 2 */}
        <motion.div
          animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-[6px] h-[6px] bg-slate-500/25"
          style={{ left: "85%", top: "30%" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-cyan-400" />
            <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
              05 / Journey Timeline
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase font-syne">
                THE
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-glow-cyan">
                  {" "}JOURNEY.
                </span>
              </h2>
              <p className="text-slate-400 mt-4 max-w-xl text-sm sm:text-base leading-relaxed font-sans font-light">
                Horizontal path tracking the evolution of engineering skills from foundation to creative tech.
              </p>
            </div>
            <div className="font-mono text-xs text-slate-500">
              SYS_TIMELINE_STABLE
            </div>
          </div>
        </motion.div>

        {/* HORIZONTAL TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative mt-8">
          
          {/* Horizontal connecting vector line */}
          <div className="absolute top-12 left-10 right-10 h-px bg-gradient-to-r from-purple-500/20 via-cyan-400/40 to-purple-500/20 hidden md:block" />

          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-thin scroll-smooth mask-image">
            {milestones.map((stone, idx) => {
              return (
                <motion.div
                  key={stone.year}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="min-w-[280px] sm:min-w-[340px] max-w-[360px] snap-start flex-shrink-0"
                >
                  <div className="space-y-6">
                    
                    {/* Timeline Node Point Indicator */}
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black font-mono text-xs border relative z-10 ${
                        stone.accent === "cyan"
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                          : "border-purple-400 bg-purple-400/10 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                      }`}>
                        {stone.year}
                      </div>
                      <div className="h-px flex-1 bg-white/5 md:hidden" />
                    </div>

                    {/* Timeline Card */}
                    <motion.div
                      whileHover={{ y: -6 }}
                      className={`p-6 rounded-3xl hud-panel border transition-all duration-300 min-h-[320px] flex flex-col justify-between ${
                        stone.accent === "cyan" 
                          ? "border-cyan-400/10 hover:border-cyan-400/30 hover:shadow-[0_15px_40px_rgba(0,240,255,0.06)]" 
                          : "border-purple-400/10 hover:border-purple-400/30 hover:shadow-[0_15px_40px_rgba(168,85,247,0.06)]"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className={`text-[9px] font-mono tracking-wider ${
                            stone.accent === "cyan" ? "text-cyan-400" : "text-purple-400"
                          }`}>
                            {stone.role.toUpperCase()}
                          </span>
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        </div>

                        <h3 className="text-white text-base font-black font-mono tracking-wider">
                          {stone.title}
                        </h3>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                          {stone.desc}
                        </p>
                      </div>

                      {/* Detail logs */}
                      <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                        {stone.details.map((detail, index) => (
                          <div key={index} className="flex gap-2 items-start text-[10px] font-mono text-slate-400">
                            <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${
                              stone.accent === "cyan" ? "bg-cyan-400" : "bg-purple-400"
                            }`} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}