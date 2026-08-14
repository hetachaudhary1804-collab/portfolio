"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "./Laptop";

export default function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0.8, 6.5],
        fov: 35,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* =====================================================
          LIGHTING
      ====================================================== */}

      <ambientLight intensity={1.2} />

      <directionalLight position={[4, 5, 5]} intensity={2} />

      <pointLight position={[-4, 2, 4]} intensity={3} color="#a855f7" />

      <pointLight position={[3, 1, 2]} intensity={2} color="#22d3ee" />

      {/* =====================================================
          LAPTOP
      ====================================================== */}

      <Laptop />

      {/* =====================================================
          ENVIRONMENT
      ====================================================== */}

      <Environment preset="city" />

      {/* Disable user orbiting.
          Mouse interaction is handled by HeroSection. */}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}
