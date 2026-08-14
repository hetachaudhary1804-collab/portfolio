"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Navigation from "@/components/ui/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import Scene from "@/components/3d/Scene";

import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ThreeDExperience from "@/components/sections/ThreeDExperience";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ContactSection from "@/components/contact/ContactSection";

/* ============================================================
   MAIN SECTIONS
   ============================================================ */

const SECTIONS = [
  {
    id: "home",
    label: "Home",
    component: HeroSection,
  },
  {
    id: "about",
    label: "About",
    component: AboutSection,
  },
  {
    id: "skills",
    label: "Stack",
    component: SkillsSection,
  },
  {
    id: "projects",
    label: "Work",
    component: ProjectsSection,
  },
  {
    id: "three3d",
    label: "3D Engine",
    component: ThreeDExperience,
  },
  {
    id: "experience",
    label: "Journey",
    component: ExperienceSection,
  },
  {
    id: "contact",
    label: "Contact",
    component: ContactSection,
  },
] as const;

/*
 * Contact is the last content page.
 *
 * Contact
 *    ↓
 * Robot
 *    ↓
 * Home
 */

const ROBOT_INDEX = SECTIONS.length;

/* ============================================================
   PORTALS
   ============================================================ */

const PORTALS = [
  {
    x: 78,
    y: 25,
    size: 12,
    color: "bg-cyan-400",
    shadowColor: "rgba(6, 182, 212, 0.85)",
  },
  {
    x: 15,
    y: 55,
    size: 10,
    color: "bg-purple-400",
    shadowColor: "rgba(168, 85, 247, 0.85)",
  },
  {
    x: 50,
    y: 85,
    size: 14,
    color: "bg-blue-400",
    shadowColor: "rgba(59, 130, 246, 0.85)",
  },
  {
    x: 85,
    y: 60,
    size: 11,
    color: "bg-emerald-400",
    shadowColor: "rgba(52, 211, 153, 0.85)",
  },
  {
    x: 20,
    y: 30,
    size: 13,
    color: "bg-indigo-400",
    shadowColor: "rgba(129, 140, 248, 0.85)",
  },
  {
    x: 70,
    y: 75,
    size: 9,
    color: "bg-pink-400",
    shadowColor: "rgba(244, 114, 182, 0.85)",
  },
  {
    x: 50,
    y: 92,
    size: 15,
    color: "bg-cyan-400",
    shadowColor: "rgba(6, 182, 212, 0.85)",
  },
];

/* ============================================================
   TYPES
   ============================================================ */

interface ScrollState {
  current: number;
  target: number;
  velocity: number;
  frame: number | null;
  animating: boolean;
}

/* ============================================================
   HOME
   ============================================================ */

export default function Home() {
  const [inspectMode, setInspectMode] = useState(false);

  /*
   * This is now the actual current page.
   *
   * 0 = Home
   * 1 = About
   * 2 = Stack
   * 3 = Work
   * 4 = 3D
   * 5 = Journey
   * 6 = AI
   * 7 = Contact
   * 8 = Robot
   */

  const [activeIndex, setActiveIndex] = useState(0);

  const [windowHeight, setWindowHeight] = useState(800);

  const [portalHovered, setPortalHovered] = useState(false);

  const scroll = useRef<ScrollState>({
    current: 0,
    target: 0,
    velocity: 0,
    frame: null,
    animating: false,
  });

  const currentPageRef = useRef(0);

  const wheelLock = useRef(false);

  /* ==========================================================
     HELPERS
     ========================================================== */

  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  }, []);

  /*
   * Find an element that explicitly declares itself as
   * an internal page scroller.
   *
   * Example:
   *
   * <div data-section-scroll="true" className="overflow-y-auto">
   *
   */

  const getInternalScroller = useCallback(
    (target: EventTarget | null): HTMLElement | null => {
      if (!(target instanceof HTMLElement)) {
        return null;
      }

      return target.closest(
        '[data-section-scroll="true"]',
      ) as HTMLElement | null;
    },
    [],
  );

  /*
   * Check whether the internal content can still consume
   * the wheel movement.
   */

  const internalCanScroll = useCallback(
    (element: HTMLElement, deltaY: number) => {
      const maxScroll = element.scrollHeight - element.clientHeight;

      /*
       * No internal scrolling required.
       */

      if (maxScroll <= 2) {
        return false;
      }

      const currentTop = element.scrollTop;

      const atTop = currentTop <= 1;

      const atBottom = currentTop >= maxScroll - 1;

      /*
       * Scrolling DOWN.
       *
       * If we aren't at the bottom, let the page consume
       * the wheel normally.
       */

      if (deltaY > 0) {
        return !atBottom;
      }

      /*
       * Scrolling UP.
       *
       * If we aren't at the top, let the page consume
       * the wheel normally.
       */

      if (deltaY < 0) {
        return !atTop;
      }

      return false;
    },
    [],
  );

  /* ==========================================================
     RESET INTERNAL SCROLLERS
     ========================================================== */

  const resetInternalScroll = useCallback(() => {
    /*
     * When entering a new main page, reset its internal
     * scrolling position.
     *
     * This prevents:
     *
     * Stack -> Work
     *
     * and Work opening halfway down.
     */

    requestAnimationFrame(() => {
      const scrollers = document.querySelectorAll(
        '[data-section-scroll="true"]',
      );

      scrollers.forEach((element) => {
        const el = element as HTMLElement;

        el.scrollTop = 0;
      });
    });
  }, []);

  /* ==========================================================
     MAIN PAGE ANIMATION
     ========================================================== */

  const animateToPage = useCallback(
    (pageIndex: number) => {
      const height = window.innerHeight;

      const safeIndex = clamp(pageIndex, 0, ROBOT_INDEX);

      const target = safeIndex * height;

      const state = scroll.current;

      state.target = target;

      if (state.animating) {
        return;
      }

      state.animating = true;

      const animate = () => {
        const difference = state.target - state.current;

        /*
         * Smooth page movement.
         */

        state.current += difference * 0.12;

        state.velocity = difference;

        window.scrollTo({
          top: state.current,
          behavior: "auto",
        });

        if (Math.abs(difference) > 0.5) {
          state.frame = requestAnimationFrame(animate);

          return;
        }

        /*
         * Finish exactly on the page.
         */

        state.current = state.target;

        state.velocity = 0;

        window.scrollTo({
          top: state.current,
          behavior: "auto",
        });

        state.animating = false;

        state.frame = null;

        setActiveIndex(safeIndex);

        currentPageRef.current = safeIndex;

        resetInternalScroll();

        /*
         * Small delay prevents one trackpad gesture
         * from instantly moving through several pages.
         */

        window.setTimeout(() => {
          wheelLock.current = false;
        }, 180);
      };

      state.frame = requestAnimationFrame(animate);
    },
    [clamp, resetInternalScroll],
  );

  /* ==========================================================
     GO TO PAGE
     ========================================================== */

  const goToPage = useCallback(
    (index: number) => {
      if (wheelLock.current) {
        return;
      }

      const current = currentPageRef.current;

      /*
       * Don't go outside the portfolio.
       */

      const safeIndex = clamp(index, 0, ROBOT_INDEX);

      if (safeIndex === current) {
        return;
      }

      wheelLock.current = true;

      currentPageRef.current = safeIndex;

      setActiveIndex(safeIndex);

      animateToPage(safeIndex);
    },
    [animateToPage, clamp],
  );

  /* ==========================================================
     WHEEL
     ========================================================== */

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (inspectMode) {
        /*
         * OrbitControls needs the wheel.
         */

        return;
      }

      const deltaY = event.deltaY;

      if (Math.abs(deltaY) < 0.1) {
        return;
      }

      /*
       * --------------------------------------------------------
       * INTERNAL PAGE SCROLL HAS FIRST PRIORITY
       * --------------------------------------------------------
       */

      const internal = getInternalScroller(event.target);

      if (internal && internalCanScroll(internal, deltaY)) {
        /*
         * VERY IMPORTANT:
         *
         * We do NOT preventDefault.
         *
         * Browser scrolls:
         *
         * Stack content
         * Work projects
         * AI content
         * etc.
         */

        return;
      }

      /*
       * From here the main portfolio takes control.
       */

      event.preventDefault();

      /*
       * Prevent one trackpad gesture from skipping:
       *
       * Stack -> Work -> 3D
       *
       */

      if (wheelLock.current) {
        return;
      }

      const current = currentPageRef.current;

      /*
       * DOWN
       */

      if (deltaY > 0) {
        if (current < ROBOT_INDEX) {
          goToPage(current + 1);
        } else if (current === ROBOT_INDEX) {
          goToPage(0);
        }

        return;
      }

      /*
       * UP
       */

      if (deltaY < 0) {
        if (current > 0) {
          goToPage(current - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [getInternalScroller, goToPage, inspectMode, internalCanScroll]);

  /* ==========================================================
     INITIAL / RESIZE
     ========================================================== */

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;

      setWindowHeight(height);

      /*
       * Keep the current page aligned after resize.
       */

      const current = currentPageRef.current;

      const target = current * height;

      scroll.current.current = target;
      scroll.current.target = target;

      window.scrollTo({
        top: target,
        behavior: "auto",
      });
    };

    const initialHeight = window.innerHeight;

    setWindowHeight(initialHeight);

    scroll.current.current = 0;
    scroll.current.target = 0;

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ==========================================================
     ESC
     ========================================================== */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInspectMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ==========================================================
     PORTAL
     ========================================================== */

  const portal = PORTALS[Math.min(activeIndex, PORTALS.length - 1)];

  const scrollToNextSection = () => {
    const current = currentPageRef.current;

    /*
     * Contact -> Robot
     */

    if (current === SECTIONS.length - 1) {
      goToPage(ROBOT_INDEX);

      return;
    }

    /*
     * Robot -> Home
     */

    if (current === ROBOT_INDEX) {
      goToPage(0);

      return;
    }

    /*
     * Normal page -> next page
     */

    goToPage(current + 1);
  };

  /* ==========================================================
     SCENE VISIBILITY
     ========================================================== */

  /*
   * Large robot:
   *
   * Home
   * About
   * Contact
   * Robot
   *
   * Stack gets a special SMALL robot.
   */

  const sceneVisible =
    activeIndex === 0 ||
    activeIndex === 1 ||
    activeIndex === 2 ||
    activeIndex === 6 ||
    activeIndex === ROBOT_INDEX;

  const isSmallStackRobot = activeIndex === 2;

  const sceneProgress =
    activeIndex === 0 ||
    activeIndex === 1 ||
    activeIndex === 2 ||
    activeIndex === 6 ||
    activeIndex === ROBOT_INDEX
      ? 1
      : 0;

  /* ==========================================================
     PAGE COMPONENT
     ========================================================== */

  const ActiveComponent =
    activeIndex < SECTIONS.length ? SECTIONS[activeIndex].component : null;

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <main
      className="
        relative
        min-h-screen
        bg-[#02000a]
        text-slate-100
      "
    >
      {/* ======================================================
          SCROLL DRIVER
          ====================================================== */}

      {SECTIONS.map((section) => (
        <div
          key={section.id}
          id={section.id}
          className="
            w-full
            h-screen
            pointer-events-none
          "
        />
      ))}

      {/* Robot state */}

      <div
        className="
          w-full
          h-screen
          pointer-events-none
        "
      />

      {/* ======================================================
          FIXED PORTFOLIO VIEWPORT
          ====================================================== */}

      <div
        className="
          portfolio-viewport
          fixed
          inset-0
          overflow-hidden
          pointer-events-none
          z-10
        "
      >
        {/* ====================================================
            CUSTOM CURSOR
            ==================================================== */}

        <CustomCursor />

        {/* ====================================================
            NAVIGATION
            ==================================================== */}

        <Navigation inspectMode={inspectMode} setInspectMode={setInspectMode} />

        {/* ====================================================
            3D ROBOT
            ==================================================== */}

        {sceneVisible && (
          <div
            className="
    absolute
    inset-0
    z-0
    transition-opacity
    duration-700
  "
            style={{
              opacity: sceneVisible ? 1 : 0,
              pointerEvents: sceneVisible && inspectMode ? "auto" : "none",
            }}
          >
            <Scene
              inspectMode={inspectMode}
              scrollProgress={sceneProgress}
              scrollVelocity={scroll.current.velocity}
              activeIndex={activeIndex}
              isSmallStackRobot={isSmallStackRobot}
            />
          </div>
        )}

        {/* ====================================================
            STACK ROBOT LABEL
            ==================================================== */}

        {activeIndex === 2 && (
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              absolute
              right-[5%]
              bottom-[4%]
              z-20
              pointer-events-none
              font-mono
              text-[8px]
              tracking-[0.3em]
              text-cyan-300/50
              uppercase
            "
          >
            SYSTEM_MONITOR
          </motion.div>
        )}

        {/* ====================================================
            ROBOT END SCREEN
            ==================================================== */}

        <AnimatePresence>
          {activeIndex === ROBOT_INDEX && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                absolute
                inset-0
                z-20
                pointer-events-none
                flex
                items-end
                justify-center
                pb-12
              "
            >
              <div
                className="
                  px-5
                  py-2.5
                  rounded-full
                  bg-black/50
                  backdrop-blur-md
                  border
                  border-cyan-400/10
                  text-cyan-300/60
                  font-mono
                  text-[9px]
                  tracking-[0.3em]
                "
              >
                SYSTEM_IDLE
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================
            CONTENT
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
            pointer-events-none
          "
        >
          {ActiveComponent && (
            <div
              key={SECTIONS[activeIndex].id}
              className="
                portfolio-page
                absolute
                inset-0
                w-full
                h-full
                overflow-hidden
                pointer-events-auto
              "
            >
              <ActiveComponent inspectMode={inspectMode} />
            </div>
          )}
        </div>

        {/* ====================================================
            PORTAL
            ==================================================== */}

        <motion.button
          type="button"
          aria-label={
            activeIndex === ROBOT_INDEX
              ? "Return to Home"
              : activeIndex === SECTIONS.length - 1
                ? "Continue to Robot"
                : "Explore next section"
          }
          animate={{
            rotate: portalHovered ? 90 : 0,

            scale: portalHovered ? 1.5 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className={`
            fixed
            right-[7%]
            bottom-[9%]
            z-40
            cursor-pointer
            pointer-events-auto
            border
            rounded-full
            transition-all
            duration-300
            ${
              portalHovered
                ? "border-white bg-transparent"
                : `border-white/35 ${portal?.color ?? "bg-cyan-400"}`
            }
          `}
          style={{
            width: `${portal?.size ?? 12}px`,

            height: `${portal?.size ?? 12}px`,

            boxShadow: portalHovered
              ? "0 0 25px rgba(255,255,255,0.95)"
              : `0 0 18px ${portal?.shadowColor ?? "rgba(0,240,255,0.8)"}`,
          }}
          onMouseEnter={() => setPortalHovered(true)}
          onMouseLeave={() => setPortalHovered(false)}
          onClick={scrollToNextSection}
        />

        {/* ====================================================
            PAGE INDICATOR
            ==================================================== */}

        <div
          className="
            fixed
            left-[5%]
            bottom-[5%]
            z-30
            pointer-events-none
            font-mono
            text-[9px]
            tracking-[0.25em]
            text-white/30
          "
        >
          {activeIndex === ROBOT_INDEX
            ? `${String(ROBOT_INDEX + 1).padStart(2, "0")} / ROBOT`
            : `${String(activeIndex + 1).padStart(2, "0")} / ${
                SECTIONS[activeIndex]?.label?.toUpperCase() ?? "HOME"
              }`}
        </div>
      </div>

      {/* ======================================================
          INSPECT MODE HUD
          ====================================================== */}

      <AnimatePresence>
        {inspectMode && (
          <motion.div
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
              y: 30,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              fixed
              inset-x-0
              bottom-10
              z-50
              pointer-events-none
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <div
              className="
                px-6
                py-3.5
                rounded-full
                bg-black/80
                backdrop-blur-md
                border
                border-cyan-500/20
                text-cyan-300
                font-mono
                text-[10px]
                sm:text-xs
                tracking-widest
                pointer-events-auto
                flex
                items-center
                gap-4
                shadow-[0_0_40px_rgba(0,240,255,0.15)]
                select-none
              "
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-cyan-400
                    animate-ping
                  "
                />
                🖱️ L-CLICK + DRAG TO ROTATE
              </span>

              <span className="text-slate-700">|</span>

              <span>📜 SCROLL TO ZOOM</span>

              <span className="text-slate-700">|</span>

              <button
                type="button"
                onClick={() => setInspectMode(false)}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/10
                  hover:bg-cyan-500/20
                  border
                  border-cyan-400/30
                  text-cyan-300
                  font-bold
                  transition-all
                  text-[9px]
                  cursor-pointer
                  hover:scale-105
                  active:scale-95
                "
              >
                EXIT_3D [ESC]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
