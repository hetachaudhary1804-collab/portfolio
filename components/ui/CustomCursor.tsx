"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Mouse position targets
  const mouse = useRef({ x: 0, y: 0 });
  // Lerped ring position
  const ringPos = useRef({ x: 0, y: 0 });

  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const touchCheck = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    const isTouch = touchCheck();
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Make visible on first move
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest("a, button, [role='button'], input, select, textarea");
      const cursorAttrEl = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorAttrEl) {
        const action = cursorAttrEl.getAttribute("data-cursor");
        setIsHovered(true);
        if (action === "view") {
          setCursorText("VIEW");
        } else if (action === "explore") {
          setCursorText("EXPLORE");
        } else {
          setCursorText("");
        }
      } else if (interactiveEl) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    // Animation loop for smooth lerping
    const render = () => {
      // Lerp ring positions
      const lerpFactor = 0.15;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Tiny core dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot select-none"
        style={{
          opacity: 0,
          backgroundColor: isHovered ? "#a855f7" : "#00f0ff",
        }}
      />
      {/* Outer tracking ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring select-none"
        style={{
          opacity: 0,
          width: isHovered ? (cursorText ? "70px" : "48px") : "32px",
          height: isHovered ? (cursorText ? "70px" : "48px") : "32px",
          borderColor: isHovered ? (cursorText ? "rgba(0, 240, 255, 0.8)" : "rgba(168, 85, 247, 0.8)") : "rgba(0, 240, 255, 0.3)",
          backgroundColor: isHovered && cursorText ? "rgba(0, 240, 255, 0.05)" : "transparent",
        }}
      >
        {cursorText}
      </div>
    </>
  );
}
