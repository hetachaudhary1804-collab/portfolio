"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span>{count}</span>;
}

interface AboutSectionProps {
  inspectMode?: boolean;
}

export default function AboutSection({
  inspectMode = false,
}: AboutSectionProps) {
  const scrollToNextSection = () => {
    const el = document.getElementById("skills");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const hudInfo = [
    {
      label: "ROLE",
      value: "Software Developer",
    },
    {
      label: "FOCUS",
      value: "Web Development / AI / 3D",
    },
    {
      label: "STACK",
      value: "Next.js / React / TypeScript / PHP / Yii2 / MySQL",
    },
    {
      label: "INTEREST",
      value: "Creative Technology",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 flex items-center overflow-hidden bg-[#080B14]/[0.88]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />

        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/[0.02] blur-[180px]" />

        <div className="absolute inset-0 cyber-grid opacity-[0.04]" />

        <div className="absolute top-[30%] right-[8%] w-72 h-72 border border-cyan-400/[0.02] rounded-full" />

        <div className="absolute bottom-[20%] left-[5%] w-48 h-48 border border-purple-500/[0.02] rotate-45" />

        {/* Decorative Dot 1 */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[7px] h-[7px] bg-cyan-500/20"
          style={{
            left: "80%",
            top: "15%",
          }}
        />

        {/* Decorative Dot 2 */}
        <motion.div
          animate={{
            y: [0, 6, 0],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute w-[9px] h-[9px] bg-slate-500/20"
          style={{
            left: "40%",
            top: "75%",
          }}
        />

        {/* Decorative Dot 3 */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="absolute w-[6px] h-[6px] bg-purple-500/20"
          style={{
            left: "68%",
            top: "60%",
          }}
        />
      </div>

      {/* Main Content */}
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-20 items-start">
          {/* LEFT COLUMN */}
          <div className="w-full flex flex-col gap-12">
            {/* Title + Biography */}
            <div className="space-y-12">
              {/* Section Label */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.6,
                }}
                className="flex items-center gap-3"
              >
                <span className="w-10 h-px bg-cyan-400" />

                <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                  01 / Identity
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter uppercase font-syne"
              >
                WHO
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-glow-cyan">
                  I AM.
                </span>
              </motion.h2>

              {/* Biography */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="space-y-4 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light"
              >
                <p className="text-white text-base sm:text-lg font-normal leading-relaxed">
                  Heta Patel is a developer focused on building modern web
                  applications, interactive experiences and intelligent digital
                  products.
                </p>

                <p>
                  My work spans frontend engineering and backend workflows. I
                  design and build highly performant user interfaces, robust
                  database integrations, and vector indexes, striving to make
                  each digital experience feel meaningful and cohesive.
                </p>

                <p>
                  I thrive in spaces where clean structural code meets visual
                  creativity, transforming complex requirements into responsive
                  web frameworks.
                </p>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Years */}
              <motion.div
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 text-center transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-500/[0.02]"
              >
                <div className="text-2xl font-black text-cyan-400 font-mono">
                  <Counter value={5} />+
                </div>

                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1">
                  YEARS CODING
                </div>
              </motion.div>

              {/* Repositories */}
              <motion.div
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 text-center transition-all duration-300 hover:border-purple-400/20 hover:bg-purple-500/[0.02]"
              >
                <div className="text-2xl font-black text-purple-400 font-mono">
                  <Counter value={12} />+
                </div>

                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1">
                  REPOS COMPLETED
                </div>
              </motion.div>

              {/* Commit Rate */}
              <motion.div
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl border border-white/5 bg-white/[0.015] p-5 text-center transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-500/[0.02]"
              >
                <div className="text-2xl font-black text-cyan-400 font-mono">
                  <Counter value={99} />%
                </div>

                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-1">
                  COMMIT_RATE
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className={`w-full flex flex-col gap-8 lg:pt-20 ${
              inspectMode ? "z-20" : ""
            }`}
          >
            {/* HUD Panel */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="rounded-3xl hud-panel p-8 relative border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
            >
              {/* Card Grid */}
              <div className="absolute inset-0 cyber-grid opacity-[0.03] rounded-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 text-[10px] font-mono text-cyan-400 tracking-widest uppercase mb-6 flex justify-between">
                <span>[ WHO_I_AM_SPEC ]</span>

                <span className="text-slate-500">ID: H_PATEL</span>
              </div>

              {/* Info */}
              <div className="relative z-10 space-y-6">
                {hudInfo.map((info) => (
                  <div
                    key={info.label}
                    className="border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="block text-[9px] font-mono text-slate-500 tracking-widest mb-1">
                      {info.label}
                    </span>

                    <span className="block text-sm font-mono text-slate-200 font-medium">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Optional decorative element */}
            <div className="hidden lg:block h-32 relative">
              <div className="absolute right-0 top-0 w-24 h-px bg-gradient-to-r from-transparent to-cyan-400/30" />
              <div className="absolute right-0 top-4 w-16 h-px bg-gradient-to-r from-transparent to-purple-400/20" />
            </div>
          </div>
        </div>

        {/* Optional Next Section Button */}
        <button
          type="button"
          onClick={scrollToNextSection}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
