"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { globalMouse } from "./GirlAvatar";

export default function SplitRobot({
  inspectMode = false,
  scrollProgress = 0,
  activeSection = "home",
  scrollVelocity = 0,
}: {
  inspectMode?: boolean;
  scrollProgress?: number;
  activeSection?: string;
  scrollVelocity?: number;
}) {
  // Refs for animation
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const wingLeftRef = useRef<THREE.Group>(null);
  const wingRightRef = useRef<THREE.Group>(null);

  // Blinking timers
  const blinkTimer = useRef(0);
  const eyeScaleY = useRef(1);

  // Colors
  const colors = useMemo(
    () => ({
      body: "#161720", // Matte dark metallic grey/black
      bodySecondary: "#0c0d12", // Deeper black
      glowCyan: "#00f0ff", // Cyber electric cyan
      glowPurple: "#a855f7", // Cyber deep violet
      visor: "#030308", // Glossy dark glass
      joints: "#2c2e3d", // Metallic mechanical joints
    }),
    [],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Normalize scroll velocity for reactive physical animations (lean, stabilizer rings, arm sway)
    const normVelocity = THREE.MathUtils.clamp(scrollVelocity / 200, -1.0, 1.0);

    // 1. BLINKING ANIMATION LOOP
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.8) {
      eyeScaleY.current = 0.05; // Blink close
      if (blinkTimer.current > 3.95) {
        blinkTimer.current = 0;
        eyeScaleY.current = 1.0; // Open back up
      }
    } else {
      eyeScaleY.current = THREE.MathUtils.lerp(eyeScaleY.current, 1.0, 0.15);
    }

    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY.current;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY.current;

    // 2. STORYTELLING GAZE TARGETS WITH ADDITIVE MOUSE TRACKING
    let baseLookX = 0;
    let baseLookY = 0;

    if (activeSection === "about") {
      baseLookX = -0.28; // Look slightly left (towards identity text)
    } else if (activeSection === "stack") {
      baseLookX = 0.35; // Look slightly right (towards skill specs)
      baseLookY = -0.1;
    } else if (activeSection === "three3d") {
      baseLookX = 0.25; // Look towards WebGL widgets
    } else if (activeSection === "projects") {
      baseLookX = 0.38; // Look right (towards interactive laptop screens)
      baseLookY = -0.15;
    } else if (activeSection === "experience") {
      baseLookX = -0.4; // Look left (towards timeline cards)
    } else if (activeSection === "ai") {
      baseLookX = 0.3; // Look right (towards AI specs grids)
    } else if (activeSection === "contact") {
      baseLookX = 0.0; // Look directly at user
    }

    // Additive mouse input (small range so it does not fight the section targets)
    const targetLookX = baseLookX + globalMouse.x * 0.18;
    const targetLookY = baseLookY - globalMouse.y * 0.1;

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetLookX,
        0.08,
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetLookY,
        0.08,
      );
    }

    // 3. CONTINUOUS SUBTLE BREATHING AND FLOATING WITH SCROLL INERTIA LEAN
    const floatOffset = Math.sin(time * 1.3) * 0.04;
    if (bodyRef.current) {
      bodyRef.current.position.y = floatOffset;

      const targetLeanX = -globalMouse.y * 0.04 + normVelocity * 0.38; // Leans forward on scroll down, leans backward on scroll up
      const targetLeanZ = Math.sin(time * 0.6) * 0.01 - normVelocity * 0.12; // Side sway stabilizer

      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        globalMouse.x * 0.08,
        0.08,
      );
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(
        bodyRef.current.rotation.x,
        targetLeanX,
        0.08,
      );
      bodyRef.current.rotation.z = THREE.MathUtils.lerp(
        bodyRef.current.rotation.z,
        targetLeanZ,
        0.08,
      );
    }

    // 4. LEVITATING ARMS (Sways backward on forward acceleration, extends forward on backing up)
    if (leftArmRef.current) {
      leftArmRef.current.position.y = Math.sin(time * 1.3 - 0.7) * 0.05;
      leftArmRef.current.position.x = -0.9 + Math.cos(time * 0.8) * 0.015;

      const leftTargetRotX =
        normVelocity > 0 ? normVelocity * 0.65 : normVelocity * 0.85;
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        leftTargetRotX,
        0.08,
      );
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.z,
        normVelocity * 0.15,
        0.08,
      );
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.y = Math.sin(time * 1.3 + 0.7) * 0.05;
      rightArmRef.current.position.x = 0.9 - Math.cos(time * 0.8) * 0.015;

      const rightTargetRotX =
        normVelocity > 0 ? normVelocity * 0.65 : normVelocity * 0.85;
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        rightTargetRotX,
        0.08,
      );
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        -normVelocity * 0.15,
        0.08,
      );
    }

    // 5. GYROSCOPIC BASE RINGS ROTATION
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x =
        Math.PI / 2 + Math.sin(time * 0.5) * 0.04 - normVelocity * 0.25;
      ring1Ref.current.rotation.y = time * 0.45;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x =
        Math.PI / 2 + Math.cos(time * 0.4) * 0.04 - normVelocity * 0.35;
      ring2Ref.current.rotation.y = -time * 0.7;
    }

    // 6. BACK WINGS EXPANSION DETAIL (Expands wider on acceleration air-braking/stabilization)
    const wingsTargetAngle =
      (inspectMode ? 0.35 : 0.18 + Math.abs(globalMouse.x) * 0.08) +
      Math.abs(normVelocity) * 0.18;
    if (wingLeftRef.current) {
      wingLeftRef.current.rotation.y = THREE.MathUtils.lerp(
        wingLeftRef.current.rotation.y,
        wingsTargetAngle,
        0.06,
      );
    }
    if (wingRightRef.current) {
      wingRightRef.current.rotation.y = THREE.MathUtils.lerp(
        wingRightRef.current.rotation.y,
        -wingsTargetAngle,
        0.06,
      );
    }
  });

  return (
    <group>
      {/* ROBOT CORE COMPONENT */}
      <group ref={bodyRef}>
        {/* =====================================================
            1. HEAD & VISOR
        ====================================================== */}
        <group ref={headRef} position={[0, 0.65, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshStandardMaterial
              color={colors.body}
              roughness={0.16}
              metalness={0.92}
            />
          </mesh>

          <mesh position={[0, 0.05, -0.05]} castShadow>
            <sphereGeometry
              args={[0.44, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
            />
            <meshStandardMaterial
              color={colors.bodySecondary}
              roughness={0.22}
              metalness={0.88}
            />
          </mesh>

          <mesh position={[0, 0.05, 0.04]} castShadow>
            <sphereGeometry
              args={[0.405, 32, 32, 0, Math.PI, Math.PI / 4, Math.PI / 2.2]}
            />
            <meshStandardMaterial
              color={colors.visor}
              roughness={0.06}
              metalness={0.96}
            />
          </mesh>

          {/* GLOWING LED EYES */}
          <mesh
            ref={leftEyeRef}
            position={[-0.15, 0.06, 0.355]}
            rotation={[0, -0.2, 0]}
          >
            <capsuleGeometry args={[0.024, 0.05, 8, 16]} />
            <meshBasicMaterial color={colors.glowCyan} />
          </mesh>

          <mesh
            ref={rightEyeRef}
            position={[0.15, 0.06, 0.355]}
            rotation={[0, 0.2, 0]}
          >
            <capsuleGeometry args={[0.024, 0.05, 8, 16]} />
            <meshBasicMaterial color={colors.glowCyan} />
          </mesh>

          {/* Antenna / Cyber ears */}
          <group position={[-0.43, 0.05, 0]} rotation={[0, 0, 0.2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.02, 0.04, 0.15, 16]} />
              <meshStandardMaterial
                color={colors.joints}
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color={colors.glowPurple} />
            </mesh>
          </group>

          <group position={[0.43, 0.05, 0]} rotation={[0, 0, -0.2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.02, 0.04, 0.15, 16]} />
              <meshStandardMaterial
                color={colors.joints}
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color={colors.glowPurple} />
            </mesh>
          </group>
        </group>

        {/* =====================================================
            2. NECK JOINT
        ====================================================== */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
          <meshStandardMaterial
            color={colors.joints}
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.105, 0.015, 8, 32]} />
          <meshBasicMaterial color={colors.glowCyan} />
        </mesh>

        {/* =====================================================
            3. TORSO (CHEST PIECE)
        ====================================================== */}
        <group position={[0, -0.25, 0]}>
          <RoundedBox
            args={[0.7, 0.72, 0.42]}
            radius={0.12}
            smoothness={4}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={colors.bodySecondary}
              roughness={0.35}
              metalness={0.7}
            />
          </RoundedBox>

          <RoundedBox
            args={[0.62, 0.65, 0.35]}
            radius={0.08}
            smoothness={4}
            position={[0, 0.02, 0.07]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={colors.body}
              roughness={0.15}
              metalness={0.92}
            />
          </RoundedBox>

          <mesh position={[0, 0.08, 0.25]} rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.075]} />
            <meshBasicMaterial color={colors.glowCyan} />
          </mesh>
          <mesh position={[0, 0.08, 0.245]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.1, 0.012, 8, 32]} />
            <meshBasicMaterial color={colors.glowPurple} />
          </mesh>

          <mesh position={[-0.18, -0.15, 0.25]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[0.015, 0.18, 0.015]} />
            <meshBasicMaterial color={colors.glowCyan} />
          </mesh>
          <mesh position={[0.18, -0.15, 0.25]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.015, 0.18, 0.015]} />
            <meshBasicMaterial color={colors.glowCyan} />
          </mesh>

          {/* WING EXPANDERS */}
          <group ref={wingLeftRef} position={[-0.3, 0.15, -0.18]}>
            <mesh castShadow>
              <boxGeometry args={[0.4, 0.28, 0.04]} />
              <meshStandardMaterial
                color={colors.bodySecondary}
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
            <mesh position={[-0.1, 0, 0.025]}>
              <boxGeometry args={[0.15, 0.2, 0.01]} />
              <meshBasicMaterial color={colors.glowPurple} />
            </mesh>
          </group>

          <group ref={wingRightRef} position={[0.3, 0.15, -0.18]}>
            <mesh castShadow>
              <boxGeometry args={[0.4, 0.28, 0.04]} />
              <meshStandardMaterial
                color={colors.bodySecondary}
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
            <mesh position={[0.1, 0, 0.025]}>
              <boxGeometry args={[0.15, 0.2, 0.01]} />
              <meshBasicMaterial color={colors.glowPurple} />
            </mesh>
          </group>
        </group>

        {/* =====================================================
            4. LEVITATING ARMS
        ====================================================== */}
        <group ref={leftArmRef} position={[-0.9, -0.2, 0.0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial
              color={colors.body}
              roughness={0.16}
              metalness={0.92}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.16, 0.012, 8, 32]} />
            <meshBasicMaterial color={colors.glowPurple} />
          </mesh>

          <group position={[0, -0.32, 0.08]} rotation={[-0.15, 0, 0.05]}>
            <RoundedBox
              args={[0.13, 0.25, 0.13]}
              radius={0.03}
              smoothness={3}
              castShadow
            >
              <meshStandardMaterial
                color={colors.bodySecondary}
                roughness={0.22}
                metalness={0.88}
              />
            </RoundedBox>
            <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.085, 0.01, 8, 32]} />
              <meshBasicMaterial color={colors.glowCyan} />
            </mesh>
            <mesh position={[0, -0.18, 0]} castShadow>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color={colors.joints}
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>

        <group ref={rightArmRef} position={[0.9, -0.2, 0.0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial
              color={colors.body}
              roughness={0.16}
              metalness={0.92}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.16, 0.012, 8, 32]} />
            <meshBasicMaterial color={colors.glowPurple} />
          </mesh>

          <group position={[0, -0.32, 0.08]} rotation={[-0.15, 0, -0.05]}>
            <RoundedBox
              args={[0.13, 0.25, 0.13]}
              radius={0.03}
              smoothness={3}
              castShadow
            >
              <meshStandardMaterial
                color={colors.bodySecondary}
                roughness={0.22}
                metalness={0.88}
              />
            </RoundedBox>
            <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.085, 0.01, 8, 32]} />
              <meshBasicMaterial color={colors.glowCyan} />
            </mesh>
            <mesh position={[0, -0.18, 0]} castShadow>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color={colors.joints}
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>

        {/* =====================================================
            5. GYROSCOPIC HOVER THRUSTER BASE
        ====================================================== */}
        <group position={[0, -0.9, 0]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.05, 0.12, 16]} />
            <meshStandardMaterial
              color={colors.joints}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshBasicMaterial color={colors.glowCyan} />
          </mesh>

          <mesh ref={ring1Ref}>
            <torusGeometry args={[0.42, 0.024, 8, 64]} />
            <meshBasicMaterial
              color={colors.glowCyan}
              transparent
              opacity={0.65}
            />
          </mesh>

          <mesh ref={ring2Ref}>
            <torusGeometry args={[0.56, 0.018, 8, 64]} />
            <meshBasicMaterial
              color={colors.glowPurple}
              transparent
              opacity={0.35}
            />
          </mesh>

          <pointLight
            position={[0, -0.2, 0]}
            intensity={2.0}
            color={colors.glowCyan}
            distance={3}
          />
        </group>
      </group>
    </group>
  );
}
