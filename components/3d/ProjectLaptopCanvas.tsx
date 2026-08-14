"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ProjectProps {
  number: string;
  title: string;
  category: string;
  tags: string[];
}

interface MiniLaptopProps {
  isHovered: boolean;
  isOpen: boolean;
}

/* =========================================================
   KEYBOARD
========================================================= */

function MiniKeyboard() {
  const rows = [
    { width: 3.7, z: -0.62 },
    { width: 3.55, z: -0.34 },
    { width: 3.35, z: -0.06 },
    { width: 3.05, z: 0.22 },
  ];

  return (
    <group position={[0, 0.18, -0.18]}>
      {rows.map((row, index) => (
        <RoundedBox
          key={index}
          args={[row.width, 0.035, 0.17]}
          radius={0.015}
          smoothness={2}
          position={[0, 0.025, row.z]}
        >
          <meshStandardMaterial
            color="#090812"
            emissive="#a855f7"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.22}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

/* =========================================================
   LAPTOP
========================================================= */

function MiniLaptop({ isHovered, isOpen }: MiniLaptopProps) {
  const laptopGroup = useRef<THREE.Group>(null);
  const lidGroup = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Group>(null);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  /* -------------------------------------------------------
     MOUSE TRACKING
  ------------------------------------------------------- */

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;

      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /* -------------------------------------------------------
     ANIMATION
  ------------------------------------------------------- */

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    /* ==============================
       BODY FLOAT + MOUSE TILT
    ============================== */

    if (laptopGroup.current) {
      const targetY = -0.48 + Math.sin(time * 1.5) * 0.025;

      laptopGroup.current.position.y = THREE.MathUtils.lerp(
        laptopGroup.current.position.y,
        targetY,
        0.08,
      );

      const targetRotationY = isHovered
        ? -0.28 + mouse.current.x * 0.18
        : -0.28 + Math.sin(time * 0.35) * 0.035;

      const targetRotationX = isHovered ? 0.08 - mouse.current.y * 0.08 : 0.08;

      laptopGroup.current.rotation.y = THREE.MathUtils.lerp(
        laptopGroup.current.rotation.y,
        targetRotationY,
        0.08,
      );

      laptopGroup.current.rotation.x = THREE.MathUtils.lerp(
        laptopGroup.current.rotation.x,
        targetRotationX,
        0.08,
      );
    }

    /* ==============================
       LID

       CLOSED  = -1.42
       OPEN    = -0.08
    ============================== */

    if (lidGroup.current) {
      const targetAngle = isOpen ? -0.08 : -1.42;

      lidGroup.current.rotation.x = THREE.MathUtils.lerp(
        lidGroup.current.rotation.x,
        targetAngle,
        0.1,
      );
    }

    /* ==============================
       HOLOGRAM
    ============================== */

    if (hologramRef.current) {
      const targetScale = isOpen ? 1 : 0;

      const currentScale = hologramRef.current.scale.x;

      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.12);

      hologramRef.current.scale.setScalar(nextScale);

      hologramRef.current.rotation.y = time * 0.55;

      hologramRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.06;
    }

    /* ==============================
       SCREEN GLOW
    ============================== */

    if (screenMaterialRef.current) {
      const targetIntensity = isOpen ? 2 : 0.08;

      screenMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        screenMaterialRef.current.emissiveIntensity,
        targetIntensity,
        0.1,
      );
    }
  });

  return (
    <group
      ref={laptopGroup}
      position={[0, -0.48, 0]}
      rotation={[0.08, -0.28, 0]}
      scale={0.88}
    >
      {/* =====================================================
          LID
      ===================================================== */}

      <group ref={lidGroup} position={[0, 0.36, -1.3]} rotation={[-1.42, 0, 0]}>
        {/* Outer lid */}

        <RoundedBox
          args={[3.8, 2.3, 0.12]}
          radius={0.1}
          smoothness={4}
          position={[0, 1.15, 0]}
        >
          <meshStandardMaterial
            color="#11121c"
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Bezel */}

        <RoundedBox
          args={[3.6, 2.1, 0.05]}
          radius={0.08}
          smoothness={4}
          position={[0, 1.15, 0.065]}
        >
          <meshStandardMaterial
            color="#020208"
            metalness={0.15}
            roughness={0.45}
          />
        </RoundedBox>

        {/* Screen */}

        <mesh position={[0, 1.15, 0.1]}>
          <planeGeometry args={[3.38, 1.88]} />

          <meshStandardMaterial
            ref={screenMaterialRef}
            color="#02030d"
            emissive="#00eaff"
            emissiveIntensity={0.08}
            roughness={0.12}
            metalness={0.25}
          />
        </mesh>

        {/* Screen center glow */}

        <mesh position={[0, 1.15, 0.105]}>
          <planeGeometry args={[2.9, 1.5]} />

          <meshBasicMaterial color="#071827" transparent opacity={0.35} />
        </mesh>

        {/* Camera */}

        <mesh position={[0, 2.22, 0.1]}>
          <circleGeometry args={[0.025, 16]} />

          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      </group>

      {/* =====================================================
          BASE
      ===================================================== */}

      <group position={[0, 0.25, 0]}>
        {/* Chassis */}

        <RoundedBox
          args={[4.2, 0.22, 2.75]}
          radius={0.1}
          smoothness={4}
          position={[0, 0.05, -0.1]}
        >
          <meshStandardMaterial
            color="#11121c"
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Keyboard recess */}

        <mesh position={[0, 0.165, -0.22]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.9, 1.6]} />

          <meshStandardMaterial color="#03040a" roughness={0.32} />
        </mesh>

        <MiniKeyboard />

        {/* Trackpad */}

        <RoundedBox
          args={[0.9, 0.02, 0.65]}
          radius={0.04}
          position={[0, 0.17, 0.7]}
        >
          <meshStandardMaterial
            color="#151622"
            metalness={0.7}
            roughness={0.3}
          />
        </RoundedBox>
      </group>

      {/* =====================================================
          HOLOGRAM
      ===================================================== */}

      <group ref={hologramRef} position={[0, 1.05, 0]} scale={[0, 0, 0]}>
        {/* Ground ring */}

        <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.75, 0.81, 40]} />

          <meshBasicMaterial
            color="#00eaff"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Orbit */}

        <mesh rotation={[Math.PI / 3, 0.5, 0]}>
          <ringGeometry args={[1.05, 1.07, 40]} />

          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.32}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Particles */}

        {Array.from({ length: 8 }).map((_, index) => {
          const theta = (index / 8) * Math.PI * 2;

          const radius = 0.62;

          return (
            <mesh
              key={index}
              position={[
                Math.cos(theta) * radius,
                (index % 4) * 0.18 - 0.25,
                Math.sin(theta) * radius,
              ]}
            >
              <boxGeometry args={[0.07, 0.07, 0.07]} />

              <meshBasicMaterial
                color={index % 2 === 0 ? "#00eaff" : "#a855f7"}
                transparent
                opacity={0.7}
              />
            </mesh>
          );
        })}
      </group>

      {/* =====================================================
          LIGHTING
      ===================================================== */}

      <pointLight
        position={[0, 1.4, 0.5]}
        intensity={isOpen ? 1.3 : 0.25}
        color="#00eaff"
        distance={3.5}
      />

      <pointLight
        position={[-1.5, 0.2, 0.5]}
        intensity={0.7}
        color="#a855f7"
        distance={2.5}
      />
    </group>
  );
}

/* =========================================================
   CANVAS
========================================================= */

export default function ProjectLaptopCanvas({
  project,
}: {
  project: ProjectProps;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleLaptop = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <div
      className="
        relative
        w-full
        h-full
        cursor-pointer
        select-none
        touch-manipulation
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleLaptop}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} preview`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleLaptop();
        }
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.75, 5.8],
          fov: 38,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight position={[4, 5, 3]} intensity={2.2} />

        <pointLight position={[-3, 1, 3]} intensity={1.6} color="#a855f7" />

        <pointLight position={[3, -1, 2]} intensity={1.2} color="#00eaff" />

        <MiniLaptop isHovered={isHovered} isOpen={isOpen} />
      </Canvas>

      {/* =====================================================
          HUD
      ===================================================== */}

      <div
        className={`
          absolute
          bottom-3
          left-4
          right-4
          pointer-events-none
          flex
          items-center
          justify-between
          font-mono
          text-[8px]
          sm:text-[9px]
          transition-all
          duration-300
        `}
      >
        <span
          className={
            isOpen ? "text-cyan-400 font-bold" : "text-cyan-400/70 font-bold"
          }
        >
          {isOpen ? "[ SYSTEM: ONLINE ]" : "[ CLICK TO INITIALIZE ]"}
        </span>

        <span className="text-slate-600">ID: {project.number}</span>
      </div>

      {/* Open indicator */}

      <div
        className={`
          absolute
          top-4
          right-4
          pointer-events-none
          font-mono
          text-[8px]
          tracking-[0.18em]
          transition-opacity
          duration-300
          ${isOpen ? "opacity-100 text-cyan-400" : "opacity-0"}
        `}
      >
        LIVE_RENDER
      </div>
    </div>
  );
}
