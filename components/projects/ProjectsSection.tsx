"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ProjectLaptopCanvas from "../3d/ProjectLaptopCanvas";

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

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Performance Management System",
    category: "Enterprise Application",
    description:
      "A secure workspace to coordinate organizational targets, measure employee sprint velocities, reward capacities, and optimize review feedback logs.",
    tags: ["Next.js", "React", "TypeScript", "PHP", "Yii2", "MySQL"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    number: "02",
    title: "AI Employee Growth Platform",
    category: "AI Integration / Intelligence",
    description:
      "An adaptive growth assistant leveraging vector caches, skill indexing matrices, and automated learning suggestions to direct team skill improvements.",
    tags: ["Next.js", "React", "AI", "TypeScript", "MySQL", "REST API"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    number: "03",
    title: "Interactive 3D Portfolio",
    category: "WebGL / Creative Tech",
    description:
      "A cinematic digital vector landscape utilizing camera flight coordinations, particle fields, volumetric lighting, and structural responsive panels.",
    tags: ["Next.js", "React", "Three.js", "R3F", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    number: "04",
    title: "Enterprise Web Portal",
    category: "Full Stack Application",
    description:
      "A centralized, highly secure database portal coordinating asynchronous file parsing, REST APIs, model validatory controls, and audit trails.",
    tags: ["React", "PHP", "Yii2", "MySQL", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

export default function ProjectsSection({
  inspectMode,
}: {
  inspectMode?: boolean;
}) {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 15) return; // ignore tiny scrolls

      if (deltaY > 0) {
        if (activeProject < projects.length - 1) {
          e.preventDefault();
          e.stopPropagation();
          if (!lockRef.current) {
            lockRef.current = true;
            setActiveProject((prev) => prev + 1);
            setTimeout(() => {
              lockRef.current = false;
            }, 800);
          }
        }
      } else if (deltaY < 0) {
        if (activeProject > 0) {
          e.preventDefault();
          e.stopPropagation();
          if (!lockRef.current) {
            lockRef.current = true;
            setActiveProject((prev) => prev - 1);
            setTimeout(() => {
              lockRef.current = false;
            }, 800);
          }
        }
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (el) {
        el.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeProject]);

  return (
    <section
      ref={containerRef}
      id="projects-content"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#050609]
        py-24
        sm:py-28
        lg:py-32
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-[15%]
            left-[-10%]
            w-[500px]
            h-[500px]
            rounded-full
            bg-cyan-500/[0.018]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            top-[55%]
            right-[-10%]
            w-[550px]
            h-[550px]
            rounded-full
            bg-purple-500/[0.018]
            blur-[160px]
          "
        />

        <div
          className="
            absolute
            inset-0
            cyber-grid
            opacity-[0.018]
          "
        />

        <div
          className="
            absolute
            top-[10%]
            right-[8%]
            w-[420px]
            h-[420px]
            rounded-full
            border
            border-cyan-400/[0.012]
          "
        />

        {/* Cyan marker */}

        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[6%]
            top-[28%]
            w-[8px]
            h-[8px]
            bg-cyan-500/20
          "
        />

        {/* Purple marker */}

        <motion.div
          animate={{
            y: [0, 8, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[12%]
            top-[58%]
            w-[7px]
            h-[7px]
            bg-purple-500/20
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[1220px]
          mx-auto
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.header
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.65,
          }}
          className="mb-24 lg:mb-32"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-cyan-400" />

            <span
              className="
                text-cyan-400
                font-mono
                text-[9px]
                sm:text-[10px]
                tracking-[0.3em]
                uppercase
              "
            >
              03 / Portfolio Showcase
            </span>
          </div>

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-8
            "
          >
            <div>
              <h2
                className="
                  text-[42px]
                  sm:text-[52px]
                  lg:text-[62px]
                  xl:text-[68px]
                  leading-[0.88]
                  font-black
                  text-white
                  uppercase
                  font-syne
                "
              >
                SELECTED{" "}
                <span
                  className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-cyan-400
                    via-fuchsia-400
                    to-purple-500
                    text-glow-cyan
                  "
                >
                  WORK.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-[580px]
                  text-slate-400
                  text-sm
                  sm:text-[15px]
                  leading-[1.7]
                  font-sans
                  font-light
                "
              >
                Cinematic collection of full-stack implementations and digital
                creative experiments.
              </p>
            </div>

            <div
              className="
                shrink-0
                font-mono
                text-[9px]
                sm:text-[10px]
                text-slate-500
                tracking-[0.12em]
              "
            >
              {projects.length.toString().padStart(2, "0")} COMMITS_LOADED
            </div>
          </div>
        </motion.header>

        {/* ===================================================
            PROJECTS
        =================================================== */}

        <div className="relative min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {projects.map((project, index) => {
              if (index !== activeProject) return null;
              return (
                <motion.article
                  key={project.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                  }}
                  className="
                    relative
                    grid
                    grid-cols-1
                    lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
                    gap-12
                    lg:gap-16
                    items-center
                    w-full
                  "
                >
                  {/* =================================================
                      LEFT
                  ================================================= */}

                  <div className="min-w-0">
                    {/* Number / Category */}

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                        mb-6
                      "
                    >
                      <span
                        className="
                          text-4xl
                          sm:text-5xl
                          leading-none
                          font-black
                          font-mono
                          text-cyan-400/15
                        "
                      >
                        {project.number}
                      </span>

                      <span
                        className="
                          text-[8px]
                          sm:text-[9px]
                          font-mono
                          text-cyan-400/65
                          tracking-[0.17em]
                          uppercase
                        "
                      >
                        // {project.category}
                      </span>
                    </div>

                    {/* Title */}

                    <h3
                      className="
                        text-[30px]
                        sm:text-[36px]
                        lg:text-[40px]
                        xl:text-[44px]
                        leading-[0.95]
                        font-black
                        text-white
                        uppercase
                        tracking-tight
                        font-syne
                        max-w-[560px]
                      "
                    >
                      {project.title}
                    </h3>

                    {/* Description */}

                    <p
                      className="
                        mt-7
                        max-w-[555px]
                        text-slate-400
                        text-sm
                        sm:text-[14px]
                        lg:text-[15px]
                        leading-[1.75]
                        font-sans
                        font-light
                      "
                    >
                      {project.description}
                    </p>

                    {/* Tags */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                        mt-7
                      "
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            px-3
                            py-1.5
                            rounded
                            bg-white/[0.015]
                            border
                            border-white/5
                            text-slate-400
                            text-[9px]
                            font-mono
                            transition-all
                            duration-300
                            hover:border-cyan-400/30
                            hover:text-cyan-300
                            hover:bg-cyan-400/[0.02]
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-7
                        mt-8
                      "
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-[9px]
                          sm:text-[10px]
                          font-mono
                          font-bold
                          text-slate-400
                          hover:text-white
                          transition-colors
                        "
                      >
                        <GithubIcon className="w-4 h-4" />
                        SOURCE_CODE
                      </a>

                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-[9px]
                          sm:text-[10px]
                          font-mono
                          font-bold
                          text-cyan-400
                          hover:text-cyan-300
                          transition-colors
                        "
                      >
                        <ExternalLink className="w-4 h-4" />
                        DEPLOYED_APP
                      </a>
                    </div>
                  </div>

                  {/* =================================================
                      RIGHT — LAPTOP
                  ================================================= */}

                  <div
                    className="
                      w-full
                      flex
                      justify-center
                      lg:justify-end
                    "
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.015,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 25,
                      }}
                      className="
                        relative
                        w-full
                        max-w-[520px]
                        h-[270px]
                        sm:h-[300px]
                        lg:h-[315px]
                        rounded-[24px]
                        border
                        border-cyan-400/10
                        bg-[#060412]/75
                        shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                        overflow-hidden
                        transition-all
                        duration-500
                        hover:border-cyan-400/25
                      "
                      data-cursor="view"
                    >
                      {/* subtle card glow */}

                      <div
                        className="
                          absolute
                          inset-0
                          pointer-events-none
                          bg-[radial-gradient(circle_at_50%_45%,rgba(0,240,255,0.035),transparent_55%)]
                        "
                      />

                      <ProjectLaptopCanvas project={project} />
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Page Indicator Dots */}
        <div className="flex justify-center gap-3 mt-12 relative z-20">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveProject(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeProject === i
                  ? "bg-cyan-400 w-7"
                  : "bg-white/15 hover:bg-white/35"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom spacing */}

        <div className="h-12 lg:h-16" />
      </div>
    </section>
  );
}
