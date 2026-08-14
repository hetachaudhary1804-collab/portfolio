"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

import SplitRobot from "./SplitRobot";
import ParticleField from "./ParticleField";

// ============================================================
// CYBER DIGITAL GRID FLOOR
// ============================================================

function GridFloor() {
  const gridRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!gridRef.current) return;

    const time = state.clock.elapsedTime;

    gridRef.current.position.z = (time * 0.15) % 2;
  });

  return (
    <gridHelper
      ref={gridRef as any}
      args={[30, 30, "#00f0ff", "#16103c"]}
      position={[0, -2.2, 0]}
    />
  );
}

// ============================================================
// HOLOGRAM PORTAL
// ============================================================

function HologramPortal() {
  const portalRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!portalRef.current) return;

    const time = state.clock.elapsedTime;

    portalRef.current.children.forEach((child, idx) => {
      child.rotation.z = time * (0.15 + idx * 0.08) * (idx % 2 === 0 ? 1 : -1);

      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshBasicMaterial;

        if (mat && "opacity" in mat) {
          mat.opacity = 0.28 - idx * 0.06 + Math.sin(time * 2 + idx) * 0.05;
        }
      }
    });
  });

  return (
    <group
      ref={portalRef}
      position={[0, -2.18, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <mesh>
        <ringGeometry args={[1.2, 1.23, 64]} />

        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <ringGeometry args={[1.5, 1.52, 64]} />

        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.16]}>
        <ringGeometry args={[1.8, 1.815, 64]} />

        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[1.15, 32]} />

        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.28}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ============================================================
// SCENE COORDINATOR
// ============================================================

function SceneCoordinator({
  inspectMode,
  scrollProgress = 0,
  scrollVelocity = 0,
  activeIndex = 0,
}: {
  inspectMode: boolean;
  scrollProgress?: number;
  scrollVelocity?: number;
  activeIndex?: number;
}) {
  const avatarRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // ========================================================
    // CAMERA
    // ========================================================

    if (!inspectMode) {
      let targetCamPos = new THREE.Vector3(0, 0.4, 4.8);

      let targetLookAt = new THREE.Vector3(0, 0.1, 0);

      // ------------------------------------------------------
      // HOME -> ABOUT
      // ------------------------------------------------------

      if (activeIndex === 0) {
        const startCamPos = new THREE.Vector3(0, 0.4, 4.8);

        const endCamPos = new THREE.Vector3(0, 0.45, 4.2);

        targetCamPos.lerpVectors(startCamPos, endCamPos, scrollProgress);

        const startLookAt = new THREE.Vector3(0, 0.1, 0);

        const endLookAt = new THREE.Vector3(0, 0.15, 0);

        targetLookAt.lerpVectors(startLookAt, endLookAt, scrollProgress);
      }

      // ------------------------------------------------------
      // ABOUT
      // ------------------------------------------------------
      else if (activeIndex === 1) {
        targetCamPos.set(0, 0.25, 4.2);

        targetLookAt.set(0, 0.05, 0);
      }

      // ------------------------------------------------------
      // CONTACT -> HOME
      // ------------------------------------------------------
      else if (activeIndex === 6) {
        const startCamPos = new THREE.Vector3(0, 0.5, 4.2);

        const endCamPos = new THREE.Vector3(0, 0.4, 4.8);

        targetCamPos.lerpVectors(startCamPos, endCamPos, scrollProgress);

        const startLookAt = new THREE.Vector3(0, 0, 0);

        const endLookAt = new THREE.Vector3(0, 0.1, 0);

        targetLookAt.lerpVectors(startLookAt, endLookAt, scrollProgress);
      }

      // ------------------------------------------------------
      // DEFAULT
      // ------------------------------------------------------
      else {
        targetCamPos.set(0, 0.4, 4.8);

        targetLookAt.set(0, 0.1, 0);
      }

      state.camera.position.lerp(targetCamPos, 0.08);

      const tempMatrix = new THREE.Matrix4();

      tempMatrix.lookAt(
        state.camera.position,
        targetLookAt,
        new THREE.Vector3(0, 1, 0),
      );

      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        tempMatrix,
      );

      state.camera.quaternion.slerp(targetQuaternion, 0.08);
    }

    // ========================================================
    // ROBOT
    // ========================================================

    if (avatarRef.current) {
      let targetRobotPos = new THREE.Vector3(0, -0.65, 0);

      let targetScale = 1.45;

      // ------------------------------------------------------
      // HOME -> ABOUT TRANSITION
      // ------------------------------------------------------

      if (activeIndex === 0) {
        const startRobotPos = new THREE.Vector3(0, -0.65, 0);

        const endRobotPos = new THREE.Vector3(1.55, 0.15, 0);

        targetRobotPos.lerpVectors(startRobotPos, endRobotPos, scrollProgress);

        const startRobotRot = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, -0.15, 0),
        );

        const endRobotRot = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, -0.35, 0),
        );

        const targetQuat = new THREE.Quaternion().slerpQuaternions(
          startRobotRot,
          endRobotRot,
          scrollProgress,
        );

        avatarRef.current.quaternion.slerp(targetQuat, 0.08);

        // Large on Home -> small on About
        targetScale = THREE.MathUtils.lerp(1.45, 0.52, scrollProgress);
      }

      // ------------------------------------------------------
      // ABOUT
      // ------------------------------------------------------
      else if (activeIndex === 1) {
        // Small robot on the far right.
        //
        // This intentionally sits away from:
        // - WHO I AM text
        // - Biography
        // - HUD panel
        //
        // It acts more like a floating companion.

        targetRobotPos.set(1.65, 0.45, 0);

        const targetQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, -0.45, 0),
        );

        avatarRef.current.quaternion.slerp(targetQuat, 0.08);

        targetScale = 0.52;
      }

      // ------------------------------------------------------
      // CONTACT -> HOME
      // ------------------------------------------------------
      else if (activeIndex === 6) {
        const startRobotPos = new THREE.Vector3(0, -0.6, 0);

        const endRobotPos = new THREE.Vector3(0, -0.65, 0);

        targetRobotPos.lerpVectors(startRobotPos, endRobotPos, scrollProgress);

        const startRobotRot = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, 0, 0),
        );

        const endRobotRot = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, -0.15, 0),
        );

        const targetQuat = new THREE.Quaternion().slerpQuaternions(
          startRobotRot,
          endRobotRot,
          scrollProgress,
        );

        avatarRef.current.quaternion.slerp(targetQuat, 0.08);

        targetScale = THREE.MathUtils.lerp(1.3, 1.45, scrollProgress);
      }

      // ------------------------------------------------------
      // STACK
      // ------------------------------------------------------
      else if (activeIndex === 2) {
        // Small robot on the right side, bottom side.
        targetRobotPos.set(1.65, -0.55, 0);

        const targetQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, -0.45, 0),
        );

        avatarRef.current.quaternion.slerp(targetQuat, 0.08);

        targetScale = 0.45;
      }

      // ------------------------------------------------------
      // OTHER SECTIONS
      // ------------------------------------------------------
      else {
        targetRobotPos.set(0, -0.65, 0);

        const targetQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, -0.15, 0),
        );

        avatarRef.current.quaternion.slerp(targetQuat, 0.08);

        targetScale = 1.15;
      }

      // Smooth movement
      avatarRef.current.position.lerp(targetRobotPos, 0.08);

      // Smooth scaling
      const currentScale = avatarRef.current.scale.x;

      const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);

      avatarRef.current.scale.setScalar(nextScale);
    }
  });

  return (
    <group ref={avatarRef}>
      <SplitRobot
        inspectMode={inspectMode}
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        activeSection={
          activeIndex === 0
            ? "home"
            : activeIndex === 1
              ? "about"
              : activeIndex === 2
                ? "stack"
                : activeIndex === 6
                  ? "contact"
                  : "home"
        }
      />

      <HologramPortal />
    </group>
  );
}

// ============================================================
// MAIN SCENE
// ============================================================
export default function Scene({
  inspectMode = false,
  scrollProgress = 0,
  scrollVelocity = 0,
  activeIndex = 0,
}: {
  inspectMode?: boolean;
  scrollProgress?: number;
  scrollVelocity?: number;
  activeIndex?: number;
  isSmallStackRobot?: boolean;
}) {
  return (
    <div
      className={
        inspectMode
          ? "fixed inset-0 z-30 bg-[#050505] pointer-events-auto transition-all duration-500"
          : "absolute inset-0 z-0 bg-transparent pointer-events-none"
      }
    >
      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-[0.12] pointer-events-none" />

      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={35} />

        {/* Lighting */}
        <ambientLight intensity={0.8} />

        <directionalLight position={[5, 6, 6]} intensity={1.8} castShadow />

        <pointLight
          position={[-4, 1.5, 3]}
          intensity={2.8}
          color="#00f0ff"
          distance={12}
        />

        <pointLight
          position={[4, -1.5, 2]}
          intensity={2.5}
          color="#a855f7"
          distance={11}
        />

        {/* Environment */}
        <Environment preset="night" />

        {/* Background elements */}
        <GridFloor />

        <ParticleField count={120} />

        {/* Robot */}
        <SceneCoordinator
          inspectMode={inspectMode}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          activeIndex={activeIndex}
        />

        {/* Inspect mode */}
        {inspectMode && (
          <OrbitControls
            enableZoom
            enablePan
            enableRotate
            maxDistance={9}
            minDistance={3.2}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 5}
          />
        )}
      </Canvas>
    </div>
  );
}
