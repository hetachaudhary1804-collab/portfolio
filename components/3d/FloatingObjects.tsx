"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

interface FloatingObjectsProps {
  scrollYProgress: MotionValue<number>;
}

interface TechObject {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}

const technologies: TechObject[] = [
  {
    name: "NEXT.JS",
    position: [-2.7, 1.4, 0],
    color: "#ffffff",
    size: 0.32,
    speed: 1.2,
  },
  {
    name: "REACT",
    position: [2.5, 1.1, -0.5],
    color: "#61dafb",
    size: 0.3,
    speed: 1.5,
  },
  {
    name: "TYPESCRIPT",
    position: [-2.5, -1.3, -0.3],
    color: "#3178c6",
    size: 0.28,
    speed: 1.1,
  },
  {
    name: "PHP",
    position: [2.8, -1.5, 0],
    color: "#777bb4",
    size: 0.3,
    speed: 1.4,
  },
  {
    name: "MYSQL",
    position: [-0.8, 2.1, -1],
    color: "#00f0ff",
    size: 0.25,
    speed: 1.3,
  },
  {
    name: "NODE",
    position: [1.1, -2.1, -0.8],
    color: "#68a063",
    size: 0.27,
    speed: 1.6,
  },
];

function TechNode({
  tech,
  index,
}: {
  tech: TechObject;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.rotation.x =
      Math.sin(time * 0.5 + index) * 0.12;

    groupRef.current.rotation.y =
      Math.cos(time * 0.4 + index) * 0.18;
  });

  return (
    <Float
      speed={tech.speed}
      rotationIntensity={0.4}
      floatIntensity={0.8}
    >
      <group
        ref={groupRef}
        position={tech.position}
      >
        {/* Outer glass cube */}
        <RoundedBox
          args={[tech.size * 2.3, tech.size * 2.3, tech.size * 2.3]}
          radius={0.08}
          smoothness={5}
        >
          <meshPhysicalMaterial
            color="#08051c"
            transparent
            opacity={0.82}
            roughness={0.25}
            metalness={0.65}
            transmission={0.15}
            emissive={tech.color}
            emissiveIntensity={0.08}
          />
        </RoundedBox>

        {/* Inner glowing sphere */}
        <mesh>
          <sphereGeometry args={[tech.size * 0.48, 24, 24]} />
          <meshStandardMaterial
            color={tech.color}
            emissive={tech.color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Technology label */}
        <Text
          position={[0, -tech.size * 1.7, 0]}
          fontSize={tech.size * 0.55}
          color={tech.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#030014"
        >
          {tech.name}
        </Text>

        {/* Point light */}
        <pointLight
          color={tech.color}
          intensity={0.8}
          distance={2}
        />
      </group>
    </Float>
  );
}

function OrbitRing({
  radius,
  rotation,
  color,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 12, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function FloatingObjects({
  scrollYProgress,
}: FloatingObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, index) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      scale: Math.random() * 0.025 + 0.01,
      index,
    }));
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const progress = scrollYProgress.get();

    /*
     * Move the entire technology universe
     * according to page scroll.
     */
    groupRef.current.rotation.y =
      progress * Math.PI * 0.7;

    groupRef.current.rotation.x =
      progress * Math.PI * 0.15;

    groupRef.current.position.y =
      -progress * 1.2;
  });

  return (
    <group ref={groupRef}>

      {/* Main orbital system */}

      <OrbitRing
        radius={2.1}
        rotation={[Math.PI / 2.2, 0, 0]}
        color="#00f0ff"
      />

      <OrbitRing
        radius={2.7}
        rotation={[Math.PI / 3, Math.PI / 5, 0]}
        color="#9000ff"
      />

      <OrbitRing
        radius={3.2}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
        color="#00f0ff"
      />

      {/* Center energy sphere */}

      <Float
        speed={1.5}
        rotationIntensity={0.25}
        floatIntensity={0.5}
      >
        <mesh>
          <icosahedronGeometry args={[0.65, 2]} />

          <meshPhysicalMaterial
            color="#08051c"
            wireframe
            transparent
            opacity={0.85}
            emissive="#00f0ff"
            emissiveIntensity={0.6}
          />
        </mesh>

        <pointLight
          color="#00f0ff"
          intensity={3}
          distance={5}
        />
      </Float>

      {/* Technology nodes */}

      {technologies.map((tech, index) => (
        <TechNode
          key={tech.name}
          tech={tech}
          index={index}
        />
      ))}

      {/* Floating particles */}

      {particles.map((particle) => (
        <mesh
          key={particle.index}
          position={particle.position}
          scale={particle.scale}
        >
          <sphereGeometry args={[1, 8, 8]} />

          <meshBasicMaterial
            color={
              particle.index % 2 === 0
                ? "#00f0ff"
                : "#9000ff"
            }
          />
        </mesh>
      ))}

      {/* Ambient particle field */}

      <Sparkles
        count={100}
        scale={[7, 6, 5]}
        size={1.5}
        speed={0.25}
        color="#00f0ff"
      />
    </group>
  );
}