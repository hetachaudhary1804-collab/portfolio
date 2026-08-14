"use client";

import React, { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GirlAvatar, { globalMouse, globalScroll } from "./GirlAvatar";

interface Keyframe {
  progress: number;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
}

const keyframes: Keyframe[] = [
  { progress: 0.0, pos: [1.3, -0.25, 0], rot: [0.1, -0.35, 0], scale: 1.15 },    // Hero
  { progress: 0.2, pos: [-1.2, -0.1, 0], rot: [0.15, 0.35, 0], scale: 1.1 },      // About
  { progress: 0.4, pos: [1.2, -0.2, 0.5], rot: [0.2, -0.2, 0], scale: 1.1 },      // Skills
  { progress: 0.6, pos: [0, -0.3, -1.0], rot: [0.4, 0, 0], scale: 0.95 },        // Projects
  { progress: 0.8, pos: [-1.2, -0.1, 0], rot: [0.15, 0.4, 0], scale: 1.05 },     // Experience
  { progress: 1.0, pos: [0, 0.1, 1.2], rot: [0.05, 0, 0], scale: 1.3 }           // Contact
];

const mobileKeyframes: Keyframe[] = [
  { progress: 0.0, pos: [0, -1.1, -0.2], rot: [0.05, -0.1, 0], scale: 0.75 },    // Hero
  { progress: 0.2, pos: [0, -1.0, -0.4], rot: [0.1, 0.1, 0], scale: 0.7 },       // About
  { progress: 0.4, pos: [0, -1.1, -0.3], rot: [0.15, -0.1, 0], scale: 0.7 },     // Skills
  { progress: 0.6, pos: [0, -1.2, -0.8], rot: [0.35, 0, 0], scale: 0.6 },        // Projects
  { progress: 0.8, pos: [0, -1.0, -0.4], rot: [0.1, 0.1, 0], scale: 0.7 },       // Experience
  { progress: 1.0, pos: [0, -0.6, 0.4], rot: [0.05, 0, 0], scale: 0.95 }         // Contact
];

function interpolateKeyframes(progress: number, frames: Keyframe[]) {
  const p = Math.max(0, Math.min(1, progress));
  
  let i = 0;
  while (i < frames.length - 1 && p > frames[i + 1].progress) {
    i++;
  }
  
  const f1 = frames[i];
  const f2 = frames[i + 1];
  
  const range = f2.progress - f1.progress;
  const t = range > 0 ? (p - f1.progress) / range : 0;
  
  return {
    pos: [
      f1.pos[0] + (f2.pos[0] - f1.pos[0]) * t,
      f1.pos[1] + (f2.pos[1] - f1.pos[1]) * t,
      f1.pos[2] + (f2.pos[2] - f1.pos[2]) * t,
    ] as [number, number, number],
    rot: [
      f1.rot[0] + (f2.rot[0] - f1.rot[0]) * t,
      f1.rot[1] + (f2.rot[1] - f1.rot[1]) * t,
      f1.rot[2] + (f2.rot[2] - f1.rot[2]) * t,
    ] as [number, number, number],
    scale: f1.scale + (f2.scale - f1.scale) * t,
  };
}

export default function Laptop() {
  const groupRef = useRef<THREE.Group>(null);
  const haloGroupRef = useRef<THREE.Group>(null);

  // Velocity tracking state variables
  const lastScroll = useRef(0);
  const lastTime = useRef(0);
  const scrollVelocity = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    const width = state.size.width;
    const isMobile = width < 768;
    const frames = isMobile ? mobileKeyframes : keyframes;

    // 1. Calculate time delta and scroll velocity
    const time = state.clock.elapsedTime;
    const dt = Math.max(0.001, time - lastTime.current);
    lastTime.current = time;

    const currentScroll = globalScroll.progress;
    const scrollDelta = currentScroll - lastScroll.current;
    lastScroll.current = currentScroll;

    // Calculate instantaneous scroll velocity and apply low-pass filter to smooth it
    const instantVelocity = Math.abs(scrollDelta) / dt;
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, instantVelocity, 0.1);

    // 2. Get scroll positions
    const target = interpolateKeyframes(currentScroll, frames);

    // 3. Mouse tracking for subtle tilt
    const mouseX = globalMouse.x * 0.15;
    const mouseY = globalMouse.y * 0.12;

    // 4. Combine target position with gentle bobbing/floating motion
    const targetPos = new THREE.Vector3(...target.pos);
    targetPos.y += Math.sin(time * 0.8) * 0.06;

    // Combine target rotation with gentle rolling motion
    const targetRot = new THREE.Euler(
      target.rot[0] - mouseY,
      target.rot[1] + mouseX,
      target.rot[2] + Math.sin(time * 0.45) * 0.012
    );

    // 5. Smoothly lerp towards targets
    groupRef.current.position.lerp(targetPos, 0.05);

    const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRot);
    groupRef.current.quaternion.slerp(targetQuaternion, 0.05);

    const targetScale = target.scale;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05)
    );

    // 6. Glitch / Distortion effect on the halos in response to scroll velocity
    if (haloGroupRef.current) {
      const velocity = Math.min(2.5, scrollVelocity.current); // Clamp velocity impact
      if (velocity > 0.15) {
        // Fast horizontal jitter
        haloGroupRef.current.position.x = (Math.random() - 0.5) * 0.05 * velocity;
        // Fast vertical jitter
        haloGroupRef.current.position.y = -0.05 + (Math.random() - 0.5) * 0.05 * velocity;
        // High frequency scale distortion
        haloGroupRef.current.scale.x = 1.0 + (Math.random() - 0.5) * 0.15 * velocity;
        haloGroupRef.current.scale.y = 1.0 + (Math.random() - 0.5) * 0.08 * velocity;
      } else {
        // Smoothly settle back to normal position and scale
        haloGroupRef.current.position.x = THREE.MathUtils.lerp(haloGroupRef.current.position.x, 0, 0.1);
        haloGroupRef.current.position.y = THREE.MathUtils.lerp(haloGroupRef.current.position.y, -0.05, 0.1);
        haloGroupRef.current.scale.x = THREE.MathUtils.lerp(haloGroupRef.current.scale.x, 1, 0.1);
        haloGroupRef.current.scale.y = THREE.MathUtils.lerp(haloGroupRef.current.scale.y, 1, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0, -0.12, 0]}>
      {/* =====================================================
          LAPTOP SCREEN
      ====================================================== */}
      <group position={[0, 1.05, 0]}>
        {/* Outer screen shell (Metal) */}
        <RoundedBox args={[4.5, 2.85, 0.2]} radius={0.15} smoothness={8}>
          <meshStandardMaterial
            color="#1b1c24"
            metalness={0.9}
            roughness={0.15}
          />
        </RoundedBox>

        {/* Inner black bezel */}
        <RoundedBox
          args={[4.25, 2.6, 0.08]}
          radius={0.12}
          smoothness={8}
          position={[0, 0, 0.12]}
        >
          <meshStandardMaterial
            color="#040409"
            metalness={0.3}
            roughness={0.3}
          />
        </RoundedBox>

        {/* =================================================
            SCREEN SURFACE
        ================================================== */}
        <mesh position={[0, 0, 0.18]}>
          <planeGeometry args={[4.02, 2.35]} />
          <meshStandardMaterial
            color="#04030d"
            emissive="#0c0722"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.2}
          />
        </mesh>

        {/* Purple screen glow filter */}
        <mesh position={[0, 0, 0.19]}>
          <planeGeometry args={[3.98, 2.31]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.03} />
        </mesh>

        {/* Screen back glow light source */}
        <pointLight
          position={[0, 0, 0.8]}
          intensity={0.6}
          distance={3.5}
          color="#d946ef"
        />

        {/* =================================================
            GIRL AVATAR & GLITCH HALOS
            ================================================== */}
        <group position={[0, -0.05, 0.25]}>
          {/* Glitch Group for Halo Rings */}
          <group ref={haloGroupRef} position={[0, 0, 0]}>
            {/* Inner halo ring */}
            <mesh position={[0, 0.15, -0.03]}>
              <ringGeometry args={[1.15, 1.17, 64]} />
              <meshBasicMaterial
                color="#e879f9"
                transparent
                opacity={0.45}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Outer halo ring */}
            <mesh position={[0, 0.15, -0.04]}>
              <ringGeometry args={[1.38, 1.395, 64]} />
              <meshBasicMaterial
                color="#c084fc"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* REAL 3D GIRL AVATAR OR COMPONENT FALLBACK */}
          <GirlAvatar position={[0, -1.02, 0.02]} scale={1.25} />
        </group>

        {/* Web Camera */}
        <mesh position={[0, 1.28, 0.2]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#020617" />
        </mesh>

        {/* Camera Indicator Light */}
        <mesh position={[0, 1.28, 0.235]}>
          <circleGeometry args={[0.012, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      </group>

      {/* =====================================================
          LAPTOP BASE
      ====================================================== */}
      <group position={[0, -0.45, 0.35]}>
        {/* Main base chassis */}
        <RoundedBox
          args={[4.95, 0.28, 3.15]}
          radius={0.13}
          smoothness={8}
          rotation={[-0.08, 0, 0]}
        >
          <meshStandardMaterial
            color="#1b1c24"
            metalness={0.9}
            roughness={0.15}
          />
        </RoundedBox>

        {/* Keyboard recess surface */}
        <mesh position={[0, 0.16, -0.2]} rotation={[-0.08, 0, 0]}>
          <planeGeometry args={[4.35, 2.05]} />
          <meshStandardMaterial
            color="#040610"
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        <Keyboard />

        {/* Trackpad */}
        <RoundedBox
          args={[1.05, 0.035, 0.78]}
          radius={0.06}
          smoothness={6}
          position={[0, 0.18, 0.75]}
        >
          <meshStandardMaterial
            color="#1b1c24"
            metalness={0.6}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Front glowing neon edge line */}
        <mesh position={[0, -0.18, 1.55]}>
          <boxGeometry args={[3.2, 0.025, 0.025]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* =====================================================
          LAPTOP SHADOW EFFECT
      ====================================================== */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

/* ==========================================================
   KEYBOARD COMPONENT WITH WAVING BACKLIGHT EMISSION
========================================================== */
interface KeyProps {
  keyWidth: number;
  rowZ: number;
  x: number;
  highlighted: boolean;
  rowIndex: number;
  keyIndex: number;
}

function Key({ keyWidth, rowZ, x, highlighted, rowIndex, keyIndex }: KeyProps) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Wave moves from left to right across the board based on x/z spatial coordinates
    const wave = Math.sin(time * 2.5 - x * 1.3 - rowZ * 0.9);
    const waveIntensity = Math.max(0, (wave + 1) / 2); // Remap sin [-1, 1] to [0, 1]

    if (highlighted) {
      // Dynamic shift of hue for glowing key nodes
      const hue = (time * 0.08 + x * 0.04) % 1;
      const color = new THREE.Color().setHSL(hue, 0.9, 0.6);
      materialRef.current.emissive = color;
      materialRef.current.emissiveIntensity = 0.35 + waveIntensity * 0.9;
    } else {
      // Normal keys have a subtle dark purple/cyan backlighting pulse
      materialRef.current.emissive.setRGB(
        0.05 * waveIntensity,
        0.02 * waveIntensity,
        0.18 * waveIntensity
      );
      materialRef.current.emissiveIntensity = 0.05 + waveIntensity * 0.35;
    }
  });

  return (
    <RoundedBox
      args={[keyWidth, 0.04, 0.2]}
      radius={0.018}
      smoothness={3}
      position={[x, 0.02, rowZ]}
    >
      <meshStandardMaterial
        ref={materialRef}
        color={highlighted ? "#16283b" : "#111116"}
        emissive={new THREE.Color("#000000")}
        emissiveIntensity={0}
        metalness={0.4}
        roughness={0.4}
      />
    </RoundedBox>
  );
}

function Keyboard() {
  const rows = [
    { count: 14, width: 3.95, z: -0.78 },
    { count: 13, width: 3.8, z: -0.43 },
    { count: 12, width: 3.6, z: -0.08 },
    { count: 11, width: 3.35, z: 0.27 },
  ];

  return (
    <group position={[0, 0.23, -0.18]}>
      {rows.map((row, rowIndex) => {
        const spacing = row.width / row.count;
        const keyWidth = spacing - 0.055;

        return Array.from({ length: row.count }).map((_, index) => {
          const x = -row.width / 2 + spacing / 2 + index * spacing;
          const highlighted = (index + rowIndex) % 6 === 0;

          return (
            <Key
              key={`${rowIndex}-${index}`}
              keyWidth={keyWidth}
              rowZ={row.z}
              x={x}
              highlighted={highlighted}
              rowIndex={rowIndex}
              keyIndex={index}
            />
          );
        });
      })}
    </group>
  );
}
