"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  description: string;
  level: number;
  tags: string[];
}

interface SkillGroup {
  id: string;
  number: string;
  label: string;
  color: "cyan" | "purple";
  skills: Skill[];
}

const STACK_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    number: "01",
    label: "FRONTEND",
    color: "cyan",
    skills: [
      {
        name: "React",
        description:
          "Component-driven interfaces and reusable UI architecture.",
        level: 92,
        tags: ["UI", "COMPONENTS", "STATE"],
      },
      {
        name: "Next.js",
        description:
          "Production-ready React applications with routing and server capabilities.",
        level: 88,
        tags: ["SSR", "ROUTING", "FULLSTACK"],
      },
      {
        name: "TypeScript",
        description:
          "Typed JavaScript architecture for maintainable applications.",
        level: 84,
        tags: ["TYPES", "SAFETY", "DX"],
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first responsive styling and design systems.",
        level: 90,
        tags: ["CSS", "RESPONSIVE", "DESIGN"],
      },
      {
        name: "Framer Motion",
        description: "Interactive motion systems and interface transitions.",
        level: 82,
        tags: ["MOTION", "ANIMATION", "UX"],
      },
    ],
  },

  {
    id: "backend",
    number: "02",
    label: "BACKEND",
    color: "purple",
    skills: [
      {
        name: "PHP",
        description: "Backend application development and business logic.",
        level: 88,
        tags: ["SERVER", "API", "LOGIC"],
      },
      {
        name: "Yii2",
        description: "MVC backend applications and structured PHP systems.",
        level: 84,
        tags: ["MVC", "PHP", "FRAMEWORK"],
      },
      {
        name: "REST API",
        description:
          "Structured communication between frontend and backend systems.",
        level: 86,
        tags: ["HTTP", "JSON", "API"],
      },
      {
        name: "Node.js",
        description: "JavaScript runtime for backend services and tooling.",
        level: 74,
        tags: ["RUNTIME", "NPM", "SERVICES"],
      },
    ],
  },

  {
    id: "database",
    number: "03",
    label: "DATABASE",
    color: "cyan",
    skills: [
      {
        name: "MySQL",
        description:
          "Relational database design, queries, and application storage.",
        level: 88,
        tags: ["SQL", "RELATIONAL", "DATA"],
      },
      {
        name: "PostgreSQL",
        description: "Advanced relational data modeling and querying.",
        level: 70,
        tags: ["SQL", "DATA", "RELATIONAL"],
      },
      {
        name: "Database Design",
        description:
          "Schemas, relationships, queries, and application data structures.",
        level: 82,
        tags: ["SCHEMA", "RELATIONS", "MODELING"],
      },
    ],
  },

  {
    id: "tools",
    number: "04",
    label: "TOOLS / DEVOPS",
    color: "purple",
    skills: [
      {
        name: "Git",
        description: "Version control and collaborative development workflows.",
        level: 90,
        tags: ["VCS", "BRANCHING", "WORKFLOW"],
      },
      {
        name: "GitHub",
        description:
          "Repository management, collaboration, and source control.",
        level: 88,
        tags: ["REPOSITORY", "COLLAB", "CI"],
      },
      {
        name: "Docker",
        description: "Containerized development and reproducible environments.",
        level: 68,
        tags: ["CONTAINERS", "ENV", "DEPLOY"],
      },
      {
        name: "VS Code",
        description: "Primary development environment and coding workflow.",
        level: 94,
        tags: ["EDITOR", "DEV", "EXTENSIONS"],
      },
    ],
  },
];

const COLORS = {
  cyan: {
    text: "text-cyan-300",
    border: "border-cyan-400/30",
    hover: "hover:border-cyan-400/60",
    dot: "bg-cyan-400",
    soft: "bg-cyan-400/[0.035]",
  },

  purple: {
    text: "text-purple-300",
    border: "border-purple-400/30",
    hover: "hover:border-purple-400/60",
    dot: "bg-purple-400",
    soft: "bg-purple-400/[0.035]",
  },
};

interface SkillsSectionProps {
  inspectMode?: boolean;
}

export default function SkillsSection({
  inspectMode = false,
}: SkillsSectionProps) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <section
      id="skills"
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#080B14]/[0.88]
        text-slate-100
      "
    >
      {/* ======================================================
          INTERNAL STACK SCROLLER
          ====================================================== */}

      <div
        data-section-scroll="true"
        className="
          relative
          h-full
          w-full
          overflow-y-auto
          overflow-x-hidden
          bg-transparent
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-cyan-400/20
        "
      >
        <div
          className="
            relative
            min-h-full
            w-full
            px-5
            pb-20
            pt-24
            sm:px-8
            lg:px-12
            xl:px-16
          "
        >
          {/* ==================================================
              BACKGROUND CONTENT AREA
             ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              bg-transparent
            "
          />

          {/* ==================================================
              HEADER
             ================================================== */}

          <header
            className="
              relative
              z-20
              mx-auto
              max-w-7xl
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                font-mono
                text-[9px]
                tracking-[0.3em]
                text-cyan-400/70
              "
            >
              <span className="h-px w-7 bg-cyan-400/50" />
              02 / STACK SYSTEM
            </div>

            <div
              className="
                mt-5
                flex
                items-start
                justify-between
                gap-8
              "
            >
              <div>
                <h1
                  className="
                    font-syne
                    text-4xl
                    font-extrabold
                    leading-[0.95]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    lg:text-6xl
                    xl:text-7xl
                  "
                >
                  SYSTEM /{" "}
                  <span className="text-cyan-300 text-glow-cyan">STACK</span>
                </h1>

                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-sm
                    leading-relaxed
                    text-slate-400
                    sm:text-base
                  "
                >
                  Hover over a component to analyze core configurations and
                  trace related dependencies.
                </p>
              </div>

              {/* STATUS */}

              <div
                className="
                  hidden
                  shrink-0
                  pt-1
                  font-mono
                  text-[8px]
                  tracking-[0.25em]
                  lg:block
                "
              >
                <div className="text-slate-700">STACK_STATUS</div>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-emerald-400/80
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      animate-pulse
                      rounded-full
                      bg-emerald-400
                    "
                  />
                  OPERATIONAL
                </div>
              </div>
            </div>

            {/* META */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-x-6
                gap-y-2
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-slate-600
              "
            >
              <span>
                NODES: <span className="text-cyan-400/80">16</span>
              </span>

              <span>
                LAYERS: <span className="text-purple-400/80">04</span>
              </span>

              <span>
                STATUS: <span className="text-emerald-400/80">OPERATIONAL</span>
              </span>

              <span>
                MODE: <span className="text-purple-400/80">INTERACTIVE</span>
              </span>
            </div>

            {/* FILTER / CATEGORY LABELS */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-2
                font-mono
                text-[7px]
                tracking-[0.2em]
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-cyan-400/30
                  px-3
                  py-1.5
                  text-cyan-300/80
                "
              >
                CLIENT
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-purple-400/30
                  px-3
                  py-1.5
                  text-purple-300/80
                "
              >
                SERVER
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-emerald-400/30
                  px-3
                  py-1.5
                  text-emerald-300/80
                "
              >
                DATABASE
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-blue-400/30
                  px-3
                  py-1.5
                  text-blue-300/80
                "
              >
                INFRA
              </span>
            </div>
          </header>

          {/* ==================================================
              STACK
             ================================================== */}

          <main
            className="
              relative
              z-20
              mx-auto
              mt-10
              max-w-7xl
            "
          >
            <div
              className="
                grid
                grid-cols-1
                gap-4
                lg:grid-cols-2
              "
            >
              {STACK_GROUPS.map((group, groupIndex) => {
                const color = COLORS[group.color];

                return (
                  <motion.section
                    key={group.id}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: groupIndex * 0.06,
                    }}
                    className="
                      relative
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-black/[0.08]
                      backdrop-blur-[1px]
                    "
                  >
                    <div
                      className={`
                        absolute
                        left-0
                        right-0
                        top-0
                        h-px
                        ${
                          group.color === "cyan"
                            ? "bg-cyan-400/30"
                            : "bg-purple-400/30"
                        }
                      `}
                    />

                    {/* CATEGORY HEADER */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/[0.05]
                        px-5
                        py-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            font-mono
                            text-[9px]
                            ${color.text}
                            opacity-60
                          `}
                        >
                          {group.number}
                        </span>

                        <h2
                          className="
                            font-mono
                            text-xs
                            tracking-[0.22em]
                            text-white
                            sm:text-sm
                          "
                        >
                          {group.label}
                        </h2>
                      </div>

                      <span
                        className="
                          font-mono
                          text-[8px]
                          tracking-widest
                          text-slate-600
                        "
                      >
                        {String(group.skills.length).padStart(2, "0")} NODES
                      </span>
                    </div>

                    {/* SKILLS */}

                    <div className="space-y-2 p-3 sm:p-4">
                      {group.skills.map((skill) => {
                        const selected = activeSkill?.name === skill.name;

                        return (
                          <motion.button
                            key={skill.name}
                            type="button"
                            onMouseEnter={() => setActiveSkill(skill)}
                            onMouseLeave={() => setActiveSkill(null)}
                            onFocus={() => setActiveSkill(skill)}
                            onBlur={() => setActiveSkill(null)}
                            whileHover={{
                              x: 3,
                            }}
                            className={`
                              group
                              relative
                              w-full
                              rounded-lg
                              border
                              px-4
                              py-3
                              text-left
                              transition-all
                              duration-200
                              ${
                                selected
                                  ? `${color.border} ${color.soft}`
                                  : "border-white/[0.04] bg-transparent"
                              }
                              ${color.hover}
                            `}
                          >
                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-4
                              "
                            >
                              <div className="min-w-0">
                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                  "
                                >
                                  <span
                                    className={`
                                      h-1.5
                                      w-1.5
                                      shrink-0
                                      rounded-full
                                      ${color.dot}
                                    `}
                                  />

                                  <span
                                    className="
                                      text-sm
                                      font-medium
                                      text-slate-200
                                      group-hover:text-white
                                    "
                                  >
                                    {skill.name}
                                  </span>
                                </div>

                                <p
                                  className="
                                    mt-1.5
                                    text-[10px]
                                    leading-relaxed
                                    text-slate-500
                                    sm:text-[11px]
                                  "
                                >
                                  {skill.description}
                                </p>
                              </div>

                              <span
                                className={`
                                  shrink-0
                                  font-mono
                                  text-[9px]
                                  ${color.text}
                                  opacity-70
                                `}
                              >
                                {skill.level}%
                              </span>
                            </div>

                            {/* LEVEL BAR */}

                            <div
                              className="
                                mt-3
                                h-px
                                w-full
                                overflow-hidden
                                bg-white/[0.05]
                              "
                            >
                              <motion.div
                                initial={{
                                  width: 0,
                                }}
                                animate={{
                                  width: `${skill.level}%`,
                                }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut",
                                }}
                                className={`
                                  h-full
                                  ${color.dot}
                                  opacity-60
                                `}
                              />
                            </div>

                            {/* TAGS */}

                            <div
                              className="
                                mt-2.5
                                flex
                                flex-wrap
                                gap-1.5
                              "
                            >
                              {skill.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="
                                      rounded-full
                                      border
                                      border-white/[0.05]
                                      px-2
                                      py-0.5
                                      font-mono
                                      text-[7px]
                                      tracking-wider
                                      text-slate-600
                                    "
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.section>
                );
              })}
            </div>
          </main>

          {/* ==================================================
              CORE ANALYSIS
             ================================================== */}

          <div
            className="
              relative
              z-20
              mx-auto
              mt-5
              max-w-7xl
            "
          >
            <div
              className="
                rounded-xl
                border
                border-white/[0.05]
                bg-black/[0.06]
                px-5
                py-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[8px]
                  tracking-[0.25em]
                  text-slate-600
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-cyan-400/60
                  "
                />
                CORE_ANALYSIS
              </div>

              <div className="mt-3 min-h-[25px]">
                {activeSkill ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-x-5
                      gap-y-2
                      font-mono
                    "
                  >
                    <span className="text-sm text-cyan-300">
                      {activeSkill.name}
                    </span>

                    <span className="text-[9px] text-slate-600">
                      DEPENDENCIES:
                    </span>

                    {activeSkill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                            text-[9px]
                            text-purple-300/70
                          "
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                ) : (
                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-widest
                      text-slate-700
                    "
                  >
                    HOVER_NODE_TO_ANALYZE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ==================================================
              SYSTEM MONITOR
             ================================================== */}

          <footer
            className="
              relative
              z-20
              mx-auto
              mt-5
              max-w-7xl
              pb-10
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-cyan-400/10
                bg-black/[0.05]
              "
            >
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/40
                  to-transparent
                "
              />

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  px-5
                  py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      font-mono
                      text-[9px]
                      tracking-[0.25em]
                      text-cyan-300
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_10px_rgba(0,240,255,.9)]
                      "
                    />
                    SYSTEM_MONITOR
                  </div>

                  <p
                    className="
                      mt-2
                      font-mono
                      text-[8px]
                      tracking-wider
                      text-slate-600
                    "
                  >
                    ALL CORE SERVICES OPERATIONAL
                  </p>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-4
                    font-mono
                    text-[8px]
                    tracking-widest
                  "
                >
                  <span className="text-emerald-400/70">● FRONTEND</span>

                  <span className="text-emerald-400/70">● BACKEND</span>

                  <span className="text-emerald-400/70">● DATABASE</span>

                  <span className="text-emerald-400/70">● DEVOPS</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
