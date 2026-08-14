"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalScroll, globalMouse } from "./GirlAvatar";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 150 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Velocity tracking refs
  const lastScroll = useRef(0);
  const lastTime = useRef(0);
  const scrollVelocity = useRef(0);

  // Generate random particle coordinates and theme colors (Cyan, Purple, Pink)
  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);
    
    const cyan = new THREE.Color("#22d3ee");
    const purple = new THREE.Color("#a855f7");
    const pink = new THREE.Color("#f472b6");
    
    for (let i = 0; i < count * 3; i += 3) {
      posArr[i] = (Math.random() - 0.5) * 16;     // X (-8 to 8)
      posArr[i + 1] = (Math.random() - 0.5) * 16; // Y (-8 to 8)
      posArr[i + 2] = (Math.random() - 0.5) * 14; // Z (-7 to 7)
      
      const rand = Math.random();
      const chosenColor = rand < 0.45 ? cyan : rand < 0.75 ? purple : pink;
      
      colorArr[i] = chosenColor.r;
      colorArr[i + 1] = chosenColor.g;
      colorArr[i + 2] = chosenColor.b;
    }
    return [posArr, colorArr];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // 1. Calculate time delta and scroll velocity
    const time = state.clock.elapsedTime;
    const dt = Math.max(0.001, time - lastTime.current);
    lastTime.current = time;

    const currentScroll = globalScroll.progress;
    const scrollDelta = currentScroll - lastScroll.current;
    lastScroll.current = currentScroll;

    const instantVelocity = Math.abs(scrollDelta) / dt;
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, instantVelocity, 0.1);
    
    const velocity = Math.min(2.5, scrollVelocity.current); // Clamp velocity effect

    // 2. Dynamic rotational speed
    const baseSpeed = 0.02;
    const scrollBoost = velocity * 0.15;
    pointsRef.current.rotation.y = time * (baseSpeed + scrollBoost);
    
    // Add subtle drift based on mouse coordinates
    const targetRotX = globalMouse.y * 0.05;
    const targetRotZ = globalMouse.x * 0.05;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetRotZ, 0.05);

    // 3. Motion stretch (vertical motion blur stretch on high velocity)
    pointsRef.current.scale.y = THREE.MathUtils.lerp(pointsRef.current.scale.y, 1.0 + velocity * 0.3, 0.08);
    pointsRef.current.scale.x = THREE.MathUtils.lerp(pointsRef.current.scale.x, 1.0, 0.08);
    pointsRef.current.scale.z = THREE.MathUtils.lerp(pointsRef.current.scale.z, 1.0, 0.08);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors={true}
        size={0.075}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
