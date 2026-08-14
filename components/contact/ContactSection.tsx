"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

export default function ContactSection({ inspectMode }: { inspectMode?: boolean }) {
  const emailAddress = "heta.patel@example.com";

  return (
    <section
      id="contact-content"
      className="relative min-h-screen py-32 flex items-center overflow-hidden bg-[#080610]"
    >
      {/* Dedicated background elements for Contact Section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/[0.03] blur-[180px]" />
        <div className="absolute inset-0 cyber-grid opacity-[0.035]" />

        {/* Floating Square Dots for Contact */}
        {/* Decorative Dot 1 */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[8px] h-[8px] bg-purple-500/20"
          style={{ left: "22%", top: "25%" }}
        />

        {/* Decorative Dot 2 */}
        <motion.div
          animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-[10px] h-[10px] bg-cyan-500/15"
          style={{ left: "78%", top: "65%" }}
        />

        {/* Decorative Dot 3 */}
        <motion.div
          animate={{ y: [0, -6, 0], x: [0, 5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute w-[6px] h-[6px] bg-slate-500/20"
          style={{ left: "45%", top: "15%" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center">
        
        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px bg-cyan-400" />
          <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
            07 / Final Node
          </span>
          <span className="w-6 h-px bg-cyan-400" />
        </motion.div>

        {/* Cinematic stacked headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter uppercase max-w-4xl font-syne"
        >
          LET&apos;S BUILD
          <br />
          SOMETHING
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-glow-cyan">
            DIFFERENT.
          </span>
        </motion.h2>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <a
            href={`mailto:${emailAddress}`}
            className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold tracking-widest hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:text-white hover:scale-[1.03] transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.08)] cursor-pointer"
          >
            START A CONVERSATION
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        {/* Social Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-16 text-[10px] font-mono tracking-widest text-slate-400 uppercase"
        >
          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            EMAIL_ME
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            LINKEDIN_SYS
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GITHUB_REPO
          </a>
        </motion.div>
      </div>
    </section>
  );
}