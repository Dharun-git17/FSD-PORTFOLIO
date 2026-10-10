import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Check if WebGL is supported
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

// Interactive 3D Metallic Sculpture
function KineticSculpture({
  mouse,
  scrollY,
  prefersReducedMotion
}: {
  mouse: React.RefObject<{ x: number; y: number }>
  scrollY: number
  prefersReducedMotion: boolean
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const innerCoreRef = useRef<THREE.Mesh>(null!)
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)
  const ring3Ref = useRef<THREE.Mesh>(null!)
  const satellitesGroupRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const currentMouse = mouse.current || { x: 0, y: 0 }

    if (!prefersReducedMotion) {
      // Gentle floating sine motion
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.12 - scrollY * 0.0015
      groupRef.current.position.z = -scrollY * 0.002

      // Smooth mouse-follow parallax with lerp
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        currentMouse.y * 0.35 + scrollY * 0.001,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        currentMouse.x * 0.5 + time * 0.05,
        0.05
      )

      // Multi-axis rotation of inner core
      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.x += delta * 0.25
        innerCoreRef.current.rotation.y += delta * 0.35
      }

      // Gyroscopic orbital rings rotations
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x += delta * 0.4
        ring1Ref.current.rotation.y += delta * 0.2
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y += delta * 0.3
        ring2Ref.current.rotation.z += delta * 0.35
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.x -= delta * 0.2
        ring3Ref.current.rotation.z += delta * 0.25
      }

      // Satellites orbiting
      if (satellitesGroupRef.current) {
        satellitesGroupRef.current.rotation.y -= delta * 0.4
        satellitesGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.15
      }
    } else {
      // Static subtle posture for reduced motion
      groupRef.current.rotation.y = 0.4
      groupRef.current.rotation.x = 0.2
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central faceted metallic icosahedron core */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color="#0d1b2a"
          emissive="#001830"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          flatShading={true}
        />
      </mesh>

      {/* Wireframe geometric aura */}
      <mesh>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe={true}
          transparent={true}
          opacity={0.25}
        />
      </mesh>

      {/* Ring 1 - Outer Cyan Torus */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#007799"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Ring 2 - Mid Royal Cobalt Torus */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.3}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Ring 3 - Outer Thin Chrome Ring */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[2.15, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#e2e8f0"
          roughness={0.1}
          metalness={0.98}
        />
      </mesh>

      {/* Orbiting Quantum Satellites */}
      <group ref={satellitesGroupRef}>
        <mesh position={[2.3, 0.4, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[-2.2, -0.5, 0.8]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0.7, 2.0, -1.0]}>
          <octahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#818cf8"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  )
}

// Floating Ambient 3D Particle Cloud
function ParticleField({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  })

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x += delta * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00f0ff"
        transparent={true}
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  )
}

// WebGL Static/CSS Hologram Fallback
function WebGLFallback() {
  return (
    <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center">
      {/* Outer ambient blur */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-transparent blur-3xl animate-pulse" />
      
      {/* Holographic rings */}
      <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-6 border border-blue-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      <div className="absolute inset-12 border border-slate-400/20 rounded-full animate-[spin_25s_linear_infinite]" />
      
      {/* Central faceted shape */}
      <div className="relative w-36 h-36 border border-cyan-400/50 bg-[#0d1b2a]/80 backdrop-blur-md rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.25)]">
        <div className="w-20 h-20 border border-blue-400/60 rounded-xl rotate-12 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-cyan-400/80 shadow-[0_0_20px_#00f0ff]" />
        </div>
      </div>
      
      {/* Floating status tag */}
      <div className="absolute bottom-2 text-[10px] font-mono tracking-widest uppercase text-cyan-400/70 bg-[#06080e]/80 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm">
        Geometric Visual Core
      </div>
    </div>
  )
}

export function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setHasWebGL(isWebGLAvailable())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isMounted) return null

  if (!hasWebGL) {
    return <WebGLFallback />
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px] flex items-center justify-center">
      {/* Studio Lighting Background Aura */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<WebGLFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          aria-label="Interactive 3D Geometric Sculpture"
        >
          {/* Ambient Lighting */}
          <ambientLight intensity={0.65} color="#0d1b2a" />
          
          {/* Key Light: Restrained Electric Cyan */}
          <directionalLight position={[4, 5, 4]} intensity={2.4} color="#00f0ff" />
          
          {/* Rim / Fill Light: Deep Cobalt */}
          <pointLight position={[-4, -3, 2]} intensity={2.8} color="#2563eb" />
          
          {/* Specular Glint */}
          <pointLight position={[0, 4, 3]} intensity={1.5} color="#ffffff" />
          
          {/* Bottom ground subtle bounce */}
          <pointLight position={[0, -4, -2]} intensity={1.2} color="#06b6d4" />

          {/* 3D Kinetic Sculpture Core */}
          <KineticSculpture
            mouse={mouse}
            scrollY={scrollY}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Particle Star Field (disabled for reduced motion) */}
          {!prefersReducedMotion && <ParticleField count={140} />}
        </Canvas>
      </Suspense>

      {/* Subtle interaction indicator for desktop */}
      <div className="hidden md:flex absolute bottom-4 items-center gap-2 text-[10px] tracking-wider uppercase font-mono text-slate-400/80 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur-md pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Interactive 3D Engine • Three.js
      </div>
    </div>
  )
}
