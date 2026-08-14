"use client";

import React, { useRef, useEffect, useState, useMemo, Component, ErrorInfo, ReactNode } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Global mouse tracker to avoid React re-renders on mousemove
export const globalMouse = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  const handleMouseMove = (e: MouseEvent) => {
    globalMouse.x = (e.clientX / window.innerWidth - 0.5) * 2; // [-1, 1]
    globalMouse.y = (e.clientY / window.innerHeight - 0.5) * 2; // [-1, 1]
  };
  window.addEventListener("mousemove", handleMouseMove);
}

// Global scroll tracker to avoid React re-renders on scroll
export const globalScroll = { progress: 0 };
if (typeof window !== "undefined") {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    globalScroll.progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial call
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Could not load 3D avatar model. Using 2D image fallback.", error);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2D Image Cyber Fallback Component
function Avatar2DFallback({ position, scale }: { position: [number, number, number]; scale: number }) {
  const texture = useTexture("/avatar.png");
  const fallbackRef = useRef<THREE.Group>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (!fallbackRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle floating bobbing motion
    fallbackRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.05;

    // Subtle rotation based on mouse coordinates for premium parallax
    const targetRotY = globalMouse.x * 0.25;
    const targetRotX = -globalMouse.y * 0.12;
    fallbackRef.current.rotation.y = THREE.MathUtils.lerp(fallbackRef.current.rotation.y, targetRotY, 0.05);
    fallbackRef.current.rotation.x = THREE.MathUtils.lerp(fallbackRef.current.rotation.x, targetRotX, 0.05);

    // Update shader uniforms
    uniforms.uTime.value = time;

    // Spin glowing background ring
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z = time * 0.25;
      const pulse = 1.0 + Math.sin(time * 2.0) * 0.03;
      glowRingRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group ref={fallbackRef} position={position}>
      {/* Immersive Holographic Background Circle Grid */}
      <mesh ref={glowRingRef} position={[0, 0.8, -0.15]} scale={[2.0 * scale, 2.0 * scale, 1]}>
        <ringGeometry args={[0.9, 0.93, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Cyber ambient ring glow */}
      <mesh position={[0, 0.8, -0.2]} scale={[2.2 * scale, 2.2 * scale, 1]}>
        <ringGeometry args={[0.95, 0.96, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* 2D Avatar Image plane with Custom Holographic Scanline Shader */}
      <mesh position={[0, 0.8, 0]} scale={[1.8 * scale, 2.5 * scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={`
            varying vec2 vUv;
            void main() {

              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D uTexture;
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              vec4 texColor = texture2D(uTexture, vUv);
              if (texColor.a < 0.05) discard;
              
              // Cyan hologram color base
              vec3 holoColor = vec3(0.0, 0.88, 1.0);
              
              // Scroll scanlines
              float scanline = sin(vUv.y * 120.0 - uTime * 7.0) * 0.12 + 0.88;
              
              // Dynamic glow pulse
              float pulse = sin(vUv.y * 4.0 + uTime * 4.0) * 0.08 + 0.92;
              
              // Hologram interference noise
              float noise = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
              float flicker = 0.95 + 0.05 * noise;
              
              // Blended output color
              vec3 finalColor = mix(texColor.rgb, holoColor, 0.45) * scanline * pulse * flicker;
              
              // Glow border boost near edges
              float border = smoothstep(0.4, 0.5, abs(vUv.x - 0.5)) + smoothstep(0.4, 0.5, abs(vUv.y - 0.5));
              finalColor += holoColor * border * 0.3 * flicker;
              
              gl_FragColor = vec4(finalColor, texColor.a * (0.88 + 0.12 * sin(uTime * 5.0) + border * 0.12));
            }
          `}
          uniforms={uniforms}
          transparent={true}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
}

interface GirlAvatarInnerProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

function GirlAvatarInner({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: GirlAvatarInnerProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Attempt to load the GLTF model
  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions } = useAnimations(animations, groupRef);
  const [headBone, setHeadBone] = useState<THREE.Object3D | null>(null);

  // Parse scene to find head bone for realistic look-at interaction
  useEffect(() => {
    if (scene) {
      let head: THREE.Object3D | null = null;
      scene.traverse((child) => {
        if (
          child.isObject3D &&
          (child.name.toLowerCase().includes("head") || child.name.toLowerCase().includes("neck"))
        ) {
          head = child;
        }
        // Optimize materials: cast & receive shadow
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = Math.max(child.material.roughness, 0.35);
          }
        }
      });
      setHeadBone(head);
    }
  }, [scene]);

  // Set up animation
  useEffect(() => {
    if (animations && animations.length > 0) {
      // Look for idle/typing animations
      const idleNames = ["idle", "Idle", "IDLE", "typing", "Typing", "TYPING"];
      let activeAction: any = null;

      for (const name of idleNames) {
        const foundName = animations.find((a) => a.name.toLowerCase().includes(name.toLowerCase()))?.name;
        if (foundName && actions[foundName]) {
          activeAction = actions[foundName];
          break;
        }
      }

      // Fallback to first animation if no idle matches
      if (!activeAction && animations[0]) {
        activeAction = actions[animations[0].name];
      }

      if (activeAction) {
        activeAction.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, animations]);

  // Frame animation loop for mouse interaction and smooth lerping
  useFrame((state) => {
    // 1. Mouse rotation tracking
    const mouseX = globalMouse.x * 0.35; // Limit range for professional look
    const mouseY = globalMouse.y * 0.18;

    if (headBone) {
      // Rotate head bone independently
      headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouseX, 0.08);
      headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -mouseY, 0.08);
    } else if (groupRef.current) {
      // Rotate the entire avatar group if no head bone is found
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation[1] + mouseX,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotation[0] - mouseY,
        0.08
      );
    }

    // 2. Continuous subtle breathing/floating animation
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.0) * 0.04;
      // Slight roll
      groupRef.current.rotation.z = rotation[2] + Math.sin(time * 0.6) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

export default function GirlAvatar(props: GirlAvatarInnerProps) {
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/avatar.glb", { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setModelExists(true);
          try {
            useGLTF.preload("/avatar.glb");
          } catch (e) { }
        } else {
          setModelExists(false);
        }
      })
      .catch(() => {
        setModelExists(false);
      });
  }, []);

  const fallbackPos: [number, number, number] = props.position
    ? [props.position[0], props.position[1] - 0.7, props.position[2]]
    : [0, -0.7, 0];
  const fallbackScale = props.scale ? props.scale * 1.15 : 1.2;

  if (modelExists === null || !modelExists) {
    return <Avatar2DFallback position={fallbackPos} scale={fallbackScale} />;
  }

  return (
    <ModelErrorBoundary fallback={<Avatar2DFallback position={fallbackPos} scale={fallbackScale} />}>
      <GirlAvatarInner {...props} />
    </ModelErrorBoundary>
  );
}
